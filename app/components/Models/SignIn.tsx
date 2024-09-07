"use client";

import { useAuthModalStore } from "@/app/stores/authModalStore";

export default function SignIn() {
	const { setType } = useAuthModalStore();

	return (
		<form className="space-y-6">
			<div>
				<label
					htmlFor="email"
					className="block text-sm font-medium text-gray-300"
				>
					Email
				</label>
				<input
					type="email"
					name="email"
					id="email"
					className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
					placeholder="Enter your email"
				/>
			</div>
			<div>
				<label
					htmlFor="password"
					className="block text-sm font-medium text-gray-300"
				>
					Password
				</label>
				<input
					type="password"
					name="password"
					id="password"
					className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
					placeholder="Enter your password"
				/>
			</div>
			<div className="flex items-center justify-between">
				<button
					type="button"
					className="text-sm text-indigo-400 hover:text-indigo-300"
					onClick={() => setType("reset-password")}
				>
					Forgot Password?
				</button>
				<button
					type="submit"
					className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition duration-300"
				>
					Sign In
				</button>
			</div>
			<div className="text-sm text-center">
				<span className="text-gray-400">Don&apos;t have an account? </span>
				<button
					type="button"
					className="text-indigo-400 hover:text-indigo-300"
					onClick={() => setType("signup")}
				>
					Sign Up
				</button>
			</div>
		</form>
	);
}
