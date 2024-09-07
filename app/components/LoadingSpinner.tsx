import React from "react";

interface LoadingSpinnerProps {
	size?: "small" | "medium" | "large";
	color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
	size = "medium",
	color = "text-white",
}) => {
	const sizeClasses = {
		small: "w-4 h-4",
		medium: "w-6 h-6",
		large: "w-8 h-8",
	};

	return (
		<div
			className={`inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] ${sizeClasses[size]} ${color} motion-reduce:animate-[spin_1.5s_linear_infinite]`}
			role="status"
		>
			<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
				Loading...
			</span>
		</div>
	);
};

export default LoadingSpinner;
