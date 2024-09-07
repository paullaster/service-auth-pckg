<template>
  <v-overlay absolute color="#EBF5FB">
    <fulfilling-bouncing-circle-spinner
      :animation-duration="4000"
      :size="60"
      :color="vuetifyColors.primary"
    />
  </v-overlay>
</template>

<script>
import { FulfillingBouncingCircleSpinner } from "epic-spinners";
export default {
  name: "Spinner",
  components: {
    FulfillingBouncingCircleSpinner,
  },
  computed: {
    vuetifyColors: function () {
      return this.$vuetify.theme.themes.light;
    },
  },
};
</script>

<style scoped></style>
