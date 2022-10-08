

<script>
  import { onMount, beforeUpdate, afterUpdate } from 'svelte';
  import BinanceData, { fetchBinanceBySymbolData, fetchBinanceData,SearchTerm, Filters, filterBinanceDataAction, BinanceDataFiltered  } from '../lib/stores/dataStore'
  import MultipleSelection from './MultipleSelection.svelte';
  import OneRowData from './oneRowData.svelte';

let columns = ['details','symbol','status','baseAsset' ,'baseAssetPrecision','quoteAsset','quotePrecision' ,'quoteAssetPrecision', 
  'icebergAllowed','ocoAllowed','isSpotTradingAllowed','isMarginTradingAllowed']

$: filteredData = $BinanceDataFiltered
$: rowD =  $BinanceData.bySymbol;
$: search = $SearchTerm
let OneRowDataSelected = false
let Symbol = ''


 async function handleOneRow (sym){
    await fetchBinanceBySymbolData(sym)
    Symbol = sym
}

	onMount(async () => {
    await fetchBinanceData()
	})



// = search ?
// 		data.filter(row => {
// 			return row.symbol.match(`${search}.*`) || user.status.match(`${search}.*`) || user.baseAsset.match(`${search}.*`) ||  user.baseAssetPrecision.match(`${search}.*`) ||  
//       user.quoteAsset.match(`${search}.*`) ||  user.quotePrecision.match(`${search}.*`) ||  user.quoteAssetPrecision.match(`${search}.*`) ||
//       user.icebergAllowed.match(`${search}.*`) || user.ocoAllowed.match(`${search}.*`) ||  user.isSpotTradingAllowed.match(`${search}.*`) || user.isMarginTradingAllowed.match(`${search}.*`)
//     }) : data;

// beforeUpdate(()=>{
//   filteredData = $Filters 
//   ? filterBinanceDataAction(data, $Filters )
//   : data
// })




</script>
<MultipleSelection  bind:search={search}/>

<div class="overflow-x-auto mt-20">
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
</div>