<script>
import { Filters, addFilter, removeFilter } from '../../stores/dataStore'
import {  SearchTerm } from '../../stores/dataStore'

let options = ['icebergAllowed', 'ocoAllowed', 'isSpotTradingAllowed', 'isMarginTradingAllowed']

function onSelectOption(opt){
  console.log('onSelectOption: ', $Filters, opt)
        $Filters.includes(opt)
        ? removeFilter(opt)
        : addFilter(opt)
}


</script>
<div class=" ">
    <div class="dropdown dropdown-down">
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label tabindex="0" class="btn m-1 "> Search </label>
  <ul tabindex="0" class="dropdown-content menu p-0 shadow bg-base-200 rounded-box w-52">
    <div class="form-control ">
      <input type="text" bind:value={$SearchTerm} placeholder="Search by text" class="input input-bordered z-50" />
    </div>
  </ul>
</div>
<div class="dropdown dropdown-right dropdown-end ">
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label tabindex="0" class="btn m-1">Filter by Order type</label>
  <ul tabindex="0" class="dropdown-content menu p-0  rounded-box w-25">
    <div class="flex flex-row mb-3">
    {#each options as opt }
    {#if $Filters.includes(opt)}
    <div on:click={()=>onSelectOption(opt)} class="cursor-pointer badge badge-success gap-3 m-1 py-2">
       {opt}
    </div>
    {:else}
      <div on:click={()=>onSelectOption(opt)} class="cursor-pointer badge badge gap-3 m-1 py-2">
          {opt}
        </div>
    {/if}
    {/each}
    </div>
  </ul>

</div>

</div>