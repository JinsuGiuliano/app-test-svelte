  <script>
    
    import SideBar from "./Menu/sideBar.component.svelte";
    import Tabs from "./Menu/tabs.svelte";
	import DaisyTable from './Exchange/exchange.table.svelte'
	import AllMarketDetails from "./Market/AllMarket.view.svelte";
	import sideBarState from '../stores/sideBarStore'
	import BinanceData,{ PercentageLoaded } from '../stores/dataStore'
  	let showMarket = false
	
  </script>

  
  
  <div class="app">

   <SideBar bind:showMarket={showMarket}/>
   <main>
		{#if !$sideBarState.marketGraph}
		<Tabs/>
		<div class="card  bg-base-100 shadow-xl">
			<progress class="progress progress-success w-full" value={`${$PercentageLoaded}`} max={`${$BinanceData.complete.length}`}></progress>

                <DaisyTable/>
		</div>
		{:else}
		<div class="card   w-max-full shadow-xl">
			<AllMarketDetails/>
		</div>
		{/if}
		 
  </main>
  </div>

<style>
	.app {
		display: flex;
		flex-direction: row;
		min-height: 100%;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 2px;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}



	@media (min-width: 480px) {
		/* footer {
			padding: 12px 0;
		} */
	}
</style>
