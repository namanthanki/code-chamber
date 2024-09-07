"use client";

import Link from "next/link";
import { useAuthModalStore } from "../stores/authModalStore";
import { FaCode } from "react-icons/fa";

export default function Navbar() {
	const { open } = useAuthModalStore();

	return (
		<nav className="bg-gray-900 shadow-md">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<Link
						href="/"
						className="flex items-center text-white text-xl font-bold"
					>
						<FaCode className="h-8 w-8 text-indigo-500 mr-2" />
						Code Chamber
					</Link>
					<div className="flex items-center">
						<button
							className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
							onClick={open}
						>
							Sign In
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
}
