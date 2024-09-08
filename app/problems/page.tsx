import ProblemsTable from "../components/Tables/ProblemsTable";

export default function Problems() {
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
				</div>
			</main>
		</>
	);
}
