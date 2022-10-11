<script>
import sideBarState, { setSideBarState } from '../../stores/sideBarStore'


</script>

<div class="drawer drawer-start max-w-xs">
  <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content">
    <!-- Page content here -->
    <label for="my-drawer-4" class="drawer-button btn btn-ghost w-max-80">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>
    </label>
  </div> 
  <div class="drawer-side">
    <label for="my-drawer-4" class="drawer-overlay"></label>
    <ul class="menu p-4 overflow-y-auto w-auto  text-base-content">
        <label for="my-drawer-4" class="drawer-button btn btn-primary mb-5">LOGO</label>
      <!-- Sidebar content here -->
      {#if $sideBarState.exchangeInfo}
        <li class="bordered my-1"  on:click={()=>setSideBarState('exchangeInfo')}><a>Exchange Info</a></li>
      {:else}
         <li  class="my-1" on:click={()=>setSideBarState('exchangeInfo')}><a>Exchange Info</a></li>
      {/if}

         {#if $sideBarState.marketGraph}
             <li class="bordered my-1" on:click={()=>setSideBarState('marketGraph')}><a>Market Graph</a></li>
      {:else}
               <li class="my-1" on:click={()=>setSideBarState('marketGraph')}><a>Market Graph</a></li>
      {/if}

    </ul>
  </div>
</div>
