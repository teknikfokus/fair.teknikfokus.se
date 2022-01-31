<template>
  <section class="pt-8 px-4 max-w-5xl mx-auto">
    <nav-bar />
    <job-grid-companies />
  </section>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import JobGridCompanies from '@/components/JobGridCompanies.vue'

export default {
  components: {
    NavBar,
    JobGridCompanies
  }
}
</script>

<style>

</style>