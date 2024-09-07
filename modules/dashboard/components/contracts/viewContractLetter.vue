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
      <v-divider />
      <v-divider />
      <v-card-title class="pb-6">
        <div class="style-button">
          <v-btn
            text
            small
            class="reject red"
            color="#FFFFFF"
            @click="showRejectModal()"
          >
            Reject
          </v-btn>
          <v-btn
            small
            class="accept teal"
            color="#FFFFFF"
            @click="showAcceptContractModal()"
          >
            Accept
          </v-btn>
        </div>
      </v-card-title>
    </v-card>
    <RejectContractModal
      :showModal="rejectModal"
      :rejectModal="rejectModalFormFields"
      @setModal="showRejectModal"
      @setRejectPayLoad="rejectContract"
    />
    <AcceptContractModal
      :showModal="acceptModal"
      :otp="contractAcceptanceOTP"
      @setModal="showAcceptContractModal"
      @setAcceptanceData="acceptContract"
    />
  </v-container>
</template>
  
    <script>
import FileMixin from "@kinetics254/cassandra-base/mixins/FileMixin";
import pdf from "vue-pdf";
import RejectContractModal from "./RejectContractModal.vue";
import AcceptContractModal from "./AcceptContractModal.vue";
export default {
  name: "ViewContractLetter",
  mixins: [FileMixin],
  components: { pdf, RejectContractModal, AcceptContractModal },
  data: function () {
    return {
      numPages: undefined,
      rejectModal: false,
      acceptModal: false,
      contractAcceptanceOTP: "",
      rejectModalFormFields: [
        {
          label: "Reason For Decline",
          name: "reasonForDecline",
          type: "text",
          value: "",
        },
      ],
    };
  },
  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.getContractDocument();
    });
  },
  computed: {
    userData() {
      return this.$store.getters["auth/user"];
    },
    contractDocument() {
      return this.$store.getters["Dashboard/contractLetter"][0];
    },
  },
  methods: {
    getContractDocument() {
      this.$store.dispatch("Dashboard/getContractLetter", {
        contractNo: this.$route.params.contractNo,
      });
    },
    pageCount: function (value) {
      const bin = atob(value);
      return bin.match(/\/Type\s*\/Page\b/g).length;
    },
    acceptContract(args) {
      this.$store.dispatch("Dashboard/acceptContract", {
        contractNo: this.$route.params.contractNo,
        ...args,
      });
      setTimeout(
        this.$router.push({
          name: "Contract",
        }),
        1600
      );
    },
    rejectContract(args) {
      this.$store.dispatch("Dashboard/rejectContract", {
        No: this.$route.params.contractNo,
        status: "Declined",
        ...args,
      });
      setTimeout(
        this.$router.push({
          name: "Contract",
        }),
        1600
      );
    },
    // Show Modal
    showRejectModal() {
      this.rejectModal = !this.rejectModal;
    },
    showAcceptContractModal() {
      this.acceptModal ? "" : this.sendContractAcceptanceOTP();
      this.acceptModal = !this.acceptModal;
      this.contractAcceptanceOTP = "";
    },
    sendContractAcceptanceOTP() {
      this.$store.dispatch("Dashboard/getContractAcceptanceOTP", {
        contractNo: this.$route.params.contractNo,
        email: this.userData.profile.email,
        phone: this.userData.phone_no,
      });
    },
  },
};
</script>
<style>
@media (max-width: 600px) {
  .reject {
    min-width: 20%;
    padding-inline: 2%;
    display: block;
    position: absolute;
    top: 0;
    left: 10%;
  }
  .accept {
    min-width: 20%;
    padding-inline: 2%;
    display: block;
    position: absolute;
    top: 0;
    right: 10%;
  }
}
@media (min-width: 600px) {
  .reject {
    display: block;
    position: absolute;
    top: 0;
    left: 30%;
    width: 8%;
    color: #fff;
  }

  .accept {
    display: block;
    position: absolute;
    top: 0;
    right: 30%;
    width: 8%;
  }
}
.style-button {
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  padding-bottom: 5%;
}
</style>