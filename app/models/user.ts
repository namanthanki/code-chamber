import mongoose from "mongoose";

export interface User {
	name: string;
	email: string;
	password: string;
	isVerified: boolean;
	forgotPasswordToken?: string;
	forgotPasswordTokenExpiration?: Date;
	verificationToken?: string;
	verificationTokenExpiration?: Date;
	likedProblems?: string[];
	dislikedProblems?: string[];
	solvedProblems?: string[];
	starredProblems?: string[];
}

export const UserSchema = new mongoose.Schema<User>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		isVerified: { type: Boolean, default: false },
		forgotPasswordToken: { type: String },
		forgotPasswordTokenExpiration: { type: Date },
		verificationToken: { type: String },
		verificationTokenExpiration: { type: Date },
		likedProblems: { type: [String], default: [] },
		dislikedProblems: { type: [String], default: [] },
		solvedProblems: { type: [String], default: [] },
		starredProblems: { type: [String], default: [] },
	},
	{ timestamps: true }
);

const UserModel =
	mongoose.models.users || mongoose.model<User>("users", UserSchema);

export default UserModel;
