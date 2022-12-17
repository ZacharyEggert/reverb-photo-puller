import type { NextApiHandler } from "next"

const handler: NextApiHandler = async (req, res) => {
	const {
		query: { id },
	} = req

	const response = await fetch(`https://reverb.com/api/listings/${id}`)
	const data = await response.json()

	res.status(200).json(data['cloudinary_photos'])
}

export default handler