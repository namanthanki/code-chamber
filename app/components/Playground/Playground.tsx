"use client";

import Split from "react-split";
import PreferenceNavbar from "./PreferenceNavbar/PreferenceNavbar";
import ReactCodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import EditorFooter from "./EditorFooter/EditorFooter";
import { Problem } from "@/app/utils/types/problem";
import { useEffect, useState } from "react";
import { tokyoNightStorm } from "@uiw/codemirror-theme-tokyo-night-storm";
import { problems } from "@/app/utils/problems";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

type PlaygroundProps = {
	problem: Problem;
	setSuccess: (success: boolean) => void;
	setSolved: (solved: boolean) => void;
};

export interface ISettings {
	fontSize: string;
	settingsModalOpen: boolean;
	dropdownOpen: boolean;
}

export default function Playground({
	problem,
	setSuccess,
	setSolved,
}: PlaygroundProps) {
	const { pid } = useParams();
	const [activeTestCaseId, setActiveTestCaseId] = useState<number>(0);
	let [userCode, setUserCode] = useState<string>(problem.starterCode);
	const [settings, setSettings] = useState<ISettings>({
		fontSize: "16px",
		settingsModalOpen: false,
		dropdownOpen: false,
	});

	useEffect(() => {
		const code = localStorage.getItem(`code-${pid}`);
		console.log(code);
		setUserCode(code ? JSON.parse(code) : problem.starterCode);
	}, [pid, problem.starterCode]);

	const handleSubmit = async () => {
		try {
			userCode = userCode.slice(
				userCode.indexOf(problem.starterFunctionName)
			);
			const cb = new Function(`return ${userCode}`)();
			const handler = problems[pid as string].handlerFunction;

			if (typeof handler === "function") {
				const success = handler(cb);
				if (success) {
					await axios.post(`/api/users/problems/${problem.id}/solve`);
					setSolved(true);
					toast.success(
						"Congratulations! Your solution is correct.",
						{
							duration: 5000,
						}
					);
					setSuccess(true);
					setTimeout(() => {
						setSuccess(false);
					}, 3000);
				}
			}
		} catch (error: any) {
			if (
				error.message.startsWith(
					"AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal"
				)
			) {
				toast.error("Oops! One or more test cases failed.");
			} else {
				toast.error("Oops! Something went wrong.");
			}
		}
	};

	const handleUserCodeChange = (value: string) => {
		setUserCode(value);
		localStorage.setItem(`code-${pid}`, JSON.stringify(value));
	};

	return (
		<div className="flex flex-col bg-gray-900 relative overflow-x-hidden">
			<PreferenceNavbar settings={settings} setSettings={setSettings} />

			<Split
				className="h-[calc(100vh-94px)]"
				direction="vertical"
				sizes={[60, 40]}
				minSize={60}
			>
				<div className="w-full overflow-auto p-4">
					<ReactCodeMirror
						value={userCode}
						theme={tokyoNightStorm}
						extensions={[javascript()]}
						style={{ fontSize: settings.fontSize }}
						onChange={handleUserCodeChange}
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

			<EditorFooter handleSubmit={handleSubmit} />
		</div>
	);
}
