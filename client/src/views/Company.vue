<template>
  <section class="pt-8 px-4 max-w-5xl mx-auto">
    <nav-bar />

    <h1 class="mt-16 text-7xl font-semibold">{{ company.name }}</h1>
    <div class="mt-12 prose lg:prose-xl max-w-full">
      <div v-html="company.information"></div>
    </div>

    <div v-if="company.meeting_link" class="text-center mt-14">
      <h3 class="text-4xl font-semibold">Want to chat further with the company?</h3>
      <a :href="company.meeting_link" class="mt-6 relative inline-block justify-center py-6 px-12 border border-transparent text-lg font-medium rounded-md text-white bg-teknikfokus-primary hover:bg-teknikfokus-primary-lightest focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teknikfokus-primary-light">
        Talk to the representative online
      </a>
    </div>

    <div class="mt-14">
      <job-grid />
    </div>
  </section>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import http from '@/axios'
import JobGrid from '../components/JobGrid.vue';

export default {
  components: {
    NavBar,
    JobGrid,
  },
  data() {
    return {
      company: {},
    };
  },
  mounted() {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };
    console.log(config);
    http.get("/companies/" + this.$route.params.id, config)
    .then(
      (response) => {
        console.log(response.data);
        this.company = response.data;
      }
    );
  },
}
</script>

<style>

</style>