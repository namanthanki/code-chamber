"use client";

import { useState, useEffect } from "react";
import { useProblemsStore } from "@/app/stores/problemsStore";
import AdminProblemTable from "@/app/components/Admin/AdminProblemTable";
import ProblemFilters from "@/app/components/ProblemFilters/ProblemFilters";
import AdminPagination from "@/app/components/Admin/AdminPagination";
import AdminProblemEditor from "@/app/components/Admin/AdminProblemEditor";

export default function AdminProblems() {
	const { loading, fetchProblems, problems } = useProblemsStore();
	const [editingProblem, setEditingProblem] = useState(null);
	const [isEditorOpen, setEditorOpen] = useState(false);
	useEffect(() => {
		fetchProblems();
	}, [fetchProblems]);

	const handleSave = async () => {
		await fetchProblems();
		setEditorOpen(false);
	};
	return (
		<main className="bg-gray-900 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
			<div className="flex justify-between items-center mb-4">
				<ProblemFilters />
				<button
					className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500"
					onClick={() =>
						setEditorOpen((isEditorOpen) => !isEditorOpen)
					}
				>
					{isEditorOpen ? "Close Editor" : "Add Problem"}
				</button>
			</div>

			<div className="relative overflow-x-auto shadow-lg rounded-lg bg-gray-800 pb-2">
				{loading ? (
					<div className="p-6 text-center text-gray-400">
						Loading problems...
					</div>
				) : (
					<>
						{!isEditorOpen ? (
							<>
								<AdminProblemTable problems={problems} />
								<AdminPagination />
							</>
						) : (
							<div className="bg-gray-800 p-6 rounded">
								<AdminProblemEditor
									onClose={() => setEditorOpen(false)}
								/>
							</div>
						)}
					</>
				)}
			</div>
		</main>
	);
}
