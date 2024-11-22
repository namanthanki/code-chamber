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

export async function PUT(req: NextRequest, { params }: any) {
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

		const body = await req.json();
		const updatedProblem = await ProblemModel.findOneAndUpdate(
			{ id },
			body,
			{
				new: true,
			}
		);

		return NextResponse.json(updatedProblem, { status: 200 });
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

export async function DELETE(_: NextRequest, { params }: any) {
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

		await ProblemModel.deleteOne({ id });

		return NextResponse.json(
			{
				message: "Problem deleted",
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
