import axios from 'axios';
import { NextRequest } from 'next/server';
import { env } from '~/env/server.mjs';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const apiKey = body?.apiKey || env.REVERB_API_KEY;

  try {
    const baseURL = 'https://api.reverb.com/api/my/listings?per_page=100';
    let page = 1;
    let listings: unknown[] = [];
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
      listings = [...listings, ...data.listings];
      shouldContinue = data._links.next ? true : false;
      page++;
    }

    // console.dir(listings[0]);

    // listings.reverse();
    return new Response(JSON.stringify({ listings }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}
