import { connect } from "@/app/db/connection";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
	try {
		const response = NextResponse.json({
			message: "Logout successful",
		});

		response.cookies.set("token", "", {
			httpOnly: true,
			expires: new Date(0),
		});

		return response;
	} catch (error: any) {
		return NextResponse.json(
			{
				error: error.message,
			},
			{ status: 500 }
		);
	}
}
