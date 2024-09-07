<template>
  <v-container>
    <v-container class="pb-10">
      <div class="d-flex flex-column">
        <Logo class="align-self-center py-10" :width="'10%'" :height="'10%'" />
      </div>
      <v-card elevation="10" class="mx-auto loginCard">
        <div class="px-10">
          <v-card-title>
            <v-alert text dense color="primary">
              <div class="d-flex flex-row text-body-2">
                <div class="mr-2">
                  <v-icon>mdi-information-outline</v-icon>
                </div>
                <div>
                  <div>
                    <strong>OTP Verification</strong>
                  </div>
                  <div>
                    Please enter the OTP sent to your email address to verify
                    your account.
                  </div>
                </div>
              </div>
            </v-alert>
          </v-card-title>
          <v-card-text>
            <v-form ref="otp">
              <v-otp-input
                v-model="otp"
                length="6"
                dense
                type="number"
                :disabled="$store.getters['loader/loading']"
                @finish="onFinish"
              ></v-otp-input>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-chip class="secondary lighten-4 secondary--text text--darken-4">
              <v-icon left>mdi-information-outline</v-icon>
              <span>OTP expires in {{ `${mins} min:${seconds} sec` }}</span>
            </v-chip>
            <v-spacer />
            <v-btn
              text
              color="secondary"
              class="text-body-2 text-capitalize"
              @click="resendOtp"
            >
              Resend OTP
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-container>
  </v-container>
</template>
<script>
import Logo from "../../../../app/components/Logo.vue";
export default {
  name: "OtpVerify",
  components: { Logo },
  data() {
    return {
      otp: "",
      otpExpired: false,
      mins: 0,
      seconds: 0,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.$store.dispatch("auth/getOtpMinutes");
    });
  },
  computed: {
    minutes() {
      return this.$store.getters["auth/minutes"];
    },
    userData: function () {
      return this.$store.getters["auth/user"];
    },
  },
  methods: {
    onFinish() {
      this.$store.dispatch("auth/verifyOTP", {
        otp: this.otp,
        user_id: this.userData.user.id,
      });
    },
    resendOtp() {
      this.$store.dispatch("auth/resendOTP", {
        user_id: this.userData.user.id,
      });
    },
    displayCountdown() {
      // create minutes countdown
      let countdown = setInterval(() => {
        this.seconds--;
        if (this.seconds <= 0) {
          if (this.mins <= 0) {
            clearInterval(countdown);
            this.otpExpired = true;
          } else {
            this.mins--;
            this.seconds = 60;
          }
        }
      }, 1000);
    },
  },
  watch: {
    minutes: {
      handler: function (val) {
        this.mins = val;
        this.displayCountdown();
      },
      deep: true,
    },
  },
};
</script>
