'use client';
import { useFormContext } from '~/lib/context/FormContext';
import { fetchReverbPhotos } from '~/lib/helpers';

import ListingRow from './Listing';

export default function List() {
  const { listingList, setReverbNumber, setFetching, setListings, setDrawerOpen, drawerOpen } =
    useFormContext();

  const oneClickFetch = (reverbNumber: string) => {
    setReverbNumber(reverbNumber);
    fetchReverbPhotos(setFetching, setListings, reverbNumber);
  };

  return (
    <>
      <section className="right-0 col-span-9 hidden h-full w-full px-0.5 py-2 xl:fixed xl:col-span-3 xl:block xl:w-1/3 xl:px-2 xl:py-4">
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
                  <ListingRow key={listing.id} listing={listing} oneClickFetch={oneClickFetch} />
                ))}
            </tbody>
          </table>
        </div>
      </section>
      {drawerOpen && (
        <div className="absolute inset-0 z-10 h-full w-full bg-neutral-800/60">
          <span
            onClick={() => setDrawerOpen(false)}
            className="absolute top-1.5 left-4 cursor-pointer text-4xl text-neutral-400 hover:text-neutral-200"
          >
            x
          </span>
          <section className="mt-16 h-full w-full px-0.5 py-2 xl:hidden">
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
        </div>
      )}
    </>
  );
}
