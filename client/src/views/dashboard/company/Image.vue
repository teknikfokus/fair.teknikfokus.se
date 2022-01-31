<template>
  <section class="pt-8 px-4 max-w-5xl mx-auto">
    <nav-bar/>

    <form class="space-y-6" @submit.prevent="onSubmit" method="POST">

    
      <h1 class="mt-4 text-xl font-semibold">Edit company logo</h1>

      <p>Current image:</p>
      <img v-if="image" :src="endpoint + '/image/' + image" class="w-24 mt-2" />
      <div>
        <h3 class="block text-sm font-medium text-gray-700">Upload company logo (.jpg, .png or .svg)</h3>
        <div class="mt-1">
          <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-teknikfokus-primary hover:text-white">
              <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span class="mt-2 text-base leading-normal">Select a file</span>
              <input type='file' accepts=".jpg,.png,.svg" @change="selectImage()" ref="file" class="hidden" />
          </label>
        </div>
      </div>

      <p v-if="file">Chosen image: {{ file.name }}</p>

      <button type="submit" class="relative flex justify-center items-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-teknikfokus-primary hover:bg-teknikfokus-primary-lightest focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teknikfokus-primary-light">
        <span v-if="loading" class="block animate-spin rounded-full border-2 border-gray-500 border-t-white h-5 w-5 mr-2"></span>
        Submit
      </button>    
    </form>
  </section>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import Editor from '@tinymce/tinymce-vue'
import {http, endpoint} from '@/axios'

export default {
  components: {
    NavBar,
    Editor,
  },
  data() {
    return {
      image: '',
      file: '',
      error: null,
      loading: false,
    }
  },
  setup() {
    return {
      endpoint,
    }
  },
  mounted() {
    http.get("/companies/" + localStorage.getItem('company_slug'))
      .then(
        (response) => {
          this.image = response.data.image_path;
        }

      );
  },
  methods: {
    selectImage() {
      this.file = this.$refs.file.files.item(0);
    },
    async onSubmit() {
      this.loading = true;
      try {
        let formData = new FormData();
        formData.append("file", this.file);
        const res = await http.post("dashboard/company/upload_image", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });

        this.$router.push("/dashboard/company");
      } catch (err) {
        console.log(err);
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style>

</style>