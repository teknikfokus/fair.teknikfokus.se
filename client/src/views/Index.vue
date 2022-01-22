<template>
  <section>

    <div id="hero-background-image" class="py-20 hero-background bg-center bg-cover text-center text-xl md:text-2xl text-white text-shadow-lg uppercase">
      <div class="container mx-auto">
        <div class="">
          <img src="@/assets/logo-white-text.svg" class="w-full h-48 pb-8" alt="Teknikfokus" />
        </div>
        <h1 class="font-bold md:text-3xl">Career fair</h1>
        <h3 class="normal-case font-medium">16th &amp; 17th OF FEBRUARY</h3>
        <CountDown :firstDate="firstDate" :secondDate="secondDate" />
        <div class="mt-20 max-w-xl mx-auto grid sm:grid-cols-2 gap-6 px-4">
          <router-link to="/login" class="relative block justify-center py-6 border border-transparent text-lg font-medium rounded-md text-white bg-teknikfokus-primary hover:bg-teknikfokus-primary-lightest focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teknikfokus-primary-light">
            Sign in
          </router-link>
          <router-link to="/registration" class="relative block justify-center py-6 border-none text-lg font-medium rounded-md text-white hover:bg-teknikfokus-primary-lightest focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teknikfokus-primary-light">
            Create account
          </router-link>
        </div>
      </div>
    </div>
    <company-grid />
  </section>
</template>

<script>
import CountDown from '@/components/CountDown.vue'
import CompanyGrid from '@/components/CompanyGrid.vue'

const firstDate = {
  open: new Date('2022-02-16T08:00'),
  close: new Date('2022-02-16T16:00'),
}
const secondDate = {
  open: new Date('2022-02-17T08:00'),
  close: new Date('2022-02-17T16:00'),
}
export default {
  components: {
    CountDown,
    CompanyGrid
  },
  setup() {
    return {
      firstDate,
      secondDate,
    }
  }
}
</script>

<style>

#hero-background-image {
  background-image: url('@/assets/images/massa2020blur.jpg');
}

</style>