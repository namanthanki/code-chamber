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
		<div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
			<div className="text-indigo-400 mb-4">{icon}</div>
			<h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
			<p className="text-gray-300">{description}</p>
		</div>
	);
}
