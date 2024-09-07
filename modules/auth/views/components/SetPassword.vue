<template>
  <v-container class="pb-3">
    <div style="text-align: center; display: block">
      <Logo class="py-3" :width="'10%'" :height="'10%'" />
    </div>
    <v-card elevation="10" class="mx-auto loginCard">
      <div class="px-10">
        <v-card-title class="text-center">
          <v-spacer />
          Set Password
          <v-spacer />
        </v-card-title>
        <v-card-text>
          <v-alert type="info" dense class="my-2" outlined>
            Your almost there, enter and confirm your password to login.
          </v-alert>
          <v-form ref="setPasswordForm" @submit.prevent="setPassword">
            <v-text-field
              v-model="formData.password"
              outlined
              dense
              :append-icon="showPassword ? 'visibility' : 'visibility_off'"
              :rules="[rules.password.required, rules.password.min]"
              :type="showPassword ? 'text' : 'password'"
              name="password"
              label="Password"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
            <div
              :style="{
                color: strengthColor,
                marginTop: strengthValue.length === 0 ? '-5%' : '-10%',
                textAlign: 'right',
              }"
              class="py-2"
            >
              {{ strengthValue }}
            </div>
            <password
              style="margin-top: -4%"
              @score="showScore"
              v-model="formData.password"
              :strength-meter-only="true"
            />
            <v-text-field
              v-model="formData.confirmPassword"
              outlined
              dense
              :append-icon="showPassword ? 'visibility' : 'visibility_off'"
              :rules="[rules.password.required, rules.password.min]"
              :type="showPassword ? 'text' : 'password'"
              name="confirmPassword"
              label="Confirm password"
              @click:append="showPassword = !showPassword"
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
              <div v-else>Set Password</div>
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
import Password from "vue-password-strength-meter";
export default {
  name: "Login",
  components: { AuthFooter, Logo, Password },
  data: () => ({
    formData: {
      confirmPassword: "",
      password: "",
      auth_token: "",
      device_name: "apollo",
    },
    showPassword: false,
    strengthValue: "",
    strengthColor: "",
    rules: {
      password: {
        required: (value) => !!value || "Password is Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
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
      setPassword: function (dispatch, event) {
        /** validate form */
        const { password, confirmPassword } = this.formData;
        if (password.length === 0 || password.length < 8) {
          this.$refs.setPasswordForm.validate();
        } else if (confirmPassword !== password) {
          /** error */
          Event.$emit("ApiError", "Passwords do not match");
        } else {
          dispatch("auth/setPassword", this.formData);
          event.target.reset();
        }
      },
    }),
    // showFeedback ({ suggestions, warning }) {
    //   console.log('suggestions', suggestions)
    //   console.log('warning', warning)
    // },
    showScore(score) {
      if (score === null) {
        this.strengthValue = "";
        this.strengthColor = "";
      } else if (score < 3) {
        this.strengthValue = "fair";
        this.strengthColor = "#F39C12";
      } else if (score === 3) {
        this.strengthValue = "strong";
        this.strengthColor = "#58D68D";
      } else if (score === 4) {
        this.strengthValue = "perfect";
        this.strengthColor = "green";
      }
    },
  },
};
</script>
