"use client";

import Link from "next/link";
import { useAuthModalStore } from "../stores/authModalStore";
import { FaCode } from "react-icons/fa";
import { useAuthStore } from "../stores/authStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

export default function Navbar() {
	const { open } = useAuthModalStore();
	const router = useRouter();
	const pathname = usePathname();
	const {
		isLoading,
		isLoggedIn,
		user,
		setIsLoading,
		setIsLoggedIn,
		setUser,
	} = useAuthStore();

	useEffect(() => {
		const checkLoggedIn = async () => {
			setIsLoading(true);
			try {
				const response = await axios.get("/api/users/me");
				setIsLoggedIn(true);
				setUser(response.data.user);
			} catch (error) {
				console.log(error);
			}
			setIsLoading(false);
		};

		checkLoggedIn();
	}, [pathname]);

	const handleLogout = async () => {
		setIsLoading(true);
		try {
			await axios.get("/api/users/logout");
			setIsLoggedIn(false);
			setUser(null);
			router.push("/");
		} catch (error) {
			console.log(error);
		}
		setIsLoading(false);
	};

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
					{isLoading ? (
						<LoadingSpinner />
					) : isLoggedIn ? (
						<div className="flex items-center">
							<p className="text-white mr-4">
								Welcome, {user?.name}
							</p>
							<button
								onClick={handleLogout}
								className="ml-4 bg-red-500 text-white px-4 py-2 rounded-md"
							>
								Logout
							</button>
						</div>
					) : (
						<button
							onClick={open}
							className="bg-indigo-500 text-white px-4 py-2 rounded-md"
						>
							Login
						</button>
					)}
				</div>
			</div>
		</nav>
	);
}
