<script>

  import { SymbolAllMarket, connectWebSocketSocketKline_, socketKline_ } from '../../stores/WebSocket'
  import AllMarketDetailsStats from '../Stats/AllMarketDetails.stats.svelte';
    import { onMount, onDestroy } from 'svelte';

    let CandleTicksChartMarket;

    onMount(async()=>{   
        CandleTicksChartMarket = async () =>  await import('../Charts/symbol.candleTicks.chart.svelte')
        connectWebSocketSocketKline_($SymbolAllMarket)
    })

     onDestroy(()=>{
      socketKline_.close(1000)
    })

</script>
<div class="navbar bg-base-100">
  <div class="flex-1">
    <!-- svelte-ignore a11y-missing-attribute -->
  </div>
  <div class="flex-none gap-2">
    <div class="form-control">
      <input type="text" placeholder="Search" class="input input-bordered" />
    </div>
    <div class="dropdown dropdown-end">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <!-- svelte-ignore a11y-missing-attribute -->
          <img src="https://placeimg.com/80/80/people" />
        </div>
      </label>
      <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <!-- svelte-ignore a11y-missing-attribute -->
          <a class="justify-between">
            Profile
            <span class="badge">New</span>
          </a>
        </li>
        <!-- svelte-ignore a11y-missing-attribute -->
        <li><a>Settings</a></li>
        <!-- svelte-ignore a11y-missing-attribute -->
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>

<div class="card lg:card-side bg-base-100 shadow-xl w-max-full ">
  {#if CandleTicksChartMarket}
    {#await CandleTicksChartMarket() }
      <div class="radial-progress" style="--value:0;">Loading charts... </div>
    {:then module}
      <svelte:component this={module.default}/>
      {:catch error}
	      <p style="color: red">{error.message}</p>
    {/await}
    {/if}
  <div class="card-body">
   <AllMarketDetailsStats/>
  </div>
</div>