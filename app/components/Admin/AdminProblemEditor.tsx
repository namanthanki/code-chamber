// app/components/AdminProblemEditor/AdminProblemEditor.tsx
"use client";

import { useState, useRef } from "react";
import { Problem } from "@/app/models/problem";
import { Example } from "@/app/utils/types/problem";
import axios from "axios";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import toast from "react-hot-toast";

import {
	ClassicEditor,
	AccessibilityHelp,
	Alignment,
	AutoLink,
	Autosave,
	BlockQuote,
	Bold,
	Essentials,
	GeneralHtmlSupport,
	Heading,
	HorizontalLine,
	Indent,
	IndentBlock,
	Italic,
	Link,
	List,
	Paragraph,
	SelectAll,
	Strikethrough,
	Table,
	TableToolbar,
	Underline,
	Undo,
} from "ckeditor5";

import "ckeditor5/ckeditor5.css";

const darkEditorStyles = `
  .ck.ck-editor__editable:not(.ck-editor__nested-editable) {
	padding-left: 2rem;
	padding-right: 2rem;
  }

  .ck.ck-list {
	padding-left: 2rem;
  }

  .ck.ck-editor__main>.ck-editor__editable {
    background: #1a1a1a !important;
    border-color: #4a5568 !important;
    color: #e2e8f0 !important;
  }

  .ck.ck-editor__main>.ck-editor__editable.ck-focused {
    border-color: #4299e1 !important;
  }

  .ck.ck-toolbar {
    background: #2d3748 !important;
    border-color: #4a5568 !important;
  }

  .ck.ck-toolbar .ck-toolbar__items {
    background: #2d3748 !important;
  }

  .ck.ck-button,
  .ck.ck-button.ck-on {
    color: #e2e8f0 !important;
    background: #2d3748 !important;
  }

  .ck.ck-button:hover,
  .ck.ck-button.ck-on:hover {
    background: #4a5568 !important;
    color: #fff !important;
  }

  .ck-dropdown__panel {
    background: #2d3748 !important;
    border-color: #4a5568 !important;
  }

  .ck-dropdown__panel .ck-list {
    background: #2d3748 !important;
  }

  .ck-dropdown__panel .ck-list .ck-list__item {
    color: #e2e8f0 !important;
  }

  .ck-dropdown__panel .ck-list .ck-list__item:hover {
    background: #4a5568 !important;
  }

  .ck.ck-list__item.ck-on {
    background: #4a5568 !important;
  }

  .ck.ck-icon :not([fill]) {
    fill: currentColor !important;
  }
`;

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

