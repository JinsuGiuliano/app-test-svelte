<script >
    import userStore from '../stores/UserStore.js'
    import Login from "../components/Login/login.svelte";
    import Main from "../components/main.svelte";
	  // import { onMount } from 'svelte';
//     let logged = $userStore.profile.logged
// $: userStoreCopy =  $userStore
	$: user = $userStore

</script>


{#if user.profile.logged  }
     <Main/>  
{:else}
  <Login />
{/if}

