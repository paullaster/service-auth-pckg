<template>
  <div
    style="
      width: 28rem;
      min-height: 35rem;
      -webkit-border-radius: 30px;
      -moz-border-radius: 30px;
      border-radius: 30px;
      background-color: #ffffff;
      padding: 2%;
    "
    class="loginmobile-view"
  >
    <div>
      <Logo width="100px" height="100px" />
    </div>
    <h1 style="color: #000000; font-size: 24px; padding-bottom: 0.8rem">
      Staff Login
    </h1>
    <p style="color: #848484; font-size: 16px; width: 80%; margin: auto auto">
      Hey, Enter your details to get sign in to your account
    </p>
    <v-form
      ref="loginForm"
      v-model="isValid"
      @submit.prevent="login"
      style="padding: 2rem 0"
    >
      <v-text-field
        v-model="formData.username"
        v-if="company.isWindowsAuth"
        outlined
        dense
        label="Enter Username"
        append-icon="person"
        :rules="[rules.username.required]"
      ></v-text-field>
      <v-text-field
        v-model="formData.email"
        v-else
        outlined
        dense
        label="Email Address"
        append-icon="email"
        :rules="[rules.email.required, rules.email.value]"
      ></v-text-field>
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
      <div v-if="!company.isWindowsAuth">
        <p style="color: #000000; font-size: 12px; text-align: justify">
          Having trouble in sign in?
        </p>
      </div>
      <v-btn
        class="mt-4 text-capitalize"
        color="ladingPrimary"
        block
        type="submit"
        elevation="0"
        style="color: #000"
      >
        <div>Login</div>
        <v-icon class="mx-2">login</v-icon>
      </v-btn>
    </v-form>
    <div
      style="
        color: #000000;
        font-size: 14px;
        display: flex;
        align-items: center;
      "
    >
      <span style="width: 45%; display: block; border-top: #000000 1px solid">
      </span>
      <span> or </span>
      <span
        style="width: 45%; display: block; border-top: #000000 1px solid"
      ></span>
    </div>
    <div style="font-size: 16px; margin-top: 2.8rem">
      <router-link
        to="/auth/reset"
        style="
          text-decoration: none;
          color: #000;
          border: #b49173 0.1px solid;
          padding: 0.4rem 0.8rem;
          border-radius: 0.6rem;
        "
        ><small>forgot password?</small></router-link
      >
    </div>
    <!-- <div class="mt-4" v-if="!company.isWindowsAuth">
          <div >Dont have an account ?</div>

         
          <v-btn
            class="text-capitalize"
            link
            color="orange darken-2"
            :to="{ name: 'Credentials' }"
            outlined
            block
          >
            Activate
          </v-btn>
        </div> -->
  </div>
</template>

<script>
import Logo from "../../../../app/components/Logo.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "Login",
  components: { Logo },
  data: () => ({
    formData: {
      email: "",
      username: "",
      password: "",
      device_name: "apollo",
    },
    isValid: false,
    showPassword: false,
    rules: {
      password: {
        required: (value) => !!value || "Password is Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
      email: {
        required: (value) => !!value || "Email is Required.",
        value: (value) => /.+@.+/.test(value) || "E-mail must be valid",
      },
      username: {
        required: (value) => !!value || "Username is Required.",
      },
    },
  }),
  computed: {
    ...mapState({
      loading: function (state) {
        return state.loader.loading;
      },
    }),
    company: function () {
      return this.$store.getters["auth/company"];
    },
  },
  methods: {
    ...mapActions({
      login: function (dispatch, event) {
        /** validate form */
        if (!this.isValid) {
          this.$refs.loginForm.validate();
        } else {
          dispatch(
            `auth/${this.company.isWindowsAuth ? "windowsLogin" : "login"}`,
            { ...this.formData }
          );
          event.target.reset();
        }
      },
    }),
  },
};
</script>
