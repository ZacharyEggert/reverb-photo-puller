'use client';

import { useFormContext } from '~/lib/context/FormContext';
import { Listing } from '~/lib/types';

export default function ListingRow(props: {
  listing: Listing;
  oneClickFetch: (id: string) => void;
}) {
  const { listing, oneClickFetch } = props;

  const { setReverbNumber } = useFormContext();

  return (
    <tr key={listing.id} className="gap-1">
      <td
        onClick={(e) => {
          if (e.shiftKey) {
            window.open(`https://api.reverb.com/api/listings/${listing.id}`);
          } else if (e.ctrlKey) {
            window.open(`https://reverb.com/item/${listing.id}`);
            // handle?.blur();
            setTimeout(window.focus, 2);
          } else if (e.altKey) {
            oneClickFetch(listing.id);
          } else {
            setReverbNumber(listing.id);
          }
        }}
        className="cursor-pointer rounded-md hover:bg-neutral-700"
      >
        {listing.id}
      </td>
      <td
        onClick={() => {
          navigator.clipboard.writeText(
            listing.title.replace(/(\/|\||:)+\s?/g, ' '),
          );
        }}
        className="cursor-pointer rounded-md hover:bg-neutral-700"
      >
        {listing.title}
      </td>
      <td className="text-xs">
        {new Date(listing.published_at).toLocaleDateString()}
      </td>
    </tr>
  );
}
