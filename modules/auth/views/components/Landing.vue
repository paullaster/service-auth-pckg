<template>
  <div>
    <section style="display: flex; width: 100vw; background-color: #f6dfb6; position: relative;">
      <div
        :style="{
          'background-image': `url(${getImage})`,
          'background-size': 'contain',
          'background-position': 'right',
          'background-repeat': 'no-repeat',
          overflow: 'hidden',
          height: '100vh',
          width: '100%',
          'z-index': 100,
          display: 'flex',
          'flex-direction': 'column',
          'justify-content': 'center',
          'align-items': 'center',
          'font-size': '3em',
          'font-family': 'Montserrat',
          'text-align': 'center',
        }"
      >
        <div style="color: #000; width: 100%; position: absolute; top: 0; height: 4rem; display: flex; justify-content: flex-end; padding-inline: 4rem;" class="formobileview">  
          <div>
            <v-btn color="ladingPrimary"
            :to="{ name: 'Credentials' }"
            elevation="0"
            style="color: #000;"
            >
              <span>
                request logins
              </span>
            </v-btn>
          </div>
        </div>
        <Login />
        <div style="color: #000; font-size: 16px; margin-top: 1.2rem">
          <p>Copyright&copy;{{ new Date().getFullYear() }} | Privacy Policy</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
@import url("../../styles.css");
</style>
<script>
import Login from "../components/login.vue";
import { helper } from "@/packages/cassandra-base/utilities";
export default {
  name: "Landing",
  components: { Login },
  data: function () {
    return {
      cycle: false,
      landingPageImage: null,
    };
  },
  computed: {
    company: function () {
      return this.$store.getters["auth/company"];
    },
    settings() {
      return this.$store.getters["Admin/adminGetters"]("settings");
    },
    getImage() {
      return this.landingPageImage
        ? URL.createObjectURL(this.landingPageImage)
        : require("@/packages/cassandra-base/assets/images.jpeg");
    },
  },
  watch: {
    settings: {
      handler: async function (val) {
        if (val) {
          if (val.site_landing_page_image) {
            this.landingPageImage = await helper.getFileBlob(
              val.site_landing_page_image,
              "landing_page.png"
            );
          }
        }
      },
      deep: true,
    },
  },
};
</script>
