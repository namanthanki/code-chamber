import { connect } from "@/app/db/connection";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/app/models/user";
import ProblemModel from "@/app/models/problem";
import { getDataFromToken } from "@/app/helpers/extractToken";

connect();

export async function POST(
	request: NextRequest,
	{ params }: { params: { problemId: string } }
) {
	try {
		const userId = await getDataFromToken(request);
		const problemId = params.problemId;

		const problem = await ProblemModel.findOne({
			id: problemId,
		});
		if (!problem) {
			return NextResponse.json(
				{
					error: "Problem not found",
				},
				{ status: 404 }
			);
		}

		const user = await UserModel.findById(userId);
		if (!user) {
			return NextResponse.json(
				{
					error: "User not found",
				},
				{ status: 404 }
			);
		}

		const hasDisliked = user.dislikedProblems?.includes(problemId);

		if (hasDisliked) {
			await UserModel.findOneAndUpdate(
				{ _id: userId },
				{ $pull: { dislikedProblems: problemId } }
			);

			await ProblemModel.findOneAndUpdate(
				{ id: problemId },
				{ $inc: { dislikes: -1 } }
			);

			return NextResponse.json(
				{
					message: "Problem undisliked",
				},
				{
					status: 200,
				}
			);
		}

		if (user.likedProblems?.includes(problemId)) {
			await UserModel.findOneAndUpdate(
				{ _id: userId },
				{ $pull: { likedProblems: problemId } }
			);

			await ProblemModel.findOneAndUpdate(
				{ id: problemId },
				{ $inc: { likes: -1 } }
			);
		}

		await UserModel.findOneAndUpdate(
			{ _id: userId },
			{ $push: { dislikedProblems: problemId } }
		);

		await ProblemModel.findOneAndUpdate(
			{ id: problemId },
			{ $inc: { dislikes: 1 } }
		);

		return NextResponse.json(
			{
				message: "Problem disliked",
			},
			{
				status: 200,
			}
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
