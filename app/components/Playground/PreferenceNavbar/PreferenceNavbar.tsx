import React, { useEffect, useState } from "react";
import {
	AiOutlineFullscreen,
	AiOutlineFullscreenExit,
	AiOutlineSetting,
} from "react-icons/ai";
import { ISettings } from "../Playground";
import SettingsModal from "../../Modals/SettingsModal";

type PreferenceNavbarProps = {
	settings: ISettings;
	setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
};

export default function PreferenceNavbar({
	settings,
	setSettings,
}: PreferenceNavbarProps) {
	const [isFullScreen, setIsFullScreen] = useState(false);

	const handleFullScreen = () => {
		if (isFullScreen) {
			document.exitFullscreen();
		} else {
			document.documentElement.requestFullscreen();
		}
		setIsFullScreen(!isFullScreen);
	};

	useEffect(() => {
		function exitHandler(e: any) {
			if (!document.fullscreenElement) {
				setIsFullScreen(false);
				return;
			}
			setIsFullScreen(true);
		}

		if (document.addEventListener) {
			document.addEventListener("fullscreenchange", exitHandler);
			document.addEventListener("webkitfullscreenchange", exitHandler);
			document.addEventListener("mozfullscreenchange", exitHandler);
			document.addEventListener("MSFullscreenChange", exitHandler);
		}
	}, [isFullScreen]);

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
				<button
					onClick={() => {
						setSettings({ ...settings, settingsModalOpen: true });
					}}
					className="relative rounded-lg p-2 text-gray-400 hover:bg-gray-700 transition-colors duration-200 group"
				>
					<AiOutlineSetting className="h-5 w-5" />
					<div className="absolute w-auto p-2 text-sm m-2 min-w-max right-0 top-10 z-10 rounded-md shadow-md text-gray-300 bg-gray-800 origin-top-right scale-0 transition-all duration-200 ease-out group-hover:scale-100">
						Settings
					</div>
				</button>

				<button
					onClick={handleFullScreen}
					className="relative rounded-lg p-2 text-gray-400 hover:bg-gray-700 transition-colors duration-200 group"
				>
					{!isFullScreen ? (
						<AiOutlineFullscreen className="h-5 w-5" />
					) : (
						<AiOutlineFullscreenExit className="h-5 w-5" />
					)}
					<div className="absolute w-auto p-2 text-sm m-2 min-w-max right-0 top-10 z-10 rounded-md shadow-md text-gray-300 bg-gray-800 origin-top-right scale-0 transition-all duration-200 ease-out group-hover:scale-100">
						{!isFullScreen ? "Full Screen" : "Exit Full Screen"}
					</div>
				</button>
			</div>
			{settings.settingsModalOpen && (
				<SettingsModal settings={settings} setSettings={setSettings} />
			)}
		</div>
	);
}
