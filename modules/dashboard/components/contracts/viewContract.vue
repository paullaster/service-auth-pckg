<template>
  <v-container>
    <v-card class="my-5 elevation-0" height="100%">
      <v-card-title>
        <v-btn text small @click="$router.back()">
          <v-icon left> mdi-arrow-left </v-icon>
          Back
        </v-btn>
        <v-spacer />
        <v-btn small color="primary" @click="downloadLink(contractDocument)">
          <v-icon left color="white"> mdi-download </v-icon>
          Download
        </v-btn>
      </v-card-title>
      <v-divider />

      <v-row>
        <v-col cols="8" offset="2">
          <v-card-text
            class="elevation-1 mb-1"
            v-for="i in pageCount(contractDocument)"
            :key="i"
          >
            <pdf
              style="width: 100%"
              :page="i"
              :src="`data:application/pdf;base64,${contractDocument}`"
            />
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

  <script>
import FileMixin from "@kinetics254/cassandra-base/mixins/FileMixin";
import pdf from "vue-pdf";

export default {
  name: "ViewContract",
  mixins: [FileMixin],
    components: { pdf },
  data: function () {
    return {
      numPages: undefined,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.getContractDocument();
    });
  },
  computed: {
    contractDocument() {
      return this.$store.getters["Dashboard/contract"][0];
    },
  },
  methods: {
    getContractDocument() {
      this.$store.dispatch("Dashboard/getContract", {
        contractNo: this.$route.params.contractNo,
      });
    },
    pageCount: function (value) {
      const bin = atob(value);
      return bin.match(/\/Type\s*\/Page\b/g).length;
    },
    
  },
};
</script>