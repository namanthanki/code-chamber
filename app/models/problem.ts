import mongoose from "mongoose";
import { Example } from "../utils/types/problem";

export interface Problem {
	id: string;
	title: string;
	problemStatement: string;
	examples: Example[];
	constraints: string;
	starterCode: string;
	handlerFunction: string;
	difficulty: string;
	category: string;
	videoId?: string;
	link?: string;
	order: number;
	likes: number;
	dislikes: number;
}

const ExampleSchema = new mongoose.Schema({
	id: { type: Number, required: true },
	inputText: { type: String, required: true },
	outputText: { type: String, required: true },
	explanation: { type: String },
	img: { type: String },
});

export const ProblemSchema = new mongoose.Schema<Problem>(
	{
		id: { type: String, required: true },
		title: { type: String, required: true },
		problemStatement: { type: String, required: true },
		examples: [ExampleSchema],
		constraints: { type: String, required: true },
		starterCode: { type: String, required: true },
		handlerFunction: { type: String, required: true },
		difficulty: {
			type: String,
			required: true,
			enum: ["Easy", "Medium", "Hard"],
		},
		category: { type: String, required: true },
		videoId: { type: String },
		link: { type: String },
		order: { type: Number, required: true },
		likes: { type: Number, default: 0 },
		dislikes: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

ProblemSchema.index({ id: 1 }, { unique: true });
ProblemSchema.index({ difficulty: 1 });
ProblemSchema.index({ category: 1 });

const ProblemModel =
	mongoose.models.problems ||
	mongoose.model<Problem>("problems", ProblemSchema);

export default ProblemModel;
