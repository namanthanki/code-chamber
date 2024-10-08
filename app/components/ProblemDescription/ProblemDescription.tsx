import { Problem } from "@/app/utils/types/problem";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";

type ProblemDescriptionProps = {
	problem: Problem;
};

export default function ProblemDescription({
	problem,
}: ProblemDescriptionProps) {
	return (
		<div className="bg-gray-900">
			{/* TAB */}
			<div className="flex h-11 w-full items-center pt-2 bg-gray-800 text-gray-300 overflow-hidden">
				<div className="bg-gray-900 rounded-t-lg px-5 py-[10px] text-sm cursor-pointer">
					Description
				</div>
			</div>

			<div className="flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto">
				<div className="px-5">
					{/* Problem heading */}
					<div className="w-full">
						<div className="flex space-x-4">
							<div className="flex-1 mr-2 text-xl text-gray-300 font-medium">
								{problem.title}
							</div>
						</div>
						<div className="flex items-center mt-3">
							<div className="text-olive bg-olive inline-block rounded-full bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize">
								Easy
							</div>
							<div className="rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-500">
								<BsCheck2Circle />
							</div>
							<div className="flex items-center cursor-pointer hover:bg-gray-800 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-gray-400">
								<AiFillLike />
								<span className="text-xs">120</span>
							</div>
							<div className="flex items-center cursor-pointer hover:bg-gray-800 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-gray-400">
								<AiFillDislike />
								<span className="text-xs">2</span>
							</div>
							<div className="cursor-pointer hover:bg-gray-800 rounded p-[3px] ml-4 text-xl transition-colors duration-200 text-gray-400">
								<TiStarOutline />
							</div>
						</div>

						{/* Problem Statement(paragraphs) */}
						<div className="text-gray-300 text-sm mt-4">
							<div
								dangerouslySetInnerHTML={{
									__html: problem.problemStatement,
								}}
							/>
						</div>

						{/* Examples */}
						<div className="mt-4">
							{problem.examples.map((example, index) => (
								<div key={example.id} className="mt-4">
									<p className="font-medium text-gray-300">
										Example {index + 1}:{" "}
									</p>
									{example.img && (
										<img
											src={example.img}
											alt=""
											className="mt-3"
										/>
									)}
									<div className="example-card bg-gray-800 p-4 rounded-lg mt-2">
										<pre className="text-gray-300">
											<strong>Input: </strong>
											{example.inputText}
											<br />
											<strong>Output: </strong>
											{example.outputText}
											<br />
											{example.explanation && (
												<>
													<strong>
														Explanation:{" "}
													</strong>
													{example.explanation}
												</>
											)}
										</pre>
									</div>
								</div>
							))}
						</div>

						{/* Constraints */}
						<div className="my-5">
							<div className="text-gray-300 text-sm font-medium">
								Constraints:
							</div>
							<ul className="text-gray-300 mt-2 ml-5 list-disc">
								<div
									dangerouslySetInnerHTML={{
										__html: problem.constraints,
									}}
								/>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
