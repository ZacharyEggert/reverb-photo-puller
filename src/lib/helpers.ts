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

export const fetchListingList = async (
  setFetching: (fetching: boolean) => void,
  setListingList: (listings: any) => void,
  allListings = false,
) => {
  setFetching(true);

  let apiKey = localStorage.getItem('apiKey');
  if (!apiKey) {
    const entered = prompt(
      'Enter your reverb api key (read priviledges) or default to Diablo Guitars',
    );
    if (entered) {
      localStorage.setItem('apiKey', entered);
      apiKey = entered;
    }
  }

  try {
    const response = await fetch('/api/listings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey, state: allListings ? 'all' : undefined }),
    });

    if (!response.ok) throw new Error('failed to fetch listing list');
    if (!response.body) throw new Error('no response body');

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    const accumulated: any[] = [];
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';
      for (const line of lines) {
        if (!line.trim()) continue;
        accumulated.push(JSON.parse(line));
        setListingList([...accumulated]);
      }
    }
    if (buffer.trim()) {
      accumulated.push(JSON.parse(buffer));
      setListingList([...accumulated]);
    }
  } catch (err) {
    console.log(err);
  } finally {
    setFetching(false);
  }
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
