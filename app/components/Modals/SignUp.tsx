"use client";

import { useAuthModalStore } from "@/app/stores/authModalStore";
import { useSignUpModalStore } from "@/app/stores/signUpModalStore";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../LoadingSpinner";
import { useEffect } from "react";

export default function SignUp() {
	const { setType } = useAuthModalStore();
	const {
		formData,
		errors,
		isLoading,
		setIsLoading,
		handleInputChange,
		validateField,
		resetErrors,
		resetForm,
	} = useSignUpModalStore();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		resetErrors();
		setIsLoading(true);

		validateField("name");
		validateField("email");
		validateField("password");

		if (Object.values(errors).every((error) => error === "")) {
			try {
				await axios.post("/api/users/register", formData);
				toast.success("Sign up successful. Please check your email.");
				setType("signin");
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
					htmlFor="name"
					className="block text-sm font-medium text-gray-300"
				>
					Display Name
				</label>
				<input
					type="text"
					name="name"
					id="name"
					value={formData.name}
					onChange={handleInputChange}
					className={`mt-1 block w-full px-3 py-2 bg-gray-800 border ${
						errors.name ? "border-red-500" : "border-gray-700"
					} rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
						errors.name
							? "focus:ring-red-500"
							: "focus:ring-indigo-500"
					} focus:border-transparent transition duration-300`}
					placeholder="John Doe"
				/>
				{errors.name && (
					<p className="mt-1 text-sm text-red-500">{errors.name}</p>
				)}
			</div>
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
			<button
				type="submit"
				className={`w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md transition duration-300 ${
					isLoading && "opacity-70 cursor-not-allowed"
				}`}
				disabled={isLoading}
			>
				{isLoading ? (
					<>
						<LoadingSpinner size="small" />
						<span className="ml-2">Signing Up...</span>
					</>
				) : (
					"Sign Up"
				)}
			</button>
			<div className="text-sm text-center">
				<span className="text-gray-400">Already have an account? </span>
				<button
					type="button"
					className="text-indigo-400 hover:text-indigo-300 transition duration-300"
					onClick={() => setType("signin")}
				>
					Sign In
				</button>
			</div>
		</form>
	);
}
