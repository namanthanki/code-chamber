import { connect } from "@/app/db/connection";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/app/models/user";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

type Token = {
	id: string;
	username: string;
	email: string;
};

export async function POST(request: NextRequest) {
	try {
		const { email, password } = await request.json();

		const userExists = await UserModel.findOne({
			email,
		});

		if (!userExists) {
			return NextResponse.json(
				{
					error: "User not found",
				},
				{ status: 400 }
			);
		}

		const isMatch = await bcryptjs.compare(password, userExists.password);

		if (!isMatch) {
			return NextResponse.json(
				{
					error: "Invalid credentials",
				},
				{ status: 400 }
			);
		}

		if (!userExists.isVerified) {
			return NextResponse.json(
				{
					error: "Email not verified",
				},
				{ status: 400 }
			);
		}

		const tokenPayload: Token = {
			id: userExists._id,
			username: userExists.name,
			email: userExists.email,
		};

		const tokenSecret = process.env.TOKEN_SECRET;

		if (!tokenSecret) {
			return NextResponse.json(
				{
					error: "Configuration error",
				},
				{ status: 500 }
			);
		}

		const token = jwt.sign(tokenPayload, tokenSecret, {
			expiresIn: "1d",
		});

		const response = NextResponse.json({
			message: "Login successful",
		});

		response.cookies.set("token", token, {
			httpOnly: true,
		});

		return response;
	} catch (error: any) {
		return NextResponse.json(
			{
				error: error.message,
			},
			{ status: 500 }
		);
	}
}
