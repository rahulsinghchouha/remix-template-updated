import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import prisma from "../db.server";


export const action = async ({ request }) => {
	try {
		const formData = await request.formData();
		const age = parseInt(formData.get("age")) || 0;
		const fullName = formData.get("fullName");

		const { session } = await authenticate.admin(request);
		const shop = session.shop;

		if (!session.accessToken) {
			return json({ success: false, error: `Missing access token for shop - ${session.scope}`, editing });
		} else if (!session.shop) {
			return json({ success: false, error: 'Missing shop', editing });
		}

		await prisma.UserTrack.upsert({
			where: { storeName: shop },
			update: {
				fullName,
				age,
			},
			create: {
				storeName: shop,
				fullName,
				age,
			},
		});
		return json({ success: true, userAdd: true, msg: "User has been added" });
	} catch (error) {
		console.error(error);
		return json({ success: false, error: error.message, editing });
	}
};

export const loader = () => {
	return json({ success: false, message: "GET method not supported" });
};
