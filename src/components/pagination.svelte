<script>
  export let current_page;
  export let last_page;
  export let per_page;
  export let from;
  export let to;
  export let total;

  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

 function range(size, startAt = 0) {
    return [...Array(size).keys()].map(i => i + startAt);
  }

  function changePage(page) {
    if (page !== current_page) {
      return ;
    }
  }
</script>

<p>
  Page <code>{current_page}</code> of <code>{last_page}</code> (<code>{from + 1}</code> - <code>{to}</code> on <code>{total}</code> items)
</p>

<div class="btn-group">
  <button class="btn" on:click="{() => changePage(current_page - 1)}">«</button>
   {#each range(last_page, 1) as page}
        <button class="btn"  on:click="{() => changePage(page)}">{`Page ${page}`}</button>
    {/each}
  <button class="btn" on:click="{() => changePage(current_page + 1)}">»</button>
</div>