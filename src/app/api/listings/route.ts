import type { NextRequest } from 'next/server';
import Reverb from 'sound-tank';

import { env } from '~/env/server.mjs';

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const apiKey = body?.apiKey || env.REVERB_API_KEY;
  const reverb = new Reverb({ apiKey });

  const encoder = new TextEncoder();

  const query: string | undefined = body?.query || undefined;
  const options = query ? { query, state: 'all' } : undefined;

  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const listing of reverb.listings.streamAllMy(options as any)) {
          const filtered = {
            id: listing.id,
            title: listing.title,
            published_at: listing.published_at,
            photos: listing.photos,
          };
          controller.enqueue(encoder.encode(JSON.stringify(filtered) + '\n'));
        }
        controller.close();
      } catch (error) {
        console.dir(error, { depth: 3 });
        controller.error(error);
      }
    },
  });

  return new Response(stream, {
    status: 200,
    headers: { 'Content-Type': 'application/x-ndjson' },
  });
}
