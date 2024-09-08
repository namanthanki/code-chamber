"use client";
import { useState } from "react";
import { problems } from "@/app/mock/problems";
import Link from "next/link";
import { AiFillYoutube } from "react-icons/ai";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import YouTube from "react-youtube";
import { IoClose } from "react-icons/io5";

export default function ProblemsTable() {
	const [videoId, setVideoId] = useState(null);

	return (
		<>
			<tbody className="text-white">
				{problems.map((problem: any, idx) => {
					const difficultyColor =
						problem.difficulty === "Easy"
							? "bg-green-600 text-white"
							: problem.difficulty === "Medium"
							? "bg-yellow-500 text-white"
							: "bg-red-600 text-white";

					return (
						<tr
							className={`hover:bg-gray-700 ${
								idx % 2 === 1 ? "bg-gray-800" : "bg-gray-900"
							} transition-colors`}
							key={problem.id}
						>
							<th className="px-4 py-4 font-medium text-left whitespace-nowrap">
								{problem.solved ? (
									<BsCheckCircle
										fontSize={18}
										className="text-green-400"
									/>
								) : (
									<BsXCircle
										fontSize={18}
										className="text-red-400"
									/>
								)}
							</th>
							<td className="px-6 py-3 font-medium">
								<Link
									className="hover:text-blue-400 cursor-pointer"
									href={`/problems/${problem.id}`}
								>
									{problem.title}
								</Link>
							</td>
							<td className="px-6 py-3">
								<span
									className={`px-2 py-1 rounded-md ${difficultyColor}`}
								>
									{problem.difficulty}
								</span>
							</td>
							<td className="px-6 py-3">{problem.category}</td>
							<td className="px-6 py-3">
								{problem.videoId ? (
									<AiFillYoutube
										fontSize={22}
										className="cursor-pointer hover:text-red-500"
										onClick={() =>
											setVideoId(problem.videoId)
										}
									/>
								) : (
									<span className="text-gray-400">
										Not Available
									</span>
								)}
							</td>
						</tr>
					);
				})}
			</tbody>

			{videoId && (
				<div className="fixed inset-0 z-50 flex items-center justify-center">
					<div className="bg-black opacity-75 fixed inset-0"></div>
					<div className="relative z-10 bg-gray-800 rounded-lg p-3.5 max-w-2xl w-full">
						<div className="flex justify-end mb-3">
							<IoClose
								fontSize={35}
								className="cursor-pointer text-white"
								onClick={() => setVideoId(null)}
							/>
						</div>
						<div className="w-full h-80 sm:h-96">
							<YouTube videoId={videoId} />
						</div>
					</div>
				</div>
			)}
		</>
	);
}
