import { connect } from "@/app/db/connection";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/app/models/user";
import bcryptjs from "bcryptjs";
import { sendMail } from "@/app/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
	try {
		const { name, email, password } = await request.json();

		const userExists = await UserModel.findOne({ email });

		if (userExists) {
			return NextResponse.json(
				{
					error: "User already exists",
				},
				{ status: 400 }
			);
		}

		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);

		const user = await UserModel.create({
			name,
			email,
			password: hashedPassword,
		});

		if (!user) {
			return NextResponse.json(
				{
					error: "Failed to Create User",
				},
				{ status: 400 }
			);
		}

		const fromEmail = process.env.FROM_EMAIL;
		if (!fromEmail) {
			return NextResponse.json(
				{
					error: "Email Configuration Error",
				},
				{ status: 500 }
			);
		}

		const mailInfo = await sendMail({
			from: fromEmail,
			to: user,
			emailType: "verifyEmail",
		});

		if (!mailInfo) {
			return NextResponse.json(
				{
					error: "Failed to Send Verification Email",
				},
				{ status: 400 }
			);
		}

		console.log(mailInfo);

		return NextResponse.json(
			{
				message: "User Registered Successfully",
				user,
			},
			{ status: 201 }
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
