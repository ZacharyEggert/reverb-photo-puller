/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

// Generated by https://quicktype.io

export interface CloudinaryPhoto {
  id: number;
  public_id: string;
  version: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  transformation: Transformation;
  path: string;
  preview_url: string;
}

export interface Transformation {
  width: string;
  height: string;
  x: string;
  y: string;
  crop: string;
  angle: number;
}

const Home: NextPage = () => {
  const [reverbNumber, setReverbNumber] = useState("");
  const [fetching, setFetching] = useState(false);

  const [listings, setListings] = useState<CloudinaryPhoto[]>([]);

  const changeReverbNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReverbNumber(e.target.value);
  };

  const fetchReverbPhotos = () => {
    setFetching(true);
    console.log("fetching photos");

    axios
      .get(`/api/reverbid/${reverbNumber}`)
      .then((res) => {
        console.log(res.data);
        setListings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Head>
        <title>Reverb Photo Puller</title>
        <meta
          name="description"
          content="Pull photos from a specified reverb listing by id"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen overflow-x-hidden bg-neutral-800 text-white">
        <div className="grid items-center">
          <input
            value={reverbNumber}
            onChange={changeReverbNumber}
            className="mx-auto my-2 bg-neutral-700 py-1 px-2"
          />
          <button
            onClick={fetchReverbPhotos}
            className=" my-2 mx-auto w-1/6 rounded-2xl border border-neutral-600 bg-neutral-700 px-2 py-1"
            disabled={fetching}
          >
            fetch
          </button>
        </div>
        <div className="relative flex flex-row flex-wrap">
          {listings.map((listing) => (
            <div key={listing.id} className="relative w-1/6 flex-none">
              <img src={listing.preview_url} />
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
