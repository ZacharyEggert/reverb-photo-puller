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
    setDrawerOpen,
    drawerOpen,
  } = useFormContext();

  return (
    <section className="relative grid items-center py-2 xl:grid-cols-2">
      <span
        className="absolute top-1 left-1.5 cursor-pointer text-4xl text-neutral-400 hover:text-neutral-200 xl:hidden"
        onClick={() => setDrawerOpen(true)}
        hidden={fetching || drawerOpen}
      >
        =
      </span>
      <input
        value={reverbNumber}
        onChange={(e) => setReverbNumber(e.target.value)}
        className="mx-auto my-1 rounded-md bg-neutral-800 px-2 py-1 text-center uppercase xl:my-2 xl:w-1/2 xl:py-2 xl:text-lg"
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
      className={`mx-auto my-1 min-w-36 rounded-md bg-neutral-800 px-2 py-1 text-center xl:my-2 xl:w-1/2 xl:py-2 xl:text-lg ${className}`}
    >
      {children}
    </button>
  );
};
