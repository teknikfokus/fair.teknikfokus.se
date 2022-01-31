<template>
  <section class="pt-8 px-4 max-w-5xl mx-auto">
    <nav-bar/>

    <form class="space-y-6" @submit.prevent="onSubmit" method="POST">

    
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
        <label class="block text-sm font-medium text-gray-700">What days is your company attending the fair?</label>
        <div class="mt-1">
          <input type="radio" id="day1" value="1" v-model="form.fair_day" required>
          <label for="day1"> 16th of February</label>
          <br>
          <input type="radio" id="day2" value="2" v-model="form.fair_day">
          <label for="day2"> 17th of February</label>
          <br>
          <input type="radio" id="both" value="3" v-model="form.fair_day">
          <label for="both"> Both days</label>
        </div>
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

      <p v-if="error" class="text-red-600 text-sm font-semibold">{{ error }}</p>
      <button type="submit" class="relative py-2 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-teknikfokus-primary hover:bg-teknikfokus-primary-lightest focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teknikfokus-primary-light">
        Create
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
    Editor,
  },
  data() {
    return {
      form: {
        name: '',
        information: '',
        fair_day: null,
        meeting_link: '',
        summer_internship: false,
        master_thesis: false,
        trainee_programme: false,
      },
      error: null,
    }
  },
  methods: {
    async onSubmit() {
      try {
        if(!this.form.summer_internship && !this.form.master_thesis && !this.form.trainee_programme) {
          this.error = 'At least one of the "we offer" boxes has to be selected';
          this.status = "";
          return;
        }

        if(!this.form.fair_day) {
          this.error = 'Fair day is required';
          this.status = "";
          return;
        }

        const res = await http.post("/dashboard/company", this.form);
        console.log(res);
        localStorage.setItem("company_slug", res.data.slug_name);
        if(res.status == 200) {
          this.$router.push("/dashboard/company/image");
        }
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