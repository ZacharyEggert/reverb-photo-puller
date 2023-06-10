import type { CloudinaryPhoto } from "../..";
import JSZip from "jszip";
import type { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
  const { reverbNumber } = req.body;

  const response = await fetch(
    `https://reverb.com/api/listings/${reverbNumber}`
  );
  const data = await response.json();
  const photosObjects = data["cloudinary_photos"] as CloudinaryPhoto[];

  const photos = photosObjects.map((photo) => photo.preview_url);

  const zip = new JSZip();
  const folder = zip.folder(reverbNumber);

  const promises = photos.map(async (photo) => {
    const response = await fetch(photo);
    const buffer = await response.arrayBuffer();
    const filename = photo.split("/").pop() as string;
    folder?.file(filename, buffer);
  });

  await Promise.all(promises);

  const content = await zip.generateAsync({ type: "nodebuffer" });
  res.setHeader("Content-Type", "application/zip");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${reverbNumber}.zip`
  );
  res.status(200).send(content);
};

export default handler;
