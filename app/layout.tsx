import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Code Chamber",
	description: "Code Solving Platform",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Toaster
					position="top-right"
					toastOptions={{
						className: "bg-gray-800 text-white",
						success: {
							className: "bg-green-500",
						},
						error: {
							className: "bg-red-500",
						},
					}}
				/>
				{children}
			</body>
		</html>
	);
}
