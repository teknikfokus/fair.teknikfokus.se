<template>
  <div class="flex justify-between items-center">
      <span @click="goBack()" class="text-gray-600 flex items-center group text-lg hover:cursor-pointer">
        <ChevronDoubleLeftIcon class="w-4 h-4 pt-0.5"/>
        <span class="group-hover:underline">Back</span>
      </span>

      <div v-if="title">
        <p class="font-semibold">{{ title }}</p>
      </div>

      <div class="flex">
        <router-link :to="homeButton" >
          <HomeIcon class="w-8 h-8 text-gray-600"/>
        </router-link>
        <button class="ml-2" @click="logout" title="Logout">
          <LogoutIcon class="w-8 h-8 text-gray-400"/>
        </button>
      </div>
    </div>
</template>

<script>
import { HomeIcon, ChevronDoubleLeftIcon, LogoutIcon } from '@heroicons/vue/outline'

export default {
  name: "NavBar",
  components: {
    HomeIcon,
    ChevronDoubleLeftIcon,
    LogoutIcon,
  },
  props: {
    title: String,
  },
  methods: {
    hasHistory () { 
      return window.history.length > 2 
    },
    goBack() {
      this.hasHistory() ? this.$router.go(-1) : this.$router.push(this.homeButton)
    },
    logout() {
      let isCompany = localStorage.getItem("company_slug");
      localStorage.removeItem("token");
      localStorage.removeItem("company_slug");
      this.$router.push(isCompany ? "/dashboard" : "/");
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