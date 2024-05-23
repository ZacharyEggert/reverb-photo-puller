import type { NextApiHandler } from "next"

const handler: NextApiHandler = async (req, res) => {
	const {
		query: { id },
	} = req

	const fetchRequest : Request = new Request(`https://api.reverb.com/api/listings/${id}`, {headers: {
		"Content-Type": "application/hal+json",
		"Accept": "application/hal+json",
		"Accept-Version": "3.0",
	}});

	const response = await fetch(fetchRequest)
	const data = await response.json()

	res.status(200).json(data['cloudinary_photos'])
}

export default handler
