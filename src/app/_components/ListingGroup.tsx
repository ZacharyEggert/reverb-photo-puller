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
    <section className="fixed right-0 col-span-3 h-full w-1/3">
      <div className="h-full w-full overflow-y-scroll">
        <table className="w-full">
          <thead>
            <tr className="gap-1">
              <th className="w-1/6">PHOTO</th>
              <th className="w-1/6">ID</th>
              <th className="w-3/6">TITLE</th>
              <th className="w-1/6">DATE</th>
            </tr>
          </thead>
          <tbody>
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
