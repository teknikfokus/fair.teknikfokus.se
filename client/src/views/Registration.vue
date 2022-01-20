<template>
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <img class="mx-auto h-36 w-auto" src="/src/assets/logo-black-text.svg" alt="Workflow" />
        <h2 class="mt-12 text-center text-3xl font-semibold text-gray-900">
          Create account
        </h2>
         <p class="mt-2 text-center text-sm text-gray-600">
          You may only register with your ab1122-s@lu.se address
        </p>
      </div>
      <form class="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input id="email-address" name="email" type="email" autocomplete="email" required="" class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-teknikfokus-primary-light focus:border-tekniring-teknikfokus-primary-light focus:z-10 sm:text-sm" placeholder="Email address" />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" name="password" type="password" autocomplete="new-password" required="" class="mt-3 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teknikfokus-primary-light focus:border-tekniring-teknikfokus-primary-light focus:z-10 sm:text-sm" placeholder="Password" />
          </div>
          <div>
            <label for="password" class="sr-only">Re-enter password</label>
            <input id="password" name="password" type="password" autocomplete="new-password" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teknikfokus-primary-light focus:border-tekniring-teknikfokus-primary-light focus:z-10 sm:text-sm" placeholder="Re-type password" />
          </div>
        </div>

        <div class="space-y-2">
          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teknikfokus-primary hover:bg-teknikfokus-primary-lightest focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teknikfokus-primary-light">
            Create account
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
  
<script>
import { LockClosedIcon } from '@heroicons/vue/solid'

export default {
  components: {
    LockClosedIcon,
  },
}
</script>

<style>

</style>