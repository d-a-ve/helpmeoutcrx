import { useState } from "react";

interface ToggleProps {
	toggleName: string;
}

const Toggle = ({ toggleName }: ToggleProps) => {
	const [toggleState, setToggleState] = useState(false);

	return (
		<label className="flex items-center cursor-pointer">
			<div className="relative">
				<input
					type="checkbox"
					className="hidden"
					checked={toggleState}
					name={toggleName}
					onChange={() => {
						setToggleState((prev) => !prev);
					}}
				/>
				<div
					className={`w-10 h-6 rounded-full shadow-inner transition duration-300 ${
						toggleState ? "bg-primary" : "bg-primary-200 "
					}`}></div>
				<div
					className={`transition-[left] duration-300 absolute w-4 h-4 bg-slate-50 rounded-full shadow top-1/2 -translate-y-1/2 ${
						toggleState ? "left-toggle-knob" : "left-[4px]"
					}`}></div>
			</div>
		</label>
	);
};

export default Toggle;
