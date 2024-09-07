<template>
  <v-container class="pb-10">
    <div class="d-flex flex-column mt-7">
      <Logo class="align-self-center py-10" :width="'10%'" :height="'10%'" />
    </div>
    <v-card elevation="10" class="mx-auto loginCard">
      <div class="px-10">
        <v-card-title class="text-center">
          <v-spacer />
          Request Credentials
          <v-spacer />
        </v-card-title>
        <v-card-text>
          <v-form ref="requestCredentials" @submit.prevent="requestCredentials">
            <v-text-field
              v-model="formData.email"
              outlined
              dense
              label="Email Address"
              append-icon="email"
              :rules="[rules.email.required, rules.email.value]"
            ></v-text-field>
            <v-btn class="mt-2" color="primary" block type="submit">
              <div>Request Credentials</div>
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
import AuthFooter from "./partials/AuthFooter";
import Logo from "../../../../app/components/Logo.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "Credentials",
  components: { AuthFooter, Logo },
  data: () => ({
    formData: {
      email: "",
      device_name: "apollo",
    },
    showPassword: false,
    rules: {
      email: {
        required: (value) => !!value || "Email address is Required.",
        value: (value) => /.+@.+/.test(value) || "E-mail must be valid",
      },
    },
  }),
  computed: {
    ...mapState({
      loading: function (state) {
        return state.loader.loading;
      },
    }),
  },
  methods: {
    ...mapActions({
      requestCredentials: function (dispatch, event) {
        /** validate form */
        const { email } = this.formData;
        if (email.length === 0 || !/.+@.+/.test(email)) {
          this.$refs.requestCredentials.validate();
        } else {
          /** request credentials */
          dispatch("auth/requestCredentials", this.formData);
          event.target.reset();
        }
      },
    }),
  },
};
</script>
