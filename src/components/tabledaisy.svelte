

<script>
  import { afterUpdate, beforeUpdate, onMount } from 'svelte';
  import MultipleSelection from './MultipleSelection.svelte';
  import OneRowData from './oneRowData.svelte';
  import axios from 'axios';

let columns = ['symbol','status','baseAsset' ,'baseAssetPrecision','quoteAsset','quotePrecision' ,'quoteAssetPrecision', 
  'icebergAllowed','ocoAllowed','isSpotTradingAllowed','isMarginTradingAllowed']
let options = ['iceberg', 'oco', 'SpotTrading', 'MarginTrading']
let data = [];
let search = undefined;
let OneData = {}
let OneRowDataSelected = false


 function handleOneRow (d){
    OneData = d
    OneRowDataSelected = true
}

$: filteredData = search ?
		data.filter(row => {
			return row.symbol.match(`${search}.*`) || user.status.match(`${search}.*`) || user.baseAsset.match(`${search}.*`) ||  user.baseAssetPrecision.match(`${search}.*`) ||  
      user.quoteAsset.match(`${search}.*`) ||  user.quotePrecision.match(`${search}.*`) ||  user.quoteAssetPrecision.match(`${search}.*`) ||
      user.icebergAllowed.match(`${search}.*`) || user.ocoAllowed.match(`${search}.*`) ||  user.isSpotTradingAllowed.match(`${search}.*`) || user.isMarginTradingAllowed.match(`${search}.*`)
    }) : data;

export const fetchBinanceData = async () => {
	try {
		await axios
			.get('https://api.binance.com/api/v3/exchangeInfo', {
				headers: {},
				params: {}
			})
			.then((res) => {
        let list = res.data.symbols
        data = list.splice(11, list.length)
      });
	} catch (err) {
		console.log(err);
	}
};

	onMount(async () => {
  await fetchBinanceData()
	})



</script>

<div class="overflow-x-auto">
<div class="overflow-x-auto">
  
  <table class="table table-compact w-full ">
    <!-- head -->
    <thead>
  
    <tr>
      {#each columns as colum, i }
        <th  name={columns.symbol} id={i}>{colum}</th>
      {/each}
    </tr>
    </thead>
   <tbody>
 {#each filteredData as dat, i }
 {#if i < 11}
 <tr class=" hover " on:click={()=> handleOneRow(dat)}>
  {#each columns as column}
        <th >{dat[column]}</th>
  {/each}
  </tr>
  {/if}
 {/each}
  </tbody>
  
  </table>
  
</div>
{#if OneRowDataSelected}
  <OneRowData data={OneData}/>
{/if}
<MultipleSelection  bind:search={search} bind:options={options}/>
</div>