<template>
  <div class="py-8 px-4 max-w-5xl mx-auto">
    <nav-bar />
  </div>
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <img class="mx-auto h-36 w-auto" src="/src/assets/logo-black-text.svg" alt="Workflow" />
        <h2 class="mt-12 text-center text-3xl font-semibold text-gray-900">
          Create new password
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="onSubmit" method="POST">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="password-old" class="sr-only">Old password</label>
            <input id="password-old" v-model="passwords.oldPassword" name="oldpassword" type="password" autocomplete="current-password" required="" class="mt-3 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-teknikfokus-primary-light focus:border-tekniring-teknikfokus-primary-light focus:z-10 sm:text-sm" placeholder="Old passowrd address" />
          </div>
          <div>
            <label for="password" class="sr-only">New password</label>
            <input id="password" v-model="passwords.newPassword" name="password" type="password" autocomplete="new-password" required="" class="mt-3 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teknikfokus-primary-light focus:border-tekniring-teknikfokus-primary-light focus:z-10 sm:text-sm" placeholder="New password" />
          </div>
          <div>
            <label for="re-password" class="sr-only">Re-enter new password</label>
            <input id="re-password" v-model="passwords.retypePassword" name="password" type="password" autocomplete="new-password" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teknikfokus-primary-light focus:border-tekniring-teknikfokus-primary-light focus:z-10 sm:text-sm" placeholder="Re-type new password" />
          </div>
        </div>

        <div class="space-y-2">
          <p v-if="error" class="text-red-600 text-sm text-center">{{ error }}</p>
          <p v-if="status" class="text-green-600 text-sm text-center">{{ status }}</p>

          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teknikfokus-primary hover:bg-teknikfokus-primary-lightest focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teknikfokus-primary-light">
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
  
<script>
import { LockClosedIcon } from '@heroicons/vue/solid'
import NavBar from '@/components/NavBar.vue';
import {http} from '@/axios'

export default {
  components: {
    LockClosedIcon,
    NavBar,
  },
  data() {
    return {
      passwords: {
        oldPassword: '',
        newPassword: '',
        retypePassword: '',
      },
      error: null,
      status: null,
    }
  },
  methods: {
    async onSubmit() {
      if(this.passwords.newPassword !== this.passwords.retypePassword) {
        this.error = "Passwords doesn't match";
        return;
      }
      try {
        const res = await http.post("/dashboard/resetpassword", this.passwords);
        
        this.status = "Password has been changed";
        this.error = null;
      } catch (err) {
        if(err.response.status == 400) {
          this.$router.push("/dashboard");
        } else if(err.response.status == 403) {
          this.error = "Wrong credentials."
        }
      }
    }
  }
}
</script>

<style>

</style>