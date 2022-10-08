<script>
    import userStore from '../lib/stores/UserStore.js'
    import Login from "../components/login.svelte";
    import Main from "../components/main.svelte";
	import { onMount } from 'svelte';


// onMount(()=>{
// if (window && window.sessionStorage) {
//     user = JSON.parse(localStorage.getItem('user')) }
// })
</script>


{#if $userStore.logged}
     <Main/>  
{:else}
  <Login/>
{/if}

