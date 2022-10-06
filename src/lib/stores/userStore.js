import { writable } from 'svelte/store';

const startValue = {
	email: '',
	password: '',
	logged: false
};

export const user = writable(startValue);
