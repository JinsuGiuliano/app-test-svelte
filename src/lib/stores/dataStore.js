import { writable, derived } from 'svelte/store';
import axios from 'axios';

const BinanceData = writable({
	complete: [],
	bySymbol: []
});

export const Filters = writable([]);

export const BinanceDataFiltered = derived([BinanceData, Filters], ([$BinanceData, $Filters]) => {
	let fiteredList = $BinanceData.complete
		.map((data) => data.permissions.map((f) => $Filters.includes(f)) && data)
		.filter(Boolean);
	console.log('BinanceDataFiltered: ', BinanceDataFiltered);
	return fiteredList;
});

export const addFilter = (el) => {
	console.log('ACTION ADD FILTER');
	Filters.update(($Filters) => {
		$Filters.push(el);
		console.log('Filters', $Filters);
		return $Filters;
	});
};

export const removeFilter = (el) => {
	console.log('ACTION REMOVE FILTER');
	Filters.update(($Filters) => {
		$Filters = $Filters.filter((e) => e !== el);
		console.log('Filters', $Filters);
		return $Filters;
	});
};

export const fetchBinanceData = async () => {
	console.log('AXIOS GET COMPLETE BINANCE DATA');
	await axios
		.get('https://api.binance.com/api/v3/exchangeInfo')
		.then((res) => {
			let fetch = res.data;
			getBinanceDataCompleteAction(fetch);
		})
		.catch((err) => console.log('ERROR fetchBinanceData: ', err.message));
};

export const fetchBinanceBySymbolData = async (symbol) => {
	await axios
		.get(`https://api.binance.com/api/v3/exchangeInfo?symbol=${symbol}`)
		.then((res) => getBinanceDataBySymbolAction(res.data.symbols))
		.catch((err) => console.log('ERROR fetchBinanceBySymbolData: ', err.message));
};

export function getBinanceDataCompleteAction(fetch) {
	console.log('ACTION_GET_BINANCE_DATA');
	BinanceData.update(($BinanceData) => {
		$BinanceData.complete = fetch.symbols;
		console.log('BinanceData', $BinanceData);
		return $BinanceData;
	});
}

export function getBinanceDataBySymbolAction(fetch) {
	console.log('ACTION_GET_BINANCE_DATA_BY_SYMBOL');
	BinanceData.update(($BinanceData) => {
		$BinanceData.bySymbol = fetch;
		console.log('getBinanceDataBySymbolAction', $BinanceData);
		return $BinanceData;
	});
}

export default BinanceData;
