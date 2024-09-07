<template>
  <v-card>
    <v-dialog v-model="showModal" width="40%" persistent>
      <v-card class="pb-4">
        <v-card-title>Verify OTP</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submitForm">
            <v-otp-input v-model="otp" length="6" :rules="dataRules.otpRequired" @finish="submitForm"></v-otp-input>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="closeModal">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
  export default {
    name: "OTPModal",
    props: {
      showModal: {
        required: true,
        type: Boolean,
      },
      otp: {
        required: true,
        type: String,
      }
    },
    computed: {
      dataRules(){
        return {
          otpRequired: [(v) => !!v || "OTP is required"],
        }
      }
    },
    methods: {
      submitForm() {
        this.$emit("setAcceptanceData", {oTPCode: this.otp});
        this.closeModal();
      },
      closeModal(){
        this.$emit("setModal", false);
      }
    },
  };
  </script>