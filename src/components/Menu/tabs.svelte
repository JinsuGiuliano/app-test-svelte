<script>
  import userStore,{ loginOutAction }from '../../stores/UserStore.js'
  import MultipleSelection from '../Exchange/MultipleSelection.component.svelte';


</script>

  <div class="flex flex-row justify-between">
    <div>
  <MultipleSelection />
    </div>
    <div class="dropdown dropdown-end">
      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <div class="w-24 rounded">
          <img src="/img/logo.png" />
        </div>
      </label>
       <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a class="justify-between">
            {$userStore.profile.email}
          </a>
        </li>
        <li  on:click={()=>loginOutAction()}><a>Logout</a></li>
      </ul>
      <div>
      </div>
  </div>
  </div>