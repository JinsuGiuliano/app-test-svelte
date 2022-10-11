import { writable } from 'svelte/store';

const sideBarState = writable({
	exchangeInfo: true,
	marketGraph: false
});

export const setSideBarState = (data) => {
	sideBarState.update(($sideBarState) => {
		let toList = Object.entries($sideBarState);
		toList.map((e, idx) => {
			let attrName = toList[idx][0];
			e[0] === data ? ($sideBarState[attrName] = true) : ($sideBarState[attrName] = false);
		});
		console.log('ACTION CHANGE_SIDE_BAR_STATE: ', $sideBarState);
		return $sideBarState;
	});
};

export default sideBarState;
