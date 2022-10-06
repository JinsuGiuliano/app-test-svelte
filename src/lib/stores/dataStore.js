import { readable, writable } from 'svelte/store';
import axios from 'axios';

let values;

// const createWritableStore = (key, startValue) => {
// 	const { subscribe, set } = writable(startValue);

// 	return {
// 		subscribe,
// 		set,
// 		useLocalStorage: () => {
// 			const json = localStorage.getItem(key);
// 			if (json) {
// 				set(JSON.parse(json));
// 			}

// 			subscribe((current) => {
// 				localStorage.setItem(key, JSON.stringify(current));
// 			});
// 		}
// 	};
// };

export const fetchBinanceData = async () => {
	try {
		await axios
			.get('https://api.binance.com/api/v3/exchangeInfo', {
				headers: {},
				params: {}
			})
			.then((res) => res.data.symbols);
	} catch (err) {
		console.log(err);
	}
};
// fetchBinanceData();
// export const BinanceData = createWritableStore('BinanceData', fetchBinanceData());
values = fetchBinanceData();
export const data = readable(values);
