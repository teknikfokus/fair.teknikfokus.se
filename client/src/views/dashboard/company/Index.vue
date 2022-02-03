<template>
  <section class="pt-8 px-4 max-w-5xl mx-auto">
    <nav-bar /> 
    <h1 class="mt-16 text-3xl md:text-5xl font-semibold text-center">Welcome to your dashboard</h1>

    <h3 class="text-2xl font-semibold mt-6">Profile</h3>
    <div class="mt-6 grid md:grid-cols-3 sm:grid-cols-2 gap-4">
      <router-link :to="'/companies/' + companySlug" class="text-center block py-6 px-12 border border-transparent text-lg font-medium rounded-md text-white bg-teknikfokus-primary hover:bg-teknikfokus-primary-lightest focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teknikfokus-primary-light">
        Show profile
      </router-link>
      <router-link to="/dashboard/company/edit" class="text-center block py-6 px-12 border border-transparent text-lg font-medium rounded-md text-white bg-teknikfokus-primary hover:bg-teknikfokus-primary-lightest focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teknikfokus-primary-light">
        Edit profile
      </router-link>
      <router-link to="/dashboard/company/image" class="text-center block py-6 px-12 border border-transparent text-lg font-medium rounded-md text-white bg-teknikfokus-primary hover:bg-teknikfokus-primary-lightest focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teknikfokus-primary-light">
        Update logo
      </router-link>
    </div>
    <h3 class="text-2xl font-semibold mt-6">Jobs</h3>
    <div class="mt-6 grid md:grid-cols-3 sm:grid-cols-2 gap-4">
      <router-link to="/dashboard/company/job/create" class="text-center py-6 px-12 border border-transparent text-lg font-medium rounded-md text-white bg-teknikfokus-primary hover:bg-teknikfokus-primary-lightest focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teknikfokus-primary-light">
        Add new job
      </router-link>
      <router-link to="/dashboard/company/job/list" class="text-center py-6 px-12 border border-transparent text-lg font-medium rounded-md text-white bg-teknikfokus-primary hover:bg-teknikfokus-primary-lightest focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teknikfokus-primary-light">
        All jobs
      </router-link>
    </div>
    <h3 class="text-2xl font-semibold mt-6">Students - <span class="text-base text-red-600">Only possible on the day(s) of you attending the fair!</span></h3>
    <div class="mt-6 grid md:grid-cols-3 sm:grid-cols-2 gap-4">
      <router-link to="/dashboard/students" class="text-center py-6 px-12 border border-transparent text-lg font-medium rounded-md text-white bg-teknikfokus-primary hover:bg-teknikfokus-primary-lightest focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teknikfokus-primary-light">
        View all students
      </router-link>
    </div>
  </section>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
export default {
  components: {
    NavBar
  },
  computed: {
    companySlug() {
      return localStorage.getItem('company_slug');
    }
  }
}
</script>

<style>

</style>