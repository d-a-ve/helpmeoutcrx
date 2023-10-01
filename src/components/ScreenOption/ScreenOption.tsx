import { ChangeEvent, ReactNode, useState } from "react";

interface ScreenOptionProps {
	icon: ReactNode;
	screenOptionTitle: string;
	optionName: string;
	value: string;
  activeTab: string;
  handleChange: (e:ChangeEvent<HTMLInputElement>) => void
}

const ScreenOption = ({
	icon,
	screenOptionTitle,
	optionName,
	value,
  activeTab,
  handleChange
}: ScreenOptionProps) => {
  const active = activeTab === value;

	return (
		<label htmlFor={value}>
			<input
				id={value}
				type="radio"
				className="hidden"
				checked={active}
				name={optionName}
				value={value}
				onChange={handleChange}
			/>
			<div
				className={`flex flex-col gap-2 items-center justify-center cursor-pointer ${
					active ? "text-primary font-semibold" : "text-primary-200"
				}`}>
				{icon}
				<p>{screenOptionTitle}</p>
			</div>
		</label>
	);
};

export default ScreenOption;
