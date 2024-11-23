"use client";

import FeatureCard from "./components/Cards/FeatureCard";
import AuthModal from "./components/Modals/AuthModal";
import { useAuthModalStore } from "./stores/authModalStore";
import { FaCode, FaUsers, FaTrophy } from "react-icons/fa";

export default function Auth() {
	const { isOpen } = useAuthModalStore();

	return (
		<div className="bg-gray-900 min-h-screen relative">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
				{/* Hero Section */}
				<div className="text-center mb-16">
					<h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
						Welcome to{" "}
						<span className="text-blue-500">Code Chamber</span>
					</h1>
					<p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
						Sharpen your coding skills and conquer challenges. Your
						journey to becoming a coding master starts here.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
					<div className="bg-gray-800 hover:bg-gray-700 transition-colors rounded-lg p-6 text-center">
						<div className="text-4xl font-bold text-white mb-2">
							100+
						</div>
						<div className="text-gray-300">Test Cases</div>
					</div>
					<div className="bg-gray-800 hover:bg-gray-700 transition-colors rounded-lg p-6 text-center">
						<div className="text-4xl font-bold text-white mb-2">
							50+
						</div>
						<div className="text-gray-300">Unique Problems</div>
					</div>
					<div className="bg-gray-800 hover:bg-gray-700 transition-colors rounded-lg p-6 text-center">
						<div className="text-4xl font-bold text-white mb-2">
							3
						</div>
						<div className="text-gray-300">Difficulty Levels</div>
					</div>
				</div>

				{/* Features Section */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
					<FeatureCard
						icon={<FaCode className="w-8 h-8" />}
						title="Diverse Challenges"
						description="From algorithms to data structures, tackle problems across different difficulty levels."
					/>
					<FeatureCard
						icon={<FaUsers className="w-8 h-8" />}
						title="Collaborative Learning"
						description="Join a community of developers, share solutions, and learn from peers."
					/>
					<FeatureCard
						icon={<FaTrophy className="w-8 h-8" />}
						title="Competitive Spirit"
						description="Participate in contests, earn badges, and climb the global leaderboard."
					/>
				</div>

				{/* CTA Section */}
				<div className="text-center">
					<button
						onClick={() =>
							useAuthModalStore.setState({ isOpen: true })
						}
						className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors"
					>
						Start Coding Now
					</button>
				</div>
			</div>

			{isOpen && <AuthModal />}
		</div>
	);
}
