import { connect } from "@/app/db/connection";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/app/models/user";
import { getDataFromToken } from "@/app/helpers/extractToken";

connect();

export async function GET(request: NextRequest) {
	try {
		const userId = await getDataFromToken(request);
		const user = await UserModel.findById(userId).select("-password");

		if (!user) {
			return NextResponse.json(
				{
					error: "User not found",
				},
				{ status: 404 }
			);
		}

		return NextResponse.json({
			message: "User found",
			user,
		});
	} catch (error: any) {
		return NextResponse.json(
			{
				error: error.message,
			},
			{ status: 500 }
		);
	}
}
