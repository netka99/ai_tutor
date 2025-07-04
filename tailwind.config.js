// /** @type {import('tailwindcss').Config} */
// module.exports = {
// 	content: [
// 		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
// 		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
// 		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
// 	],
// 	theme: {
// 		extend: {},
// 	},
// 	plugins: [],
// } 

/** @type {import('tailwindcss').Config} */
const config = {
	content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}','./src/app/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {},
	},
	plugins: [],
};

export default config;
