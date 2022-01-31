<template>
  <div class="max-w-5xl mx-auto">
    <div v-if="link" class="mt-3 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      <router-link :to="'/companies/' + company.slug_name" v-for="company in companies" :key="company.slug_name" class="bg-white h-44 rounded-xl shadow-xl hover:shadow-2xl">
        <img :src="endpoint + '/image/' + company.image_path" class="block mx-auto max-h-full max-w-full p-4"/>
      </router-link>
    </div>
    <div v-else class="mt-3 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div v-for="company in companies" :key="company.slug_name" class="bg-white h-44 rounded-xl shadow-xl hover:shadow-2xl">
        <img :src="endpoint + '/image/' + company.image_path" class="block mx-auto max-h-full max-w-full p-4"/>
      </div>
    </div>
  </div>
</template>

<script>
import {endpoint} from '@/axios'

export default {
  name:"CompanyGrid",
  props: {
    link: {
      type: Boolean,
      default: true,
    },
    companies: Array,
  },  
  setup() {
    return {
      endpoint,
    }
  }
}
</script>

<style>

</style>