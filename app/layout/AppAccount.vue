<template>
  <div>
    <div style="display: block">
      <v-list dense>
        <v-list-item class="top_list_item">
          <v-list-item-avatar
            color="blue lighten-4"
            :class="mini ? 'ml-n2' : ''"
            size="40"
          >
            <v-img
              :src="`data:application/jpg;base64,${company.base64Logo}`"
            ></v-img>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title style="color: #ffffff">{{
              company.displayName
            }}</v-list-item-title>
            <v-list-item-subtitle
              v-if="userData.is_admin"
              style="color: #ffffff"
            >
              {{ `${userData.email}` }}
            </v-list-item-subtitle>
            <v-list-item-subtitle v-else style="color: #ffffff">
              {{ `${userProfile.email}` }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
    <v-divider v-if="!mini" class="mx-3"></v-divider>
  </div>
</template>
<style>
@import "../styles.css";
</style>
<script>
import { AuthService } from "@kinetics254/cassandra-base/modules/auth";
export default {
  name: "AppAccount",
  props: { mini: Boolean },
  data: function () {
    return {};
  },
  computed: {
    company: function () {
      return this.$store.getters["auth/company"];
    },
    userProfile() {
      return AuthService.user.profile;
    },
    userData() {
      return AuthService.user;
    },
  },
};
</script>

<style scoped></style>
