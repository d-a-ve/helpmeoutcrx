import { ReactNode, useState } from "react";
import Toggle from "./Toggle";

interface ToggleWithIconAndTextProps {
	text: string;
  icon: ReactNode;
}

const ToggleWithIconAndText = ({ text, icon }: ToggleWithIconAndTextProps) => {

	return (
		<div className="flex items-center justify-between border border-primary py-4 px-6 rounded-xl bg-transparent">
			<div className="flex items-center gap-2 text-primary">
				<div className="w-6 h-6">{icon}</div>
				<span>{text}</span>
			</div>
			<Toggle toggleName={text.toLowerCase()} />
		</div>
	);
};


export default ToggleWithIconAndText;
