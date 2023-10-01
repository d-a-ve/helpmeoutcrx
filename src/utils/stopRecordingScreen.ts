const stopRecordingScreen = () => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		if (tabs[0] && tabs[0].id !== undefined) {
			chrome.tabs.sendMessage(
				tabs[0].id,
				{ action: "stop_recording" },
				(response) => {
					console.log(response, "response");
					if (!chrome.runtime.lastError) {
						console.log(response);
					} else {
						console.log(
							chrome.runtime.lastError,
							"error line in stopRecordingScreen.ts"
						);
					}
				}
			);
		}
	});
};

export default stopRecordingScreen;
