import Workspace from "@/app/components/Workspace/Workspace";
import { problems } from "@/app/utils/problems";
import { Problem } from "@/app/utils/types/problem";

type ProblemPageProps = {
	params: { pid: string };
};

export default function ProblemPage({ params }: ProblemPageProps) {
	const problem: Problem | undefined = problems[params.pid];

	// console.log(problem);

	// if (!problem) {
	// 	return <div>Problem not found</div>;
	// }

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
