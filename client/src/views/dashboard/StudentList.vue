<template>
  <section class="pt-8 px-4 max-w-5xl mx-auto">
    <nav-bar/>

    <div class="mt-6 flex justify-around">
        <div>
          <label for="filter-programme" class="block text-sm font-medium text-gray-700">Filter programme</label>
          <div class="mt-1">
            <select id="filter-programme" v-model="filter.programme" class="focus:ring-teknikfokus-primary-light focus:border-tekring-teknikfokus-primary-light block w-full max-w-md px-2 sm:text-sm border-gray-300 rounded-md shadow-sm">
              <option value="">All programs</option>
              <option value="D: Engineering, Computer Science">D: Engineering, Computer Science</option>
              <option value="E: Electrical Engineering">E: Electrical Engineering</option>
              <option value="C: Engineering, Information &amp; Communication Technologies">C: Engineering, Information &amp; Communication Technologies</option>
              <option value="BME: Biomedical Engineering">BME: Biomedical Engineering</option>
            </select>
          </div>
        </div>


        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Graduation year</label>
          <div class="mt-1">
            <input v-model="filter.graduation_year" type="number" class="focus:ring-teknikfokus-primary-light focus:border-tekring-teknikfokus-primary-light block w-full max-w-md px-2 sm:text-sm border-gray-300 rounded-md shadow-sm"/>
          </div>
        </div>

    </div>

    <div class="py-8 px-2">
      <table class="table-auto mx-auto">
        <thead>
          <tr>
            <th class="px-6 py-4 sr-only">Picture</th>
            <th class="px-6 py-4">Name</th>
            <th class="px-6 py-4">Email</th>
            <th class="px-6 py-4">Programme</th>
            <th class="px-6 py-4">Graduation Year</th>
            <th class="px-6 py-4">LinkedId</th>
            <th class="px-6 py-4">CV</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in filteredStudents()" :key="student.name" class="border-b text-center">
            <td class="text-sm text-gray-800 px-6 py-4 whitespace-nowrap"><img :src="endpoint + '/image/' + student.image_path" class="w-24 h-auto" /></td>
            <td class="text-sm text-gray-800 px-6 py-4 whitespace-nowrap">{{ student.name }}</td>
            <td class="text-sm text-gray-800 px-6 py-4 whitespace-nowrap">{{ student.contact_email }}</td>
            <td class="text-sm text-gray-800 px-6 py-4 whitespace-nowrap" :title="student.programme">{{ student.programme.substring(0,15) }}...</td>
            <td class="text-sm text-gray-800 px-6 py-4 whitespace-nowrap">{{ student.graduation_year }}</td>
            <td class="text-sm text-gray-800 px-6 py-4 whitespace-nowrap">
              <a :href="student.linkedin_url" class="hover:underline">{{ student.linkedin_url }}</a>
            </td>
            <td class="text-sm text-gray-800 px-6 py-4 whitespace-nowrap">
              <a v-if="student.cv_path" :href="'/api/student/cv/' + student.cv_path" class="hover:underline" target="_blank">View CV</a>
            </td>
          </tr>
        </tbody>
      </table>
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
      filter: {
        programme: '',
        graduation_year: '',
      },
      students: null,
      error: null,
    }
  },
  setup() {
    return {
      endpoint,
    }
  },
   mounted() {
    http.get("/students")
      .then(
        (response) => {
          this.students = response.data;
        }
      );
  },
  methods: {
    filteredStudents() {
      if(this.students == null) {
        return [];
      }
      let students = this.students.filter(student => {
        console.log(this.filter.graduation_year);
        console.log(student.graduation_year);
        if(this.filter.graduation_year !== '' && this.filter.graduation_year != student.graduation_year) {
          return false;
        }

        if(this.filter.programme !== '' && this.filter.programme !== student.programme) {
          return false;
        }

        return true;
      });
      console.log(students);
      return students;
    }
  }
}
</script>

<style>

</style>