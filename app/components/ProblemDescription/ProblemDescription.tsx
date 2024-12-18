import { DBProblem, Problem } from "@/app/utils/types/problem";
import { useEffect, useState } from "react";
import {
	AiFillLike,
	AiFillDislike,
	AiOutlineLoading3Quarters,
	AiFillStar,
	AiOutlineStar,
} from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import RectangularSkeleton from "../Skeletons/RectangularSkeleton";
import CircularSkeleton from "../Skeletons/CircularSkeleton";
import { useAuthStore } from "@/app/stores/authStore";
import axios from "axios";

type ProblemDescriptionProps = {
	problem: Problem;
	_solved: boolean;
};

export default function ProblemDescription({
	problem,
	_solved,
}: ProblemDescriptionProps) {
	const { currentProblem, setCurrentProblem, loading } = useGetCurrentProblem(
		problem.id
	);
	const { liked, disliked, starred, solved, setData } = useGetUserProblemData(
		problem.id
	);

	const [updating, setUpdating] = useState<boolean>(false);

	const handleLikeProblem = async () => {
		if (updating) return;
		try {
			setUpdating(true);
			await axios.post(`/api/users/problems/${problem.id}/like`);

			if (liked) {
				setCurrentProblem(
					(prev) =>
						({
							...prev,
							likes: (prev?.likes ?? 0) - 1,
						} as DBProblem)
				);
				setData((prev) => ({ ...prev, liked: false }));
			} else if (disliked) {
				setCurrentProblem(
					(prev) =>
						({
							...prev,
							likes: (prev?.likes ?? 0) + 1,
							dislikes: (prev?.dislikes ?? 0) - 1,
						} as DBProblem)
				);
				setData((prev) => ({ ...prev, liked: true, disliked: false }));
			} else {
				setCurrentProblem(
					(prev) =>
						({
							...prev,
							likes: (prev?.likes ?? 0) + 1,
						} as DBProblem)
				);
				setData((prev) => ({ ...prev, liked: true }));
			}
		} catch (error) {
			console.error(error);
		} finally {
			setUpdating(false);
		}
	};

	const handleDislikeProblem = async () => {
		if (updating) return;
		try {
			setUpdating(true);
			await axios.post(`/api/users/problems/${problem.id}/dislike`);

			if (disliked) {
				setCurrentProblem(
					(prev) =>
						({
							...prev,
							dislikes: (prev?.dislikes ?? 0) - 1,
						} as DBProblem)
				);
				setData((prev) => ({ ...prev, disliked: false }));
			} else if (liked) {
				setCurrentProblem(
					(prev) =>
						({
							...prev,
							likes: (prev?.likes ?? 0) - 1,
							dislikes: (prev?.dislikes ?? 0) + 1,
						} as DBProblem)
				);
				setData((prev) => ({ ...prev, liked: false, disliked: true }));
			} else {
				setCurrentProblem(
					(prev) =>
						({
							...prev,
							dislikes: (prev?.dislikes ?? 0) + 1,
						} as DBProblem)
				);
				setData((prev) => ({ ...prev, disliked: true }));
			}
		} catch (error) {
			console.error(error);
		} finally {
			setUpdating(false);
		}
	};

	const handleStarProblem = async () => {
		if (updating) return;
		try {
			setUpdating(true);
			await axios.post(`/api/users/problems/${problem.id}/star`);

			if (starred) {
				setData((prev) => ({ ...prev, starred: false }));
			} else {
				setData((prev) => ({ ...prev, starred: true }));
			}
		} catch (error) {
			console.error(error);
		} finally {
			setUpdating(false);
		}
	};

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
						{!loading && currentProblem && (
							<div className="flex items-center mt-3">
								<div
									className={
										"inline-block rounded-full bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize" +
										(currentProblem?.difficulty === "Easy"
											? " text-olive bg-olive"
											: currentProblem?.difficulty ===
											  "Medium"
											? " bg-dark-yellow text-dark-yellow"
											: " bg-dark-pink text-dark-pink")
									}
								>
									{currentProblem?.difficulty}
								</div>
								{(solved || _solved) && (
									<div className="rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-500">
										<BsCheck2Circle />
									</div>
								)}
								<div
									onClick={handleLikeProblem}
									className="flex items-center cursor-pointer hover:bg-gray-800 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-gray-400"
								>
									{liked && !updating && (
										<AiFillLike className="text-dark-blue-s" />
									)}
									{!liked && !updating && <AiFillLike />}
									{updating && (
										<AiOutlineLoading3Quarters className="animate-spin" />
									)}
									<span className="text-xs">
										{currentProblem?.likes}
									</span>
								</div>
								<div
									onClick={handleDislikeProblem}
									className="flex items-center cursor-pointer hover:bg-gray-800 space-x-1 rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-gray-400"
								>
									{disliked && !updating && (
										<AiFillDislike className="text-dark-blue-s" />
									)}

									{!disliked && !updating && (
										<AiFillDislike />
									)}

									{updating && (
										<AiOutlineLoading3Quarters className="animate-spin" />
									)}

									<span className="text-xs">
										{currentProblem?.dislikes}
									</span>
								</div>
								<div
									onClick={handleStarProblem}
									className="cursor-pointer hover:bg-gray-800 rounded p-[3px] ml-4 text-xl transition-colors duration-200 text-gray-400"
								>
									{starred && !updating && (
										<AiFillStar className="text-dark-yellow" />
									)}
									{!starred && !updating && <AiOutlineStar />}
									{updating && (
										<AiOutlineLoading3Quarters className="animate-spin" />
									)}
								</div>
							</div>
						)}

						{loading && (
							<div className="mt-3 flex space-x-2">
								<RectangularSkeleton />
								<CircularSkeleton />
								<RectangularSkeleton />
								<RectangularSkeleton />
								<CircularSkeleton />
							</div>
						)}

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

function useGetCurrentProblem(problemId: string) {
	const [currentProblem, setCurrentProblem] = useState<DBProblem | null>(
		null
	);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(`/api/problems/${problemId}`);
				setCurrentProblem({
					id: response.data._id.toString(),
					...response.data,
				} as DBProblem);
				setLoading(false);
			} catch (error) {
				console.error(error);
			}
		})();
	}, [problemId]);

	return { currentProblem, setCurrentProblem, loading };
}

function useGetUserProblemData(problemId: string) {
	const [data, setData] = useState({
		liked: false,
		disliked: false,
		starred: false,
		solved: false,
	});

	const { user } = useAuthStore();

	useEffect(() => {
		(async () => {
			try {
				setData({
					liked: user?.likedProblems?.includes(problemId),
					disliked: user?.dislikedProblems?.includes(problemId),
					starred: user?.starredProblems?.includes(problemId),
					solved: user?.solvedProblems?.includes(problemId),
				});
			} catch (error) {
				console.error(error);
			}
		})();
	}, [problemId, user]);

	return { ...data, setData };
}
