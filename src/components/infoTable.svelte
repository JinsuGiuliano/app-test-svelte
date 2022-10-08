<script>
	import jQuery from 'jquery'
	import { afterUpdate, beforeUpdate, onMount, tick } from 'svelte'
  import {  fetchBinanceData, BinanceDataFiltered  } from '../lib/stores/dataStore'
	let columns = ['details','symbol','status','baseAsset' ,'baseAssetPrecision','quoteAsset','quotePrecision' ,'quoteAssetPrecision', 
  'icebergAllowed','ocoAllowed','isSpotTradingAllowed','isMarginTradingAllowed']
	let el // table element
	let table // table object (API)
	
	const dataPromise = $BinanceDataFiltered
	

	onMount(async () => {
    await fetchBinanceData()
		table = jQuery(el).setTable()
	
	})
</script>

<svelte:head>
  <link  href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.2.0/css/bootstrap.min.css"/>
 <link href="https://cdn.datatables.net/1.12.1/css/dataTables.bootstrap5.min.css"/>

  <script  type="text/javascript"  src="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js" ></script>
  <script src="https://cdn.datatables.net/1.12.1/js/dataTables.bootstrap5.min.js"></script>
</svelte:head>

<table bind:this={el} id="example" class="table table-striped" style="width:100%">
  <thead>
    <tr>
      {#each columns as colum, i }
        <th name={columns.symbol} id={i}>{colum}</th>
      {/each}
    </tr>
  </thead>
  <tbody>
 {#each dataPromise as data }
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