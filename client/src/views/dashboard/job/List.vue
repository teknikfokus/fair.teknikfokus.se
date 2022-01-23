<template>
  <section class="pt-8 px-4 max-w-5xl mx-auto">
    <nav-bar />
    <job-grid />
  </section>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import JobGrid from '@/components/JobGrid.vue'

export default {
  components: {
    NavBar,
    JobGrid
  }
}
</script>

<style>

</style>