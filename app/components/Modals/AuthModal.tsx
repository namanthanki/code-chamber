"use client";
import { IoClose } from "react-icons/io5";
import SignUp from "./SignUp";
import { useAuthModalStore } from "@/app/stores/authModalStore";
import SignIn from "./SignIn";
import ResetPassword from "./ResetPassword";

export default function AuthModal() {
	const { type, close } = useAuthModalStore();

	return (
		<>
			<div className="fixed inset-0 z-50 flex items-center justify-center">
				<div className="fixed inset-0 bg-black opacity-75"></div>

				<div className="relative w-full max-w-md mx-4">
					<div className="relative bg-gray-800 rounded-lg shadow-2xl">
						<button
							onClick={close}
							className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
						>
							<IoClose className="h-6 w-6" />
						</button>

						<div className="px-8 py-10">
							<h2 className="text-3xl font-bold text-center text-white mb-8">
								{type === "signin"
									? "Welcome Back"
									: type === "signup"
									? "Create Account"
									: "Reset Password"}
							</h2>

							<div className="w-full">
								{type === "signin" ? (
									<SignIn />
								) : type === "signup" ? (
									<SignUp />
								) : type === "reset-password" ? (
									<ResetPassword />
								) : null}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
