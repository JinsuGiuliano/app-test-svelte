<script>
  import userStore,{ loginOutAction }from '../lib/stores/UserStore.js'
</script>
<div class="navbar bg-base-100">
  <div class="flex-1">
    <div class="tabs tabs-boxed">
  <a href="/" class="tab">Tab 1</a> 
  <a href="/" class="tab tab-active">Tab 2</a> 
  <a href="/" class="tab">Tab 3</a>
</div>
  </div>
  <div class="flex-none">
    <div class="dropdown dropdown-end">
      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img src="https://placeimg.com/80/80/people" />
        </div>
      </label>
      <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a class="justify-between">
            {$userStore.email}
          </a>
        </li>
        <li  on:click={()=>loginOutAction()}><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>

