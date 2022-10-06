<script>
  import { user } from '$lib/stores/UserStore.js'


  function handleChange(e){
    const { value, name } = e.target
    user.set({...$user, [name]: value });
  }
 
function login(){
    user.set({...$user, logged: true });
  }

</script>


<div class="hero min-h-screen bg-base-200">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div class="card-body">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input name="email" bind:value={$user.email} type="text" placeholder="email" class="input input-bordered" on:change={e => handleChange(e)}/>
        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <input name="password" bind:value={$user.password}  type="password" placeholder="password" class="input input-bordered" on:change={e => handleChange(e)}/>
          <label class="label">
            <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div class="form-control mt-6">
          <button class="btn btn-primary" on:click={login}>Login</button>
        </div>
      </div>
    </div>
  </div>
</div>