<template>
  <div class="max-w-5xl mx-auto p-8">
    <h3 class="text-4xl mt-8 font-bold">Dag 1 - 16/2</h3>
    <div class="mt-3 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      <router-link to="/companies/1" v-for="n in 20" :key="n" class="bg-white h-44 rounded-xl shadow-xl hover:shadow-2xl">
        <img src="@/assets/logo-black-text.svg" class="block mx-auto max-h-full max-w-full p-4"/>
      </router-link>
    </div>
    <h3 class="text-4xl mt-16 font-bold">Dag 2 - 17/2</h3>
    <div class="mt-3 grid grid-cols-3 gap-6">
      <router-link to="/companies/1" v-for="n in 20" :key="n" class="bg-white h-44 rounded-xl shadow-xl hover:shadow-2xl">
        <img src="@/assets/logo-black-text.svg" class="block mx-auto max-h-full max-w-full p-4"/>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name:"CompanyGrid",
}
</script>

<style>

</style>