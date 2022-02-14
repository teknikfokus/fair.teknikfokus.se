<template>
  <section class="pt-8 px-4 max-w-5xl mx-auto">
    <nav-bar/>

    <form class="space-y-6 py-6" @submit.prevent="onSubmit" method="POST">

    
      <h1 class="mt-4 text-xl font-semibold">Enter your company's information</h1>

      <div>
        <label for="title" class="block text-sm font-medium text-gray-700">Company name</label>
        <div class="mt-1">
          <input v-model="form.name" type="text" name="title" id="title" class="focus:ring-teknikfokus-primary-light focus:border-tekring-teknikfokus-primary-light block w-full max-w-md px-2 sm:text-sm border-gray-300 rounded-md shadow-sm" required/>
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
        <label for="iframe" class="block text-sm font-medium text-gray-700">Iframe with video (youtube / vimeo)</label>
        <div class="mt-1">
          <input v-model="form.iframe" type="text" name="iframe" id="iframe" class="focus:ring-teknikfokus-primary-light focus:border-tekring-teknikfokus-primary-light block w-full max-w-md px-2 sm:text-sm border-gray-300 rounded-md shadow-sm"/>
        </div>
      </div>

      <div v-if="displayiFrame" class="max-w-[400px]">
        <youtubeiFrame :src="displayiFrame" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">We offer:</label>
        <div class="mt-1">
          <input type="checkbox" id="summer_internship" value="summer_internship" v-model="form.summer_internship" >
          <label for="summer_internship"> Summer Internship / Part-time position</label>
          <br>
          <input type="checkbox" id="master_thesis" value="master_thesis" v-model="form.master_thesis" >
          <label for="master_thesis"> Master Thesis</label>
          <br>
          <input type="checkbox" id="trainee_programme" value="trainee_programme" v-model="form.trainee_programme" >
          <label for="trainee_programme"> Trainee Programme / Graduate Position</label>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Meeting link (for example Zoom or Microsoft Teams)</label>
        <div class="mt-1">
          <input type="text" v-model="form.meeting_link" class="focus:ring-teknikfokus-primary-light focus:border-tekring-teknikfokus-primary-light block w-full max-w-md px-2 sm:text-sm border-gray-300 rounded-md shadow-sm">
        </div>
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
import youtubeiFrame from '@/components/iFrame.vue'
import Editor from '@tinymce/tinymce-vue'
import {http} from '@/axios'

export default {
  components: {
    NavBar,
    Editor,
    youtubeiFrame,
  },
  data() {
    return {
      form: {
        name: '',
        information: '',
        iframe: '',
        meeting_link: '',
        summer_internship: false,
        master_thesis: false,
        trainee_programme: false,
      },
      displayiFrame: null,
      status: null,
      error: null,
    }
  },
  mounted() {
    http.get("/companies/" + localStorage.getItem('company_slug'))
      .then(
        (response) => {
          this.form = response.data;
          this.displayiFrame = response.data.iframe;
          this.form.iframe = '';
        }
      );
  },
  methods: {
    async onSubmit() {
      if(!this.form.summer_internship && !this.form.master_thesis && !this.form.trainee_programme) {
        this.error = 'At least one of the "we offer" boxes has to be selected';
        this.status = "";
        return;
      }
      try {
        const res = await http.post("/dashboard/company/edit", this.form);
        this.status = "Saved successfully!";
        this.error = "";
      } catch (err) {
        if(err.response.status == 400) {
          this.$router.push("/login");
        } else if(err.response.status == 403) {
          this.error = "Wrong credentials."
        }
      }
    },
  }
}
</script>

<style>

</style>