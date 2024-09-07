import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
	try {
		const token = request.cookies.get("token")?.value || "";

		if (!token) {
			throw new Error("Token not found");
		}

		const tokenSecret = process.env.TOKEN_SECRET;
		if (!tokenSecret) {
			throw new Error("Token secret not found");
		}

		const data = jwt.verify(token, tokenSecret);

		if (typeof data !== "object") {
			throw new Error("Invalid token data");
		}

		return data.id;
	} catch (error: any) {
		console.error(error.message);
		throw new Error(error.message);
	}
};
