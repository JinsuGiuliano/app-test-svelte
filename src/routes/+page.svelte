<script>
    import userStore from '../lib/stores/UserStore.js'
    import Login from "../components/login.svelte";
    import Main from "../components/main.svelte";
	import { onMount } from 'svelte';
  console.log($userStore)

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

