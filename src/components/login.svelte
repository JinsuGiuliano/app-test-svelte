<script>
  import { loginAction } from '../lib/stores/UserStore.js'
  
$: user = { email:'', password:'' }
 
function login(){
  console.log('login: ', user)
  loginAction(user.email, user.password )
};

</script>


<div class="hero min-h-screen bg-base-200">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div class="card-body">
        <div class="form-control">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input name="email" bind:value={user.email} type="text" placeholder="email" class="input input-bordered" required/>
        </div>
        <div class="form-control">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <input name="password" bind:value={user.password}  type="password" placeholder="password" class="input input-bordered" required/>
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="label">
            <a href="#ass" class="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div class="form-control mt-6">
          <button class="btn btn-primary" on:click={login}>Login</button>
        </div>
      </div>
    </div>
  </div>
</div>