<template>
  <div v-if="jobs.length > 0" class="max-w-5xl mx-auto p-8">
    <h3 class="text-4xl mt-8 font-bold">Jobs</h3>
    <div class="mt-3 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      <router-link :to="'/companies/' + this.$route.params.id + '/job/' + job.id" v-for="job in jobs" :key="job.id" class="bg-white h-44 rounded-xl shadow-xl hover:shadow-2xl flex justify-center items-center text-xl font-medium text-center px-4">
        {{ job.job_description }}
      </router-link>
    </div>
  </div>
</template>

<script>
import http from '@/axios'

export default {
  name:"JobGrid",
  data() {
    return {
      jobs: [],
    };
  },
  mounted() {
      http.get("/companies/" + this.$route.params.id + "/jobs")
      .then(
        (response) => {
          this.jobs = response.data;
        }
      );
  },
}
</script>

<style>

</style>