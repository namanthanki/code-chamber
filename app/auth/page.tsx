"use client";
import AuthModal from "../components/Models/AuthModal";
import Navbar from "../components/Navbar";
import { useAuthModalStore } from "../stores/authModalStore";

export default function Auth() {
	const { isOpen } = useAuthModalStore();

	return (
		<div className="bg-gradient-to-b from-gray-700 to-black h-screen relative flex flex-col">
			<Navbar />
			<div className="flex flex-grow items-center justify-center">
				<div className="max-w-2xl mx-auto p-8 bg-white/5 rounded-lg backdrop-blur-lg shadow-lg">
					<h1 className="text-4xl font-bold text-white mb-4">
						Welcome to Code Chamber
					</h1>
					<p className="text-gray-300 text-lg">
						Sharpen your coding skills with our extensive collection
						of coding challenges. Whether you&apos;re a beginner or
						a seasoned pro, Code Chamber has something for everyone.
					</p>
				</div>
			</div>

			{isOpen && <AuthModal />}
		</div>
	);
}
