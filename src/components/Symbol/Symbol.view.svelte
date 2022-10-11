<script>
    export const ssr = false;
	  import { afterUpdate, beforeUpdate, onMount, onDestroy } from "svelte";
    import BinanceData, { fetchBinanceBySymbolData }  from '../../stores/dataStore'
    import { fetchKlinesNySymbolBinanceData, Symbol, socketBookTicker, socketDepth } from "../../stores/WebSocket";
    import SymbolRealTimeStats from "../Stats/SymbolRealTime.stats.svelte";
    import SymbolBookDepth from "../Stats/Symbol.bookDepth10.stats.svelte"
    export let rowData = $BinanceData.bySymbol

    $: showMarketDetails = false

    let marketDetailsComponent;

    onMount(async()=>{   
         await fetchBinanceBySymbolData($Symbol)
         await fetchKlinesNySymbolBinanceData($Symbol)
         marketDetailsComponent = async () =>  await import('../Charts/symbol.details.candleTicks.chart.svelte')
    })

    onDestroy(()=>{
      socketBookTicker.close(1000)
      socketDepth.close(1000)
    })

</script>
<!-- Put this part before </body> tag -->
<div class="modal" id="my-modal-2">
  <div class="modal-box lg:w-11/12 lg:max-w-full">
    <div class="btn-group btn-group-horizontal">
          <a href="/#">
     <button class="m-1 p-1 btn btn-error modal-action btn-outline">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-4 h-4 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
     </button>
    </a>
  <button on:click={()=>showMarketDetails = !showMarketDetails} class="m-1 p-1 rounded-md btn btn-success btn-outline">
   {#if !showMarketDetails}
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
  {:else} 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
  </svg>
{/if}
</button>
 <div class="stats stats-vertical ">
  <SymbolRealTimeStats/>
</div>
</div>

  <div class="flex flex-col lg:flex-column">
     
    {#if showMarketDetails}
    {#await marketDetailsComponent() then module}
    <div class="flex flex-row lg:flex-row w-full">
        <svelte:component this={module.default}/>
        <SymbolBookDepth/>
     </div>
     
    {/await}
    {:else}

  <div class="stats stats-vertical lg:stats-horizontal ">
   
  <div class="stat">
    <div class="stat-title">Symbol</div>
    <div class="stat-value">{$Symbol}</div>
    <div class="badge badge-accent badge-lg">{rowData[0].status}</div>
  </div>

  <div class="stat">
    <div class="stat-figure text-secondary">
        <div class="badge badge-accent badge-lg">{rowData[0].baseAssetPrecision}</div>
    </div>
    <div class="stat-title">Base Asset</div>
      <div class="stat-value">{rowData[0].baseAsset}</div>
    <div class="stat-desc">Jan 1st - Feb 1st</div>
  </div>

  <div class="stat">
    <div class="stat-figure text-secondary">
        <div class="badge badge-accent badge-lg">{rowData[0].quotePrecision}</div>
    </div>
     <div class="stat-figure text-secondary">
        <div class="badge badge-accent badge-lg">{rowData[0].quoteAssetPrecision}</div>
    </div>
    <div class="stat-title">Quote Asset</div>
      <div class="stat-value">{rowData[0].quoteAsset}</div>
    <div class="stat-desc">Quote Asset Presition {rowData[0].quoteAssetPrecision}</div>
  </div>
 
</div>
    <div class="divider md:divider-vertical"></div> 
      <div class="stats stats-vertical lg:stats-horizontal">
  
  <div class="stat">
     <div class={`my-1 py-2 badge ${rowData[0].icebergAllowed? 'badge-accent badge-outline':'' }`}>iceberg</div>
     <div class={`my-1 py-2 badge ${rowData[0].ocoAllowed? 'badge-accent badge-outline':'' }`}>oco</div>
     <div class={`my-1 py-2 badge ${rowData[0].quoteOrderQtyMarketAllowed? 'badge-accent badge-outline':'' }`}>quoteOrderQtyMarket</div>
     <div class={`my-1 py-2 badge ${rowData[0].allowTrailingStop? 'badge-accent badge-outline':'' }`}>TrailingStop</div>
     <div class={`my-1 py-2 badge ${rowData[0].cancelReplaceAllowed? 'badge-accent badge-outline':'' }`}>cancelReplace</div>
    <div class={`my-1 py-2 badge ${rowData[0].isSpotTradingAllowed? 'badge-accent badge-outline':'' }`}>SpotTrading</div>
    <div class={`my-1 py-2 badge ${rowData[0].isMarginTradingAllowed? 'badge-accent badge-outline':'' }`}>MarginTrading</div>
  </div>
  
  <div class="stat">
    <div class="stat-title">Order Types</div>
    {#each rowData[0].orderTypes as type } 
        <div class=" my-1 py-2 badge badge-secondary badge-outline">{type}</div>
    {/each}
  </div>
  
  <div class="stat">
    <div class="stat-title">Permissions</div>
    {#each rowData[0].permissions as permit } 
        <div class=" my-1 py-2 badge badge-primary badge-outline">{permit}</div>
    {/each}
  </div>
</div>
{/if}
</div>

  </div>
</div>