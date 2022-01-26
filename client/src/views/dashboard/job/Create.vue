<template>
  <section class="pt-8 px-4 max-w-5xl mx-auto">
    <nav-bar />
    <h1 class="mt-4 text-3xl font-semibold">Job description</h1><br/>
    <editor
       api-key="tjoqjkiq6re91rc0o4p5mxpe24smdqlqwv0c7f1w74pep3bo"
       :init="{
         height: 500,
         menubar: false,
         plugins: [
           'advlist autolink lists link image charmap print preview anchor',
           'searchreplace visualblocks code fullscreen',
           'insertdatetime media table paste code help wordcount'
         ],
         toolbar:
           'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help'
       }"
        v-model="jobEditor"
     />
     <input v-model="jobTitle"  placeholder="Job title" class="mt-5"><br>
    <router-link to="#" class="mt-3 relative inline-block justify-center py-2 px-7 border border-transparent text-lg font-medium rounded-md text-white bg-teknikfokus-primary hover:bg-teknikfokus-primary-lightest focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teknikfokus-primary-light">Send</router-link>

  </section>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Editor from '@tinymce/tinymce-vue'

export default {
  components: {
    NavBar,
    'editor': Editor
  }
}
</script>

<style>

</style>