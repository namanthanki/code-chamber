"use client";

import Link from "next/link";
import { useAuthModalStore } from "../stores/authModalStore";

export default function Navbar() {
	const { open } = useAuthModalStore();

	return (
		<nav className="flex items-center justify-between sm:px-12 px-2 md:px-24">
			<Link
				href={"/"}
				className="flex items-center justify-center text-white h-20"
			>
				Code Chamber
			</Link>
			<div className="flex items-center">
				<button
					className="bg-brand-orange text-white px-2 py-1 sm:px-4 rounded-md text-sm font-medium hover:text-brand-orange hover:bg-white hover:border-2 hover:border-brand-orange border-2 border-transparent transition duration-300 ease-in-out"
					onClick={open}
				>
					Sign In
				</button>
			</div>
		</nav>
	);
}
