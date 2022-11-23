<script>
import sideBarState, { setSideBarState } from '../../stores/sideBarStore'


</script>

<div class="drawer drawer-start max-w-xs">
  <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content w-100">
    <!-- Page content here -->
    <label for="my-drawer-4" class="drawer-button btn glass w-100 flex-center">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>
<span>NAVIGATE</span>
  <div class="w-16 rounded">
          <img src="/img/logo.png" />
        </div>
    </label>
  </div> 
  <div class="drawer-side">
    <label for="my-drawer-4" class="drawer-overlay"></label>
    <ul class="menu overflow-y-auto w-auto h-30 text-base-content">
        <label for="my-drawer-4" class="drawer-button btn ">
                <div class="w-20 rounded ">
          <img src="/img/logo.png" />
        </div>
        </label>
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
