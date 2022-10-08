<script>
	import { page } from '$app/stores';
  export let showMarket;


function NotshowMarket (){
  showMarket =false
  console.log('NotshowMarket',showMarket)
}

function showTheMarket (){
  showMarket =true
}
  console.log('showMarket: ', showMarket)
</script>

<div class="drawer drawer-start">
  <input id="my-drawer-4" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content">
    <!-- Page content here -->
    <label for="my-drawer-4" class="drawer-button btn btn-primary">Open drawer</label>
  </div> 
  <div class="drawer-side">
    <label for="my-drawer-4" class="drawer-overlay"></label>
    <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
        <label for="my-drawer-4" class="drawer-button btn btn-primary">LOGO</label>
      <!-- Sidebar content here -->
      <li on:click={NotshowMarket}><a>Exchange Info</a></li>
      <li on:click={showTheMarket}><a>Market Graph</a></li>
      <li><a>Option 2</a></li>
    </ul>
  </div>
</div>
