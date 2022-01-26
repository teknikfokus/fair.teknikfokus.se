<template>
  <section class="pt-8 px-4 max-w-5xl mx-auto">
    <nav-bar/>
    <h1 class="mt-16 text-3xl font-semibold">Enter your company's information</h1><br/>
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
        v-model="profileEditor"
     />

    <h1 class="mt-16 text-xl font-semibold">Upload company logo (.jpg, .png or .svg)</h1> <br>
    <div class="flex w-full items-center justify-center bg-grey-lighter">
      <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
          <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <span class="mt-2 text-base leading-normal">Select a file</span>
          <input type='file' accepts=".jpg,.png,.svg" class="hidden" />
      </label>
    </div>

    <h1 class="mt-16 text-xl font-semibold">What days is your company attending the fair?</h1>
    <div>
      <input type="radio" id="day1" value="1" v-model="day" name="days">
      <label for="day1"> 16th of February</label>
      <br>
      <input type="radio" id="day2" value="2" v-model="day" name="days">
      <label for="day2"> 17th of February</label>
      <br>
      <input type="radio" id="both" value="3" v-model="day" name="days">
      <label for="both"> Both days</label>
      <br>
    </div>
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