import axios from 'axios';
import { NextRequest } from 'next/server';

import { env } from '~/env/server.mjs';
import type { Listing } from '~/lib/types';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const apiKey = body?.apiKey || env.REVERB_API_KEY;

  try {
    const baseURL = 'https://api.reverb.com/api/my/listings?per_page=100';
    let page = 1;
    let listings: Listing[] = [];
    let shouldContinue = true;

    while (shouldContinue) {
      const response = await axios.get(`${baseURL}&page=${page}`, {
        headers: {
          'Accept-Version': '3.0',
          'Content-Type': 'application/hal+json',
          Authorization: `Bearer ${apiKey}`,
          Accept: 'application/hal+json',
        },
      });

      const { data } = response;
      listings = [...listings, ...data.listings] as Listing[];
      shouldContinue = data._links.next ? true : false;
      page++;
    }

    // console.dir(listings[0]);

    // listings.reverse();

    //pull out the relevant data from the listings
    const filtered_listings = listings.map((listing) => {
      return {
        id: listing.id,
        title: listing.title,
        published_at: listing.published_at,
        photos: listing.photos,
      };
    });
    return new Response(JSON.stringify({ listings: filtered_listings }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}
