'use client';

import { useFormContext } from '~/lib/context/FormContext';

export default function LoadingSpinner() {
  const { fetching } = useFormContext();

  return (
    <div
      className={`bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/60 ${fetching ? '' : 'hidden'}`}
    >
      <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-b-4 border-white"></div>
    </div>
  );
}
