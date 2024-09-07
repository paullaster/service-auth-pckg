<template>
  <v-container fluid>
    <v-card flat class="mx-auto">
      <v-card-title>
        <span>Admin Settigs</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="settings" v-model="isValid">
          <v-row>
            <v-col cols="12" md="12" class="mt-n3 mb-n3">
              <div class="text-body-1 font-weight-bold">
                <span>App Color Settings</span>
              </div>
            </v-col>
            <v-col cols="12" md="12">
              <div class="d-flex flex-wrap">
                <v-menu
                  :close-on-content-click="false"
                  v-for="(item, i) in colors"
                  v-model="item.menu"
                  :key="i"
                  transition="scale-transition"
                  offset-y
                  min-width="300"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-chip
                      :key="i"
                      :color="item.color"
                      class="mx-2 my-2"
                      v-on="on"
                      v-bind="attrs"
                      label
                    >
                      <span class="white--text">{{
                        `${item.colorName} : ${item.color}`
                      }}</span>
                    </v-chip>
                  </template>
                  <v-card>
                    <v-card-title class="headline">Pick a color</v-card-title>
                    <v-card-text>
                      <v-color-picker
                        @input="updateColor($event, item)"
                        :value="item.color"
                        mode="hexa"
                        show-swatches
                        swatches-max-height="300px"
                      ></v-color-picker>
                    </v-card-text>
                  </v-card>
                </v-menu>
              </div>
            </v-col>
            <v-col cols="12" md="12" class="mt-n3 mb-n3">
              <div class="text-body-1 font-weight-bold">
                <span>Minor Settings</span>
              </div>
            </v-col>
            <v-col cols="12" md="3" class="mt-n3">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <div v-on="on" v-bind="attrs">
                    <v-switch
                      v-model="settingsFormData.minor_settings.switch_company"
                      label="Switch Company"
                      dense
                      inset
                    />
                  </div>
                </template>
                <span>Allow User to switch Default company</span>
              </v-tooltip>
            </v-col>
            <v-col cols="12" md="3" class="mt-n3">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <div v-on="on" v-bind="attrs">
                    <v-switch
                      v-model="settingsFormData.minor_settings.handler"
                      label="Is Handover Required"
                      inset
                      dense
                    />
                  </div>
                </template>
                <span
                  >User must handover to another user before submitting
                  leave</span
                >
              </v-tooltip>
            </v-col>
            <v-col cols="12" md="3" class="mt-n3">
              <v-text-field
                v-model="settingsFormData.minor_settings.pettycash_caption"
                label="Petty Cash Caption"
                dense
                outlined
                clearable
                hint="pettycash caption"
              />
            </v-col>
            <v-col cols="12" md="3" class="mt-n3">
              <v-text-field
                v-model="settingsFormData.minor_settings.handbook_caption"
                label="Handbook Caption"
                dense
                outlined
                clearable
                hint="handbook caption"
              />
            </v-col>
            <v-col cols="12" md="3" class="mt-n3">
              <v-text-field
                v-model="settingsFormData.minor_settings.appraisal_caption"
                label="Appraisal Caption"
                dense
                outlined
                clearable
                hint="appraisal caption"
              />
            </v-col>
            <v-col cols="12" md="3" class="mt-n3">
              <v-text-field
                v-model="settingsFormData.minor_settings.otp_expiry"
                type="number"
                label="OTP Expiry (in minutes)"
                dense
                outlined
                clearable
                hint="OTP Expiry (in minutes)"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4" class="mt-n3">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <div v-on="on" v-bind="attrs">
                    <v-switch
                      v-model="settingsFormData.minor_settings['2fa']"
                      label="Two Factor Authentication"
                      inset
                      dense
                    />
                  </div>
                </template>
                <span>Allow Two Factor Authentication</span>
              </v-tooltip>
            </v-col>
            <v-col cols="12" md="4" class="mt-n3">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <div v-on="on" v-bind="attrs">
                    <v-switch
                      v-model="settingsFormData.minor_settings['2fa_sms']"
                      label="Two Factor Authentication via SMS"
                      inset
                      dense
                    />
                  </div>
                </template>
                <span>Allow Two Factor Authentication via SMS</span>
              </v-tooltip>
            </v-col>
            <v-col cols="12" md="4" class="mt-n3">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <div v-on="on" v-bind="attrs">
                    <v-switch
                      v-model="settingsFormData.minor_settings['2fa_email']"
                      label="Two Factor Authentication via Email"
                      dense
                      inset
                    />
                  </div>
                </template>
                <span>Allow Two Factor Authentication via Email</span>
              </v-tooltip>
            </v-col>
            <v-col cols="12" md="8" class="mt-n3">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <div v-on="on" v-bind="attrs">
                    <v-autocomplete
                      v-model="settingsFormData.minor_settings.requisitions"
                      :items="items"
                      outlined
                      chips
                      dense
                      color="blue-grey lighten-2"
                      label="Selected Requisitions"
                      item-text="name"
                      item-value="name"
                      multiple
                      hint="Selected Requisitions will be displayed on the portal
                      side"
                    >
                      <template v-slot:selection="data">
                        <v-chip
                          v-bind="data.attrs"
                          :input-value="data.selected"
                          close
                          @click="data.select"
                          @click:close="remove(data.item)"
                        >
                          {{ data.item.name }}
                        </v-chip>
                      </template>
                    </v-autocomplete>
                  </div>
                </template>
                <span>Select Requisition to Display</span>
              </v-tooltip>
            </v-col>
            <v-col cols="12" md="12" class="mt-n3 mb-n3">
              <div class="text-body-1 font-weight-bold">
                <span>Cash Management Settings</span>
              </div>
            </v-col>
            <v-col cols="12" md="12" class="mt-n3 mb-n3">
              <CashmgtSettings
                :cashmgt_settings="settingsFormData.cashmgt_settings"
              />
            </v-col>
            <v-col cols="12" md="12" class="mt-n3 mb-n3">
              <DrawerLinkSettings
                :site_installed_packages="
                  settingsFormData.site_installed_packages
                "
              />
            </v-col>
            <v-col cols="12" md="12">
              <div class="text-body-1 font-weight-bold">
                <span>App Image Settings</span>
              </div>
            </v-col>
            <v-divider />
            <v-col cols="12" md="6">
              <v-card flat class="mx-auto d-flex justify-center">
                <v-img
                  max-height="150"
                  max-width="250"
                  contain
                  :src="displayLanding"
                />
              </v-card>
              <v-file-input
                v-model="settingsFormData.site_landing_page_image"
                color="primary"
                counter
                label="Landing Page Image"
                dense
                accept="image/*"
                placeholder="Select Landing Page Image"
                prepend-icon="mdi-image"
                outlined
                :rules="rules.file"
                :show-size="1000"
              >
                <template v-slot:selection="{ index, text }">
                  <v-chip v-if="index < 2" color="primary" dark label small>
                    {{ text }}
                  </v-chip>
                </template>
              </v-file-input>
            </v-col>
            <v-col cols="12" md="6">
              <v-card flat class="mx-auto d-flex justify-center">
                <v-img
                  max-height="150"
                  max-width="250"
                  contain
                  :src="displayAvatar"
                />
              </v-card>
              <v-file-input
                v-model="settingsFormData.site_user_avatar"
                color="primary"
                counter
                label="User Avatar"
                placeholder="Select User Avatar"
                prepend-icon="mdi-image"
                outlined
                dense
                :rules="rules.file"
                :show-size="1000"
              >
                <template v-slot:selection="{ index, text }">
                  <v-chip v-if="index < 2" color="primary" dark label small>
                    {{ text }}
                  </v-chip>
                </template>
              </v-file-input>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="saveSettings">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import { helper } from "@/packages/cassandra-base/utilities";
