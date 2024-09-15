"use client";

import Split from "react-split";
import ProblemDescription from "../ProblemDescription/ProblemDescription";
import Playground from "../Playground/Playground";
import { Problem } from "@/app/utils/types/problem";

type WorkspaceProps = {
	problem: Problem;
};

export default function Workspace({ problem }: WorkspaceProps) {
	return (
		<Split className="split">
			<ProblemDescription problem={problem} />
			<Playground problem={problem} />
		</Split>
	);
}
