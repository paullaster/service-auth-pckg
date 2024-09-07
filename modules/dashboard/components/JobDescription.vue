<template>
  <v-container fluid>
    <v-app-bar dense flat>
      <div class="text-lg-h5" style="font-weight: 300">Job Description</div>
      <v-spacer></v-spacer>
      <v-breadcrumbs
        customDivider
        divider="/"
        large
        :items="path"
      ></v-breadcrumbs>
    </v-app-bar>
    <div style="height: 85vh; overflow-y: scroll" id="scollStyle">
      <pdf
        ref="jobDescription"
        :src="`data:application/pdf;base64,${jobDescription[0]}`"
      ></pdf>
    </div>
    <v-btn
      @click="downloadFile(jobDescription[0])"
      style="position: fixed; right: 2%; bottom: 10%"
      color="primary"
      rounded
    >
      <v-icon class="mx-3">print</v-icon>
      Download
    </v-btn>
  </v-container>
</template>
<script>
import pdf from "vue-pdf";
import FileMixin from "../../../mixins/FileMixin";
export default {
  name: "JobDescription",
  components: { pdf },
  mixins: [FileMixin],
  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.getJobDescription();
    });
  },
  computed: {
    userData: function () {
      return this.$store.getters["auth/user"];
    },
    pdfBase64: function () {
      return this.$store.getters["Setup/setupGetters"].jobDescription;
    },
    path: function () {
      return this.$router.currentRoute.meta.breadcrumb;
    },
    jobs: function () {
      return this.$store.getters["Setup/setupGetters"].jobs;
    },
  },
  methods: {
    getJobDescription: function () {
      const job = this.jobs.filter(
        (job) => job.position === this.$route.params.position
      );
      this.$store.dispatch("Setup/getJobDescription", {
        jobCode: job.code,
      });
    },
  },
};
</script>
