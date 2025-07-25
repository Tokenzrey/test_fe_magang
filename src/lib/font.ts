/**
 * Font loader utility for Vite + React (no Next.js dependency).
 * Integrates local fonts with Tailwind CSS via CSS variables.
 *
 * 1. Letakkan file font di 'public/fonts/*' (bisa diakses dari root).
 * 2. Import CSS ini di `src/main.tsx` atau root `App.tsx`.
 * 3. Gunakan font variable di Tailwind config atau di className.
 */

export const adelphe = {
	variable: "--font-adelphe",
	family: "Adelphe",
	style: "adelphe",
};
export const helveticaNeue = {
	variable: "--font-helveticaNeue",
	family: "Helvetica Neue",
	style: "helvetica-neue",
};
export const libreCaslon = {
	variable: "--font-libreCaslon",
	family: "Libre Caslon",
	style: "libre-caslon",
};
export const satoshi = {
	variable: "--font-satoshi",
	family: "Satoshi",
	style: "satoshi",
};
export const inter = {
	variable: "--font-inter",
	family: "Inter",
	style: "inter",
};
export const playfairDisplay = {
	variable: "--font-PlayfairDisplay",
	family: "Playfair Display",
	style: "playfair-display",
};
export const poppins = {
	variable: "--font-poppins",
	family: "Poppins",
	style: "poppins",
};
