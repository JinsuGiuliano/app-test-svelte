<script>
    import { BookDepth } from '../../stores/WebSocket'

</script>
<div class="flex flex-col max-h-30 w-full no-scrollbar">
{#if $BookDepth.bids}
<div class="overflow-y-auto w-70 max-h-40 no-scrollbar">
  <table class="table table-compact w-70 max-h-40">
    <thead >
      <tr>
        <th >bids</th>
      </tr>
    </thead>
    <tbody>
        {#each $BookDepth.bids as bid}
        <tr>
            <td> {bid[0]} - {bid[1]} </td>
        </tr>
        {/each}
    </tbody>
  </table>
</div>
{/if}
{#if $BookDepth.asks}
<div class="overflow-y-auto w-70 max-h-40 no-scrollbar">
  <table class="table table-compact w-70 max-h-40 no-scrollbar">
    <thead>
      <tr>
        <th>asks</th>
      </tr>
    </thead>
    <tbody>
        {#each $BookDepth.asks as ask}
        <tr>
            <td> {ask[0]} - {ask[1]}  </td>
        </tr>
        {/each}
    </tbody>
  </table>
</div>
{/if}
</div>


<style>

    /* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
</style>