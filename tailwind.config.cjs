/** @type {import('tailwindcss').Config} */
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	daisyui: {
		// themes: [
		// 	{
		// 		dracula: {
		// 			primary: '#f8f8f2',
		// 			secondary: '#9580FF',
		// 			accent: '#FFFF80',
		// 			accent2: '#FF80BF',
		// 			neutral: '#f8f8f2',
		// 			'base-100': '#22212C',
		// 			info: '#80FFEA',
		// 			success: '#8AFF80',
		// 			warning: '#FF80BF',
		// 			error: '#FF9580'
		// 		}
		// 	}
		// ]
	},
	plugins: [require('daisyui')]
};

module.exports = config;
