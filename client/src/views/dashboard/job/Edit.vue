<template>
  <section class="p-8 px-4 max-w-5xl mx-auto">
    <nav-bar />
    <form class="space-y-4" @submit.prevent="onSubmit" method="POST">
      <h1 class="mt-4 text-xl font-semibold">Job description</h1>
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700">Job Title</label>
        <div class="mt-1">
          <input v-model="form.job_position" type="text" name="title" id="title" class="focus:ring-teknikfokus-primary-light focus:border-tekring-teknikfokus-primary-light block w-full max-w-md px-2 sm:text-sm border-gray-300 rounded-md shadow-sm" required/>
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
            v-model="form.job_description"
        />
      </div>

      <p v-if="error" class="text-red-600 text-lg font-semibold">{{ error }}</p>
      <p v-if="status" class="text-green-800 text-lg font-semibold">{{ status }}</p>


      <button type="submit" class="relative py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-teknikfokus-primary hover:bg-teknikfokus-primary-lightest focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teknikfokus-primary-light">
        Submit
      </button>     
      </form>
  </section>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Editor from '@tinymce/tinymce-vue'
import {http} from '@/axios'

export default {
  components: {
    NavBar,
    'editor': Editor
  },
  data() {
    return {
      form: {
        job_position: '',
        job_description: '',
      },
      error: '',
      status: '',
    }
  },
  mounted() {
    http.get("/companies/" + localStorage.getItem('company_slug') + "/jobs/" + this.$route.params.id)
      .then(
        (response) => {
          this.form = response.data;
        }
      );
  },
  methods: {
    async onSubmit() {
      try {
        const res = await http.post("dashboard/company/job/" +  this.$route.params.id, this.form);
        if(res.status === 200) {
          this.status = "Updated!"
        }
      } catch (err) {
        console.log(err);
        this.error = "Something went wrong."
      }
    }
  }
}
</script>

<style>

</style>