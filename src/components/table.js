// definition
import $ from 'jquery';

$(function () {
	$('#binaceTable').DataTable({
		ajax: 'https://api.binance.com/api/v3/exchangeInfo',
		columns: [
			{
				data: 'symbol'
			},
			{
				data: 'status'
			},
			{
				data: 'baseAsset'
			},
			{
				data: 'baseAssetPrecision'
			},
			{
				data: 'quoteAsset'
			},
			{
				data: 'quotePrecision'
			},
			{
				data: 'quoteAssetPrecision'
			},
			{
				data: 'icebergAllowed'
			},
			{
				data: 'ocoAllowed'
			},
			{
				data: 'isSpotTradingAllowed'
			},
			{
				data: 'isMarginTradingAllowed'
			}
		]
	});
});

//    <th>symbol</th>
//       <th>status</th>
//       <th>baseAsset</th>
//       <th>baseAssetPrecision</th>
//       <th>quoteAsset</th>
//       <th>quotePrecision</th>
//       <th>quoteAssetPrecision</th>
//       <th>icebergAllowed</th>
//       <th>ocoAllowed</th>
//       <th>isSpotTradingAllowed</th>
//       <th>isMarginTradingAllowed</th>
