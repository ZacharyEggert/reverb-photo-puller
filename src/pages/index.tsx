/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import { type NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { CloudinaryPhoto } from './types';
import { Listing } from './types';

const Home: NextPage = () => {
  const [reverbNumber, setReverbNumber] = useState('');
  const [fetching, setFetching] = useState(false);

  const [listingList, setListingList] = useState<Listing[]>([]);
  const [listingPhotos, setListings] = useState<CloudinaryPhoto[]>([]);

  const changeReverbNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReverbNumber(e.target.value);
  };

  const fetchReverbPhotos = async (id?: string) => {
    setFetching(true);
    console.log('fetching photos');

    return axios
      .get(`/api/reverbid/${id ?? reverbNumber}`)
      .then((res) => {
        console.log(res.data);
        setListings(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setFetching(false);
      });
  };

  const oneClickFetch = async (id: string) => {
    setReverbNumber(id);
    await fetchReverbPhotos(id);
  };

  const fetchListingList = () => {
    setFetching(true);
    console.log('fetching listing list');

    //get the apiKey from local storage
    const apiKey = localStorage.getItem('apiKey');
    //if it doesn't exist, prompt the user for it
    if (!apiKey) {
      const apiKey_ = prompt(
        'Enter your reverb api key (read priviledges) or default to Diablo Guitars',
      );
      if (apiKey_) {
        // if the user entered a key, save it to local storage
        localStorage.setItem('apiKey', apiKey_);
      }
    }

    axios
      .post('/api/listings', { apiKey: undefined })
      .then((res) => {
        if (res.status !== 200) {
          console.log(res);
          throw new Error('failed to fetch listing list');
        }
        console.log(res.data);
        setListingList(res.data.listings);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setFetching(false);
      });
  };

  const downloadImage = (
    url: string,
    reverbNumber: string,
    imageNumber = 0,
  ) => {
    const i = imageNumber < 10 ? `0${imageNumber}` : imageNumber;

    fetch(url, {
      method: 'GET',
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then(function (buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${reverbNumber}-${i}.jpg`); //or any other extension
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const downloadAllPhotos = () => {
    if (!listingPhotos) return;
    if (listingPhotos.length === 0) return;

    for (let i = 0; i < listingPhotos.length; i++) {
      if (!listingPhotos[i]) continue;
      if (!listingPhotos[i]?.preview_url) continue;
      const url = listingPhotos[i]?.preview_url;
      url && downloadImage(url, reverbNumber, i);
    }
  };

  return (
    <>
      <Head>
        <title>Reverb Photo Puller</title>
        <meta
          name="description"
          content="Pull photos from a specified reverb listing by id"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="relative grid min-h-screen grid-cols-9 overflow-x-hidden bg-neutral-800 px-2 text-white">
        <section className="col-span-6">
          <Interactables 
					 	reverbNumber={reverbNumber} 
						changeReverbNumber={changeReverbNumber} 
						fetchReverbPhotos={fetchReverbPhotos} 
						fetching={fetching} 
						downloadAllPhotos={downloadAllPhotos} 
						fetchListingList={fetchListingList} 
					/>
          <div className="relative mt-8 grid grid-cols-5 gap-2 bg-neutral-800">
            {listingPhotos &&
              listingPhotos.map((listingPhoto, i) => (
                <PhotoDisplay listingPhoto={listingPhoto} downloadImage={downloadImage} reverbNumber={reverbNumber} i={i}/>
              ))}
          </div>
        </section>
        <List listingList={listingList} oneClickFetch={oneClickFetch} setReverbNumber={setReverbNumber} />
      </main>
    </>
  );
};

export default Home;
const Interactables = (props: {reverbNumber: string, changeReverbNumber: (e: React.ChangeEvent<HTMLInputElement>) => void, fetchReverbPhotos: (id?: string) => Promise<void>, fetching: boolean, downloadAllPhotos: () => void, fetchListingList: () => void}) => {

	const { reverbNumber, changeReverbNumber, fetchReverbPhotos, fetching, downloadAllPhotos, fetchListingList } = props;

	return <div className="grid items-center">
		<input
			value={ reverbNumber }
			onChange={ changeReverbNumber }
			className="mx-auto my-2 bg-neutral-700 py-1 px-2" />
		<button
			onClick={ () => fetchReverbPhotos() }
			className=" my-2 mx-auto w-1/5 rounded-2xl border border-neutral-600 bg-neutral-700 px-2 py-1"
			disabled={ fetching }
		>
			fetch
		</button>
		<button
			onClick={ downloadAllPhotos }
			className=" my-2 mx-auto w-1/5 rounded-2xl border border-neutral-600 bg-neutral-700 px-2 py-1"
			disabled={ fetching }
		>
			download all photos
		</button>
		<button
			onClick={ fetchListingList }
			className=" my-2 mx-auto w-1/5 rounded-2xl border border-neutral-600 bg-neutral-700 px-2 py-1"
			disabled={ fetching }
		>
			fetch listing list
		</button>
	</div>;
}

function List(props:{listingList: Listing[], oneClickFetch: (id: string) => Promise<void>, setReverbNumber: (id: string) => void}) {

	const { listingList, oneClickFetch, setReverbNumber } = props;

	return <section className="fixed right-0 col-span-3 h-full w-1/3">
		<div className="h-full w-full overflow-y-scroll">
			<table>
				<thead>
					<tr className="gap-1">
						<th>id</th>
						<th>title</th>
						<th>date</th>
					</tr>
				</thead>
				<tbody>
					{ listingList &&
						listingList.map((listing) => (
							<tr key={ listing.id } className="gap-1">
								<td
									onClick={ (e) => {
										if (e.shiftKey) {
											window.open(
												`https://api.reverb.com/api/listings/${listing.id}`
											);
										} else if (e.ctrlKey) {
											window.open(
												`https://reverb.com/item/${listing.id}`
											);
											// handle?.blur();
											setTimeout(window.focus, 2);
										} else if (e.altKey) {
											oneClickFetch(listing.id);
										} else {
											setReverbNumber(listing.id);
										}
									} }
									className="cursor-pointer rounded-md hover:bg-neutral-700"
								>
									{ listing.id }
								</td>
								<td
									onClick={ () => {
										navigator.clipboard.writeText(
											listing.title.replace(/(\/|\||:)+\s?/g, ' ')
										);
									} }
									className="cursor-pointer rounded-md hover:bg-neutral-700"
								>
									{ listing.title }
								</td>
								<td className="text-xs">{ listing.published_at }</td>
							</tr>
						)) }
				</tbody>
			</table>
		</div>
	</section>;
}

function PhotoDisplay(props:{listingPhoto: CloudinaryPhoto, downloadImage: (url: string, reverbNumber: string, imageNumber?: number) => void, reverbNumber: string, i: number}) {

	const { listingPhoto, downloadImage, reverbNumber, i } = props;

	return <div key={ listingPhoto.id } className="relative aspect-square">
		<div className="grid h-full w-full items-center overflow-clip bg-neutral-700">
			<img
				src={ listingPhoto.preview_url }
				className="my-auto mx-auto block max-h-full max-w-full"
				onClick={ () => {
					//download the image
					downloadImage(listingPhoto.preview_url, reverbNumber, i);
				} } />
		</div>
	</div>;
}

