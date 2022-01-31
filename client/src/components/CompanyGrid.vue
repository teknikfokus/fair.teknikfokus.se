<template>
  <div class="max-w-5xl mx-auto p-8">
    <h3 class="text-4xl mt-8 font-bold">Dag 1 - 16/2</h3>
    <div class="mt-3 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      <router-link :to="'/companies/' + company.slug_name" v-for="company in filteredCompanies" :key="company.slug_name" class="bg-white h-44 rounded-xl shadow-xl hover:shadow-2xl">
        <img src="@/assets/logo-black-text.svg" class="block mx-auto max-h-full max-w-full p-4"/>
      </router-link>
    </div>
  </div>
</template>

<script>
import {http} from '@/axios';

export default {
  name:"CompanyGrid",
  props: {
    summer_internship: {
      type: Boolean,
      default: true,
    },
    master_thesis: {
      type: Boolean,
      default: true,
    },
    trainee_programme: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      companies: [],
    };
  },
  mounted() {
      http.get("/companies")
      .then(
        (response) => {
          this.companies = response.data;
        }
      );
  },
  computed: {
    filteredCompanies() {
      return this.companies.filter(company => 
        (this.summer_internship && company.summer_internhip)
        || (this.master_thesis && company.master_thesis)
        || (this.trainee_programme && company.trainee_programme));
    }
  }
}
</script>

<style>

</style>