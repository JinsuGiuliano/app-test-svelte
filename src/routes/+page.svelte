<script >
    import userStore from '../stores/userStore.js'
    import Login from "../components/Login/login.svelte";
    import Main from "../components/main.svelte";
    import Alerts from '../components/Alerts/Alerts.svelte'
	  // import { onMount } from 'svelte';
//     let logged = $userStore.profile.logged
// $: userStoreCopy =  $userStore


</script>

<Alerts/>
{#if $userStore  }
     <Main/>  
{:else}
  <Login />
{/if}

