<template>
  <section class="pt-8 px-4 max-w-5xl mx-auto">
    <nav-bar /> 
    <h1 class="mt-16 text-3xl font-semibold">Welcome to your dashboard</h1>
    <div class="grid grid-cols-4 gap-4">
      <router-link to="/" class="text-center mt-6 relative inline-block justify-center py-6 px-12 border border-transparent text-lg font-medium rounded-md text-white bg-teknikfokus-primary hover:bg-teknikfokus-primary-lightest focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teknikfokus-primary-light">
        Show profile
      </router-link>
      <router-link to="/dashboard/company/Edit" class="text-center mt-6 relative inline-block justify-center py-6 px-12 border border-transparent text-lg font-medium rounded-md text-white bg-teknikfokus-primary hover:bg-teknikfokus-primary-lightest focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teknikfokus-primary-light">
        Edit profile
      </router-link>
      <router-link to="/dashboard/company/job/Create" class="text-center mt-6 relative inline-block justify-center py-6 px-12 border border-transparent text-lg font-medium rounded-md text-white bg-teknikfokus-primary hover:bg-teknikfokus-primary-lightest focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teknikfokus-primary-light">
        Add new job
      </router-link>
      <router-link to="/dashboard/company/job/List" class="text-center mt-6 relative inline-block justify-center py-6 px-12 border border-transparent text-lg font-medium rounded-md text-white bg-teknikfokus-primary hover:bg-teknikfokus-primary-lightest focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teknikfokus-primary-light">
        All jobs
      </router-link>
    </div>
  </section>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
export default {
  components: {
    NavBar
  }
}
</script>

<style>

</style>