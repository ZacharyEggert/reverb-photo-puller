'use client';

import Image from 'next/image';

import { useFormContext } from '~/lib/context/FormContext';
import { downloadImage } from '~/lib/helpers';
import type { CloudinaryPhoto } from '~/lib/types';

export default function Photo({ listingPhoto, i }: { listingPhoto: CloudinaryPhoto; i: number }) {
  const { reverbNumber } = useFormContext();

  return (
    <div
      className="photo-tile aspect-[5/7] rounded"
      onClick={() => downloadImage(listingPhoto.preview_url, reverbNumber, i)}
    >
      <Image
        alt=""
        src={listingPhoto.preview_url}
        width={1080}
        height={(1080 / 5) * 7}
        className="h-full w-full object-cover"
      />
      <div className="photo-shimmer" />
      <div className="photo-dl-icon">
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
      </div>
    </div>
  );
}
