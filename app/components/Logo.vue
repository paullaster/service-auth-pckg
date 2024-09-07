<template>
  <img
    :src="`data:application/jpg;base64,${company.base64Logo}`"
    :width="width"
    :height="height"
  />
</template>

<script>
export default {
  name: "Logo",
  props: {
    size: {
      type: String,
      default: "100",
    },
    width: {
      type: String,
      default: "15%",
    },
    height: {
      type: String,
      default: "15%",
    },
  },
  data: function () {
    return {};
  },
  computed: {
    company: function () {
      return this.$store.getters["auth/company"];
    },
  },
};
</script>

<style scoped />
