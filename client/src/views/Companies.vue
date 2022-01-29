<template>
  <section>
    <img src="@/assets/logo-black-text.svg" alt="Teknikfokus" class="w-32 block mx-auto mt-6" />

    <div>
        <div class="mt-8 flex justify-center items-center space-x-4">
          <div>
            <input type="checkbox" id="summer_internship" value="summer_internship" v-model="summer_internship" >
            <label for="summer_internship"> Summer Internship</label>
          </div>

          <div>
            <input type="checkbox" id="master_thesis" value="master_thesis" v-model="master_thesis" >
            <label for="master_thesis"> Master Thesis</label>
          </div>

          <div>
            <input type="checkbox" id="trainee_programme" value="trainee_programme" v-model="trainee_programme" >
            <label for="trainee_programme" class=""> Trainee Programme</label>
          </div>
        </div>
      </div>
    <company-grid :summer_internship="summer_internship" :master_thesis="master_thesis" :trainee_programme="trainee_programme"/>
  </section>
</template>

<script>
import CompanyGrid from '@/components/CompanyGrid.vue'


export default {
  components: {
    CompanyGrid
  },
  data() {
    return {
      summer_internship: true,
      master_thesis: true,
      trainee_programme: true,
    }
  },
}
</script>

<style>

</style>