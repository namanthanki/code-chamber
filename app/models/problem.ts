import mongoose from "mongoose";

export interface Problem {
	id: string;
	title: string;
	difficulty: string;
	category: string;
	videoId?: string;
	link?: string;
	order: number;
	likes: number;
	dislikes: number;
}

export const ProblemSchema = new mongoose.Schema<Problem>(
	{
		id: { type: String, required: true },
		title: { type: String, required: true },
		difficulty: { type: String, required: true },
		category: { type: String, required: true },
		videoId: { type: String },
		link: { type: String },
		order: { type: Number, required: true },
		likes: { type: Number, default: 0 },
		dislikes: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

const ProblemModel =
	mongoose.models.problems ||
	mongoose.model<Problem>("problems", ProblemSchema);

export default ProblemModel;
