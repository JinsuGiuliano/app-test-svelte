<script>
    import userStore, { loginAction } from '../../stores/UserStore.js'
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
          <input name="email" bind:value={$userStore.profile.email} type="text" placeholder="email" class="input input-bordered" required/>
        </div>
        <div class="form-control">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <input name="password" bind:value={$userStore.profile.password}  type="password" placeholder="password" class="input input-bordered" required/>
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <label class="label">
            <a href="#ass" class="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div class="form-control mt-6">
          <a href="/"><button class="btn btn-primary" on:click={()=> loginAction($userStore.profile.email, $userStore.profile.password, true )}>Login</button></a>
        </div>
      </div>
    </div>
  </div>
</div>