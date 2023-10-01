import { FormEvent, useEffect } from "react";
import ToggleWithIconAndText from "../Toggle/ToggleWithIconAndText";
import Button from "../Button/Button";
import ScreenOptions from "../ScreenOption/ScreenOptions";
import startVideo from "../../utils/startVideo";

export interface Options {
	activeScreen: FormDataEntryValue | null;
	camera: FormDataEntryValue | null;
	audio: FormDataEntryValue | null;
}

const getURL = chrome.runtime.getURL ?? ((path: string) => path);
// const getURL = ((path: string) => path);

const logoUrl = getURL("/images/logo-normal.png");
const settingsIcon = getURL("/images/settings.svg");
const closeIcon = getURL("/images/close.svg");

const Popup = () => {
	const submitHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// this is always empty
		const formData = new FormData(e.currentTarget);

		const options: Options = {
			activeScreen: formData.get("active-screen"),
			camera: formData.get("camera"),
			audio: formData.get("audio"),
		};

		startVideo(options);
		// controlsPanel();
	};

	useEffect(() => {
		chrome.runtime.sendMessage(
			"glfojbiepdedlfenininedpnfepckjbo",
			{ action: "Hello" },
			function (response) {
				if (chrome.runtime.lastError) {
					// Receiver does not exist or is not active
					console.error(chrome.runtime.lastError.message);
				} else {
					// Receiver is active and responded
					console.log("Received response:", response);
				}
			}
		);
	}, []);

	return (
		<main className="rounded-3xl w-[300px] p-6 pb-8 shadow-popup bg-white !z-50">
			<div className="mb-8">
				<div className="flex items-center justify-between mb-4">
					<div>
						<img src={logoUrl} alt="Helpmeout Logo" className="w-full h-8" />
					</div>
					<div className="flex gap-3 items-center">
						<img
							src={settingsIcon}
							alt="Helpmeout Logo"
							className="w-5 h-5 cursor-pointer hover:scale-125 transition duration-200"
						/>
						<img
							// onClick={closePopup}
							src={closeIcon}
							alt="Helpmeout Logo"
							className="w-5 h-5 cursor-pointer hover:scale-125 transition duration-200"
						/>
					</div>
				</div>
				<p className="text-xs text-primary-400">
					This extension helps you record and share help videos with ease.
				</p>
			</div>

			<section>
				<form onSubmit={submitHandler}>
					<ScreenOptions />
					<div className="grid gap-6">
						<ToggleWithIconAndText
							icon={
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="100%"
									height="100%"
									viewBox="0 0 24 24"
									fill="none">
									<path
										d="M15.75 10.5L20.4697 5.78033C20.9421 5.30786 21.75 5.64248 21.75 6.31066V17.6893C21.75 18.3575 20.9421 18.6921 20.4697 18.2197L15.75 13.5M4.5 18.75H13.5C14.7426 18.75 15.75 17.7426 15.75 16.5V7.5C15.75 6.25736 14.7426 5.25 13.5 5.25H4.5C3.25736 5.25 2.25 6.25736 2.25 7.5V16.5C2.25 17.7426 3.25736 18.75 4.5 18.75Z"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							}
							text="Camera"
						/>
						<ToggleWithIconAndText
							icon={
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none">
									<path
										d="M12 18.75C15.3137 18.75 18 16.0637 18 12.75V11.25M12 18.75C8.68629 18.75 6 16.0637 6 12.75V11.25M12 18.75V22.5M8.25 22.5H15.75M12 15.75C10.3431 15.75 9 14.4069 9 12.75V4.5C9 2.84315 10.3431 1.5 12 1.5C13.6569 1.5 15 2.84315 15 4.5V12.75C15 14.4069 13.6569 15.75 12 15.75Z"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							}
							text="Audio"
						/>
						<Button type="submit" buttonText="Start Recording" />
					</div>
				</form>
			</section>
		</main>
	);
};

export default Popup;
