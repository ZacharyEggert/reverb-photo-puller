import Reverb from 'sound-tank';
import type { NextRequest } from 'next/server';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
	const reverb = new Reverb({ apiKey: process.env.REVERB_API_KEY || 'sample_key' });

	const response = await reverb.listings.getOne({id});

	const data = response.data as unknown as { cloudinary_photos: string[] };

  return new Response(JSON.stringify(data['cloudinary_photos']), {
    status: 200,
  });
}
