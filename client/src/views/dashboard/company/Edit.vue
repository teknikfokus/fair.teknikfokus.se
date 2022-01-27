<template>
  <section class="pt-8 px-4 max-w-5xl mx-auto">
    <nav-bar/>

    <form class="space-y-6" @submit.prevent="onSubmit" method="POST">

    
      <h1 class="mt-4 text-xl font-semibold">Enter your company's information</h1>

      <div>
        <label for="title" class="block text-sm font-medium text-gray-700">Company name</label>
        <div class="mt-1">
          <input v-model="form.name" type="text" name="title" id="title" class="focus:ring-teknikfokus-primary-light focus:border-tekring-teknikfokus-primary-light block w-full max-w-md px-2 sm:text-sm border-gray-300 rounded-md shadow-sm"/>
        </div>
      </div>

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
          v-model="form.information"
      />

      <div>
        <h3 class="block text-sm font-medium text-gray-700">Upload company logo (.jpg, .png or .svg)</h3>
        <div class="mt-1">
          <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-teknikfokus-primary hover:text-white">
              <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span class="mt-2 text-base leading-normal">Select a file</span>
              <input type='file' accepts=".jpg,.png,.svg" class="hidden" />
          </label>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">What days is your company attending the fair?</label>
        <div class="mt-1">
          <input type="radio" id="day1" value="1" v-model="form.day" name="days">
          <label for="day1"> 16th of February</label>
          <br>
          <input type="radio" id="day2" value="2" v-model="form.day" name="days">
          <label for="day2"> 17th of February</label>
          <br>
          <input type="radio" id="both" value="3" v-model="form.day" name="days">
          <label for="both"> Both days</label>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">We offer:</label>
        <div class="mt-1">
          <input type="checkbox" id="job-1" value="1" v-model="form.job_offer" name="job-offer">
          <label for="job-1"> 16th of February</label>
          <br>
          <input type="checkbox" id="job-2" value="2" v-model="form.job_offer" name="job-offer">
          <label for="job-2"> 17th of February</label>
          <br>
          <input type="checkbox" id="job-3" value="3" v-model="form.job_offer" name="job-offer">
          <label for="job-3"> Both days</label>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Meeting link (for example Zoom or Microsoft Teams)</label>
        <div class="mt-1">
          <input type="text" v-model="form.meeting_link" class="focus:ring-teknikfokus-primary-light focus:border-tekring-teknikfokus-primary-light block w-full max-w-md px-2 sm:text-sm border-gray-300 rounded-md shadow-sm">
        </div>
      </div>

      <button type="submit" class="relative py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-teknikfokus-primary hover:bg-teknikfokus-primary-lightest focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teknikfokus-primary-light">
        Submit
      </button>    
    </form>
  </section>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Editor from '@tinymce/tinymce-vue'
import http from '@/axios'

export default {
  components: {
    NavBar,
    Editor,
  },
  data() {
    return {
      form: {
        name: '',
        information: '',
        day: 1,
        meeting_link: '',
        job_offer: '',
      },
      error: null,
    }
  },
  methods: {
    async onSubmit() {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      };

      try {
        const res = await http.post("/dashboard/company", this.form, config);
      } catch (err) {
        if(err.response.status == 400) {
          this.$router.push("/login");
        } else if(err.response.status == 403) {
          this.error = "Wrong credentials."
        }
      }
    }
  }
}
</script>

<style>

</style>