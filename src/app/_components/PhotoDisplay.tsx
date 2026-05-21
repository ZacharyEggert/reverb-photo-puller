'use client';

import { useFormContext } from '~/lib/context/FormContext';

import Photo from './Photo';

export default function PhotoDisplay() {
  const { listingPhotos } = useFormContext();

  return (
    <section className="flex-1 p-6">
      <div className="mb-4 flex items-center gap-2">
        <span className="font-mono text-[10px] tracking-[0.3em] text-muted uppercase">Photos</span>
        {listingPhotos.length > 0 && (
          <span className="font-mono text-[10px] text-faint">— {listingPhotos.length}</span>
        )}
      </div>

      {listingPhotos.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center gap-3 rounded border border-dashed border-border">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-faint"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
          <p className="font-mono text-[11px] text-faint">Enter a listing ID and fetch photos</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3 2xl:grid-cols-4">
          {listingPhotos.map((listingPhoto, i) => (
            <Photo key={listingPhoto.id} listingPhoto={listingPhoto} i={i} />
          ))}
        </div>
      )}
    </section>
  );
}
