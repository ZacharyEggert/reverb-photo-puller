import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;

  const fetchRequest: Request = new Request(`https://api.reverb.com/api/listings/${id}`, {
    headers: {
      'Content-Type': 'application/hal+json',
      Accept: 'application/hal+json',
      'Accept-Version': '3.0',
    },
  });

  const response = await fetch(fetchRequest);
  const data = await response.json();

  return new Response(JSON.stringify(data['cloudinary_photos']), {
    status: 200,
  });
}
