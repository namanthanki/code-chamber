import { connect } from "@/app/db/connection";
import { NextRequest, NextResponse } from "next/server";
import ProblemModel from "@/app/models/problem";

connect();

export async function GET(request: NextRequest) {
	try {
		const problems = await ProblemModel.find().sort({ order: 1 });

		return NextResponse.json({
			message: "Problems found",
			problems,
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
