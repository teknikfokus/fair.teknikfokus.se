<template>
  <div class="flex justify-between">
      <router-link to="#" @click="goBack()" class="text-gray-600 flex items-center group text-lg">
        <ChevronDoubleLeftIcon class="w-4 h-4 pt-0.5"/>
        <span class="group-hover:underline">Back</span>
      </router-link>

      <router-link :to="homeButton" >
        <HomeIcon class="w-8 h-8 text-gray-600"/>
      </router-link>
    </div>
</template>

<script>
import { HomeIcon, ChevronDoubleLeftIcon } from '@heroicons/vue/outline'

export default {
  name: "NavBar",
  components: {
    HomeIcon,
    ChevronDoubleLeftIcon
  },
  methods: {
    hasHistory () { 
      return window.history.length > 2 
    },
    goBack() {
      this.hasHistory() ? this.$router.go(-1) : this.$router.push(this.homeButton)
    }
  },
  computed: {
    homeButton() {
      return localStorage.getItem("company_slug") 
      ? "/dashboard/company" 
      : localStorage.getItem("token") ? "/companies" : "/";
    }
  }
}
</script>

<style>

</style>