import type { NextRequest } from 'next/server';

import { env } from '~/env/server.mjs';
import Reverb from 'sound-tank'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const apiKey = body?.apiKey || env.REVERB_API_KEY;
	const reverb = new Reverb({apiKey, });

  try {
		const {data} = await reverb.listings.getAllMy();
    //pull out the relevant data from the listings
    const filtered_listings = data.map((listing) => {
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
    console.dir(error, { depth: 3 });
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}
