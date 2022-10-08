<script>


  	import { afterUpdate, beforeUpdate, onMount, tick,  } from 'svelte'
    
  let apiData = []

  let columns = ['symbol','status','baseAsset' ,'baseAssetPrecision','quoteAsset','quotePrecision' ,'quoteAssetPrecision', 
  'icebergAllowed','ocoAllowed','isSpotTradingAllowed','isMarginTradingAllowed']

  
  onMount(async () => {
   apiData = await fetch('https://api.binance.com/api/v3/exchangeInfo')
  .then( res => res.json())
  .then( val =>  val.symbols )
	})

</script>

<svelte:head>
  <link  href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.2.0/css/bootstrap.min.css"/>
 <link href="https://cdn.datatables.net/1.12.1/css/dataTables.bootstrap5.min.css"/>

  <script  type="text/javascript"  src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js" ></script>
  <script src="https://cdn.datatables.net/1.12.1/js/dataTables.bootstrap5.min.js"></script>
</svelte:head>

{#if apiData}
<table id="example" class="table table-striped" style="width:100%">
  <thead>
    <tr>
      {#each columns as colum, i }
        <th name={columns.symbol} id={i}>{colum}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
 {#each apiData as data }
 <tr>
  {#each columns as column}
        <td>{data[column]}</td>
  {/each}
  </tr>
 {/each}

  </tbody>
  <tfoot>
   <tr>
      {#each columns as colum }
        <th>{colum}</th>
      {/each}
    </tr>
  </tfoot>
</table>
{:else}
<div class="radial-progress text-primary" style="--value:70;">70%</div>
{/if}