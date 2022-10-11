import { sveltekit } from '@sveltejs/kit/vite';

const config = {
	plugins: [sveltekit()]
	// optimizeDeps: { include: ['@carbon/charts'] }
};

export default config;
