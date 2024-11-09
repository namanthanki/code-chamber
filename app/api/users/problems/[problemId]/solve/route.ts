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

		const hasSolved = user.solvedProblems?.includes(problemId);

		if (!hasSolved) {
			await UserModel.findOneAndUpdate(
				{ _id: userId },
				{ $push: { solvedProblems: problemId } }
			);
		}

		return NextResponse.json(
			{
				message: "Problem solved",
			},
			{ status: 200 }
		);
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
