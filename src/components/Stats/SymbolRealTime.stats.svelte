<script>
    import { SymbolPriceData } from '../../stores/WebSocket'

</script>

<div class="stat flex flex-column items-center">
    <div class="stat-figure text-secondary">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
    </div>
    <div class="flex flex-column items-center">
     <div class="stat-desc">↗︎ best bid qty</div>
    <div id="stock-price" class="stat-title">{$SymbolPriceData.B}</div>
    </div>
    <div class="flex flex-column items-center">
       <div class="stat-desc">↗︎ best bid price</div>
       <div id="stock-price" class="stat-title">{$SymbolPriceData.b}</div>
    </div>
       <div class="flex flex-column items-center">
   <div class="stat-desc">↗︎ best ask price</div>
    <div id="stock-price" class="stat-title">{$SymbolPriceData.a}</div>
    </div>
       <div class="flex flex-column items-center">
     <div class="stat-desc">↗︎ best ask qty</div>
    <div id="stock-price" class="stat-title">{$SymbolPriceData.A}</div>
    </div>
  </div>