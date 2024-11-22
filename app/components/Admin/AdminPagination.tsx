"use client";

import React from "react";
import { useProblemsStore } from "../../stores/problemsStore";

export default function AdminPagination() {
	const { currentPage, totalPages, fetchProblems, difficulty, category } =
		useProblemsStore();

	const pageNumbers = [];
	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i);
	}

	return (
		<div className="flex justify-center space-x-2 mt-4">
			{pageNumbers.map((number) => (
				<button
					key={number}
					onClick={() => fetchProblems(number, difficulty, category)}
					className={`px-4 py-2 rounded-md ${
						currentPage === number
							? "bg-blue-600 text-white"
							: "bg-gray-800 text-gray-300 hover:bg-gray-700"
					}`}
				>
					{number}
				</button>
			))}
		</div>
	);
}
