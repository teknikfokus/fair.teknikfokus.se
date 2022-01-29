<template>
  <section>
    <img src="@/assets/logo-black-text.svg" alt="Teknikfokus" class="w-32 block mx-auto mt-6" />

    <company-grid/>
  </section>
</template>

<script>
import CompanyGrid from '@/components/CompanyGrid.vue'


export default {
  components: {
    CompanyGrid
  },
}
</script>

<style>

</style>