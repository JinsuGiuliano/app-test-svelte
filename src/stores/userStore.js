import { writable } from 'svelte/store';

const userStore = writable({
	profile: {
		email: '',
		password: '',
		logged: false
	},
	redirect: '',
	notifications: {}
});

export const loginOutAction = () => {
	console.log('ACTION LOGOUT');

	userStore.update(($userStore) => {
		$userStore.profile = { email: '', password: '', logged: false };
		localStorage.setItem('user', '');
		return $userStore;
	});
};

export const loginAction = (email, password, logged) => {
	userStore.update(($userStore) => {
		$userStore.profile = { email: email, password: password, logged: logged };
		console.log('ACTION LOGIN', $userStore);
		localStorage.setItem('user', JSON.stringify($userStore));
		return $userStore;
	});
};

export default userStore;
