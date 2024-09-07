<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :permanent="$vuetify.breakpoint.mdAndUp"
      :mini-variant="$vuetify.breakpoint.mdAndUp ? mini : false"
      app
      class="drawerColor"
    >
      <!--  -->
      <AppAccount :mini="mini" />
      <v-list v-if="!displaySideLinks" class="drawer-list">
        <template v-for="(link, i) in userData.is_admin ? adminLinks : links">
          <!-- main drawer -->
          <v-list-item
            :key="i"
            class="white--text"
            v-if="
              !mini &&
              !link.hasSubs &&
              !link.hasSideLinks &&
              link.name !== undefined &&
              link.enabled
            "
            link
            :to="!link.hasSubs ? link.to : ''"
          >
            <v-list-item-icon>
              <v-icon color="white">{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ link.name }}</v-list-item-title>
          </v-list-item>
          <!-- Mini drawer -->
          <v-list-item
            v-if="
              mini &&
              !link.hasSubs &&
              !link.hasSideLinks &&
              link.name !== undefined &&
              link.enabled
            "
            class="text-center"
            :key="i"
            :to="!link.hasSubs ? link.to : ''"
            link
          >
            <v-tooltip right class="mini--link">
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-on="on" v-bind="attrs" color="white">{{
                  link.icon
                }}</v-icon>
              </template>
              <span>{{ link.name }}</span>
            </v-tooltip>
          </v-list-item>
          <!-- side and subs links -->
          <v-list-group
            :value="false"
            :key="i"
            v-if="!mini && link.hasSubs && link.enabled"
            @click.stop="routeTo(link.to)"
          >
            <template v-slot:activator>
              <v-list-item-icon>
                <v-icon color="white">{{ link.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="white--text">{{
                link.name
              }}</v-list-item-title>
            </template>

            <v-list-item
              v-for="(sub, idx) in link.subs.filter((s) => s.enabled)"
              :key="idx"
              :to="sub.to"
              class="white--text"
              link
            >
              <v-list-item-icon class="ml-10">
                <v-icon color="white">{{ sub.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="ml-1">{{ sub.name }}</v-list-item-title>
            </v-list-item>
          </v-list-group>

          <v-list-item
            v-if="
              !mini &&
              link.hasSideLinks &&
              link.name !== undefined &&
              link.enabled
            "
            class="white--text"
            :key="i"
            @click="goToSideMenu(link)"
          >
            <v-list-item-icon>
              <v-icon color="white">{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="white--text">{{
              link.name
            }}</v-list-item-title>
          </v-list-item>

          <v-list-item
            v-if="
              mini &&
              link.hasSideLinks &&
              link.name !== undefined &&
              link.enabled
            "
            class="text-center"
            :key="i"
            @click="goToSideMenu(link)"
          >
            <v-tooltip right class="mini--link">
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-on="on" v-bind="attrs" color="white">{{
                  link.icon
                }}</v-icon>
              </template>
              <span>{{ link.name }}</span>
            </v-tooltip>
          </v-list-item>

          <v-list-group
            :value="false"
            :key="i"
            v-if="mini && link.hasSubs && link.enabled"
            class="text-center"
            @click.stop="routeTo(link.to)"
          >
            <template v-slot:activator :to="link.hasSubs ? link.to : ''">
              <v-tooltip right class="mini--link">
                <template v-slot:activator="{ on, attrs }">
                  <v-icon v-on="on" v-bind="attrs" color="white">{{
                    link.icon
                  }}</v-icon>
                </template>
                <span>{{ link.name }}</span>
              </v-tooltip>
            </template>

            <v-list-item
              v-for="(sub, idx) in link.subs.filter((s) => s.enabled)"
              :key="idx"
              :to="sub.to"
              link
            >
              <span>
                <v-icon style="color: #ffffff">{{ sub.icon }}</v-icon>
              </span>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>
      <v-list v-else class="drawer-list">
        <SideLinks :miniDrawer="mini" @returnToMainMenu="returnToMainMenu" />
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn
            :block="!mini"
            :text="!mini"
            @click="logout"
            :icon="mini"
            class="white--text text-capitalize text-body-2"
          >
            <v-icon>mdi-logout</v-icon> <span v-if="!mini">Logout</span>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
    <AppNav />
  </div>
</template>
<style>
@import "../styles.css";
</style>
<script>
import AppAccount from "./AppAccount";
import AppNav from "./AppNav";
import AdminLinks from "../../modules/admin/AdminLinks";
import SideLinks from "./SideLinks";
export default {
  name: "AppSide",
  components: { AppNav, AppAccount, SideLinks },
  data() {
    return {
      mainDashboardLink: {},
      drawer: true,
    };
  },
  computed: {
    userData: function () {
      return this.$store.getters["auth/user"];
    },
    adminLinks: function () {
      return [...AdminLinks];
    },
    mini: {
      get() {
        return this.$store.getters["Dashboard/mini"];
      },
      set(val) {
        console.log("mutate", val);
        this.$store.commit("Dashboard/SET_MINI_DRAWER", val);
      },
    },
    displaySideLinks: {
      get() {
        return this.$store.getters["Dashboard/displaySideLinks"];
      },
      set(val) {
        this.$store.commit("Dashboard/SET_DISPLAY_SIDE_LINKS", val);
      },
    },
    sideLink: {
      get() {
        return this.$store.getters["Dashboard/sideLink"];
      },
      set(val) {
        this.$store.commit("Dashboard/SET_SIDE_LINK", val);
      },
    },
    links: function () {
      const sideLinks = this.settings
        ? this.settings.site_installed_packages
          ? JSON.parse(this.settings.site_installed_packages)
          : this.$store.getters["Dashboard/links"]
        : this.$store.getters["Dashboard/links"];

      sideLinks.forEach((l) => {
        l.hasSubs = l.subs && l.subs.length !== 0;
      });
      return [...sideLinks];
    },

    settings() {
      return this.$store.getters["Admin/adminGetters"]("settings");
    },
  },

  methods: {
    gotoDashboard: function (to) {
      console.log(to);
      this.$router.replace({ path: to });
    },
    routeTo(path) {
      this.$router.push({ path });
    },
    returnToMainMenu() {
      this.displaySideLinks = false;
      this.sideLink = {};
    },
    goToSideMenu(link) {
      this.displaySideLinks = true;
      const mainDashboardLink = {
        ...this.links.find((l) => l.name === "Dashboard"),
      };
      this.sideLink = { ...link, mainDashboardLink };
    },
    logout: function () {
      this.$store.dispatch("auth/logout");
    },
  },
  watch: {
    mini() {
      console.log("mini", this.mini);
    },
    links: {
      handler: function (val) {
        const currentLink = val.find((l) => {
          if (l.hasSideLinks) {
            return l.links.find((sl) => sl.to === this.$route.path);
          } else {
            return false;
          }
        });
        if (currentLink) {
          this.goToSideMenu(currentLink);
        }
      },
      deep: true,
    },
  },
};
</script>
