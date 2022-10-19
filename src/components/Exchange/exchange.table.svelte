

<script>
  import { onMount } from 'svelte';
  import BinanceData, { fetchBinanceData, BinanceDataFiltered, PercentageLoaded, CACHE_dataStore  } from '../../stores/dataStore'
  import { connectWebSocketBookTicker, socketBookTicker, Symbol, setSymbol, socketDepth, connectWebSocketSocketDepth } from '../../stores/WebSocket'
  import OneRowData from '../Symbol/Symbol.view.svelte';

let columns = ['details','symbol','status','baseAsset' ,'baseAssetPrecision','quoteAsset','quotePrecision' ,'quoteAssetPrecision', 
  'icebergAllowed','ocoAllowed','isSpotTradingAllowed','isMarginTradingAllowed']

$: filteredData = $BinanceDataFiltered
$: rowD =  $BinanceData.bySymbol;

let OneRowDataSelected = false


 async function handleOneRow (sym){
  
    await fetchBinanceData(`https://api.binance.com/api/v3/exchangeInfo?symbol=${sym}`, 'symbol')
   
    setSymbol(sym)
    if (socketBookTicker && socketBookTicker.url.slice(33).split('@')[0] !== $Symbol.toLowerCase()) {
		socketBookTicker.close(1000)
	  }
    if(socketDepth && socketDepth.url.slice(33).split('@')[0] !== $Symbol.toLowerCase()){
      	socketDepth.close(1000)
    }
    connectWebSocketSocketDepth(sym)
    connectWebSocketBookTicker(sym)
}


	onMount(async () => {
        await fetchBinanceData('https://api.binance.com/api/v3/exchangeInfo', 'complete')
	})

console.log($PercentageLoaded)
</script>

<div class="overflow-scroll no-scrollbar">
<div class=" max-h-screen">
  
  <table class="table table-compact no-scrollbar">
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
 <!-- {#if i < $rowNumberFilter} -->
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
  <!-- {/if} -->
 {/each}
  </tbody>
  
  </table>
  
</div>
  {#if $Symbol}
      <OneRowData bind:rowData={rowD}/>   
  {/if}
</div>


<style>

    /* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
</style>