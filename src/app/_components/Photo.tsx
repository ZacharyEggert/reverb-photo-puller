'use client';
import { useFormContext } from '~/lib/context/FormContext';
import { downloadImage } from '~/lib/helpers';
import { CloudinaryPhoto } from '~/lib/types';
export default function Photo(props: {
  listingPhoto: CloudinaryPhoto;
  i: number;
}) {
  const { listingPhoto, i } = props;

  const { reverbNumber } = useFormContext();

  return (
    <div key={listingPhoto.id} className="relative aspect-square">
      <div className="grid h-full w-full items-center overflow-clip bg-neutral-700">
        <img
          src={listingPhoto.preview_url}
          className="mx-auto my-auto block max-h-full max-w-full"
          onClick={() => {
            //download the image
            downloadImage(listingPhoto.preview_url, reverbNumber, i);
          }}
        />
      </div>
    </div>
  );
}
