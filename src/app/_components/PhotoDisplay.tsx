'use client';
import { useFormContext } from '~/lib/context/FormContext';
import Photo from './Photo';
export default function PhotoDisplay() {
  const { listingPhotos } = useFormContext();
  return (
    <div className="relative mt-2 grid grid-cols-2 gap-2 rounded-md bg-neutral-900/50 p-1 lg:grid-cols-3 xl:mt-8 xl:p-4 2xl:grid-cols-4">
      {listingPhotos &&
        listingPhotos.map((listingPhoto, i) => <Photo key={i} listingPhoto={listingPhoto} i={i} />)}
    </div>
  );
}
