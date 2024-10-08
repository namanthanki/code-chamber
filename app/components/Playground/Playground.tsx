"use client";

import Split from "react-split";
import PreferenceNavbar from "./PreferenceNavbar/PreferenceNavbar";
import ReactCodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { javascript } from "@codemirror/lang-javascript";
import EditorFooter from "./EditorFooter/EditorFooter";
import { Problem } from "@/app/utils/types/problem";
import { useState } from "react";
import { dracula, draculaDarkStyle } from "@uiw/codemirror-theme-dracula";
import { tokyoNightStorm } from "@uiw/codemirror-theme-tokyo-night-storm";

type PlaygroundProps = {
	problem: Problem;
};

export default function Playground({ problem }: PlaygroundProps) {
	const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);

	return (
		<div className="flex flex-col bg-gray-900 relative overflow-x-hidden">
			<PreferenceNavbar />

			<Split
				className="h-[calc(100vh-94px)]"
				direction="vertical"
				sizes={[60, 40]}
				minSize={60}
			>
				<div className="w-full overflow-auto p-4">
					<ReactCodeMirror
						value={problem.starterCode}
						theme={tokyoNightStorm}
						extensions={[javascript()]}
						style={{ fontSize: 16 }}
					/>
				</div>

				<div className="w-full px-5 overflow-auto">
					<div className="flex h-10 items-center space-x-6">
						<div className="relative flex h-full flex-col justify-center cursor-pointer">
							<div className="text-sm font-medium leading-5 text-gray-300">
								Test Cases
							</div>
							<hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-indigo-500" />
						</div>
					</div>
					<div className="flex">
						{problem.examples.map((example, index) => (
							<div
								key={example.id}
								className="mr-2 items-start mt-2 text-gray-300"
								onClick={() => setActiveTestCaseId(index)}
							>
								<div className="flex flex-wrap items-center gap-y-4">
									<div
										className={`font-medium items-center transition-all focus:outline-none inline-flex bg-gray-800 hover:bg-gray-700 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap ${
											activeTestCaseId === index
												? "text-indigo-500"
												: "text-gray-400"
										}`}
									>
										Case {index + 1}
									</div>
								</div>
							</div>
						))}
					</div>

					<div className="font-semibold">
						<p className="text-sm font-medium mt-4 text-gray-300">
							Input:{" "}
						</p>
						<div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-gray-800 border-transparent text-gray-300 mt-2">
							{problem.examples[activeTestCaseId].inputText}
						</div>
						<p className="text-sm font-medium mt-4 text-gray-300">
							Output:{" "}
						</p>
						<div className="w-full cursor-text rounded-lg border px-3 py-[10px] bg-gray-800 border-transparent text-gray-300 mt-2">
							{problem.examples[activeTestCaseId].outputText}
						</div>
					</div>
				</div>
			</Split>

			<EditorFooter />
		</div>
	);
}
