<template>
  <transition
    name="slide-x-reverse-transition"
    appear
    :duration="{ enter: 200, leave: 800 }"
  >
    <div>
      <v-list-item class="white--text" link :to="sideLink.mainDashboardLink.to">
        <v-list-item-icon>
          <v-icon color="white">{{ sideLink.mainDashboardLink.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{
          sideLink.mainDashboardLink.name
        }}</v-list-item-title>
      </v-list-item>
      <v-list-item dense class="white--text active--side--item">
        <v-list-item-action>
          <v-btn small color="white" icon outlined @click="returnToMainMenu">
            <v-icon color="white">mdi-arrow-left</v-icon>
          </v-btn>
        </v-list-item-action>
        <v-list-item-title class="white--text text-body-2 font-weight-bold">
          {{ sideLink.name }}
        </v-list-item-title>
      </v-list-item>
      <v-list v-for="(link, i) in sideLink.links" :key="i" class="drawer-list">
        <!-- main drawer -->
        <v-list-item
          :key="i"
          class="white--text"
          v-if="!miniDrawer && link.name !== undefined && link.enabled"
          link
          :to="link.to"
        >
          <v-list-item-icon>
            <v-icon color="white">{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ link.name }}</v-list-item-title>
        </v-list-item>
        <!-- Mini drawer -->
        <v-list-item
          v-if="miniDrawer && link.name !== undefined && link.enabled"
          class="text-center"
          :key="i"
          :to="link.to"
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
      </v-list>
    </div>
  </transition>
</template>
<script>
export default {
  name: "SideLinks",
  props: {
    miniDrawer: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    sideLink: function () {
      return this.$store.getters["Dashboard/sideLink"];
    },
  },
  methods: {
    returnToMainMenu() {
      this.$emit("returnToMainMenu");
    },
  },
};
</script>
