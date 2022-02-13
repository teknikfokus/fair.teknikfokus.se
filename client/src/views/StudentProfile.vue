<template>
  <section class="pt-8 px-4 max-w-5xl mx-auto">
    <nav-bar/>

    <form class="space-y-6 max-w-md mx-auto bg-white rounded-md shadow-md p-6" @submit.prevent="onSubmit" method="POST">

    
      <h1 class="text-xl font-semibold">Enter your information</h1>

      <p class="text-gray-800">Here you can enter your information which the companies will be able to see and potentionally contact you.</p>

      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <div class="mt-1">
          <input v-model="form.name" type="text" name="name" id="name" class="focus:ring-teknikfokus-primary-light focus:border-tekring-teknikfokus-primary-light block w-full max-w-md px-2 sm:text-sm border-gray-300 rounded-md shadow-sm" required autocomplete="name"/>
        </div>
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email for companies to contact</label>
        <div class="mt-1">
          <input v-model="form.contact_email" type="text" name="email" id="email" class="focus:ring-teknikfokus-primary-light focus:border-tekring-teknikfokus-primary-light block w-full max-w-md px-2 sm:text-sm border-gray-300 rounded-md shadow-sm" required autocomplete="email"/>
        </div>
      </div>

      <div>
        <label for="programme" class="block text-sm font-medium text-gray-700">Programme <span class="text-sm text-gray-500">(choose from list or write freely)</span></label>
        <div class="mt-1">
          <input v-model="form.programme" type="text" list="programs" name="programme" id="programme" class="focus:ring-teknikfokus-primary-light focus:border-tekring-teknikfokus-primary-light block w-full max-w-md px-2 sm:text-sm border-gray-300 rounded-md shadow-sm" required/>
          <datalist id="programs">
            <option value="D: Engineering, Computer Science"></option>
            <option value="E: Electrical Engineering"></option>
            <option value="C: Engineering, Information &amp; Communication Technologies"></option>
            <option value="BME: Biomedical Engineering"></option>
          </datalist>
        </div>
      </div>

      <div>
        <label for="graduation_year" class="block text-sm font-medium text-gray-700">Graduation Year</label>
        <div class="mt-1">
          <input v-model="form.graduation_year" type="number" min="2015" max="2030" name="graduation_year" id="graduation_year" class="focus:ring-teknikfokus-primary-light focus:border-tekring-teknikfokus-primary-light block w-full max-w-md px-2 sm:text-sm border-gray-300 rounded-md shadow-sm" required/>
        </div>
      </div>

      <div>
        <label for="linkedin_url" class="block text-sm font-medium text-gray-700">LinkedIn</label>
        <div class="mt-1">
          <input v-model="form.linkedin_url" type="text" name="linkedin_url" id="linkedin_url" class="focus:ring-teknikfokus-primary-light focus:border-tekring-teknikfokus-primary-light block w-full max-w-md px-2 sm:text-sm border-gray-300 rounded-md shadow-sm"/>
        </div>
      </div>

      <div>
        <label for="gdpr" class="block text-sm font-medium text-gray-700">I here by conset to how Teknikfokus handles my personal data, read more <a href="/integritetspolicy" class="underline" target="_blank">here</a></label>
        <div class="mt-1">
          <input type="checkbox" name="gdpr" id="gdpr" class="focus:ring-teknikfokus-primary-light focus:border-tekring-teknikfokus-primary-light block px-2 sm:text-sm border-gray-300 rounded-md shadow-sm" required/>
        </div>
      </div>


      <p v-if="error" class="text-red-600 text-lg font-semibold">{{ error }}</p>
      <p v-if="status" class="text-green-800 text-lg font-semibold">{{ status }}</p>

      <div class="flex justify-between items-center max-w-md">
        <button v-text="profileExists ? 'Update' : 'Submit'" type="submit" class="relative py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-teknikfokus-primary hover:bg-teknikfokus-primary-lightest focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teknikfokus-primary-light">
          
        </button>    
        <router-link to="/companies" v-if="!profileExists" class="font-medium text-teknikfokus-primary-lightest hover:text-teknikfokus-primary-light">
          Skip for now
        </router-link>    
      </div>
    </form>

    <div class="p-4 mt-8 grid sm:grid-cols-2 gap-6" :class="{'blur-sm pointer-events-none' : !profileExists}">
      <form class="space-y-6 bg-white rounded-md p-6 shadow-md" @submit.prevent="onSubmitImage" method="POST">
        <h3 class="mt-4 text-xl font-semibold">Edit profile picture</h3>

        <p>Current image:</p>
        <img v-if="image" :src="endpoint + '/image/' + image" class="w-32 mt-2" />
        <div>
          <h3 class="block text-sm font-medium text-gray-700">Upload picture (.jpg, or .png)</h3>
          <div class="mt-1">
            <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-teknikfokus-primary hover:text-white">
                <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                </svg>
                <span class="mt-2 text-base leading-normal">Select a file</span>
                <input type='file' accepts=".jpg,.png,.svg" @change="selectImage()" ref="image_file" class="hidden" />
            </label>
          </div>
        </div>

        <p v-if="image_file">Chosen image: {{ image_file.name }}</p>

        <button type="submit" class="relative flex justify-center items-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-teknikfokus-primary hover:bg-teknikfokus-primary-lightest focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teknikfokus-primary-light">
          Upload
        </button>    
      </form>

      <form class="bg-white rounded-md p-6 shadow-md flex justify-between flex-col" @submit.prevent="onSubmitCV" method="POST">
        <h3 class="mt-4 text-xl font-semibold">Upload CV</h3>

        <div class="space-y-6">
          <p v-if="cv"><a :href="endpoint + '/student/cv/' + cv" class="underline hover:text-gray-700" target="_blank">View current cv</a></p>
          <div>
            <h3 class="block text-sm font-medium text-gray-700">Upload cv (.pdf)</h3>
            <div class="mt-1">
              <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-teknikfokus-primary hover:text-white">
                  <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <span class="mt-2 text-base leading-normal">Select a file</span>
                  <input type='file' accepts=".pdf" @change="selectCV()" ref="cv_file" class="hidden" />
              </label>
            </div>
          </div>

          <p v-if="cv_file">Chosen pdf: {{ cv_file.name }}</p>

          <p v-if="cv_error" class="text-red-600 text-lg font-semibold">{{ cv_error }}</p>

          <button type="submit" class="relative flex justify-center items-center py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-teknikfokus-primary hover:bg-teknikfokus-primary-lightest focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teknikfokus-primary-light">
            Upload
          </button>    
        </div>
      </form>
    </div>

    <div class="text-center py-4">
      <router-link to="/companies" class="relative inline-block py-6 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-teknikfokus-primary hover:bg-teknikfokus-primary-lightest focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teknikfokus-primary-light">
        To the fair
      </router-link>
    </div>
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
      form: {
        name: '',
        contact_email: '',
        programme: '',
        graduation_year: 2022,
        linkedin_url: '',
      },
      image: null,
      image_file: null,
      cv: null,
      cv_file: null,
      status: null,
      error: null,
      cv_error: null,
      profileExists: false,
    }
  },
  setup() {
    return {
      endpoint,
    }
  },
  mounted() {
    try {
      http.get("/student/profile")
        .then(
          (response) => {
            this.profileExists = true;
            this.form = response.data;
            this.image = response.data.image_path;
            this.cv = response.data.cv_path;
          }
        );
    } catch {
      console.log("No profile");
    }
  },
  methods: {
    selectImage() {
      this.image_file = this.$refs.image_file.files.item(0);
    },
    selectCV() {
      this.cv_file = this.$refs.cv_file.files.item(0);
    },
    async onSubmit() {
      try {
        const res = await this.profileExists 
          ? http.put("/student/profile", this.form)
          : http.post("/student/profile", this.form);
        this.status = "Saved successfully!";
        this.error = "";
        this.profileExists = true;
      } catch (err) {
        console.log(err);
        if(err.response.status == 400) {
          this.$router.push("/login");
        } else if(err.response.status == 403) {
          this.error = "Wrong credentials."
        }
      }
    },
    async onSubmitImage() {
      try {
        let formData = new FormData();
        formData.append("file", this.image_file);
        const res = await http.post("/student/upload_image", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        this.image = res.data.modifiedFileName;
      } catch (err) {
        console.log(err);
      }
    },
    async onSubmitCV() {
      try {
        let formData = new FormData();
        formData.append("file", this.cv_file);
        const res = await http.post("/student/upload_cv", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        this.cv_error = "";
        this.cv = res.data.modifiedFileName;
      } catch (err) {
        if(err.response.status == 413) {
          this.cv_error = "File to large."
        }
        console.log(err);
      }
    }
  }
}
</script>

<style>

</style>