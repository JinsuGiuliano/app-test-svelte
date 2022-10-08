import { writable } from 'svelte/store';

const userStore = writable({
	profile: {
		email: '',
		password: '',
		logged: false
	},
	notifications: {}
});

export const loginOutAction = () => {
	console.log('ACTION LOGIN');
	userStore.update(($userStore) => {
		userStore.profile = { email: '', password: '', logged: false };
		return $userStore;
	});
};
export const loginAction = (email, password) => {
	userStore.update(($userStore) => {
		userStore.profile = { email: email, password: password, logged: true };
		return $userStore;
	});
};

export default userStore;
