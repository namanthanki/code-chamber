"use client";

import Split from "react-split";
import ProblemDescription from "../ProblemDescription/ProblemDescription";
import Playground from "../Playground/Playground";

export default function Workspace() {
	return (
		<Split className="split">
			<ProblemDescription />
			<Playground />
		</Split>
	);
}
