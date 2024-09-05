export default function SignUp() {
	return (
		<form className="space-y-5 px-6 pb-6">
			<h3 className="text-xl font-medium text-white">
				Create Your Account
			</h3>
			<div>
				<label
					htmlFor="email"
					className="text-sm font-medium block mb-2 text-gray-300"
				>
					Email
				</label>
				<input
					type="email"
					name="email"
					id="email"
					className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder:gray-400 text-white"
					placeholder="Enter your email"
				/>
			</div>
			<div>
				<label
					htmlFor="displayName"
					className="text-sm font-medium block mb-2 text-gray-300"
				>
					Display Name
				</label>
				<input
					type="displayName"
					name="displayName"
					id="displayName"
					className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder:gray-400 text-white"
					placeholder="John Doe"
				/>
			</div>
			<div>
				<label
					htmlFor="password"
					className="text-sm font-medium block mb-2 text-gray-300"
				>
					Password
				</label>
				<input
					type="password"
					name="password"
					id="password"
					className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder:gray-400 text-white"
					placeholder="Enter your password"
				/>
			</div>
			<div className="text-sm font-medium text-gray-500">
				Already Have an Account?{" "}
				<a href="#" className="text-blue-700 hover:underline">
					Sign In
				</a>
			</div>
		</form>
	);
}
