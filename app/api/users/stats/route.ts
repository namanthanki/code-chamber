import { connect } from "@/app/db/connection";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/app/models/user";
import { getDataFromToken } from "@/app/helpers/extractToken";

connect();

export async function GET(_: NextRequest, __: NextResponse) {
	try {
		const userId = await getDataFromToken(_);

		const user = await UserModel.findById(userId);

		if (!user) {
			return NextResponse.json(
				{
					error: "User not found",
				},
				{ status: 404 }
			);
		}

		const stats = {
			likedProblems: user.likedProblems?.length || 0,
			dislikedProblems: user.dislikedProblems?.length || 0,
			solvedProblems: user.solvedProblems?.length || 0,
			starredProblems: user.starredProblems?.length || 0,
		};

		return NextResponse.json(
			{
				stats,
			},
			{ status: 200 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{
				error: error.message,
			},
			{ status: 500 }
		);
	}
}
