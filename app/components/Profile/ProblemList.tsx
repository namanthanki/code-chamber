// app/components/Dashboard/ProblemList.tsx
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { DBProblem, Problem } from "@/app/utils/types/problem";
import { FaCheck, FaStar, FaThumbsUp, FaLink } from "react-icons/fa";
import Link from "next/link";

type ProblemListProps = {
	activeTab: "solved" | "starred" | "liked";
};

export default function ProblemList({ activeTab }: ProblemListProps) {
	const [problems, setProblems] = useState<DBProblem[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchProblems() {
			try {
				setLoading(true);
				const response = await axios.get(
					`/api/users/stats/${activeTab}`
				);
				console.log(response.data);
				setProblems(response.data.problems);
			} catch (error) {
				console.error(`Failed to fetch ${activeTab} problems`, error);
			} finally {
				setLoading(false);
			}
		}

		fetchProblems();
	}, [activeTab]);

	if (loading) {
		return <LoadingSkeleton />;
	}

	if (problems.length === 0) {
		return (
			<div className="p-6 text-center text-gray-400">
				No {activeTab} problems found
			</div>
		);
	}

	return (
		<div className="divide-y divide-gray-700">
			{problems.map((problem) => (
				<ProblemItem key={problem.id} problem={problem} />
			))}
		</div>
	);
}

function ProblemItem({ problem }: { problem: DBProblem }) {
	return (
		<div className="p-4 hover:bg-gray-700 transition-colors flex items-center justify-between">
			<div className="flex items-center space-x-4">
				<div
					className={`w-8 h-8 rounded-full flex items-center justify-center 
            ${
				problem.difficulty === "Easy"
					? "bg-green-500/20 text-green-400"
					: problem.difficulty === "Medium"
					? "bg-yellow-500/20 text-yellow-400"
					: "bg-red-500/20 text-red-400"
			}`}
				>
					{problem.difficulty[0]}
				</div>

				<div>
					<Link
						href={`/problems/${problem.id}`}
						className="text-gray-100 hover:text-blue-400 transition-colors"
					>
						{problem.title}
					</Link>
					<div className="text-gray-400 text-sm">
						{problem.category}
					</div>
				</div>
			</div>

			<div className="flex items-center space-x-4 text-gray-400">
				<div className="flex items-center space-x-1">
					<FaCheck className="text-green-400" />
					<span>{problem.likes}</span>
				</div>
				<div className="flex items-center space-x-1">
					<FaStar className="text-yellow-400" />
					<span>{problem.dislikes}</span>
				</div>
			</div>
		</div>
	);
}

function LoadingSkeleton() {
	return (
		<div className="p-6">
			{[1, 2, 3, 4, 5].map((item) => (
				<div
					key={item}
					className="h-16 bg-gray-700 mb-4 animate-pulse rounded-lg"
				></div>
			))}
		</div>
	);
}
