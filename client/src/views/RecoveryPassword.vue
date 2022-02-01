<template>
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <img class="mx-auto h-36 w-auto" src="/src/assets/logo-black-text.svg" alt="Workflow" />
        <h2 class="mt-12 text-center text-3xl font-semibold text-gray-900">
          Reset password
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="onSubmit" method="POST">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="password" class="sr-only">New password</label>
            <input id="password" v-model="password" name="password" type="password" autocomplete="new-password" required="" class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-teknikfokus-primary-light focus:border-tekniring-teknikfokus-primary-light focus:z-10 sm:text-sm" placeholder="New password" />
          </div>
        </div>

        <div class="space-y-2">
          <p v-if="error" class="text-red-600 text-sm text-center">{{ error }}</p>
          <p v-if="sentReset" class="text-teknikfokus-primary text-sm text-center">Password has been updated</p>

          <button v-if="!sentReset" type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teknikfokus-primary hover:bg-teknikfokus-primary-lightest focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teknikfokus-primary-light">
            Send
          </button>

          <router-link to="/login" v-if="sentReset" type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teknikfokus-primary hover:bg-teknikfokus-primary-lightest focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teknikfokus-primary-light">
            Go to sign in page
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>
  
<script>
import { LockClosedIcon } from '@heroicons/vue/solid'
import {http} from '@/axios'

export default {
  components: {
    LockClosedIcon,
  },
  data() {
    return {
      password: '',
      error: null,
      sentReset: false,
    }
  },
  methods: {
    async onSubmit() {
      try {
        const res = await http.post("/recovery", {
          id: this.$route.params.id,
          password: this.password
          }
        );
        this.sentReset = true;
      } catch (err) {
        this.error = "Something went wrong, maybe the link has already been used?"
      }
    }
  }
}
</script>

<style>

</style>