import { BsChevronUp } from "react-icons/bs";

type EditorFooterProps = {
	handleSubmit: () => void;
};

export default function EditorFooter({ handleSubmit }: EditorFooterProps) {
	return (
		<div className="flex bg-gray-900 absolute bottom-0 z-10 w-full border-t border-gray-800">
			<div className="mx-5 my-[10px] flex justify-between w-full">
				<div className="mr-2 flex flex-1 flex-nowrap items-center space-x-4">
					<button className="px-3 py-1.5 text-sm font-medium items-center transition-all inline-flex bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg">
						Console
						<div className="ml-1 transform transition flex items-center">
							<BsChevronUp className="fill-gray-400 mx-1" />
						</div>
					</button>
				</div>
				<div className="ml-auto flex items-center space-x-4">
					<button className="px-3 py-1.5 text-sm font-medium items-center whitespace-nowrap transition-all focus:outline-none inline-flex bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg">
						Run
					</button>
					<button
						onClick={handleSubmit}
						className="px-3 py-1.5 text-sm font-medium items-center transition-all focus:outline-none inline-flex text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg"
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
}