import CashmgtSettings from "./CashmgtSettings.vue";
import DrawerLinkSettings from "./DrawerLinkSettings.vue";
export default {
  name: "AdminDashboard",
  components: {
    CashmgtSettings,
    DrawerLinkSettings,
  },
  data() {
    return {
      isValid: false,
      items: [
        { name: "User Requisition", group: "Group 2" },
        { name: "Purchase Requisition", group: "Group 2" },
        { name: "Store Requisition", group: "Group 2" },
      ],
      // items: ["User Requisition", "Purchase Requisition", "Store Requisition"],
      settingsFormData: {
        site_landing_page_image: null,
        site_user_avatar: null,
        site_colors: [],
        minor_settings: {
          switch_company: false,
          handover: false,
          pettycash_caption: "",
          handbook_caption: "",
          appraisal_caption: "",
          "2fa": false,
          "2fa_sms": false,
          "2fa_email": false,
          otp_expiry: 0,
          requisitions: [],
        },
        cashmgt_settings: {
          multiple_currency: false,
          imprest_travel_request_lock_days: 0,
          show_budget_balances: false,
          cashmgt_actions_position: "top",
          cashmgt_save_caption: "",
          showReqVendor: true,
          showReqDueDate: true,
          showReqCategory: true,
        },
        site_installed_packages: [],
      },
    };
  },
  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.$store.dispatch("Admin/getSettings");
      v.$store.dispatch("Admin/getUsers");
    });
  },
  computed: {
    rules() {
      return {
        file: [
          (value) =>
            !value ||
            value.size < 2000000 ||
            "File size should be less than 2 MB!",
        ],
      };
    },
    users() {
      return this.$store.getters["Admin/adminGetters"]("users");
    },
    settings() {
      return this.$store.getters["Admin/adminGetters"]("settings");
    },
    colors() {
      return this.settings !== null
        ? this.settingsFormData.site_colors
        : this.objectToArray(this.$vuetify.theme.themes.light);
    },
    displayLanding() {
      // display image from blob
      if (this.settingsFormData.site_landing_page_image !== null) {
        return URL.createObjectURL(
          this.settingsFormData.site_landing_page_image
        );
      } else {
        return require("../../../assets/landing_page.png");
      }
    },
    displayAvatar() {
      // display image from blob
      if (this.settingsFormData.site_user_avatar !== null) {
        return URL.createObjectURL(this.settingsFormData.site_user_avatar);
      } else {
        return require("../../../assets/user.png");
      }
    },
  },
  methods: {
    updateColor(color, item) {
      const colors = [...this.colors];
      colors.forEach((colorItem) => {
        if (colorItem.colorName === item.colorName) {
          colorItem.color = color;
          colorItem.menu = false;
        }
      });
      this.settingsFormData.site_colors = colors;
    },
    async saveSettings() {
      console.log(this.settingsFormData.cashmgt_settings)
      const data = {
        site_colors: JSON.stringify(
          this.settingsFormData.site_colors.length > 0
            ? this.settingsFormData.site_colors
            : this.colors
        ),
        site_landing_page_image: this.settingsFormData.site_landing_page_image
          ? this.settingsFormData.site_landing_page_image
          : await helper.getFileBlob(this.displayLanding, "landing_page.png"),
        site_user_avatar: this.settingsFormData.site_user_avatar
          ? this.settingsFormData.site_user_avatar
          : await helper.getFileBlob(this.displayAvatar, "user.png"),
        id: this.settings ? this.settings.id : null,
        minor_settings: JSON.stringify(this.settingsFormData.minor_settings),
        cashmgt_settings: JSON.stringify(
          this.settingsFormData.cashmgt_settings
        ),
        site_installed_packages: JSON.stringify(
          this.settingsFormData.site_installed_packages.length > 0
            ? this.settingsFormData.site_installed_packages
            : this.$store.getters["Dashboard/links"]
        ),
      };
      if (this.settings.id) {
        this.$store.dispatch(
          "Admin/updateSettings",
          helper.prepareFormData(data)
        );
      } else {
        this.$store.dispatch("Admin/addSettings", helper.prepareFormData(data));
      }
    },
    objectToArray(obj) {
      return Object.keys(obj).map((key) => {
        return { colorName: key, color: obj[key], menu: false };
      });
    },
  },
  watch: {
    settings: {
      handler: async function (val) {
        if (val) {
          this.settingsFormData.site_landing_page_image =
            val && val.site_landing_page_image
              ? await helper.getFileBlob(
                  val.site_landing_page_image,
                  "landing_page.png"
                )
              : null;
          this.settingsFormData.site_user_avatar =
            val && val.site_user_avatar
              ? await helper.getFileBlob(val.site_user_avatar, "user.png")
              : null;
          this.settingsFormData.site_installed_packages =
            val && val.site_installed_packages
              ? val.site_installed_packages
              : [];
          this.settingsFormData.site_colors =
            val && val.site_colors
              ? JSON.parse(val.site_colors)
              : this.objectToArray(this.$vuetify.theme.themes.light);
          this.settingsFormData.minor_settings =
            val && val.minor_settings
              ? JSON.parse(val.minor_settings)
              : {
                  switch_company: false,
                  handover: false,
                  pettycash_caption: "",
                  handbook_caption: "",
                  appraisal_caption: "",
                  "2fa": false,
                  "2fa_sms": false,
                  "2fa_email": false,
                  otp_expiry: 0,
                };
          this.settingsFormData.cashmgt_settings =
            val && val.cashmgt_settings
              ? JSON.parse(val.cashmgt_settings)
              : {
                  multiple_currency: false,
                  imprest_travel_request_lock_days: 0,
                  show_budget_balances: false,
                  cashmgt_actions_position: "top",
                  cashmgt_save_caption: "",
                  showReqVendor: true,
                  showReqDueDate: true,
                  showReqCategory: true,
                };
          this.settingsFormData.site_installed_packages =
            val && val.site_installed_packages
              ? JSON.parse(val.site_installed_packages)
              : [];
        }
      },
      deep: true,
    },
  },
};
</script>
