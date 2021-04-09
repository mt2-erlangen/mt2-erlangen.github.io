import App from './App.svelte';

let div = document.querySelector('#wave-demo-2d');
const app = div && new App({
	target: div,
	props: {
	},
});

export default app;
