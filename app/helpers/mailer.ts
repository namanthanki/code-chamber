import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import UserModel from "../models/user";

type MailOptions = {
	from: string;
	to: string;
	subject: string;
	html: string;
};

type Params = {
	from: string;
	to: any;
	emailType: "verifyEmail" | "resetPassword";
};

export const sendMail = async ({ from, to, emailType }: Params) => {
	const hashedToken = await bcryptjs.hash(to._id.toString(), 10);

	if (emailType === "verifyEmail") {
		const updated = await UserModel.findByIdAndUpdate(to._id, {
			verificationToken: hashedToken,
			verificationTokenExpiration: new Date(Date.now() + 3600000),
		});

		if (!updated) {
			throw new Error("Failed to update user");
		}
	}

	// const transporter = nodemailer.createTransport({
	// 	service: "gmail",
	// 	port: 465,
	// 	secure: true,
	// 	auth: {
	// 		user: process.env.EMAIL_USER,
	// 		pass: process.env.EMAIL_PASSWORD,
	// 	},
	// });

	const fakeTransporter = nodemailer.createTransport({
		host: "sandbox.smtp.mailtrap.io",
		port: 2525,
		auth: {
			user: "cbf30e1dcb1245",
			pass: "c48da4e0ef5546",
		},
	});

	const mailOptions: MailOptions = {
		from,
		to,
		subject:
			emailType === "verifyEmail"
				? "Verify Your Email"
				: "Reset Your Password",
		html:
			emailType === "verifyEmail"
				? `<a href="${process.env.DOMAIN}/api/users/verify-email?email=${to.email}&token=${hashedToken}">Click here to verify your email</a>`
				: `<a href="${process.env.DOMAIN}/api/users/reset-password?email=${to.email}&token=${hashedToken}">Click here to reset your password</a>`,
	};

	try {
		const info = await fakeTransporter.sendMail(mailOptions);
		return info;
	} catch (error: any) {
		throw new Error(`Error sending email: ${emailType}/${error.message}`);
	}
};
