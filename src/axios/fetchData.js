import axios from 'axios';

export const fetchBinanceData = async () => {
	try {
		await axios
			.get('https://api.binance.com/api/v3/exchangeInfo', {
				headers: {},
				params: {}
			})
			.then((res) => res.data);
	} catch (err) {
		console.log(err);
	}
};
