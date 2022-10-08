import { writable, derived } from 'svelte/store';
import axios from 'axios';

const BinanceData = writable({
	complete: [],
	bySymbol: []
});

export const Filters = writable([]);

export const SearchTerm = writable('');

export const BinanceDataFiltered = derived(
	[BinanceData, Filters, SearchTerm],
	([$BinanceData, $Filters, $SearchTerm]) => {
		return filterBySearchTerm(filterByFilters($BinanceData.complete, $Filters), $SearchTerm);
	}
);

// ACTION FOR BINANCE_FILTERED_DATA
function filterByFilters(data, filters) {
	if (!filters.length) return data;
	let filteredData = data.filter((row) => {
		let keys = Object.keys(row);
		let elm = keys.find((k) => filters.includes(k));
		return row[elm];
	});
	console.log('filterByFilters: ', { data: filteredData, filters: filters });
	return filteredData;
}

function filterBySearchTerm(data, searchTerm) {
	// console.log('filterBySearchTerm: ', data, searchTerm);
	if (!searchTerm) return data;
	const formattedTerm = searchTerm.toLowerCase().trim();

	return data.filter((row) => {
		const AtrrValues = Object.values(row);

		return AtrrValues.includes(formattedTerm);
	});
}

// ACTIONS FOR FILTER
export const addFilter = (el) => {
	Filters.update(($Filters) => {
		$Filters.push(el);
		console.log('ACTION ADD FILTER', $Filters);
		return $Filters;
	});
};

export const removeFilter = (el) => {
	Filters.update(($Filters) => {
		$Filters = $Filters.filter((e) => e !== el);
		console.log('ACTION REMOVE FILTER', $Filters);
		return $Filters;
	});
};

// ACTIONS FOR BINANCEDATA
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

export const filterBinanceDataAction = (data, Filters) => {
	// const filtered = data
	// 	.map((row) => (row.map((atributte) => Filters.includes(atributte)) ? row : false))
	// 	.filter(Boolean);
	// console.log('ACTION_FILTER_DATA_BINANCE: ', filtered);
	BinanceData.update(($BinanceData) => {
		$BinanceData.bySymbol = fetch;
		console.log('getBinanceDataBySymbolAction', $BinanceData);
		return $BinanceData;
	});
	// return filtered;
};

export default BinanceData;
