import type { NextApiHandler } from "next";
import axios from "axios";
import { env } from "../../../env/server.mjs";

const handler: NextApiHandler = async (req, res) => {
  const apiKey = req.body?.apiKey || env.REVERB_API_KEY;

  try {
    const baseURL = "https://api.reverb.com/api/my/listings?per_page=100";
    let page = 1;
    let listings: unknown[] = [];
    let shouldContinue = true;

    while (shouldContinue) {
      const response = await axios.get(`${baseURL}&page=${page}`, {
        headers: {
          "Accept-Version": "3.0",
          "Content-Type": "application/hal+json",
          Authorization: `Bearer ${apiKey}`,
          Accept: "application/hal+json",
        },
      });

      const { data } = response;
      listings = [...listings, ...data.listings];
      shouldContinue = data._links.next ? true : false;
      page++;
    }

    listings.reverse();
    res.status(200).json({ listings });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default handler;
