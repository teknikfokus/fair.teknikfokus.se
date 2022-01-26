<template>
  <section class="p-8 px-4 max-w-5xl mx-auto">
    <nav-bar />
    <div class="space-y-4">

      <h1 class="mt-4 text-3xl font-semibold">Job description</h1>
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700">Job Title</label>
        <div class="mt-1">
          <input v-model="jobTitle" type="text" name="title" id="title" class="focus:ring-teknikfokus-primary-light focus:border-tekring-teknikfokus-primary-light block w-full max-w-md px-2 sm:text-sm border-gray-300 rounded-md shadow-sm"/>
        </div>
      </div>

      <div>
        <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Job Description</label>

        <editor
          id="description"
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
      </div>
      <router-link to="#" class="mt-3 relative inline-block justify-center py-2 px-7 border border-transparent text-lg font-medium rounded-md text-white bg-teknikfokus-primary hover:bg-teknikfokus-primary-lightest focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teknikfokus-primary-light">Send</router-link>
    </div>
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