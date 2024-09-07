<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-card flat class="mx-auto">
        <v-card-title>Installed Packages & Modules</v-card-title>
        <v-card-text>
          <v-list v-for="(link, i) in links" :key="i">
            <!-- main drawer -->
            <v-list-item
              :key="i"
              class="primary--text"
              v-if="
                !link.hasSubs && !link.hasSideLinks && link.name !== undefined
              "
            >
              <v-list-item-icon>
                <v-icon color="primary">{{ link.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ link.name }}</v-list-item-title>
              <v-list-item-action>
                <v-switch
                  v-model="link.enabled"
                  inset
                  :value="link.enabled"
                  :true-value="true"
                  :false-value="false"
                >
                  <template v-slot:label>
                    <span class="primary--text mx-2">
                      {{ link.enabled ? "Enabled" : "Disabled" }}
                    </span>
                  </template>
                </v-switch>
              </v-list-item-action>
            </v-list-item>
            <v-list-group :value="false" v-if="link.hasSubs">
              <template v-slot:activator>
                <v-list-item-icon>
                  <v-icon color="primary">{{ link.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="primary--text">{{
                  link.name
                }}</v-list-item-title>
                <v-list-item-action>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <div v-on="on" v-bind="attrs">
                        <v-switch
                          @click.stop
                          v-model="link.enabled"
                          inset
                          :value="link.enabled"
                          :true-value="true"
                          :false-value="false"
                        />
                      </div>
                    </template>
                    <span>
                      {{ link.enabled ? "Enabled" : "Disabled" }}
                    </span>
                  </v-tooltip>
                </v-list-item-action>
              </template>

              <v-list-item
                v-for="(sub, idx) in link.subs"
                :key="idx"
                class="primary--text"
              >
                <v-list-item-icon class="ml-10">
                  <v-icon color="primary">{{ sub.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="ml-1">{{
                  sub.name
                }}</v-list-item-title>
                <v-list-item-action>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <div v-on="on" v-bind="attrs">
                        <v-switch
                          v-model="sub.enabled"
                          inset
                          :value="sub.enabled"
                          :true-value="true"
                          :false-value="false"
                        />
                      </div>
                    </template>
                    <span>
                      {{ sub.enabled ? "Enabled" : "Disabled" }}
                    </span>
                  </v-tooltip>
                </v-list-item-action>
              </v-list-item>
            </v-list-group>

            <v-list-group :value="false" v-if="link.hasSideLinks">
              <template v-slot:activator>
                <v-list-item-icon>
                  <v-icon color="primary">{{ link.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="primary--text">{{
                  link.name
                }}</v-list-item-title>
                <v-list-item-action>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <div v-on="on" v-bind="attrs">
                        <v-switch
                          @click.stop
                          v-model="link.enabled"
                          inset
                          :value="link.enabled"
                          :true-value="true"
                          :false-value="false"
                        />
                      </div>
                    </template>
                    <span>
                      {{ link.enabled ? "Enabled" : "Disabled" }}
                    </span>
                  </v-tooltip>
                </v-list-item-action>
              </template>

              <v-list-item
                v-for="(sideLink, idx) in link.links"
                :key="idx"
                class="primary--text"
              >
                <v-list-item-icon class="ml-10">
                  <v-icon color="primary">{{ sideLink.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title class="ml-1">{{
                  sideLink.name
                }}</v-list-item-title>
                <v-list-item-action>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <div v-on="on" v-bind="attrs">
                        <v-switch
                          v-model="sideLink.enabled"
                          inset
                          :value="sideLink.enabled"
                          :true-value="true"
                          :false-value="false"
                        />
                      </div>
                    </template>
                    <span>
                      {{ sideLink.enabled ? "Enabled" : "Disabled" }}
                    </span>
                  </v-tooltip>
                </v-list-item-action>
              </v-list-item>
            </v-list-group>
          </v-list>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "DrawerLinkSettings",
  props: {
    site_installed_packages: {
      type: Array,
      default: () => [],
    },
  },
  data: function () {
    return {};
  },
  computed: {
    links: {
      get() {
        return this.site_installed_packages;
      },
      set(val) {
        this.$emit("update:settingsFormData.site_installed_packages", [...val]);
      },
    },
    topLinks: {
      get() {
        return this.site_top_bar_links;
      },
      set(value) {
        this.$emit("update:settingsFormData.site_top_bar_links", value);
      },
    },
  },
};
</script>
