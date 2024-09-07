<template>
  <v-card>
    <v-dialog v-model="showModal" width="40%" persistent>
      <v-card class="pb-4">
        <v-card-title>Contract Rejection Modal</v-card-title>
        <v-card-text>
          <v-form
            @submit.prevent="sendFoRejection"
            v-model="isValid"
            ref="form"
          >
            <v-textarea
              class="text-h6"
              v-for="(field, i) in rejectModal"
              :key="i"
              v-model="field.value"
              :label="field.label"
              outlined
              :rows="5"
              :rules="[dataRules.required]"
            ></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" @click="sendFoRejection" ref="submitBtn"
            >Submit</v-btn
          >
          <v-btn @click="closeModal">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
  <script>
export default {
  name: "RejectContractModal",
  props: {
    showModal: {
      required: true,
    },
    rejectModal: {
      required: true,
    },
  },
  data() {
    return {
      isValid: false,
    };
  },
  computed: {
    dataRules: function () {
      return {
        required: (v) => !!v || "Reason for decline required",
      };
    },
  },
  methods: {
    sendFoRejection() {
      if (!this.isValid) {
        this.$refs.form.validate();
      } else {
        this.$emit("setRejectPayLoad", {
          reasonForDecline: this.rejectModal[0].value,
        });
        this.closeModal();
      }
    },
    closeModal() {
      this.$emit("setModal", false);
    },
    enableSubmitBtn() {
      return this.rejectModal.value === ""
        ? "Reason for decline is required"
        : this.rejectModal.value.length < 3
        ? "Reason provide is too short"
        : (this.$refs.submitBtn.disabled = false);
    },
  },
};
</script>
  