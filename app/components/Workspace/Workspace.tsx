"use client";

import Split from "react-split";
import ProblemDescription from "../ProblemDescription/ProblemDescription";
import Playground from "../Playground/Playground";
import { Problem } from "@/app/utils/types/problem";
import { useState } from "react";
import Confetti from "react-confetti";
import useWindowSize from "@/app/hooks/useWindowSize";

type WorkspaceProps = {
	problem: Problem;
};

export default function Workspace({ problem }: WorkspaceProps) {
	const { width, height } = useWindowSize();
	const [success, setSuccess] = useState(false);
	const [solved, setSolved] = useState(false);

	return (
		<Split className="split">
			<ProblemDescription problem={problem} _solved={solved} />
			<Playground
				problem={problem}
				setSuccess={setSuccess}
				setSolved={setSolved}
			/>
			{success && (
				<Confetti
					gravity={0.3}
					tweenDuration={4000}
					width={width - 10}
					height={height - 10}
				/>
			)}
		</Split>
	);
}
