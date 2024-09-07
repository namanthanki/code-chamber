"use client";
import FeatureCard from "../components/Cards/FeatureCard";
import AuthModal from "../components/Models/AuthModal";
import Navbar from "../components/Navbar";
import { useAuthModalStore } from "../stores/authModalStore";
import { FaCode, FaUsers, FaTrophy } from "react-icons/fa";

export default function Auth() {
	const { isOpen } = useAuthModalStore();

	return (
		<div className="bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 min-h-screen relative flex flex-col">
			<Navbar />
			<div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl w-full space-y-8">
					<div className="text-center">
						<h1 className="text-5xl font-extrabold text-white mb-4">
							Welcome to{" "}
							<span className="text-indigo-400">
								Code Chamber
							</span>
						</h1>
						<p className="text-xl text-gray-300 mb-8">
							Sharpen your coding skills and conquer challenges.
							Your journey to becoming a coding master starts
							here.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						<FeatureCard
							icon={<FaCode className="w-10 h-10" />}
							title="50+ Challenges"
							description="From easy to hard, covering various algorithms and data structures."
						/>
						<FeatureCard
							icon={<FaUsers className="w-10 h-10" />}
							title="Active Community"
							description="Discuss solutions, learn from peers, and grow together."
						/>
						<FeatureCard
							icon={<FaTrophy className="w-10 h-10" />}
							title="Compete & Win"
							description="Join contests, climb the leaderboard, and showcase your skills."
						/>
					</div>

					<div className="mt-10 text-center">
						<button
							onClick={() =>
								useAuthModalStore.setState({ isOpen: true })
							}
							className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
						>
							Get Started
						</button>
					</div>
				</div>
			</div>

			{isOpen && <AuthModal />}
		</div>
	);
}
