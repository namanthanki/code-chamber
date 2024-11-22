import { FaEdit, FaTrash } from "react-icons/fa";
import { useProblemsStore } from "@/app/stores/problemsStore";

interface AdminProblemTableProps {
	problems: any[];
}

export default function AdminProblemTable({
	problems,
}: AdminProblemTableProps) {
	const { fetchProblems } = useProblemsStore();

	const handleEdit = (problemId: string) => {
		// Handle edit logic
		console.log("Editing problem with ID:", problemId);
	};

	const handleDelete = async (problemId: string) => {
		if (confirm("Are you sure you want to delete this problem?")) {
			try {
				await fetch(`/api/problems/${problemId}`, {
					method: "DELETE",
				});
				alert("Problem deleted successfully.");
				fetchProblems(); // Refresh the list
			} catch (error) {
				alert("Failed to delete the problem.");
			}
		}
	};

	return (
		<table className="table text-sm text-left text-gray-300 w-full">
			<thead className="text-xs bg-gray-700 text-gray-400 uppercase">
				<tr>
					<th className="px-6 py-3">Title</th>
					<th className="px-6 py-3">Difficulty</th>
					<th className="px-6 py-3">Category</th>
					<th className="px-6 py-3">Actions</th>
				</tr>
			</thead>
			<tbody>
				{problems.map((problem) => (
					<tr
						key={problem._id}
						className="bg-gray-800 hover:bg-gray-700 transition-colors"
					>
						<td className="px-6 py-4">{problem.title}</td>
						<td className="px-6 py-4">{problem.difficulty}</td>
						<td className="px-6 py-4">{problem.category}</td>
						<td className="px-6 py-4 flex space-x-3">
							<button
								className="text-yellow-400 hover:text-yellow-300"
								onClick={() => handleEdit(problem._id)}
							>
								<FaEdit />
							</button>
							<button
								className="text-red-400 hover:text-red-300"
								onClick={() => handleDelete(problem.id)}
							>
								<FaTrash />
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
