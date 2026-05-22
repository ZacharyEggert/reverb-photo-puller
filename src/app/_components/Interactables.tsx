'use client';

import type { JSX } from 'react';
import { useState } from 'react';

import { useFormContext } from '~/lib/context/FormContext';
import { downloadAllPhotos, fetchListingList, fetchReverbPhotos } from '~/lib/helpers';

export default function Interactables() {
  const {
    reverbNumber,
    setReverbNumber,
    fetching,
    listingPhotos,
    setFetching,
    setListingList,
    setListings,
    setDrawerOpen,
    drawerOpen,
  } = useFormContext();
  const [query, setQuery] = useState('');

  return (
    <section className="shrink-0 border-b border-border px-6 py-5">
      <button
        className="mb-4 flex items-center gap-2 text-muted transition-colors hover:text-ink xl:hidden"
        onClick={() => setDrawerOpen(true)}
        hidden={fetching || drawerOpen}
        aria-label="Open listings panel"
      >
        <svg width="16" height="13" viewBox="0 0 16 13" fill="currentColor">
          <rect x="0" y="0" width="16" height="2" rx="1" />
          <rect x="0" y="5.5" width="11" height="2" rx="1" />
          <rect x="0" y="11" width="13" height="2" rx="1" />
        </svg>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">Listings</span>
      </button>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-wrap items-end gap-4">
          <div className="min-w-0 basis-52">
            <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
              Listing ID
            </label>
            <input
              value={reverbNumber}
              onChange={(e) => setReverbNumber(e.target.value)}
              placeholder="e.g. 12345678"
              className="w-full rounded border border-border bg-raised px-3 py-2 font-mono text-sm text-ink placeholder-faint transition-colors focus:border-fence focus:outline-none"
            />
          </div>
          <ActionButton
            onClick={() => fetchReverbPhotos(setFetching, setListings, reverbNumber)}
            disabled={fetching}
            variant="primary"
          >
            Fetch
          </ActionButton>
          <ActionButton
            onClick={() => downloadAllPhotos(listingPhotos, reverbNumber)}
            disabled={fetching || listingPhotos.length === 0}
            variant="secondary"
          >
            Download All
          </ActionButton>
        </div>

        <div className="flex flex-wrap items-end gap-2">
          <div className="min-w-0 basis-44">
            <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
              Search
            </label>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search all listings…"
              className="w-full rounded border border-border bg-raised px-3 py-2 font-mono text-sm text-ink placeholder-faint transition-colors focus:border-fence focus:outline-none"
            />
          </div>
          <ActionButton
            onClick={() => fetchListingList(setFetching, setListingList, query)}
            disabled={fetching}
            variant="ghost"
          >
            Sync Listings
          </ActionButton>
        </div>
      </div>
    </section>
  );
}

type Variant = 'primary' | 'secondary' | 'ghost';

const variantStyles: Record<Variant, string> = {
  primary: 'bg-amber text-bg font-semibold hover:bg-gold disabled:opacity-40',
  secondary:
    'border border-amber text-amber hover:bg-amber hover:text-bg disabled:opacity-30',
  ghost:
    'border border-border text-muted hover:border-fence hover:text-ink disabled:opacity-30',
};

function ActionButton({
  children,
  variant = 'ghost',
  className,
  ...rest
}: JSX.IntrinsicElements['button'] & { variant?: Variant }) {
  return (
    <button
      {...rest}
      className={`rounded px-4 py-2 font-mono text-[11px] uppercase tracking-widest transition-all disabled:cursor-not-allowed ${variantStyles[variant]} ${className ?? ''}`}
    >
      {children}
    </button>
  );
}
