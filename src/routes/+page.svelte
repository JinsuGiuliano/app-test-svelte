<script>
    import { user } from '$lib/stores/UserStore.js'
    import Login from "../components/login.svelte";
    import Main from "../components/main.svelte";

</script>


{#if !$user.logged }
    <Login/>
{/if}

{#if $user.logged }
    <Main/> 
{/if}

