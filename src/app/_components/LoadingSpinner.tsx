'use client';

import { useFormContext } from '~/lib/context/FormContext';

export default function LoadingSpinner() {
  const { fetching } = useFormContext();

  if (!fetching) return null;

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
