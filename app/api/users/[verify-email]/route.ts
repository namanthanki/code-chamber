import { connect } from "@/app/db/connection";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/app/models/user";

connect();

export async function POST(request: NextRequest) {
	try {
		const { token } = await request.json();

		const userExists = await UserModel.findOne({
			verificationToken: token,
			verificationTokenExpiration: { $gt: new Date() },
		});

		if (!userExists) {
			return NextResponse.json(
				{
					error: "Invalid or expired token",
				},
				{ status: 400 }
			);
		}

		userExists.isVerified = true;
		userExists.verificationToken = undefined;
		userExists.verificationTokenExpiration = undefined;

		await userExists.save();

        return NextResponse.json(
            {
                message: "Email verified successfully",
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
