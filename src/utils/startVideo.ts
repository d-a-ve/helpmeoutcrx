import { Options } from "../components/Popup/Popup";

const startRecording = (options:Options) => {
	console.log("Started recoding 1");
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		console.log("Started recoding 2");
		if (tabs[0] && tabs[0].id !== undefined) {
			// to send message to the content script about the tab
      const message = {
        action: "recording",
        payload: {
          ...options
        }
      }
			chrome.tabs.sendMessage(
				tabs[0].id,
				message,
				(response) => {
					console.log(response, "response");
          console.log(chrome.runtime);
					if (!chrome.runtime.lastError) {
						console.log(response);
					} else {
						console.log(chrome.runtime.lastError, "error in startVideo.ts");
					}
				}
			);
		}
	});
};

export default startRecording;
