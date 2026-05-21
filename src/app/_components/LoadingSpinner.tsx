'use client';

import { useFormContext } from '~/lib/context/FormContext';

export default function LoadingSpinner() {
  const { fetching, listingList } = useFormContext();

  if (!fetching) return null;

  if (listingList.length > 0) {
    return (
      <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded border border-fence bg-raised px-3 py-2 shadow-lg">
        <div className="relative h-4 w-4 shrink-0">
          <div className="absolute inset-0 rounded-full border border-fence" />
          <div className="spin absolute inset-0 rounded-full border-t border-amber" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
          Syncing
        </span>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm" style={{ backgroundColor: 'rgba(9,9,12,0.78)' }}>
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-9 w-9">
          <div className="absolute inset-0 rounded-full border border-fence" />
          <div className="spin absolute inset-0 rounded-full border-t border-amber" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
          Fetching
        </span>
      </div>
    </div>
  );
}
