'use client';
import ListingRow from './Listing';
import { useFormContext } from '~/lib/context/FormContext';
import { fetchReverbPhotos } from '~/lib/helpers';

export default function List() {
  const { listingList, setReverbNumber, setFetching, setListings } =
    useFormContext();

  const oneClickFetch = (reverbNumber: string) => {
    setReverbNumber(reverbNumber);
    fetchReverbPhotos(setFetching, setListings, reverbNumber);
  };

  return (
    <section className="fixed right-0 col-span-3 h-full w-1/3 px-0.5 py-2 lg:px-2 lg:py-4">
      <div className="h-full w-full overflow-y-scroll">
        <table className="w-full">
          <thead className="rounded-t-md bg-neutral-900">
            <tr className="gap-1 rounded-t-md">
              <th className="w-1/6 rounded-tl-md py-2">PHOTO</th>
              <th className="w-1/6 py-2">ID</th>
              <th className="w-3/6 py-2">TITLE</th>
              <th className="w-1/6 rounded-tr-md py-2">DATE</th>
            </tr>
          </thead>
          <tbody className="bg-neutral-900/50">
            {listingList &&
              listingList.map((listing) => (
                <ListingRow
                  key={listing.id}
                  listing={listing}
                  oneClickFetch={oneClickFetch}
                />
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
