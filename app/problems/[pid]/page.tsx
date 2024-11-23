import Workspace from "@/app/components/Workspace/Workspace";
import { problems } from "@/app/utils/problems";
import { Problem } from "@/app/utils/types/problem";

type ProblemPageProps = {
	params: { pid: string };
};

export default function ProblemPage({ params }: ProblemPageProps) {
	const problem: Problem | undefined = problems[params.pid];

	if (!problem) {
		return (
			<div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
				<div className="text-center">
					<div className="mb-6">
						<svg
							className="w-20 h-20 text-gray-600 mx-auto"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>

					<h1 className="text-3xl font-bold text-white mb-4">
						Problem Not Found
					</h1>
					<p className="text-gray-400 mb-8 max-w-md mx-auto">
						The problem you&apos;re looking for doesn&apos;t exist
						or has been removed. Please check the problem ID and try
						again.
					</p>

					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<a
							href="/problems"
							className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
						>
							Browse Problems
						</a>
						<a
							href="/"
							className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
						>
							Back to Home
						</a>
					</div>
				</div>
			</div>
		);
	}

	// Serialize the function (convert to string)
	const clientSafeProblem = {
		...problem,
		handlerFunction: problem.handlerFunction.toString(),
	};

	return <Workspace problem={clientSafeProblem} />;
}

// This function replaces getStaticPaths
export async function generateStaticParams() {
	return Object.keys(problems).map((pid) => ({
		pid,
	}));
}

// export async function getStaticPaths() {
// 	const paths = Object.keys(problems).map((key) => ({
// 		params: { pid: key },
// 	}));

// 	return {
// 		paths: paths,
// 		fallback: false,
// 	};
// }

// export async function getStaticProps({ params }: { params: { pid: string } }) {
// 	const { pid } = params;
// 	const problem = problems[pid];

// 	if (!problem) {
// 		return {
// 			notFound: true,
// 		};
// 	}

// 	problem.handlerFunction = problem.handlerFunction.toString();

// 	return {
// 		props: {
// 			problem,
// 		},
// 	};
// }
