"use client";

import Link from "next/link";
import { useAuthModalStore } from "../stores/authModalStore";
import { FaChevronLeft, FaChevronRight, FaCode } from "react-icons/fa";
import { useAuthStore } from "../stores/authStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import { BsList } from "react-icons/bs";
import Timer from "./Timer/Timer";

export default function Navbar() {
	const { open } = useAuthModalStore();
	const router = useRouter();
	const pathname = usePathname();
	const {
		isInProblemPage,
		isLoading,
		isLoggedIn,
		user,
		setIsLoading,
		setIsLoggedIn,
		setIsInProblemPage,
		setUser,
	} = useAuthStore();

	useEffect(() => {
		const checkLoggedIn = async () => {
			setIsLoading(true);
			try {
				const response = await axios.get("/api/users/me");
				setIsLoggedIn(true);
				setUser(response.data.user);
				setIsInProblemPage(
					pathname?.startsWith("/problems/") &&
						pathname !== "/problems"
				);
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
			router.refresh();
		} catch (error) {
			console.log(error);
		}
		setIsLoading(false);
	};

	return (
		<nav className="bg-gray-900 shadow-md">
			<div className="mx-auto px-8">
				<div className="flex items-center justify-between h-16">
					<Link
						href="/"
						className="flex items-center text-white text-xl font-bold"
					>
						<FaCode className="h-8 w-8 text-indigo-500 mr-2" />
						Code Chamber
					</Link>

					{isInProblemPage && (
						<div className="flex items-center gap-4 flex-1 justify-center">
							<div className="flex items-center justify-center bg-dark-fill-3 hover:bg-dark-fill-2 rounded h-7 w-7 cursor-pointer">
								<FaChevronLeft color="lightgray" />
							</div>
							<Link
								href="/problems"
								className="flex items-center gap-2 font-medium max-w-[170px] text-dark-gray-8 cursor-pointer"
							>
								<BsList />
								Problem List
							</Link>
							<div className="flex items-center justify-center bg-dark-fill-3 hover:bg-dark-fill-2 rounded h-7 w-7 cursor-pointer">
								<FaChevronRight color="lightgray" />
							</div>
						</div>
					)}

					{isLoading ? (
						<LoadingSpinner />
					) : isLoggedIn ? (
						<div className="flex items-center">
							<p className="text-white mr-4">
								Welcome, {user?.name}
							</p>
							{isInProblemPage && (
								<div className="text-gray-300">
									<Timer />
								</div>
							)}
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
