<template>
  <v-container>
    <h2 class="text-center font-weigth-black" max-width="374">Signup</h2>
    <v-card elevation="2" class="mt-15 mx-auto" max-width="800">
      <v-card-text>
        <v-form v-model="isValid" ref="signupForm">
          <v-row justify="center">
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="first"
                label="First Name"
                :rules="rules.name"
                outlined
              ></v-text-field>

              <v-text-field
                v-model="last"
                label="Email"
                :rules="rules.email"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="pw1"
                label="Password"
                :type="value ? 'password' : 'text'"
                :rules="rules.pwdRules"
                :append-icon="value ? 'visibility' : 'visibility_off'"
                @click:append="() => (value = !value)"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="pw2"
                label="Confirm password"
                :type="value ? 'password' : 'text'"
                :rules="rules.pwdRules"
                :append-icon="value ? 'visibility' : 'visibility_off'"
                @click:append="() => (value = !value)"
                outlined
              ></v-text-field>
            </v-col>
          </v-row>
          <div class="text-xs-center">
            <v-card-actions class="text-xs-center">
              <v-spacer />
              <v-btn elevation="2" color="teal"> Submit</v-btn>
              <v-spacer />
            </v-card-actions>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: "Signup",
  data: function () {
    return {
      isValid: false,
      value: String,
      rules: {
        name: [(v) => !!v || "Name is required"],
        email: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
        ],
        pwdRules: [(v) => !!v || "Password required"],
        pwdConfirm: [
          (v) => !!v || "Confirm password",
          (v) => v === this.pw1 || "Passwords do not match",
        ],
      },
    };
  },
};
</script>
