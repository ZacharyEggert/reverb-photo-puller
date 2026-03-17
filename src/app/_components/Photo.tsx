'use client';
import Image from 'next/image';

import { useFormContext } from '~/lib/context/FormContext';
import { downloadImage } from '~/lib/helpers';
import { CloudinaryPhoto } from '~/lib/types';
export default function Photo(props: { listingPhoto: CloudinaryPhoto; i: number }) {
  const { listingPhoto, i } = props;

  const { reverbNumber } = useFormContext();

  return (
    <div
      key={listingPhoto.id}
      className="relative grid aspect-5/7 items-center overflow-hidden rounded-md bg-black/50"
    >
      <Image
        alt=""
        src={listingPhoto.preview_url}
        className="absolute inset-0 top-auto bottom-auto object-cover"
        onClick={() => {
          //download the image
          downloadImage(listingPhoto.preview_url, reverbNumber, i);
        }}
      />
    </div>
  );
}
