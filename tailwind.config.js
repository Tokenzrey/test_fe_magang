/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				adelphe: ["var(--font-adelphe)", "serif"],
				helveticaNeue: ["var(--font-helveticaNeue)", "sans-serif"],
				libreCaslon: ["var(--font-libreCaslon)", "serif"],
				satoshi: ["var(--font-satoshi)", "sans-serif"],
				inter: ["var(--font-inter)", "sans-serif"],
				playfairDisplay: ["var(--font-PlayfairDisplay)", "serif"],
				poppins: ["var(--font-poppins)", "sans-serif"],
			},
		},
	},
	plugins: [],
};
