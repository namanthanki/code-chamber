"use client";

import React from "react";
import { useProblemsStore } from "../../stores/problemsStore";

const DIFFICULTIES = ["Easy", "Medium", "Hard"];
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

export default function ProblemFilters() {
	const { difficulty, category, setDifficulty, setCategory } =
		useProblemsStore();

	return (
		<div className="flex space-x-4 mb-4 justify-center">
			<div>
				<label className="block text-sm font-medium text-gray-300 mb-1">
					Difficulty
				</label>
				<select
					value={difficulty}
					onChange={(e) => setDifficulty(e.target.value)}
					className="bg-gray-800 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
				>
					<option value="">All Difficulties</option>
					{DIFFICULTIES.map((diff) => (
						<option key={diff} value={diff}>
							{diff}
						</option>
					))}
				</select>
			</div>

			<div>
				<label className="block text-sm font-medium text-gray-300 mb-1">
					Category
				</label>
				<select
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					className="bg-gray-800 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
				>
					<option value="">All Categories</option>
					{CATEGORIES.map((cat) => (
						<option key={cat} value={cat}>
							{cat}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}
