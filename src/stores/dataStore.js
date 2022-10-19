import { writable, derived } from 'svelte/store';
import { addAlert } from './alerts.store';
import axios from 'axios';

export const CACHE_dataStore = new Map();

const BinanceData = writable({
	complete: [],
	bySymbol: []
});

export const SymbolList = derived(BinanceData, ($BinanceData) => {
	return $BinanceData.complete.map((row) => row.symbol);
});

export const Filters = writable([]);

export const SearchTerm = writable('');

export const BinanceDataFiltered = derived(
	[BinanceData, Filters, SearchTerm],
	([$BinanceData, $Filters, $SearchTerm]) => {
		let filteredData = filterBySearchTerm(
			filterByFilters($BinanceData.complete, $Filters),
			$SearchTerm
		);
		return filteredData;
	}
);

export const PercentageLoaded = derived(
	[BinanceData, BinanceDataFiltered],
	([$BinanceData, $BinanceDataFiltered]) => {
		return $BinanceDataFiltered.length
			? parseInt(($BinanceData.complete.length * $BinanceDataFiltered.length) / 100)
			: 100;
	}
);

// ACTION FOR BINANCE_FILTERED_DATA
function filterByFilters(data, filters) {
	if (!filters.length) return data;
	return data.filter((row) => {
		let KVFiltered = Object.entries(row).map((kv) => {
			return filters.includes(kv[0]) && kv[1] === true ? 1 : 0;
		});
		return KVFiltered.includes(1);
	});
}

function filterBySearchTerm(data, searchTerm) {
	if (!searchTerm) return data;
	const formattedTerm = searchTerm.toLocaleLowerCase().trim();
	let filteredData = data.filter((row) => {
		let condition = Object.values(row).map((value) =>
			String(value).toLocaleLowerCase().startsWith(formattedTerm)
		);
		return condition.includes(true);
	});
	console.log('filteredData: ', filteredData);
	return filteredData;
}

// ACTIONS FOR FILTER
export const addFilter = (el) => {
	Filters.update(($Filters) => {
		$Filters.push(el);
		return $Filters;
	});
};

export const removeFilter = (el) => {
	Filters.update(($Filters) => {
		$Filters = $Filters.filter((e) => e !== el);
		return $Filters;
	});
};

// ACTIONS FOR BINANCEDATA
export const fetchBinanceData = async () => {
	console.log('AXIOS GET COMPLETE BINANCE DATA', CACHE_dataStore);
	if (CACHE_dataStore.has('BinanceData_complete')) {
		getBinanceDataCompleteAction(CACHE_dataStore.get('BinanceData_complete'));
	} else {
		await axios
			.get('https://api.binance.com/api/v3/exchangeInfo')
			.then((res) => {
				let fetch = res.data.symbols;
				CACHE_dataStore.set('BinanceData_complete', fetch);
				getBinanceDataCompleteAction(fetch);
				addAlert({
					message: 'Succesfully fetch data from Binance',
					type: 'info',
					dismissible: true,
					timeout: 3000
				});
			})
			.catch((err) => {
				addAlert({
					message: err.message,
					type: 'error',
					dismissible: true,
					timeout: 3000
				});
			});
	}
};

export const fetchBinanceBySymbolData = async (symbol) => {
	console.log('AXIOS GET BY SYMBOL BINANCE DATA', CACHE_dataStore);
	if (CACHE_dataStore.has(`BinanceData_symbol_${symbol}`)) {
		getBinanceDataBySymbolAction(CACHE_dataStore.get(`BinanceData_symbol_${symbol}`));
	} else {
		await axios
			.get(`https://api.binance.com/api/v3/exchangeInfo?symbol=${symbol}`)
			.then((res) => {
				const fetch = res.data.symbols;
				CACHE_dataStore.set(`BinanceData_symbol_${symbol}`, fetch);
				getBinanceDataBySymbolAction(fetch);
			})
			.catch((err) => console.log('ERROR fetchBinanceBySymbolData: ', err.message));
	}
};

export function getBinanceDataCompleteAction(fetch) {
	console.log('ACTION_GET_BINANCE_DATA');
	BinanceData.update(($BinanceData) => {
		$BinanceData.complete = fetch;
		return $BinanceData;
	});
}

export function getBinanceDataBySymbolAction(fetch) {
	console.log('ACTION_GET_BINANCE_DATA_BY_SYMBOL');
	BinanceData.update(($BinanceData) => {
		$BinanceData.bySymbol = fetch;
		return $BinanceData;
	});
}

export const filterBinanceDataAction = (data, Filters) => {
	BinanceData.update(($BinanceData) => {
		$BinanceData.bySymbol = fetch;
		return $BinanceData;
	});
	// return filtered;
};

export default BinanceData;
