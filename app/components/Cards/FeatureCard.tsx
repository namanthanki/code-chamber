type FeatureCardProps = {
	icon: React.ReactNode;
	title: string;
	description: string;
};

export default function FeatureCard({
	icon,
	title,
	description,
}: FeatureCardProps) {
	return (
		<div className="bg-gray-800 hover:bg-gray-700 transition-colors rounded-lg p-8">
			<div className="flex flex-col items-center">
				<div className="text-blue-500 mb-4">{icon}</div>
				<h3 className="text-xl font-semibold text-white mb-3">
					{title}
				</h3>
				<p className="text-gray-300 text-center">{description}</p>
			</div>
		</div>
	);
}
