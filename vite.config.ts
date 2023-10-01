import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx, defineManifest } from "@crxjs/vite-plugin";

const manifest = defineManifest({
	manifest_version: 3,
	name: "Help me out",
	version: "1.0.0",
	icons: {
		"16": "images/abstract-logo-normal.png",
		"32": "images/abstract-logo-normal.png",
		"48": "images/abstract-logo-normal.png",
		"128": "images/abstract-logo-normal.png",
	},
	host_permissions: ["http://*/*", "https://*/'*"],
	permissions: ["scripting", "tabs", "activeTab"],
	action: { default_popup: "index.html", default_title: "Help Me Out - Screen Video Recorder" },
	content_scripts: [
		{
			js: ["src/content_scripts/main_script.ts"],
			matches: ["https://*/*"],
		},
	],
	background: {
		service_worker: "src/service_worker/main_worker.ts",
	},
	web_accessible_resources: [
		{
			matches: ["https://*/*"],
			resources: ["images/logo-normal.png", "images/settings.svg", "images/close.svg", "images/pause.svg", "images/stop.svg", "images/camera.svg", "images/trash.svg", "images/microphone.svg", "images/camera-slash.svg", "images/microphone-slash.svg", "images/play.svg"],
		},
	],
});

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		crx({
			manifest,
		}),
	],
});
