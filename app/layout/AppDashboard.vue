<template>
  <v-app id="inspire" style="background-color: #f0f3f4">
    <Side />
    <Page />
  </v-app>
</template>

<script>
import Side from "./AppSide";
import Page from "./AppPage";
export default {
  name: "AppDashboard",
  components: { Page, Side },
  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.$store.dispatch("auth/company");
      v.$store.dispatch("auth/getCompanies");
      v.$store.dispatch("Admin/getSettings");
    });
  },
  computed: {
    settings() {
      return this.$store.getters["Admin/adminGetters"]("settings");
    },
  },
  watch: {
    settings: {
      handler: async function (val) {
        if (val) {
          if (val.site_colors) {
            const colors = JSON.parse(val.site_colors);
            colors.forEach((el) => {
              this.$vuetify.theme.themes.light[el.colorName] = el.color;
            });
          }
        }
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
/* #eaeaf6 */
@import "../styles.css";
</style>
