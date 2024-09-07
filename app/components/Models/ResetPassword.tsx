"use client";

export default function ResetPassword() {
	return (
		<form className="space-y-6">
			<p className="text-sm text-gray-300">
				Enter your email address below, and we&apos;ll send you instructions
				to reset your password.
			</p>
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
			<button
				type="submit"
				className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition duration-300"
			>
				Reset Password
			</button>
		</form>
	);
}
