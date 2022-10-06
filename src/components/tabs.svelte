<script>
  import { user } from '$lib/stores/UserStore.js'
</script>

<div class="tabs tabs-boxed">
  <a href="/" class="tab">Tab 1</a> 
  <a href="/" class="tab tab-active">Tab 2</a> 
  <a href="/" class="tab">Tab 3</a>
  <div class="avatar">
    <span>{$user.email}</span>
</div>
</div>
