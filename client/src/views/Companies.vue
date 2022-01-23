<template>
  <section>
    <company-grid :current="true"/>
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