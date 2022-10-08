import { readable, writable } from 'svelte/store';
import axios from 'axios';

let values;

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
