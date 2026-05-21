'use client';

import Image from 'next/image';

import { useFormContext } from '~/lib/context/FormContext';
import type { Listing } from '~/lib/types';

export default function ListingRow({
  listing,
  oneClickFetch,
}: {
  listing: Listing;
  oneClickFetch: (id: string) => void;
}) {
  const { setReverbNumber } = useFormContext();

  return (
    <tr className="listing-row">
      <td className="w-14 px-3 py-2">
        <div className="h-9 w-9 overflow-hidden rounded bg-raised">
          {listing.photos && listing.photos.length > 0 ? (
            <Image
              src={listing.photos[0]!._links.thumbnail.href}
              alt={listing.title}
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-faint"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
            </div>
          )}
        </div>
      </td>
      <td
        className="cursor-pointer px-2 py-2 font-mono text-[11px] text-muted transition-colors hover:text-amber"
        onClick={(e) => {
          const shift = e.getModifierState('Shift');
          const alt = e.getModifierState('Alt');
          const meta = e.getModifierState('Meta');

          if (shift) {
            window.open(`https://api.reverb.com/api/listings/${listing.id}`);
          } else if (meta) {
            window.open(`https://reverb.com/item/${listing.id}`);
            setTimeout(window.focus, 2);
          } else if (alt) {
            oneClickFetch(listing.id);
          } else {
            setReverbNumber(listing.id);
          }
        }}
      >
        {listing.id}
      </td>
      <td
        className="max-w-0 cursor-pointer px-2 py-2 text-[11px] text-ink transition-colors hover:text-amber"
        onClick={async () => {
          await navigator.clipboard.writeText(listing.title);
        }}
      >
        <p className="truncate">{listing.title}</p>
      </td>
      <td className="whitespace-nowrap px-3 py-2 text-right font-mono text-[10px] text-faint">
        {new Date(listing.published_at).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: '2-digit',
        })}
      </td>
    </tr>
  );
}
