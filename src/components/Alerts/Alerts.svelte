<script>
  import Alert from './alert.svelte'

  import { dismissAlert, alerts } from '../../stores/alerts.store'
</script>

{#if $alerts}
  <section>
    {#each $alerts as alert (alert.id)}
      <Alert
        type={alert.type}
        dismissible={alert.dismissible}
        on:dismiss={() => dismissAlert(alert.id)}>{alert.message}</Alert>
    {/each}
  </section>
{/if}

<style lang="postcss">
  section {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    display: flex;
    margin-top: 1rem;
    justify-content: center;
    flex-direction: column;
    z-index: 1000;
  }
</style>
