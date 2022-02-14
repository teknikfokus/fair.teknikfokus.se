<template>
  <section class="py-8 px-4 max-w-5xl mx-auto">
    <nav-bar :title="company.name"/>

    <img class="mt-16 max-w-[150px] w-full mx-auto h-auto block" :src="endpoint + '/image/' + company.image_path" />
    <div class="mt-12 prose lg:prose-xl max-w-full">
      <div v-html="company.information"></div>
    </div>

    <div v-if="company.iframe" class="max-w-[400px] mx-auto">
      <youtubeiFrame :src="company.iframe" />
    </div>

    <div v-if="company.meeting_link" class="text-center mt-14">
      <h3 class="text-4xl font-semibold">Want to chat further with the company?</h3>
      <a :href="getClickableLink" target="_blank" class="mt-6 relative inline-block justify-center py-6 px-12 border border-transparent text-lg font-medium rounded-md text-white bg-teknikfokus-primary hover:bg-teknikfokus-primary-lightest focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teknikfokus-primary-light">
        Talk to the representative online
      </a>
    </div>

    <div class="mt-14">
      <job-grid />
    </div>
  </section>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import youtubeiFrame from '@/components/iFrame.vue'
import {http, endpoint} from '@/axios'
import JobGrid from '../components/JobGrid.vue';

export default {
  components: {
    NavBar,
    JobGrid,
    youtubeiFrame,
  },
  data() {
    return {
      company: {},
    };
  },
  setup() {
    return {
      endpoint,
    }
  },
  mounted() {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };
    http.get("/companies/" + this.$route.params.id, config)
    .then(
      (response) => {
        this.company = response.data;
        document.title = this.company.name + " | Teknikfokus 2022";
      }
    );
  },
  computed: {
    getClickableLink() {
      return this.company.meeting_link.startsWith("http://") || this.company.meeting_link.startsWith("https://") ?
        this.company.meeting_link
        : 'https://' + this.company.meeting_link;
    }
  }
}
</script>

<style>

</style>