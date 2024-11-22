import { connect } from "@/app/db/connection";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/app/models/user";
import { getDataFromToken } from "@/app/helpers/extractToken";
import ProblemModel from "@/app/models/problem";

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

		const problems = await ProblemModel.find({
			id: { $in: user.likedProblems },
		});

		return NextResponse.json(
			{
				problems,
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
