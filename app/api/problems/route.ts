import { connect } from "@/app/db/connection";
import { NextRequest, NextResponse } from "next/server";
import ProblemModel from "@/app/models/problem";

connect();

export async function GET(request: NextRequest) {
	try {
		const searchParams = request.nextUrl.searchParams;
		const difficulty = searchParams.get("difficulty");
		const category = searchParams.get("category");
		const page = parseInt(searchParams.get("page") || "1", 10);
		const limit = parseInt(searchParams.get("limit") || "10", 10);

		const filters = {} as any;
		if (difficulty) {
			filters.difficulty = difficulty;
		}
		if (category) {
			filters.category = category;
		}

		const problems = await ProblemModel.find(filters)
			.sort({ order: 1 })
			.skip((page - 1) * limit)
			.limit(limit);

		const totalProblems = await ProblemModel.countDocuments(filters);

		return NextResponse.json({
			message: "Problems found",
			problems,
			totalProblems,
			currentPage: page,
			totalPages: Math.ceil(totalProblems / limit),
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

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		body.id = body.title.toLowerCase().replace(/ /g, "-");
		const problem = new ProblemModel(body);
		await problem.save();

		return NextResponse.json(problem, { status: 201 });
	} catch (error: any) {
		return NextResponse.json(
			{
				error: error.message,
			},
			{ status: 500 }
		);
	}
}
