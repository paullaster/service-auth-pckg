<template>
  <v-container class="pb-10">
    <div class="d-flex flex-column mt-7">
      <Logo class="align-self-center py-10" :width="'10%'" :height="'10%'" />
    </div>
    <v-card elevation="10" class="mx-auto loginCard">
      <div class="px-10">
        <v-card-title class="text-center">
          <v-spacer />
          Enter your email address to reset Password
          <v-spacer />
        </v-card-title>
        <v-card-text>
          <v-form ref="sendLink" v-model="isValid" @submit.prevent="sendLink">
            <v-text-field
              v-model="formData.email"
              outlined
              dense
              label="Email Address"
              append-icon="email"
              :rules="[rules.email.required, rules.email.value]"
            ></v-text-field>
            <v-btn class="mt-2" color="primary" block type="submit">
              <div v-if="setLoading">
                <v-progress-circular
                  :size="30"
                  :width="3"
                  color="white"
                  indeterminate
                ></v-progress-circular>
              </div>
              <div v-else>Send Link</div>
            </v-btn>
          </v-form>
        </v-card-text>
      </div>
    </v-card>
    <auth-footer />
  </v-container>
</template>

<style>
.loginCard {
  width: 40%;
}
@media only screen and (max-width: 600px) {
  .loginCard {
    width: 100%;
  }
}
</style>
<script>
import Logo from "@/packages/cassandra-base/app/components/Logo.vue";
import AuthFooter from "./partials/AuthFooter";
import { mapActions } from "vuex";
export default {
  name: "ForgotPassword",
  components: { AuthFooter, Logo },
  data: () => ({
    formData: {
      email: "",
      device_name: "apollo",
    },
    isValid: false,
    rules: {
      email: {
        required: (value) => !!value || "Email is Required.",
        value: (value) => /.+@.+/.test(value) || "E-mail must be valid",
      },
    },
  }),
  created() {
    this.formData.auth_token = this.$route.params.token;
  },
  computed: {
    setLoading: function () {
      return this.$store.state.loader.loading;
    },
  },
  methods: {
    ...mapActions({
      sendLink: function (dispatch, event) {
        /** validate form */
        if (!this.isValid) {
          this.$refs.sendLink.validate();
        } else {
          dispatch("auth/sendLink", this.formData);
        }
      },
    }),
  },
};
</script>
