// app/components/CodeEditor/CodeMirror.tsx
"use client";

import { useEffect, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { tokyoNightStorm } from "@uiw/codemirror-theme-tokyo-night-storm";

type CodeMirrorEditorProps = {
	value: string;
	onChange: (value: string) => void;
	height?: string;
};

export default function CodeMirrorEditor({
	value,
	onChange,
	height = "300px",
}: CodeMirrorEditorProps) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<CodeMirror
			value={value}
			height={height}
			theme={tokyoNightStorm}
			extensions={[javascript({ jsx: true })]}
			onChange={onChange}
			className="text-sm"
		/>
	);
}
