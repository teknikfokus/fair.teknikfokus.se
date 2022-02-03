<template>
  <section class="relative py-6 px-4 max-w-5xl mx-auto">
    <img src="@/assets/logo-black-text.svg" alt="Teknikfokus" class="w-32 block mx-auto" />
 
    <div class="sm:absolute top-4 right-4 text-center">
      <router-link to="/student/profile" class="mt-4 relative inline-flex justify-center items-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-teknikfokus-primary hover:bg-teknikfokus-primary-lightest focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teknikfokus-primary-light">
        Edit your profile
      </router-link>
    </div>

    <div class="mt-8 flex justify-center items-center space-x-4">
      <div>
        <input type="checkbox" id="summer_internship" value="summer_internship" v-model="summer_internship" >
        <label for="summer_internship"> Summer Internship / Part-time position</label>
      </div>

      <div>
        <input type="checkbox" id="master_thesis" value="master_thesis" v-model="master_thesis" >
        <label for="master_thesis"> Master Thesis</label>
      </div>

      <div>
        <input type="checkbox" id="trainee_programme" value="trainee_programme" v-model="trainee_programme" >
        <label for="trainee_programme" class=""> Trainee Programme / Graduate Position</label>
      </div>
    </div>
    
    <div class="max-w-5xl mx-auto mt-8">
      <company-grid :companies="this.filteredCompanies()"/>
    </div>

    <div v-if="this.today == this.firstDay">
      <h3 class="text-4xl mt-8 font-bold">Companies tomorrow</h3>
      <company-grid :companies="this.companiesTomorrow" :link="false"/>
    </div>
  </section>
</template>

<script>
import CompanyGrid from '@/components/CompanyGrid.vue'
import {http} from '@/axios';

const firstDay = "2022-02-16";
const secondDay = "2022-02-17";

export default {
  components: {
    CompanyGrid
  },
  data() {
    return {
      summer_internship: true,
      master_thesis: true,
      trainee_programme: true,
      companies: [],
    }
  },
  setup() {
    return {
      firstDay,
      secondDay,
    }
  },
  mounted() {
      http.get("/companies")
      .then(
        (response) => {
          this.companies = response.data;
        }
      );
  },
  methods: {
    filteredCompanies() {
      return this.fairDay.filter(company => 
        (this.summer_internship && company.summer_internship)
        || (this.master_thesis && company.master_thesis)
        || (this.trainee_programme && company.trainee_programme));
    },
  },
  computed: {
    today() {
      return new Date().toJSON().slice(0,10);
    },
    fairDay() {
      return this.companies.filter(company =>
        company.slug_name === "Teknikfokus" ||
        (
          company.fair_day === 3 && (this.today == firstDay || this.today == secondDay)
          || (company.fair_day === 1 && this.today == firstDay)
          || (company.fair_day === 2 && this.today == secondDay)
        )
      );
    },
    companiesTomorrow() {
      return this.companies.filter(company => company.fair_day === 3 || company.fair_day === 2);
    }
  }
}
</script>

<style>

</style>