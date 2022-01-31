<template>
  <section class="pt-8 px-4 max-w-5xl mx-auto">
    <nav-bar />
    <h1 class="mt-12 text-7xl font-semibold">{{ job.job_position }}</h1>

    <div class="mt-12 prose lg:prose-xl max-w-full">
      <div v-html="this.job.job_description"></div>
    </div>
  </section>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import {http} from '@/axios';

export default {
  components: {
    NavBar
  },
  data() {
    return {
      job: {
        job_position: '',
        job_description: '',
      },
    }
  },
  mounted() {
    http.get("/companies/" + this.$route.params.id + "/jobs/" + this.$route.params.jobId)
      .then(
        (response) => {
          this.job = response.data;
        }
      );
  },
}
</script>

<style>

</style>