export default function AdminProblemEditor({ onClose: onClose }: any) {
	const [problem, setProblem] = useState<Partial<Problem>>(defaultProblem);
	const [loading, setLoading] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);

	const problemStatementEditorConfig = {
		toolbar: {
			items: [
				"heading",
				"|",
				"bold",
				"italic",
				"link",
				"bulletedList",
				"numberedList",
				"|",
				"code",
				"codeBlock",
				"|",
				"undo",
				"redo",
			],
			shouldNotGroupWhenFull: false,
		},
		plugins: [
			AccessibilityHelp,
			Alignment,
			AutoLink,
			Autosave,
			BlockQuote,
			Bold,
			Essentials,
			GeneralHtmlSupport,
			Heading,
			HorizontalLine,
			Indent,
			IndentBlock,
			Italic,
			Link,
			List,
			Paragraph,
			SelectAll,
			Strikethrough,
			Table,
			TableToolbar,
			Underline,
			Undo,
		],
		heading: {
			options: [
				{
					model: "paragraph",
					title: "Paragraph",
					class: "ck-heading_paragraph",
				},
				{
					model: "heading1",
					view: "h1",
					title: "Heading 1",
					class: "ck-heading_heading1",
				},
				{
					model: "heading2",
					view: "h2",
					title: "Heading 2",
					class: "ck-heading_heading2",
				},
				{
					model: "heading3",
					view: "h3",
					title: "Heading 3",
					class: "ck-heading_heading3",
				},
				{
					model: "heading4",
					view: "h4",
					title: "Heading 4",
					class: "ck-heading_heading4",
				},
				{
					model: "heading5",
					view: "h5",
					title: "Heading 5",
					class: "ck-heading_heading5",
				},
				{
					model: "heading6",
					view: "h6",
					title: "Heading 6",
					class: "ck-heading_heading6",
				},
			],
		},
		htmlSupport: {
			allow: [
				{
					name: /^.*$/,
					styles: true,
					attributes: true,
					classes: true,
				},
			],
		},
		initialData: "",
		link: {
			addTargetToExternalLinks: true,
			defaultProtocol: "https://",
			decorators: {
				toggleDownloadable: {
					mode: "manual",
					label: "Downloadable",
					attributes: {
						download: "file",
					},
				},
			},
		},
		placeholder: "Type or paste your content here!",
		table: {
			contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
		},
	};

	const constraintsEditorConfig = {
		toolbar: {
			items: [
				"bulletedList",
				"numberedList",
				"|",
				"code",
				"|",
				"undo",
				"redo",
			],
			shouldNotGroupWhenFull: false,
		},
		plugins: [
			AccessibilityHelp,
			Alignment,
			AutoLink,
			Autosave,
			BlockQuote,
			Bold,
			Essentials,
			GeneralHtmlSupport,
			Heading,
			HorizontalLine,
			Indent,
			IndentBlock,
			Italic,
			Link,
			List,
			Paragraph,
			SelectAll,
			Strikethrough,
			Table,
			TableToolbar,
			Underline,
			Undo,
		],
		heading: {
			options: [
				{
					model: "paragraph",
					title: "Paragraph",
					class: "ck-heading_paragraph",
				},
				{
					model: "heading1",
					view: "h1",
					title: "Heading 1",
					class: "ck-heading_heading1",
				},
				{
					model: "heading2",
					view: "h2",
					title: "Heading 2",
					class: "ck-heading_heading2",
				},
				{
					model: "heading3",
					view: "h3",
					title: "Heading 3",
					class: "ck-heading_heading3",
				},
				{
					model: "heading4",
					view: "h4",
					title: "Heading 4",
					class: "ck-heading_heading4",
				},
				{
					model: "heading5",
					view: "h5",
					title: "Heading 5",
					class: "ck-heading_heading5",
				},
				{
					model: "heading6",
					view: "h6",
					title: "Heading 6",
					class: "ck-heading_heading6",
				},
			],
		},
		htmlSupport: {
			allow: [
				{
					name: /^.*$/,
					styles: true,
					attributes: true,
					classes: true,
				},
			],
		},
		initialData: "",
		link: {
			addTargetToExternalLinks: true,
			defaultProtocol: "https://",
			decorators: {
				toggleDownloadable: {
					mode: "manual",
					label: "Downloadable",
					attributes: {
						download: "file",
					},
				},
			},
		},
		placeholder: "Type or paste your content here!",
		table: {
			contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
		},
	};

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
			<style>{darkEditorStyles}</style>

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
					<div className="prose prose-invert max-w-none">
						<CKEditor
							editor={ClassicEditor}
							data={problem.problemStatement}
							onChange={(event, editor) => {
								const data = editor.getData();
								setProblem((prev) => ({
									...prev,
									problemStatement: data,
								}));
							}}
							config={problemStatementEditorConfig}
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
					<div className="prose prose-invert max-w-none">
						<CKEditor
							editor={ClassicEditor}
							data={problem.constraints}
							onChange={(event, editor) => {
								const data = editor.getData();
								setProblem((prev) => ({
									...prev,
									constraints: data,
								}));
							}}
							config={constraintsEditorConfig}
						/>
					</div>
				</div>

				{/* Code Editors */}
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
