const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./src/**/*.{js,ts,jsx,tsx}",
		"apps/site/pages/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			keyframes: {
				dangle: {
					"0%, 100%": { transform: "rotate(-3deg)" },
					"50%": { transform: "rotate(3deg)" },
				},
				dropdown: {
					"0%": { opacity: 0, transform: "translateY(-10px)" },
					"100%": { opacity: 100, transform: "translateY(0px)" },
				},
				hideup: {
					"0%": { opacity: 100, transform: "translateY(10px)" },
					"100%": { opacity: 0, transform: "translateY(0px)" },
				},
				swing: {
					"0%": { transform: "rotate(-90deg);" },
					"50%": { transform: "rotate(10deg);" },
					"100%": { transform: "rotate(0deg);" },
				},
				"fade-in": {
					"0%": { opacity: 0 },
					"100%": { opacity: 100 },
				},
			},
			animation: {
				dangle: "dangle infinite 3s ease-in",
				dropdown: "dropdown 0.25s ease-in-out",
				hideup: "hideup 0.25s ease-out",
				swing: "swing 0.35s ease-out",
				spin: "spin infinite 6s",
				// "fade-in: "fade-in 0.25s ease-in",
			},
			colors: {
				"main-yellow": {
					DEFAULT: "#FFD54C",
				},
				"main-blue": {
					DEFAULT: "#08185A",
					100: "#CFD4FF",
					200: "#08185A",
				},
				"main-red": {
					DEFAULT: "#FF1100",
				},
				"main-grey": {
					DEFAULT: "#E5E5E5",
					200: "#F1F1F1",
					800: "#363636",
				},
				"main-green": {
					DEFAULT: "#296118",
				},
				// Text Colours
				"txt-dark": {
					DEFAULT: "#333333",
				},
				"txt-light": {
					DEFAULT: "#f5faf6",
				},
				"txt-spec": {
					DEFAULT: "#9dacd1",
				},
			},
			fontFamily: {
				lato: ["Lato", "sans-serif"],
				nunito: ["Nunito"],
			},
		},
	},
	plugins: [
		plugin(function ({ addBase, theme }) {
			addBase({
				h1: { fontSize: theme("fontSize.3xl") },
				h2: { fontSize: theme("fontSize.2xl") },
				h3: { fontSize: theme("fontSize.xl") },
				h4: { fontSize: theme("fontSize.lg") },
			});
		}),
	],
};
