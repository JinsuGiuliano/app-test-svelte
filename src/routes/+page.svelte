<script >
    import userStore from '../stores/UserStore.js'
    import Login from "../components/Login/login.svelte";
    import Main from "../components/main.svelte";
	  // import { onMount } from 'svelte';
//     let logged = $userStore.profile.logged
// $: userStoreCopy =  $userStore


</script>


{#if $userStore  }
     <Main/>  
{:else}
  <Login />
{/if}

