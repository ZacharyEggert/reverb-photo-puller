'use client';

import Image from 'next/image';

import { useFormContext } from '~/lib/context/FormContext';
import type { Listing } from '~/lib/types';

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
          <Image
            src={listing.photos[0]!._links.thumbnail.href}
            alt={listing.title}
						width={100}
						height={100}
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
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        )}
      </td>
      <td
        onClick={(e) => {
          let shiftPressed = e.getModifierState('Shift');
          let altPressed = e.getModifierState('Alt');
          let metaPressed = e.getModifierState('Meta');

          if (shiftPressed) {
            window.open(`https://api.reverb.com/api/listings/${listing.id}`);
          } else if (metaPressed) {
            window.open(`https://reverb.com/item/${listing.id}`);
            // handle?.blur();
            setTimeout(window.focus, 2);
          } else if (altPressed) {
            oneClickFetch(listing.id);
          } else {
            setReverbNumber(listing.id);
          }
        }}
        className="cursor-pointer hover:bg-neutral-700"
      >
        {listing.id}
      </td>
      <td
        onClick={async () => {
          await navigator.clipboard.writeText(listing.title);
        }}
        className="cursor-pointer hover:bg-neutral-700"
      >
        {truncateTitle(listing.title)}
      </td>
      <td className="text-center text-xs">{new Date(listing.published_at).toLocaleDateString()}</td>
    </tr>
  );
}

const truncateTitle = (title: string, maxLength: number = 100) => {
  if (title.length <= maxLength) return title;
  return (
    <>
      {title.slice(0, maxLength - 3) + '...'}
      <span hidden> {title}</span>
    </>
  );
};
