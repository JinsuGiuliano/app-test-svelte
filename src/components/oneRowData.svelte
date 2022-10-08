<script>
	import { onMount } from "svelte";
    import BinanceData, { fetchBinanceBySymbolData }  from '../lib/stores/dataStore'

    export let Symbol;
    export let rowData = $BinanceData.bySymbol
    

    onMount(async()=>{
         await fetchBinanceBySymbolData(Symbol)
    })

</script>

<!-- Put this part before </body> tag -->
<div class="modal" id="my-modal-2">
  <div class="modal-box lg:w-11/12 lg:max-w-5xl">
   
  <div class="flex flex-col lg:flex-column">
  <div class="stats stats-vertical lg:stats-horizontal shadow ">
   
  <div class="stat">
    <div class="stat-title">Symbol</div>
    <div class="stat-value">{rowData[0].symbol}</div>
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
      <div class="stats stats-vertical lg:stats-horizontal shadow">
  
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
  </div>
    <div class="modal-action">
     <a href="/#">X</a>
    </div>
  </div>
</div>