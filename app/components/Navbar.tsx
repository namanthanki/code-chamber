"use client";

import Link from "next/link";
import { useAuthModalStore } from "../stores/authModalStore";
import { FaChevronLeft, FaChevronRight, FaCode } from "react-icons/fa";
import { useAuthStore } from "../stores/authStore";
import {
	useParams,
	usePathname,
	useRouter,
	useSearchParams,
} from "next/navigation";
import { useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import { BsList } from "react-icons/bs";
import Timer from "./Timer/Timer";
import { problems } from "../utils/problems";
import { Problem } from "../utils/types/problem";

export default function Navbar() {
	const { open } = useAuthModalStore();
	const router = useRouter();
	const { pid } = useParams();
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

	const handleProblemChange = (isForward: boolean) => {
		const { order } = problems[pid as string] as Problem;
		const direction = isForward ? 1 : -1;
		const nextProblemOrder = order + direction;
		const nextProblemKey = Object.keys(problems).find(
			(key) => problems[key].order === nextProblemOrder
		);

		if (isForward && !nextProblemKey) {
			const firstProblemKey = Object.keys(problems).find(
				(key) => problems[key].order === 1
			);
			router.push(`/problems/${firstProblemKey}`);
		} else if (!isForward && !nextProblemKey) {
			const lastProblemKey = Object.keys(problems).find(
				(key) => problems[key].order === Object.keys(problems).length
			);
			router.push(`/problems/${lastProblemKey}`);
		} else {
			router.push(`/problems/${nextProblemKey}`);
		}
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
							<div
								onClick={() => handleProblemChange(false)}
								className="flex items-center justify-center bg-dark-fill-3 hover:bg-dark-fill-2 rounded h-7 w-7 cursor-pointer"
							>
								<FaChevronLeft color="lightgray" />
							</div>
							<Link
								href="/problems"
								className="flex items-center gap-2 font-medium max-w-[170px] text-dark-gray-8 cursor-pointer"
							>
								<BsList />
								Problem List
							</Link>
							<div
								onClick={() => handleProblemChange(true)}
								className="flex items-center justify-center bg-dark-fill-3 hover:bg-dark-fill-2 rounded h-7 w-7 cursor-pointer"
							>
								<FaChevronRight color="lightgray" />
							</div>
						</div>
					)}

					{isLoading ? (
						<LoadingSpinner />
					) : isLoggedIn ? (
						<div className="flex items-center">
							<p
								style={{ cursor: "pointer" }}
								onClick={() => router.push("/profile")}
								className="text-white mr-4"
							>
								{user?.name}
							</p>
							{isInProblemPage && (
								<div className="text-gray-300">
									<Timer />
								</div>
							)}
							<button
								onClick={() => router.push("/problems")}
								className="ml-4 bg-indigo-500 text-white px-4 py-2 rounded-md"
							>
								Explore
							</button>
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
