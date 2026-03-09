'use client';

import { JSX } from 'react';
import { useFormContext } from '~/lib/context/FormContext';
import {
  downloadAllPhotos,
  fetchListingList,
  fetchReverbPhotos,
} from '~/lib/helpers';

export default function Interactables() {
  const {
    reverbNumber,
    setReverbNumber,
    fetching,
    listingPhotos,
    setFetching,
    setListingList,
    setListings,
  } = useFormContext();

  return (
    <section className="my-4 grid items-center xl:grid-cols-2">
      <input
        value={reverbNumber}
        onChange={(e) => setReverbNumber(e.target.value)}
        className="mx-auto my-2 bg-neutral-700 px-2 py-1 text-center uppercase xl:w-1/2 xl:py-2 xl:text-lg"
      />
      <CustomButton
        onClick={() => downloadAllPhotos(listingPhotos, reverbNumber)}
        disabled={fetching}
      >
        DOWNLOAD ALL PHOTOS
      </CustomButton>
      <CustomButton
        onClick={() =>
          fetchReverbPhotos(setFetching, setListings, reverbNumber)
        }
        disabled={fetching}
      >
        FETCH
      </CustomButton>
      <CustomButton
        onClick={() => fetchListingList(setFetching, setListingList)}
        disabled={fetching}
      >
        FETCH LISTING LIST
      </CustomButton>
    </section>
  );
}

const CustomButton = (props: JSX.IntrinsicElements['button']) => {
  const { children, className, ...rest } = props;

  return (
    <button
      {...rest}
      className={`mx-auto my-2 min-w-36 bg-neutral-700 px-2 py-1 text-center xl:w-1/2 xl:py-2 xl:text-lg ${className}`}
    >
      {children}
    </button>
  );
};
