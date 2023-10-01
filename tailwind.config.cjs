/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["index.html", "./src/**/*.{js,jsx,ts,tsx,vue,html}"],
	theme: {
		screens: {
			xl: { max: "1279px" },
			lg: { max: "1023px" },
			md: { max: "767px" },
			sm: { max: "479px" },
			xs: { max: "319px" },
		},
		extend: {
			colors: {
				primary: {
					50: "#e7e7ed",
					100: "#b6b3c6",
					200: "#928fab",
					300: "#605c84",
					400: "#413c6d",
					DEFAULT: "#120b48",
					600: "#100a42",
					700: "#0d0833",
					800: "#0a0628",
					900: "#08051e",
				},
			},
			spacing: {
				"toggle-knob": "calc(100% - 20px)",
			},
			fontSize: {
				xxs: "var(--sub-h3-fs)",
				xs: "var(--body-3-fs)",
				fmd: "var(--sub-h2-fs)",
			},
			boxShadow: {
				popup: "0px 4px 20px 0px rgba(0, 0, 0, 0.10);",
			},
		},
	},
	important: "#crx-root",
	plugins: [],
};
