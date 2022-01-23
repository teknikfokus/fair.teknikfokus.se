<template>
  <div class="max-w-5xl mx-auto p-8">
    <h3 class="text-4xl mt-8 font-bold">Jobs</h3>
    <div class="mt-3 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      <!-- <a href="/companies/1" v-for="n in 20" :key="n" class="bg-white h-44 rounded-xl shadow-xl hover:shadow-2xl">
        Job Title
      </a> -->
      <a href="/companies/1/job/1" v-for="n in 6" :key="n" class="bg-white h-44 rounded-xl shadow-xl hover:shadow-2xl flex justify-center items-center text-xl font-medium text-center px-4">
        Job title
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name:"JobGrid",
}
</script>

<style>

</style>