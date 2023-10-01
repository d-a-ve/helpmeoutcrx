import { Options } from "../components/Popup/Popup";
import { createDomElement } from "../createElement";

// create an element and add the shadow dom to it
const shadow = createDomElement("<div id='shadow-root'></div");
const shadowDom = shadow.attachShadow({ mode: "open" });
document.body.append(shadow);

// using var because when the chrome browser injects this on every toolbar, it will reassign it and this will cause an error
var recorder: MediaRecorder | null = null;

// create websockets connection

const onAccessApproved = (stream: MediaStream) => {
	let ws = new WebSocket("ws://martdev.tech:3000");

	console.log("I have instantiated the ws connection")
	ws.onopen = () => {
		console.log("Web Sockets connection started!");
		recorder = new MediaRecorder(stream, { mimeType: "video/webm" });

		recorder.start(5000); // collect 100ms of data blob

		// show the recording controls
		recordingControls();

		// a listener to stop the recording
		recorder.onstop = () => {
			stream.getTracks().forEach((track) => {
				console.log(track);
				if (track.readyState === "live") {
					track.stop();
				}
			});

			// Here, you can add what to do once recording has stopped
			// such as sending a post request that recording has ended so
			// compiling can begin

			// remove the shadow dom once stopped
			shadow.remove();

			// close web socket connection
			ws.close();
		};

		// do something with the recorded blob data
		recorder.ondataavailable = async (event) => {
			let recordedBlob = event.data;
			console.log("Event data", event.data);

			ws.send(recordedBlob);
			console.log("data has been sent");
			// const blobWebM = new Blob([recordedBlob], { type: "video/webm" });
			// console.log("blob", blobWebM);
			// if (!blobWebM) return;

			// // this is where you put the post api call to send the blob to the backend
			// console.log("url", URL.createObjectURL(blobWebM));
			// const message = {
			// 	action: "redirect",
			// 	payload: {
			// 		url: URL.createObjectURL(blobWebM),
			// 	},
			// };

			// const backgroundMessage = await chrome.runtime.sendMessage(message);
			// console.log("backgroundMessage", backgroundMessage);
		};
	};

	// when BE sends a message;
	ws.onmessage = (event) => {
		console.log("event", event);
	}

	ws.onclose = () => {
		console.log("Ws connection closed");
	}
};

console.log("content scripts ran!!");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	console.log(request);
	// listens to a recording action
	if (request.action === "recording") {
		const { payload }: { payload: Options } = request;
		// Perform action on receiving message
		console.log("requesting recording");

		const surface = payload.activeScreen === "tab" ? "browser" : "monitor";
		const mic = payload.audio ? true : false;
		const camera = payload.camera ? true : false;
		sendResponse(`Processing: ${request.action}`);
		// screen record starts here
		// navigator.mediaDevices
		// 	.getUserMedia({ video: true, audio: true })
		// 	.then((stream) => {
		// 		console.log("got stream");
		// 		console.log(stream);
		// 		onAccessApproved(stream);
		// 	})
		// 	.catch((error) => {
		// 		console.error(error);
		// 		sendResponse({ success: false });
		// 	});

		// // screen record starts here
		navigator.mediaDevices
			.getDisplayMedia({
				video: {
					displaySurface: surface,
				} as MediaTrackConstraints,
				audio: mic,
			})
			.then((stream) => {
				console.log("got stream");
				console.log(stream);
				onAccessApproved(stream);
			})
			.catch((error) => {
				console.error(error);
				sendResponse({ success: false });
			});
	}

	// checks for the stop-recording aaction
	if (request.action === "stop_recording") {
		// Perform action on receiving message
		console.log("stopping recording");

		sendResponse(`Stopping: ${request.action}`);
		if (!recorder) return console.log("No recorder found!");

		recorder.stop();
	}
});

// icons used for the controls
const getURL = chrome.runtime.getURL ?? ((path: string) => path);
const pauseIcon = getURL("/images/pause.svg");
const playIcon = getURL("/images/play.svg");
const stopIcon = getURL("/images/stop.svg");
const cameraIcon = getURL("/images/camera.svg");
const cameraSlashIcon = getURL("/images/camera-slash.svg");
const micIcon = getURL("/images/microphone.svg");
const micSlashIcon = getURL("/images/microphone-slash.svg");
const trashIcon = getURL("/images/trash.svg");

const recordScreenControlsDataHTML = `
<div style="display: flex; align-items: center; gap: 16px; padding: 16px; color: white;">
  <p style="font-weight: bold; font-size: medium;">00:03:45</p>
  <!-- a pulsing effect showing that the video is live -->
  <span class="pulse" style="background-color: red; height: 8px; width: 8px; border-radius: 50%; position: relative;"></span>
  <style>
    /* Pulsing effect animation */
    @keyframes pulse {
      0% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.5;
        transform: scale(1.5);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
    .pulse::after {
      content: "";
      width: 16px;
      height: 16px;
      opacity: 1;
      animation: pulse 1s infinite;
      position: absolute;
      background-color: red;
      border-radius: 50%;
      left: -50%;
      top: -50%;
    }
  </style>
</div>
`;

