import { writable, derived } from 'svelte/store';
// import { BinanceWSClient } from '../client/BinanceClient';
import axios from 'axios';

export const SymbolTradeData = writable({});

export const MarketSymbolPriceData = writable([]);

export const MarketSymbolStats = writable({});

export const SymbolPriceData = writable({
	b: ' - ', // best bid price
	B: ' - ', // best bid qty
	a: ' - ', // best ask price
	A: ' - ' // best ask qty
});

export const BookDepth = writable({
	lastUpdateId: null,
	bids: [],
	asks: []
});

export const SymbolAllMarket = writable('ETHBTC');
export const Symbol = writable('');

export const setSymbol = (data) => {
	Symbol.update(($Symbol) => {
		$Symbol = data;
		return $Symbol;
	});
};

export const setSymbolAllMarket = (data) => {
	SymbolAllMarket.update(($SymbolAllMarket) => {
		$SymbolAllMarket = data;
		return $SymbolAllMarket;
	});
};

export const setSymbolPriceData = (data) => {
	SymbolPriceData.update(($SymbolPriceData) => {
		$SymbolPriceData = data;
		return $SymbolPriceData;
	});
};

export const setBookDepth = (data) => {
	BookDepth.update(($BookDepth) => {
		let formatedData = {
			lastUpdateId: data.lastUpdateId,
			bids: [...$BookDepth.bids, data.bids],
			asks: [...$BookDepth.asks, data.asks]
		};
		$BookDepth = formatedData;
		return $BookDepth;
	});
};

export const setMarketSymbolStats = (data) => {
	MarketSymbolStats.update(($MarketSymbolStats) => {
		let formattedData = {
			time: data.E,
			open: data.k.o,
			high: data.k.h,
			low: data.k.l,
			close: data.k.c
		};
		$MarketSymbolStats = formattedData;
		return $MarketSymbolStats;
	});
};

export const setMarketSymbolPriceData = (data) => {
	MarketSymbolPriceData.update(($MarketSymbolPriceData) => {
		let formattedData = {
			time: data.E,
			open: data.k.o,
			high: data.k.h,
			low: data.k.l,
			close: data.k.c
		};
		$MarketSymbolPriceData = [...$MarketSymbolPriceData, formattedData];
		return $MarketSymbolPriceData;
	});
};

export const setDataFromStream = (dataList) => {
	SymbolTradeData.update(($SymbolTradeData) => {
		let formatedList = dataList.map((data) => {
			let d = new Date(data[0]).toLocaleDateString('en-US').split('/');
			let date = `${d[2]}-${d[0]}-${d[1]}`;
			return {
				time: date,
				open: data[1],
				high: data[2],
				low: data[3],
				close: data[4]
			};
		});
		$SymbolTradeData = formatedList;
		return $SymbolTradeData;
	});
};

// ACTIONS FOR BINANCEDATA
export const fetchKlinesNySymbolBinanceData = async (symbol) => {
	console.log('AXIOS_GET_SYMBOL_KLINES_BINANCE_DATA', symbol);
	await axios
		.get(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1M`)
		.then((res) => setDataFromStream(res.data))
		.catch((err) => console.log('ERROR fetchBinanceData: ', err.message));
};

export let socketBookTicker;
export const connectWebSocketBookTicker = (Symbol) => {
	// Create a new websocket
	socketBookTicker = new WebSocket(
		`wss://stream.binance.com:9443/ws/${Symbol.toLowerCase()}@bookTicker`
	);

	socketBookTicker.addEventListener('close', (event) => {
		console.log('The connection to socketBookTicker has been CLOSED successfully.');
	});

	socketBookTicker.addEventListener('open', () => {
		console.log('The connection to socketBookTicker has OPEN successfully.');
	});

	socketBookTicker.addEventListener('message', (event) => {
		let stockObject = JSON.parse(event.data);
		setSymbolPriceData(stockObject);
	});

	if (!socketBookTicker) {
		setSymbolPriceData(' - ');
		return;
	}
};

export let socketKline_;
export const connectWebSocketSocketKline_ = (Symbol) => {
	// Create a new websocket
	socketKline_ = new WebSocket(`wss://stream.binance.com:9443/ws/${Symbol.toLowerCase()}@kline_1M`);

	socketKline_.addEventListener('close', (event) => {
		console.log(`The connection for ${Symbol}  has been CLOSED successfully.`);
	});

	socketKline_.addEventListener('open', () => {
		console.log(`The connection for ${Symbol}  has OPEN successfully.`);
	});

	socketKline_.addEventListener('message', (event) => {
		let stockObject = JSON.parse(event.data);
		setMarketSymbolPriceData(stockObject);
		setMarketSymbolStats(stockObject);
	});

	if (!socketKline_) {
		setMarketSymbolPriceData([]);
		return;
	}
};

export let socketDepth;
export const connectWebSocketSocketDepth = (Symbol) => {
	// Create a new websocket
	socketDepth = new WebSocket(`wss://stream.binance.com:9443/ws/${Symbol.toLowerCase()}@depth10`);

	socketDepth.addEventListener('close', (event) => {
		console.log(`The connection for ${Symbol}  has been CLOSED successfully.`);
	});

	socketDepth.addEventListener('open', () => {
		console.log(`The connection for ${Symbol}  has OPEN successfully.`);
	});

	socketDepth.addEventListener('message', (event) => {
		let stockObject = JSON.parse(event.data);
		setBookDepth(stockObject);
	});

	if (!socketDepth) {
		setBookDepth({});
		return;
	}
};
