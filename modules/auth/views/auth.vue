<template>
  <main>
    <router-view />
  </main>
</template>

<style></style>
<script>
import { mapState } from "vuex";
export default {
  name: "Auth",
  components: {},
  beforeCreate() {
    document.body.className = "gray-bg";
  },
  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.$store.dispatch("auth/company");
      v.$store.dispatch("Admin/getSettings");
    });
  },
  computed: {
    ...mapState({
      loading: function (state) {
        return state.loader.loading;
      },
    }),
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

<style></style>
