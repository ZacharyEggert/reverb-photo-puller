'use client';
import { useFormContext } from '~/lib/context/FormContext';
import Photo from './Photo';
export default function PhotoDisplay() {
  const { listingPhotos } = useFormContext();
  return (
    <div className="relative mt-8 grid grid-cols-5 gap-2 bg-neutral-800">
      {listingPhotos &&
        listingPhotos.map((listingPhoto, i) => (
          <Photo key={i} listingPhoto={listingPhoto} i={i} />
        ))}
    </div>
  );
}
