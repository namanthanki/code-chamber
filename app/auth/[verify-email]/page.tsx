"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

export default function VerifyEmail() {
	const [isVerifying, setIsVerifying] = useState(true);
	const [isSuccess, setIsSuccess] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();
	const params = useSearchParams();
	const token = params.get("token");

	useEffect(() => {
		const verifyEmail = async () => {
			if (token) {
				try {
					await new Promise((resolve) => setTimeout(resolve, 2000));

					setIsSuccess(true);
				} catch (err) {
					setError(
						"Failed to verify email. The link may be invalid or expired."
					);
				} finally {
					setIsVerifying(false);
				}
			} else {
				setError("No verification token found.");
				setIsVerifying(false);
			}
		};

		verifyEmail();
	}, [token]);

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8 bg-gray-800 p-10 rounded-xl shadow-lg text-center">
				{isVerifying ? (
					<div>
						<h2 className="mt-6 text-3xl font-extrabold text-white">
							Verifying your email
						</h2>
						<p className="mt-2 text-sm text-gray-400">
							Please wait while we verify your email address...
						</p>
					</div>
				) : isSuccess ? (
					<div>
						<FaCheckCircle className="mx-auto h-12 w-12 text-green-400" />
						<h2 className="mt-6 text-3xl font-extrabold text-white">
							Email Verified
						</h2>
						<p className="mt-2 text-sm text-gray-400">
							Your email has been successfully verified. You can
							now close this page.
						</p>
					</div>
				) : (
					<div>
						<FaTimesCircle className="mx-auto h-12 w-12 text-red-400" />
						<h2 className="mt-6 text-3xl font-extrabold text-white">
							Verification Failed
						</h2>
						<p className="mt-2 text-sm text-red-400">{error}</p>
					</div>
				)}
				{!isVerifying && (
					<button
						onClick={() => router.push("/")}
						className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Go to Homepage
					</button>
				)}
			</div>
		</div>
	);
}
