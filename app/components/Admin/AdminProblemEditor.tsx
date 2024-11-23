"use client";

import { useState, useRef } from "react";
import { Problem } from "@/app/models/problem";
import { Example } from "@/app/utils/types/problem";
import axios from "axios";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import toast from "react-hot-toast";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import CodeBlock from "@tiptap/extension-code-block";
import Code from "@tiptap/extension-code";

import "./TipTap.css";

// Custom Tiptap Editor component
const TiptapEditor = ({
	content,
	onChange,
}: {
	content: string;
	onChange: (html: string) => void;
}) => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Link.configure({
				openOnClick: false,
			}),
			Code,
			CodeBlock,
		],
		content,
		editorProps: {
			attributes: {
				class: "prose prose-invert max-w-none min-h-[200px] p-4 focus:outline-none",
			},
		},
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
	});

	return <EditorContent editor={editor} />;
};

const defaultProblem: Partial<Problem> = {
	title: "",
	problemStatement: "",
	examples: [],
	constraints: "",
	starterCode: "function solution() {\n  \n}",
	handlerFunction: `function handle() {\n  // Test cases\n}`,
	difficulty: "Easy",
	category: "",
	order: 0,
};

const CATEGORIES = [
	"Array",
	"Linked List",
	"Dynamic Programming",
	"Stack",
	"Binary Search",
	"Two Pointers",
	"Tree",
	"Intervals",
	"String",
	"Hash Table",
	"Backtracking",
];

