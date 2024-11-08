import { connect } from "@/app/db/connection";
import UserModel from "@/app/models/user";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(_: NextRequest, { params }: any) {
	try {
		const { id } = params;
		const user = await UserModel.findById(id);

		if (!user) {
			return NextResponse.json(
				{
					error: "User not found",
				},
				{ status: 404 }
			);
		}

		return NextResponse.json(user, { status: 200 });
	} catch (error: any) {
		console.log("Error: ", error);
		return NextResponse.json(
			{
				error: error.message,
			},
			{ status: 500 }
		);
	}
}
