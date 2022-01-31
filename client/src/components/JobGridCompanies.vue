<template>
  <div v-if="jobs.length > 0" class="max-w-5xl mx-auto py-8">
    <h3 class="text-4xl mt-8 font-bold">Jobs</h3>
    <div class="mt-3 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      <router-link 
        :to="'/dashboard/company/job/' + job.id + '/edit'" 
        v-for="job in jobs" :key="job.id" 
        class="bg-white h-44 rounded-xl shadow-xl hover:shadow-2xl flex flex-col justify-center items-center text-xl font-medium text-center px-4">
        {{ job.job_position }}
        <span class="text-sm text-gray-500 mt-2">Click to edit</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import {http} from '@/axios'

export default {
  name:"JobGrid",
  data() {
    return {
      jobs: [],
    };
  },
  mounted() {
      http.get("/companies/" + this.company_slug + "/jobs")
      .then(
        (response) => {
          this.jobs = response.data;
        }
      );
  },
  computed: {
    company_slug() {
      return localStorage.getItem("company_slug");
    }
  }
}
</script>

<style>

</style>