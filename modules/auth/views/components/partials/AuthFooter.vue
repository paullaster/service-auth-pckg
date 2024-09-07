<template>
  <v-footer fixed padless>
    <v-col class="text-center" cols="12">
      {{ appName | capitalize }} © {{ new Date().getFullYear() }}
      <!-- <strong>Kinetic Technology LTD</strong> -->
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: "AuthFooter",
};
</script>

<style scoped></style>