export default function AdminProblemEditor({
	onClose,
}: {
	onClose: () => void;
}) {
	const [problem, setProblem] = useState<Partial<Problem>>(defaultProblem);
	const [loading, setLoading] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);

	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target;
		setProblem((prev) => ({ ...prev, [name]: value }));
	};

	const handleExampleChange = (
		index: number,
		field: keyof Example,
		value: string
	) => {
		setProblem((prev) => {
			const newExamples = [...(prev.examples || [])];
			newExamples[index] = {
				...newExamples[index],
				[field]: value,
			};
			return { ...prev, examples: newExamples };
		});
	};

	const addExample = () => {
		setProblem((prev) => ({
			...prev,
			examples: [
				...(prev.examples || []),
				{
					id: (prev.examples?.length || 0) + 1,
					inputText: "",
					outputText: "",
					explanation: "",
				},
			],
		}));
	};

	const removeExample = (index: number) => {
		setProblem((prev) => ({
			...prev,
			examples: prev.examples?.filter((_, i) => i !== index),
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await axios.post("/api/problems", problem);
			toast.success("Problem saved successfully!");
			setProblem(defaultProblem);
			formRef.current?.reset();
		} catch (err: any) {
			toast.error(err.response?.data?.message || "An error occurred");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="max-w-4xl mx-auto p-6">
			<h1 className="text-2xl font-bold text-white mb-6">
				Add New Problem
			</h1>

			<form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-200 mb-1">
							Title
						</label>
						<input
							type="text"
							name="title"
							value={problem.title}
							onChange={handleInputChange}
							className="w-full p-2 bg-gray-800 text-gray-100 rounded border border-gray-700"
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-200 mb-1">
							Category
						</label>
						<select
							name="category"
							value={problem.category}
							onChange={handleInputChange}
							className="w-full p-2 bg-gray-800 text-gray-100 rounded border border-gray-700"
							required
						>
							<option value="">Select Category</option>
							{CATEGORIES.map((cat) => (
								<option key={cat} value={cat}>
									{cat}
								</option>
							))}
						</select>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-200 mb-1">
							Difficulty
						</label>
						<select
							name="difficulty"
							value={problem.difficulty}
							onChange={handleInputChange}
							className="w-full p-2 bg-gray-800 text-gray-100 rounded border border-gray-700"
							required
						>
							<option value="Easy">Easy</option>
							<option value="Medium">Medium</option>
							<option value="Hard">Hard</option>
						</select>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-200 mb-1">
							Order
						</label>
						<input
							type="number"
							name="order"
							value={problem.order}
							onChange={handleInputChange}
							className="w-full p-2 bg-gray-800 text-gray-100 rounded border border-gray-700"
							required
						/>
					</div>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-200 mb-1">
						Problem Statement
					</label>
					<div className="border border-gray-700 rounded bg-gray-800">
						<TiptapEditor
							content={problem.problemStatement || ""}
							onChange={(html) =>
								setProblem((prev) => ({
									...prev,
									problemStatement: html,
								}))
							}
						/>
					</div>
				</div>

				<div>
					<div className="flex justify-between items-center mb-2">
						<label className="block text-sm font-medium text-gray-200">
							Examples
						</label>
						<button
							type="button"
							onClick={addExample}
							className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
						>
							Add Example
						</button>
					</div>

					<div className="space-y-4">
						{problem.examples?.map((example, index) => (
							<div
								key={example.id}
								className="p-4 bg-gray-800 rounded border border-gray-700"
							>
								<div className="flex justify-end mb-2">
									<button
										type="button"
										onClick={() => removeExample(index)}
										className="text-red-400 hover:text-red-300 text-sm"
									>
										Remove
									</button>
								</div>
								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-300 mb-1">
											Input
										</label>
										<input
											type="text"
											value={example.inputText}
											onChange={(e) =>
												handleExampleChange(
													index,
													"inputText",
													e.target.value
												)
											}
											className="w-full p-2 bg-gray-700 text-gray-100 rounded border border-gray-600"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-300 mb-1">
											Output
										</label>
										<input
											type="text"
											value={example.outputText}
											onChange={(e) =>
												handleExampleChange(
													index,
													"outputText",
													e.target.value
												)
											}
											className="w-full p-2 bg-gray-700 text-gray-100 rounded border border-gray-600"
										/>
									</div>
									<div className="col-span-2">
										<label className="block text-sm font-medium text-gray-300 mb-1">
											Explanation
										</label>
										<input
											type="text"
											value={example.explanation || ""}
											onChange={(e) =>
												handleExampleChange(
													index,
													"explanation",
													e.target.value
												)
											}
											className="w-full p-2 bg-gray-700 text-gray-100 rounded border border-gray-600"
										/>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-200 mb-1">
						Constraints
					</label>
					<div className="border border-gray-700 rounded bg-gray-800">
						<TiptapEditor
							content={problem.constraints || ""}
							onChange={(html) =>
								setProblem((prev) => ({
									...prev,
									constraints: html,
								}))
							}
						/>
					</div>
				</div>

				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-200 mb-1">
							Starter Code
						</label>
						<div className="border border-gray-700 rounded">
							<CodeMirror
								value={problem.starterCode}
								height="200px"
								theme={vscodeDark}
								extensions={[javascript({ jsx: true })]}
								onChange={(value) =>
									setProblem((prev) => ({
										...prev,
										starterCode: value,
									}))
								}
							/>
						</div>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-200 mb-1">
							Handler Function
						</label>
						<div className="border border-gray-700 rounded">
							<CodeMirror
								value={problem.handlerFunction}
								height="200px"
								theme={vscodeDark}
								extensions={[javascript({ jsx: true })]}
								onChange={(value) =>
									setProblem((prev) => ({
										...prev,
										handlerFunction: value,
									}))
								}
							/>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-200 mb-1">
							Video ID (optional)
						</label>
						<input
							type="text"
							name="videoId"
							value={problem.videoId || ""}
							onChange={handleInputChange}
							className="w-full p-2 bg-gray-800 text-gray-100 rounded border border-gray-700"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-200 mb-1">
							External Link (optional)
						</label>
						<input
							type="text"
							name="link"
							value={problem.link || ""}
							onChange={handleInputChange}
							className="w-full p-2 bg-gray-800 text-gray-100 rounded border border-gray-700"
						/>
					</div>
				</div>

				<div className="flex justify-end">
					<button
						type="button"
						className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-500 mr-2"
						onClick={onClose}
					>
						Cancel
					</button>
					<button
						type="submit"
						disabled={loading}
						className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
					>
						{loading ? "Saving..." : "Save"}
					</button>
				</div>
			</form>
		</div>
	);
}
