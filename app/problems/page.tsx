"use client";

import { useEffect } from "react";
import ProblemsTable from "../components/Tables/ProblemsTable";
import { useProblemsStore } from "../stores/problemsStore";

export default function Problems() {
	const { loading, fetchProblems } = useProblemsStore();

	useEffect(() => {
		fetchProblems();
	}, [fetchProblems]);

	return (
		<>
			<main className="bg-gray-900 min-h-screen pt-4">
				<div className="flex flex-col items-center justify-center">
					<h1 className="text-xl text-center text-gray-300 dark:text-gray-200 font-medium mb-1">
						&quot;Give someone a program; you frustrate them for a
						day; <br />
						teach them how to program, and you frustrate them for a
						lifetime.&quot;
					</h1>
					<h2 className="text-lg text-gray-400 mb-8">
						- David Leinweber
					</h2>
				</div>

				<div className="relative overflow-x-auto mx-auto px-6 pb-10 sm:w-full w-11/12">
					{loading && (
						<div className="max-w-[1200px] mx-auto sm:w-7/12 w-full animate-pulse">
							{[...Array(10)].map((_, i) => (
								<LoadingSkeleton key={i} />
							))}
						</div>
					)}
					{!loading && (
						<table className="table text-sm text-left text-gray-300 dark:text-gray-400 w-full max-w-5xl mx-auto rounded-lg overflow-hidden shadow-lg">
							<thead className="text-xs bg-gray-800 text-gray-400 uppercase border-b">
								<tr>
									<th
										scope="col"
										className="px-4 py-3 font-medium text-left"
									>
										Status
									</th>
									<th
										scope="col"
										className="px-6 py-3 font-medium text-left"
									>
										Title
									</th>
									<th
										scope="col"
										className="px-6 py-3 font-medium text-left"
									>
										Difficulty
									</th>
									<th
										scope="col"
										className="px-6 py-3 font-medium text-left"
									>
										Category
									</th>
									<th
										scope="col"
										className="px-6 py-3 font-medium text-left"
									>
										Solution
									</th>
								</tr>
							</thead>
							<ProblemsTable />
						</table>
					)}
				</div>
			</main>
		</>
	);
}

const LoadingSkeleton = () => {
	return (
		<div className="flex items-center space-x-12 mt-4 px-6">
			<div className="w-6 h-6 shrink-0 rounded-full bg-gray-800"></div>
			<div className="h-4 sm:w-52  w-32  rounded-full bg-gray-800"></div>
			<div className="h-4 sm:w-52  w-32 rounded-full bg-gray-800"></div>
			<div className="h-4 sm:w-52 w-32 rounded-full bg-gray-800"></div>
			<span className="sr-only">Loading...</span>
		</div>
	);
};
