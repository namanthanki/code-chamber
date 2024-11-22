"use client";

import { useState } from "react";
import ProfileOverview from "../components/Profile/ProfileOverview";
import ProblemList from "../components/Profile/ProblemList";

export default function ProfilePage() {
	const [activeTab, setActiveTab] = useState<"solved" | "starred" | "liked">(
		"solved"
	);

	return (
		<div className="min-h-screen bg-gray-900 text-gray-100">
			<div className="container mx-auto px-4 py-8">
				<ProfileOverview />

				<div className="mt-8 bg-gray-800 rounded-lg shadow-md">
					<div className="border-b border-gray-700">
						<nav className="-mb-px flex">
							{[
								{ key: "solved", label: "Solved Problems" },
								{ key: "starred", label: "Starred Problems" },
								{ key: "liked", label: "Liked Problems" },
							].map((tab) => (
								<button
									key={tab.key}
									onClick={() => setActiveTab(tab.key as any)}
									className={`
                    px-4 py-3 font-medium text-sm 
                    ${
						activeTab === tab.key
							? "border-b-2 border-blue-500 text-blue-400"
							: "text-gray-400 hover:text-gray-300"
					}
                  `}
								>
									{tab.label}
								</button>
							))}
						</nav>
					</div>

					<ProblemList activeTab={activeTab} />
				</div>
			</div>
		</div>
	);
}
