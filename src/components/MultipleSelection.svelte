<script>
import { Filters, addFilter, removeFilter } from '../lib/stores/dataStore'

export let options;
export let search;
 

function onSelectOption(opt){
        $Filters.includes(opt)
        ? removeFilter(opt)
        : addFilter(opt)
}


</script>


<div class="fixed">
    <div class="dropdown dropdown-down">
  <label tabindex="0" class="btn m-1 ">Search </label>
  <ul tabindex="0" class="dropdown-content menu p-0 shadow bg-base-200 rounded-box w-52">
    <div class="form-control ">
      <input type="text" bind:value={search} placeholder="Search" class="input input-bordered z-50" />
    </div>
  </ul>
</div>
<div class="dropdown dropdown-top">
  <label tabindex="0" class="btn m-1">Filter by Order type</label>
  <ul tabindex="0" class="dropdown-content menu p-0  rounded-box w-25">
    {#each options as opt }
    <div on:click={()=>onSelectOption(opt)} class={`my-1 py-2 badge badge-${$Filters.includes(opt)?'success':'warning'} gap-2`}>
       {opt}
    </div>
    {/each}
  </ul>
</div>


</div>