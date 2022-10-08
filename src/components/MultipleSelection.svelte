<script>

 export let options;
export let search;
$: selectedOptions = []

function onSelectOption(e){
    console.log('onSelectOption: ', e)
        selectedOptions.includes(e)
        ? selectedOptions.push(e)
        : selectedOptions.filter(i => i !== e)
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
  <ul tabindex="0" class="dropdown-content menu p-0 shadow bg-base-100 rounded-box w-25">
    {#each options as opt }
        <button class={`btn ${selectedOptions.includes(opt) && 'btn-active'}`} on:click={()=>onSelectOption(opt)}>{opt}</button>
    {/each}
  </ul>
</div>


</div>