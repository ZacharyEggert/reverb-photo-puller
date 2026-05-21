'use client';

import { useFormContext } from '~/lib/context/FormContext';
import { fetchReverbPhotos } from '~/lib/helpers';

import ListingRow from './Listing';

function ListingsPanel() {
  const { listingList, setReverbNumber, setFetching, setListings } = useFormContext();

  const oneClickFetch = async (id: string) => {
    setReverbNumber(id);
    await fetchReverbPhotos(setFetching, setListings, id);
  };

  if (listingList.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          className="text-faint"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M3 9h18M9 21V9" />
        </svg>
        <div className="flex flex-col gap-1">
          <p className="font-mono text-[11px] text-faint">No listings loaded</p>
          <p className="font-mono text-[10px] text-faint opacity-50">Sync listings to start</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <table className="w-full border-collapse">
        <thead className="sticky top-0 z-10 bg-surface">
          <tr className="border-b border-border">
            <th className="w-14 px-3 py-2.5 text-left font-mono text-[9px] uppercase tracking-widest text-faint" />
            <th className="px-2 py-2.5 text-left font-mono text-[9px] uppercase tracking-widest text-faint">
              ID
            </th>
            <th className="px-2 py-2.5 text-left font-mono text-[9px] uppercase tracking-widest text-faint">
              Title
            </th>
            <th className="px-3 py-2.5 text-right font-mono text-[9px] uppercase tracking-widest text-faint">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {listingList.map((listing) => (
            <ListingRow key={listing.id} listing={listing} oneClickFetch={oneClickFetch} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SidebarHeader({ onClose }: { onClose?: () => void }) {
  const { listingList } = useFormContext();
  return (
    <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3.5">
      <div className="flex items-center gap-2">
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted">
          Listings
        </span>
        {listingList.length > 0 && (
          <span className="font-mono text-[9px] text-faint">({listingList.length})</span>
        )}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-muted transition-colors hover:text-ink"
          aria-label="Close listings"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default function List() {
  const { drawerOpen, setDrawerOpen } = useFormContext();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed right-0 top-0 hidden h-full w-[360px] flex-col border-l border-border bg-surface xl:flex">
        <SidebarHeader />
        <ListingsPanel />
      </aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 xl:hidden">
          <div
            className="absolute inset-0 backdrop-blur-sm"
          style={{ backgroundColor: 'rgba(9,9,12,0.75)' }}
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="absolute right-0 top-0 flex h-full w-80 flex-col bg-surface shadow-2xl">
            <SidebarHeader onClose={() => setDrawerOpen(false)} />
            <ListingsPanel />
          </aside>
        </div>
      )}
    </>
  );
}
