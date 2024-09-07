<template>
  <v-footer app :inset="true" elevation="12" :color="color">
    <v-menu top close-on-content-click :disabled="!company.switch_company">
      <template v-slot:activator="{ on, attrs, value }">
        <v-btn
          color="primary"
          class="text-capitalize"
          text
          link
          v-on="on"
          :v-bind="attrs"
        >
          {{
            !company.switch_company
              ? `Default Company: ${
                  company.displayName ? company.displayName : ""
                }`
              : "Select Default Company"
          }}
          <v-icon class="mx-2" v-if="company.switch_company">{{
            !value ? "keyboard_arrow_up" : "keyboard_arrow_down"
          }}</v-icon>
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item-group>
          <v-list-item
            v-for="(item, i) in companies"
            :key="i"
            @click="setCompany(item)"
          >
            <v-list-item-title>{{ item.name }}</v-list-item-title>
            <v-chip
              v-if="user.default_company === item.id"
              x-small
              color="green lighten-1"
              label
              >default</v-chip
            >
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
    <v-spacer />
    <span style="color: #000000">
      {{ appName | capitalize }} © {{ new Date().getFullYear() }}
    </span>
    <v-spacer />
    <!-- <a
      class="text-decoration-none primary--text"
      href="https://kinetics.co.ke/"
      target="_blank"
    >
      Kinetics Technology LTD
    </a> -->
  </v-footer>
</template>
<style>
@import "../styles.css";
</style>
<script>
import { appName } from "../../environment/environment";

export default {
  name: "AppFooter",
  props: {
    opacity: {
      type: String,
      default: "1",
    },
  },
  computed: {
    color() {
      return `rgba(255, 255, 255, ${this.opacity})`;
    },
    appName() {
      return appName;
    },
    companies() {
      return this.$store.getters["auth/companies"];
    },
    user() {
      return this.$store.getters["auth/user"];
    },
    company() {
      return this.$store.getters["auth/company"];
    },
  },
  methods: {
    setCompany(val) {
      this.$store.dispatch("auth/setDefaultCompany", { ...val });
    },
  },
};
</script>

<style scoped></style>
