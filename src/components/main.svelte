  <script>
    
    import SideBar from "./sideBar.svelte";
    import Tabs from "./tabs.svelte";
    import InfoTable from "./infoTable.svelte";
  </script>
  
  
  
  <div class="app">

   <SideBar/>
   <main>
        <Tabs/>
        <div class="card lg:card-side bg-base-100 shadow-xl">
                <InfoTable/>
        </div>
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
		padding: 1rem;
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
