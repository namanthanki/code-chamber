import { connect } from "@/app/db/connection";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/app/models/user";
import { getDataFromToken } from "@/app/helpers/extractToken";

connect();

export async function POST(
	request: NextRequest,
	{ params }: { params: { problemId: string } }
) {
	try {
		const userId = await getDataFromToken(request);
		const problemId = params.problemId;

		const user = await UserModel.findById(userId);
		if (!user) {
			return NextResponse.json(
				{
					error: "User not found",
				},
				{ status: 404 }
			);
		}

		const hasStarred = user.starredProblems?.includes(problemId);

		if (hasStarred) {
			await UserModel.findOneAndUpdate(
				{ _id: userId },
				{ $pull: { starredProblems: problemId } }
			);

			return NextResponse.json(
				{
					message: "Problem unstarred",
				},
				{ status: 200 }
			);
		} else {
			await UserModel.findOneAndUpdate(
				{ _id: userId },
				{ $push: { starredProblems: problemId } }
			);

			return NextResponse.json(
				{
					message: "Problem starred",
				},
				{ status: 200 }
			);
		}
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
