<template>
  <section class="pt-8 px-4 max-w-5xl mx-auto">
    <nav-bar />

    <h1 class="mt-16 text-7xl font-semibold">Teknikfokus</h1>
    <div class="mt-12 prose lg:prose-xl max-w-full">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis iaculis lacinia tortor. Quisque mattis, risus vitae facilisis lobortis, libero sem eleifend nunc, tempus consequat ante nunc ac lacus. Pellentesque sagittis ex urna, eu tempus metus scelerisque eget. Etiam quis aliquam massa. Donec nec eros ac lectus scelerisque convallis. Nullam molestie auctor massa at cursus. Nullam ligula sapien, ullamcorper ut sapien placerat, egestas dictum quam. Phasellus mollis nulla et est volutpat, eget convallis mauris cursus. Cras iaculis ultricies risus, commodo scelerisque ipsum tincidunt ac.</p>
      <p>In et aliquet elit, quis porta purus. Sed consequat suscipit leo id tempor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer ac ex non nisi interdum pretium. Ut a augue eu ligula pellentesque venenatis. Nullam vitae dui rhoncus justo commodo luctus eu nec orci. Ut libero mi, suscipit sed efficitur gravida, venenatis tincidunt quam. Pellentesque elementum velit nisi, non feugiat mi semper vitae. Nullam sollicitudin scelerisque fringilla. Suspendisse potenti. Nullam aliquam pretium nisl, eget ullamcorper ante mollis eu. Nam eu elit sem. Donec turpis nunc, convallis vitae nulla a, placerat porta metus.</p>
    </div>

    <div class="text-center mt-14">
      <h3 class="text-4xl font-semibold">Want to chat further with the company?</h3>
      <a href="#" class="mt-6 relative inline-block justify-center py-6 px-12 border border-transparent text-lg font-medium rounded-md text-white bg-teknikfokus-primary hover:bg-teknikfokus-primary-lightest focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teknikfokus-primary-light">
        Talk to the representative online
      </a>
    </div>

    <div class="mt-14">
      <h3 class="text-4xl font-semibold">Jobs/thesis</h3>
      <div class="mt-3 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      <a href="/companies/1/job/1" v-for="n in 6" :key="n" class="bg-white h-44 rounded-xl shadow-xl hover:shadow-2xl flex justify-center items-center text-xl font-medium text-center px-4">
        Summerjob
      </a>
    </div>
    </div>
  </section>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
export default {
  components: {
    NavBar
  }
}
</script>

<style>

</style>