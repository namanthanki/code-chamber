import { AiOutlineFullscreen, AiOutlineSetting } from "react-icons/ai";

export default function PreferenceNavbar() {
	return (
		<div className="flex items-center justify-between bg-gray-800 h-11 w-full px-4">
			<div className="flex items-center text-gray-300">
				<button className="flex cursor-pointer items-center rounded-lg focus:outline-none bg-gray-700 hover:bg-gray-600 px-3 py-1.5 text-sm font-medium transition-colors duration-200">
					<div className="flex items-center">
						<div className="text-gray-300">JavaScript</div>
					</div>
				</button>
			</div>

			<div className="flex items-center space-x-4">
				<button className="relative rounded-lg p-2 text-gray-400 hover:bg-gray-700 transition-colors duration-200 group">
					<AiOutlineSetting className="h-5 w-5" />
					<div className="absolute w-auto p-2 text-sm m-2 min-w-max right-0 top-10 z-10 rounded-md shadow-md text-gray-300 bg-gray-800 origin-top-right scale-0 transition-all duration-200 ease-out group-hover:scale-100">
						Settings
					</div>
				</button>

				<button className="relative rounded-lg p-2 text-gray-400 hover:bg-gray-700 transition-colors duration-200 group">
					<AiOutlineFullscreen className="h-5 w-5" />
					<div className="absolute w-auto p-2 text-sm m-2 min-w-max right-0 top-10 z-10 rounded-md shadow-md text-gray-300 bg-gray-800 origin-top-right scale-0 transition-all duration-200 ease-out group-hover:scale-100">
						Full Screen
					</div>
				</button>
			</div>
		</div>
	);
}
