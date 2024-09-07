<template>
  <v-tabs v-model="tabs" align-with-title>
    <v-tab v-for="(link, i) in menuLinks" :key="i" :to="link.to">
      <v-icon class="mx-2">{{ link.icon }}</v-icon>
      <span class="text-capitalize text-body-1 font-weight-medium">{{
        link.name
      }}</span>
    </v-tab>
  </v-tabs>
</template>
<script>
export default {
  name: "AppMenuNav",
  data() {
    return {
      tabs: 0,
    };
  },
  computed: {
    menuLinks: function () {
      return this.$store.getters["Dashboard/menuLinks"];
    },
  },
};
</script>