const recordScreenControlsSeparatorHTML = `
		<div style="background-color: white; height: 40px; width: 2px; border-radius: 10px; margin-left: 16px;"></div>
`;

const recordScreenControlsHTML = `
	<div style="margin-left: 32px; display: flex; gap: 24px; align-items: flex-start;">

		<div style="display: grid; gap: 4px; place-items: center;">
  <button id="pausePlayBtn" style="display: flex; width: 40px; height: 40px; cursor:pointer; align-items: center; justify-content: center; border-radius: 50%;border-color:transparent;  outline:none; background-color:#FFF; color:#0d0833;">
    <span style="width:20px; height:20px;"><img src=${pauseIcon} alt="Pause Icon" style="width:100%; height:100%;"/></span>
  </button>
  <p style="font-size: 12px; margin:0; color: #ffffff;">Pause</p>
	</div>
		<div style="display: grid; gap: 4px; place-items: center;">
  <button id="stopBtn" style="display: flex; width: 40px; height: 40px; cursor:pointer; align-items: center; justify-content: center; border-radius: 50%;border-color:transparent;  outline:none; background-color:#FFF; color:#0d0833;">
    <span style="width:20px; height:20px;"><img src=${stopIcon} alt="Stop Icon" style="width:100%; height:100%;"/></span>
  </button>
  <p style="font-size: 12px; margin:0; color: #ffffff;">Stop</p>
	</div>
		<div style="display: grid; gap: 4px; place-items: center;">
  <button id="cameraBtn" style="display: flex; width: 40px; height: 40px; cursor:pointer; align-items: center; justify-content: center; border-radius: 50%;border-color:transparent;  outline:none; background-color:#FFF; color:#0d0833;">
    <span style="width:20px; height:20px;"><img src=${cameraIcon} alt="Camera Icon" style="width:100%; height:100%;"/></span>
  </button>
  <p style="font-size: 12px; margin:0; color: #ffffff;">Camera</p>
	</div>
		<div style="display: grid; gap: 4px; place-items: center;">
  <button id="micBtn" style="display: flex; width: 40px; height: 40px; cursor:pointer; align-items: center; justify-content: center; border-radius: 50%;border-color:transparent;  outline:none; background-color:#FFF; color:#0d0833;">
    <span style="width:20px; height:20px;"><img src=${micIcon} alt="Microphone Icon" style="width:100%; height:100%;"/></span>
  </button>
  <p style="font-size: 12px; margin:0; color: #ffffff;">Mic</p>
	</div>
		<div style="display: grid; gap: 4px; place-items: center;">
  <button id="trashBtn" style="display: flex; width: 40px; height: 40px; cursor:pointer; align-items: center; justify-content: center; border-radius: 50%;border-color:transparent; outline:none; background-color:#4b4b4b; color:#BEBEBE;">
    <span style="width:20px; height:20px;"><img src=${trashIcon} alt="Trash Icon" style="width:100%; height:100%;"/></span>
  </button>
	</div> 
</div>
`;

const recordScreenControlsWrapperHTML = `
<div style="display: flex; position:fixed; left: 20px; bottom: 20px; z-index:1000; align-items: center; justify-content: center; background-color: #020202; padding-left: 16px; padding-right: 40px; border-radius: 100px;">
		${recordScreenControlsDataHTML}
		${recordScreenControlsSeparatorHTML}
		${recordScreenControlsHTML}
</div>
`;
// the recording controls

function recordingControls() {
	const controlsWrapper = document.createElement("div");
	controlsWrapper.innerHTML = recordScreenControlsWrapperHTML;
	shadowDom.appendChild(controlsWrapper);

	const pausePlayBtn = shadowDom.getElementById("pausePlayBtn");
	const stopBtn = shadowDom.getElementById("stopBtn");
	const cameraBtn = shadowDom.getElementById("cameraBtn");
	const micBtn = shadowDom.getElementById("micBtn");
	const trashBtn = shadowDom.getElementById("trashBtn");

	console.log(pausePlayBtn, stopBtn, cameraBtn, micBtn, trashBtn);
	// click handlers
	stopBtn?.addEventListener("click", () => {
		console.log("Recording stopped");
		recorder?.stop();
	});

	pausePlayBtn?.addEventListener("click", (e) => {
		const btnImg = pausePlayBtn.querySelector("img");

		if (btnImg?.src.includes("pause")) {
			btnImg.src = playIcon;
			recorder?.pause();
		} else if (btnImg?.src.includes("play")) {
			btnImg.src = pauseIcon;
			recorder?.resume();
		}
	});
}

export {};
