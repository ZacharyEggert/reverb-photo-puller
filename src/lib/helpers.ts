import axios from 'axios';

import type { CloudinaryPhoto } from '~/lib/types';
export const downloadImage = (url: string, reverbNumber: string, imageNumber = 0) => {
  const i = imageNumber < 10 ? `0${imageNumber}` : imageNumber;

  fetch(url, {
    method: 'GET',
    headers: {},
  })
    .then((response) => {
      // oxlint-disable-next-line typescript/no-floating-promises
      response.arrayBuffer().then(function (buffer) {
        const url = window.URL.createObjectURL(new Blob([buffer]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${reverbNumber}-${i}.jpg`); //or any other extension
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchReverbPhotos = async (
  setFetching: (fetching: boolean) => void,
  setListings: (listings: any) => void,
  id?: string,
) => {
  setFetching(true);
  console.log('fetching photos');

  return axios
    .get(`/api/reverbid/${id}`)
    .then((res) => {
      console.log(res.data);
      setListings(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setFetching(false);
    });
};

export const fetchListingList = (
  setFetching: (fetching: boolean) => void,
  setListingList: (listings: any) => void,
) => {
  setFetching(true);
  console.log('fetching listing list');

  //get the apiKey from local storage
  const apiKey = localStorage.getItem('apiKey');
  //if it doesn't exist, prompt the user for it
  if (!apiKey) {
    const apiKey_ = prompt(
      'Enter your reverb api key (read priviledges) or default to Diablo Guitars',
    );
    if (apiKey_) {
      // if the user entered a key, save it to local storage
      localStorage.setItem('apiKey', apiKey_);
    }
  }

  axios
    .post('/api/listings', { apiKey: undefined })
    .then((res) => {
      if (res.status !== 200) {
        console.log(res);
        throw new Error('failed to fetch listing list');
      }
      console.log(res.data);
      setListingList(res.data.listings);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setFetching(false);
    });
};

export const downloadAllPhotos = (listingPhotos: CloudinaryPhoto[], reverbNumber: string) => {
  if (!listingPhotos) return;
  if (listingPhotos.length === 0) return;

  for (let i = 0; i < listingPhotos.length; i++) {
    if (!listingPhotos[i]) continue;
    if (!listingPhotos[i]?.preview_url) continue;
    const url = listingPhotos[i]?.preview_url;
    if (!url) continue;
    downloadImage(url, reverbNumber, i);
  }
};
