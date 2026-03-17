'use client';

import { createContext, useContext, useState } from 'react';

import type { CloudinaryPhoto, Listing } from '~/lib/types';

interface FormContextType {
  reverbNumber: string;
  setReverbNumber: (value: string) => void;
  fetching: boolean;
  setFetching: (value: boolean) => void;
  listingList: Listing[];
  setListingList: (value: Listing[]) => void;
  listingPhotos: CloudinaryPhoto[];
  setListings: (value: CloudinaryPhoto[]) => void;
  drawerOpen: boolean;
  setDrawerOpen: (value: boolean) => void;
}

const FormContext = createContext<FormContextType>({
  reverbNumber: '',
  setReverbNumber: () => {},
  fetching: false,
  setFetching: () => {},
  listingList: [],
  setListingList: () => {},
  listingPhotos: [],
  setListings: () => {},
  drawerOpen: false,
  setDrawerOpen: () => {},
});

export const useFormContext = () => useContext(FormContext);

export default FormContext;

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reverbNumber, setReverbNumber] = useState('');
  const [fetching, setFetching] = useState(false);
  const [listingList, setListingList] = useState<Listing[]>([]);
  const [listingPhotos, setListings] = useState<CloudinaryPhoto[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <FormContext.Provider
      value={{
        reverbNumber,
        setReverbNumber,
        fetching,
        setFetching,
        listingList,
        setListingList,
        listingPhotos,
        setListings,
        drawerOpen,
        setDrawerOpen,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
