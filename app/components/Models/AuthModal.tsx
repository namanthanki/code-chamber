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
			<div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50">
				<div className="relative w-full max-w-md mx-auto">
					<div className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 rounded-lg shadow-xl">
						<button
							onClick={close}
							className="absolute top-3 right-3 text-gray-400 hover:text-white"
						>
							<IoClose className="h-6 w-6" />
						</button>

						<div className="px-6 py-8">
							<h2 className="text-3xl font-bold text-center text-white mb-6">
								{type === "signin"
									? "Sign In"
									: type === "signup"
									? "Sign Up"
									: "Reset Password"}
							</h2>

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
		</>
	);
}
