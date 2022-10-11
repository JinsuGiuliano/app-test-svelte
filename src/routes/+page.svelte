<script >
    import userStore from '../stores/UserStore.js'
    import Login from "../components/Login/login.svelte";
    import Main from "../components/main.svelte";
	import { onMount } from 'svelte';

let logged = $userStore.profile.logged

	let user;

	onMount(()=>{
		user = localStorage.getItem('user')
	})

</script>


{#if logged || user }
     <Main/>  
{:else}
  <Login bind:userStore={$userStore}/>
{/if}

