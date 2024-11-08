import { connect } from "@/app/db/connection";
import { NextRequest, NextResponse } from "next/server";
import ProblemModel from "@/app/models/problem";

connect();

export async function GET(_: NextRequest, { params }: any) {
	try {
		const { id } = params;
		const problem = await ProblemModel.findOne({ id });

		if (!problem) {
			return NextResponse.json(
				{
					error: "Problem not found",
				},
				{ status: 404 }
			);
		}

		return NextResponse.json(problem, { status: 200 });
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
