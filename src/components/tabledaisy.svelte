

<script>
  import { onMount, beforeUpdate, afterUpdate } from 'svelte';
  import BinanceData, { fetchBinanceBySymbolData, fetchBinanceData, BinanceDataFiltered, Filters  } from '../lib/stores/dataStore'
  import MultipleSelection from './MultipleSelection.svelte';
  import OneRowData from './oneRowData.svelte';

let columns = ['details','symbol','status','baseAsset' ,'baseAssetPrecision','quoteAsset','quotePrecision' ,'quoteAssetPrecision', 
  'icebergAllowed','ocoAllowed','isSpotTradingAllowed','isMarginTradingAllowed']

$: options = ['iceberg', 'oco', 'SpotTrading', 'MarginTrading']
$: data = $Filters.length? $BinanceDataFiltered : $BinanceData.complete
$: rowD =  $BinanceData.bySymbol;
$: search = undefined;
let OneRowDataSelected = false
let Symbol = ''


 async function handleOneRow (sym){
    await fetchBinanceBySymbolData(sym)
    Symbol = sym
}

$: filteredData = search ?
		data.filter(row => {
			return row.symbol.match(`${search}.*`) || user.status.match(`${search}.*`) || user.baseAsset.match(`${search}.*`) ||  user.baseAssetPrecision.match(`${search}.*`) ||  
      user.quoteAsset.match(`${search}.*`) ||  user.quotePrecision.match(`${search}.*`) ||  user.quoteAssetPrecision.match(`${search}.*`) ||
      user.icebergAllowed.match(`${search}.*`) || user.ocoAllowed.match(`${search}.*`) ||  user.isSpotTradingAllowed.match(`${search}.*`) || user.isMarginTradingAllowed.match(`${search}.*`)
    }) : data;



	onMount(async () => {
    await fetchBinanceData()
	})


  console.log('BinanceData: ', $BinanceData)

</script>

<div class="overflow-x-auto">
<div class="overflow-x-auto">
  
  <table class="table table-compact ">
    <!-- head -->
    <thead>
  
    <tr>
      {#each columns as column, i }
        <th  name={column === 'details'? 'details' :columns.symbol} id={i+1}>{column}</th>
      {/each}
    </tr>
    </thead>
   <tbody>
 {#each filteredData as row, i }
 {#if i < 11}
 <tr class="hover" on:click={()=> handleOneRow(row.symbol)} >
  {#each columns as column}
  {#if column === 'details'}
  <th  > 
    <a href="#my-modal-2" >
    <input type="radio" name="radio-4" class="radio radio-accent" checked={OneRowDataSelected} />
  </a>
    </th> 
  {:else}
        <th >{row[column]}</th>
  {/if}
  {/each}
  </tr>
  {/if}
 {/each}
  </tbody>
  
  </table>
  
</div>
  {#if Symbol}
      <OneRowData bind:Symbol={Symbol} bind:rowData={rowD}/>   
  {/if}
<MultipleSelection  bind:search={search} bind:options={options}/>
</div>