// app/components/Dashboard/ProfileOverview.tsx
"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/app/stores/authStore";
import axios from "axios";
import { FaUser, FaEnvelope, FaCodeBranch } from "react-icons/fa";
import { FaStar, FaThumbsDown, FaThumbsUp } from "react-icons/fa6";

export default function ProfileOverview() {
	const { user } = useAuthStore();
	const [stats, setStats] = useState({
		solvedProblems: 0,
		totalProblems: 0,
		starredProblems: 0,
		likedProblems: 0,
		dislikedProblems: 0,
	});

	useEffect(() => {
		async function fetchUserStats() {
			try {
				const response = await axios.get("/api/users/stats");
				setStats(response.data.stats);
			} catch (error) {
				console.error("Failed to fetch user stats", error);
			}
		}

		if (user) {
			fetchUserStats();
		}
	}, [user]);

	if (!user) return null;

	return (
		<div className="bg-gray-800 rounded-lg p-6 mb-6 shadow-md">
			<div className="flex items-center space-x-6">
				<div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-4xl">
					{user.name[0].toUpperCase()}
				</div>

				<div className="flex-1">
					<h1 className="text-2xl font-bold text-gray-100">
						{user.name}
					</h1>
					<p className="text-gray-400 flex items-center space-x-2">
						<FaEnvelope className="mr-2" /> {user.email}
					</p>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<StatCard
						icon={<FaCodeBranch />}
						label="Solved"
						value={stats.solvedProblems}
					/>
					<StatCard
						icon={<FaThumbsUp />}
						label="Liked"
						value={stats.likedProblems}
					/>
					<StatCard
						icon={<FaStar />}
						label="Starred"
						value={stats.starredProblems}
					/>
					<StatCard
						icon={<FaThumbsDown />}
						label="Disliked"
						value={stats.dislikedProblems}
					/>
				</div>
			</div>
		</div>
	);
}

function StatCard({
	icon,
	label,
	value,
	total,
}: {
	icon: React.ReactNode;
	label: string;
	value: number;
	total?: number;
}) {
	return (
		<div className="bg-gray-700 rounded-lg p-4 text-center">
			<div className="text-gray-300 text-2xl mb-1 flex justify-center items-center">
				{icon}
				<span className="ml-2">{value}</span>
			</div>
			<div className="text-gray-400 text-sm">
				{label} Problems{total ? ` (${value}/${total})` : ""}
			</div>
		</div>
	);
}
