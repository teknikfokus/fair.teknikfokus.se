<template>
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <img class="mx-auto h-36 w-auto" src="/src/assets/logo-black-text.svg" alt="Workflow" />
        <div v-if="verified">
          <p class="mt-12 text-center text-xl font-semibold text-gray-700">
            Your email has been verified. 
          </p>
          <router-link to="/login" class="mt-6 relative text-center block justify-center py-6 border border-transparent text-lg font-medium rounded-md text-white bg-teknikfokus-primary hover:bg-teknikfokus-primary-lightest focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teknikfokus-primary-light">
            Sign in
          </router-link>
        </div>
      </div>
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
      verified: false,
    }
  },
  mounted() {
    http.get("/verify/" + this.$route.params.token)
      .then(
        (response) => {
          if(response.status == 200) {
            this.verified = true;
          }
        }
      );
  }
}
</script>

<style>

</style>