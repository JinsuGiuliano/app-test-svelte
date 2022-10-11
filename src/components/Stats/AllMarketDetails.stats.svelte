<script>
    import { MarketSymbolStats, SymbolAllMarket,setSymbolAllMarket, socketKline_, connectWebSocketSocketKline_ } from '../../stores/WebSocket'
    import { SymbolList } from '../../stores/dataStore'

    $: Symbol = $SymbolAllMarket
    async function handleSelection (sym){
        setSymbolAllMarket(sym)
        console.log(`${socketKline_.url.slice(33).split('@')[0].toLowerCase()} vs ${sym}`)
        if (socketKline_ && socketKline_.url.slice(33).split('@')[0].toLowerCase() !== $SymbolAllMarket.toLowerCase()) {
            socketKline_.close(1000)
        }
        connectWebSocketSocketKline_(sym)
    }


</script>

<div class="flex flex-col w-full">

  <div class="grid h-20 card  rounded-box place-items-center">
    

<div class="flex flex-row justify-beteewn">
            <div class="stat">
                <div class="stat-value text-2xl">{Symbol}</div>
            </div>
</div>

  </div> 
  <div class="divider"></div>
  <div class="grid h-auto card place-items-center">
    
 <div class=" flex flex-row items-center">
    </div>
<div class=" flex flex-row items-center">
<div class="stats stats-vertical ">
  
  <div class="stat">
    <div class="stat-title text-sm">Open</div>
    <div class="stat-value text-base">{$MarketSymbolStats.open}</div>
  </div>
  
<div class="stat">
    <div class="stat-title text-sm">Close</div>
    <div class="stat-value text-base">{$MarketSymbolStats.close}</div>
  </div>
  
  
</div>
<div class="stats stats-vertical">
  
  <div class="stat">
    <div class="stat-title text-sm">High</div>
    <div class="stat-value text-base">{$MarketSymbolStats.high}</div>
  </div>
  
    <div class="stat">
    <div class="stat-title text-sm">Low</div>
    <div class="stat-value text-base">{$MarketSymbolStats.low}</div>
  </div>

</div>
  </div>
  </div>
      <select class="select select-success w-full max-w-xs" on:change={(e)=>handleSelection(e.target.value)}>
  <option disabled selected>Change Symbol</option>
  {#if $SymbolList.length}
  {#each $SymbolList as symbol}
        <option value={symbol} >{symbol}</option>
  {/each}
{/if}
</select>
</div>
