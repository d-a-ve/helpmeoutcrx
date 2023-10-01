import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createDomElement } from "./createElement";
import "./index.css"

let rootElement = document.getElementById("crx-root") as HTMLElement;

if (!rootElement) {
	rootElement = createDomElement(`<div id="crx-root"></div>`);
	document.body.append(rootElement);
}

ReactDOM.createRoot(rootElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
