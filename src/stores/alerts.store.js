import { writable } from 'svelte/store';

export const alerts = writable([]);

export const dismissAlert = (id) => {
	alerts.update((all) => all.filter((t) => t.id !== id));
};

export const addAlert = (alert) => {
	const id = Math.floor(Math.random() * 10000);

	const defaults = {
		id,
		type: 'info',
		dismissible: true,
		timeout: 3000
	};

	const t = { ...defaults, ...alert };
	alerts.update((all) => [t, ...all]);

	if (t.timeout) setTimeout(() => dismissAlert(id), t.timeout);
};
