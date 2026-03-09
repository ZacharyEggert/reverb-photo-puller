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
    <tr key={listing.id} className="my-0.5 gap-1">
      <td className="flex h-16 w-full items-center justify-center overflow-hidden">
        {listing.photos && listing.photos.length > 0 ? (
          <img
            src={listing.photos[0]!._links.thumbnail.href}
            alt={listing.title}
            className="aspect-square max-w-9/12 rounded-sm"
          />
        ) : (
          <svg
            className="aspect-square max-w-9/12 rounded-sm"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        )}
      </td>
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
