"use client";

import { useAuthModalStore } from "@/app/stores/authModalStore";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../LoadingSpinner";
import { useEffect } from "react";
import { useSignInModalStore } from "@/app/stores/signInModalStore";
import { useRouter } from "next/navigation";

export default function SignIn() {
	const router = useRouter();
	const { setType, close } = useAuthModalStore();
	const {
		formData,
		errors,
		isLoading,
		setIsLoading,
		handleInputChange,
		validateField,
		resetErrors,
		resetForm,
	} = useSignInModalStore();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		resetErrors();
		setIsLoading(true);

		validateField("email");
		validateField("password");

		if (Object.values(errors).every((error) => error === "")) {
			try {
				await axios.post("/api/users/login", formData);
				toast.success("Sign in successful.");
				close();
				router.push("/profile");
			} catch (error: any) {
				toast.error(error.response.data.error);
			} finally {
				resetErrors();
				resetForm();
			}
		}

		setIsLoading(false);
	};

	useEffect(() => {
		const delayValidation = setTimeout(() => {
			Object.keys(formData).forEach((field) => {
				if (formData[field as keyof typeof formData]) {
					validateField(field as keyof typeof formData);
				}
			});
		}, 500);

		return () => clearTimeout(delayValidation);
	}, [formData]);

	return (
		<form className="space-y-6" onSubmit={handleSubmit}>
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
					value={formData.email}
					onChange={handleInputChange}
					className={`mt-1 block w-full px-3 py-2 bg-gray-800 border ${
						errors.email ? "border-red-500" : "border-gray-700"
					} rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
						errors.email
							? "focus:ring-red-500"
							: "focus:ring-indigo-500"
					} focus:border-transparent transition duration-300`}
					placeholder="Enter your email"
				/>
				{errors.email && (
					<p className="mt-1 text-sm text-red-500">{errors.email}</p>
				)}
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
					value={formData.password}
					onChange={handleInputChange}
					className={`mt-1 block w-full px-3 py-2 bg-gray-800 border ${
						errors.password ? "border-red-500" : "border-gray-700"
					} rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
						errors.password
							? "focus:ring-red-500"
							: "focus:ring-indigo-500"
					} focus:border-transparent transition duration-300`}
					placeholder="Enter your password"
				/>
				{errors.password && (
					<p className="mt-1 text-sm text-red-500">
						{errors.password}
					</p>
				)}
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
					className={`px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition duration-300
					${isLoading && "opacity-70 cursor-not-allowed"}`}
					disabled={isLoading}
				>
					{isLoading ? (
						<>
							<LoadingSpinner size="small" />
							<span className="ml-2">Signing In...</span>
						</>
					) : (
						"Sign In"
					)}
				</button>
			</div>
			<div className="text-sm text-center">
				<span className="text-gray-400">
					Don&apos;t have an account?{" "}
				</span>
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
