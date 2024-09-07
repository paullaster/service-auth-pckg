<template>
  <v-app-bar app style="background-color: #ffffff">
    <v-btn icon x-large @click="setMiniDrawer()">
      <v-avatar>
        <v-icon color="primary">apps</v-icon>
      </v-avatar>
    </v-btn>
    <v-toolbar-title class="text-lg-h5" style="font-weight: 300"
      >ESS</v-toolbar-title
    >
    <div class="mx-2" v-if="userData.is_navuser"><AppMenuNav /></div>
    <v-spacer></v-spacer>
    <v-btn
      class="primary text-capitalize mr-2"
      v-if="userData.is_navuser"
      @click="raiseRequisition"
    >
      <v-icon class="mx-2">mdi-plus</v-icon>
      Purchase Requisiton</v-btn
    >
    <v-menu
      v-model="menu"
      v-if="isEmployee"
      :close-on-content-click="true"
      offset-y
      content-class="elevation-1"
      tile
      nudge-bottom="10"
      nudge-left="25"
    >
      <template v-slot:activator="{ on }">
        <v-badge
          bordered
          overlap
          :content="approvals.length"
          color="secondary"
          offset-x="19"
          offset-y="16"
          class="mx-2 px-2"
        >
          <v-btn class="primary text-capitalize" v-on="on"> Approvals </v-btn>
        </v-badge>
      </template>
      <v-card
        class="mx-auto"
        max-width="400"
        max-height="50vh"
        style="overflow-y: scroll"
      >
        <v-list dense>
          <v-list-item dense>
            <v-list-item-title>Approvals</v-list-item-title>
          </v-list-item>
          <v-divider />
          <v-list-item-group active-class="secondary--text">
            <template v-for="(item, i) in approvals">
              <v-list-item
                v-if="i < approvals.length"
                :key="item.entryNo"
                link
                @click="viewApproval(item)"
              >
                <v-list-item-title>
                  <span class="primary--text mr-1"># {{ item.entryNo }}</span>
                  <span>{{ `Doc. ${item.documentNo}` }}</span>
                </v-list-item-title>
              </v-list-item>
              <v-divider v-if="i < approvals.length - 1" :key="i"></v-divider>
            </template>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-menu>

    <v-menu
      v-model="menu2"
      open-on-hover
      offset-y
      v-if="isEmployee"
      bottom
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn rounded v-bind="attrs" v-on="on" icon>
          <v-badge
            color="primary"
            overlap
            :content="notifications"
            :value="notifications"
          >
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-card min-width="300">
        <v-card-subtitle class="text-center text-h6 my-0 py-1">
          Appraisal Reviews
        </v-card-subtitle>
        <v-divider />

        <v-list dense>
          <v-list-item-group>
            <v-list-item
              v-for="item in reviews"
              :key="item.code"
              :to="{
                name: 'AppraisalAcceptReview',
                params: { reviewerID: encodeRoute(item.reviewerID) },
                query: { reviewNo: encodeRoute(item.code) },
              }"
            >
              <v-tooltip bottom v-if="item.tooltip">
                <template v-slot:activator="{ on }">
                  <v-list-item-action class="mr-3">
                    <v-icon color="info" class="mt-n1">
                      mdi-alert-circle-outline
                    </v-icon>
                  </v-list-item-action>
                  <v-list-item-content v-on="on">
                    <v-list-item-title>
                      Action required for: &nbsp;
                      <span class="text-overline font-weight-bold">
                        {{ item.code }}
                      </span>
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      <span class="text-caption"></span>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </template>
                <span>{{ item.tooltip }}</span>
              </v-tooltip>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-menu>
    <div class="text-lg-h6 mx-3" style="font-weight: 300">
      Welcome {{ userData.name }}
    </div>
    <v-menu
      v-model="linkMenu"
      :close-on-content-click="true"
      offset-x
      content-class="elevation-1"
      tile
      nudge-bottom="52"
    >
      <template v-slot:activator="{ on }">
        <div icon v-on="on" style="cursor: pointer">
          <vue-ellipse-progress
            :progress="99"
            :determinate="false"
            :color="vuetifyColors.primary"
            empty-color="transparent"
            :empty-color-fill="emptyColorFill"
            :size="50"
            :thickness="3.5"
            :empty-thickness="3"
            lineMode="out 0"
            :legend="false"
            animation="rs 700 1000"
            fontSize="1.5rem"
            :loading="false"
            :no-data="false"
          >
            <span slot="legend-caption" style="color: rgb(0, 68, 139)">
              <span v-if="profilePicture">
                <v-avatar>
                  <v-img
                    :style="{ maxHeight: '85%', maxWidth: '85%' }"
                    :src="`data:application/jpg;base64,${profilePicture}`"
                  ></v-img>
                </v-avatar>
              </span>
              <span class="text-uppercase" v-else>
                {{ getInititals(userData.name) }}
              </span>
            </span>
          </vue-ellipse-progress>
        </div>
      </template>
      <v-card class="px-4" width="210">
        <v-list dense>
          <v-list-item link :to="`/profile`" v-if="isEmployee">
            <v-list-item-title style="color: #000000">
              <v-icon>mdi-account-edit</v-icon>
              My Profile
            </v-list-item-title>
          </v-list-item>
          <v-list-item link :to="`/approvals`" v-if="isEmployee">
            <v-list-item-title style="color: #000000">
              <v-icon>check_box</v-icon>
              My Approvals
            </v-list-item-title>
          </v-list-item>
          <v-list-item
            link
            @click="downloadFile(p9Report.base64)"
            v-if="isEmployee"
          >
            <v-list-item-title style="color: #000000">
              <v-icon>mdi-file-document-outline</v-icon>
              P9 Report
            </v-list-item-title>
          </v-list-item>
          <v-list-item
            v-if="company === 'KISEB'"
            link
            :href="`https://forms.gle/nq5ABjVtdgMFptx2A`"
            target="_blank"
          >
            <v-list-item-title style="color: #000000">
              <v-icon>library_books</v-icon>
              Innovation Form
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout()">
            <v-list-item-title>
              <v-icon>logout</v-icon>
              Logout
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script>
import FileMixin from "../../mixins/FileMixin";
import RouterMixin from "@/packages/cassandra-base/mixins/RouterMixin";
import AppMenuNav from "./AppMenuNav.vue";
export default {
  mixins: [FileMixin, RouterMixin],
  components: { AppMenuNav },
  data: () => ({
    menu: null,
    menu2: null,
    linkMenu: null,
    company: process.env.VUE_APP_COMPANY,
    url: process.env.VUE_APP_TEMP_URL,
  }),
  mounted() {
    if (this.isEmployee) {
      this.$store.dispatch("profile/getEmployee", {
        number: this.$store.getters["auth/user"].employee,
      });
      this.$store.dispatch("Setup/getProfilePic", {
        employeeCode: this.userData.employee,
      });
      this.$store.dispatch("Dashboard/getp9Report", {
        empNo: this.userData.employee,
      });
      this.$store.dispatch("Approvals/getApprovalEntries", {
        approverID: this.userData.employee,
        status: "Open",
      });
      this.$store.dispatch("appraisal/getReviews");
    }
  },
  computed: {
    userData: function () {
      return this.$store.getters["auth/user"];
    },
    isEmployee: function () {
      return this.userData.employee;
    },
    approvals() {
      return this.$store.getters["Approvals/approvalGetters"](
        "approvalEntries"
      );
    },
    emptyColorFill() {
      return {
        radial: false,
        colors: [
          {
            color: this.vuetifyColors.primary,
            offset: "0",
            opacity: "0.3",
          },
          {
            color: this.vuetifyColors.secondary,
            offset: "100",
            opacity: "0.3",
          },
        ],
      };
    },
    profilePicture: function () {
      return this.$store.getters["Setup/setupGetter"]("profilePicture");
    },
    employeeData: function () {
      const employee = this.$store.getters["profile/employee"][0];
      return employee || {};
    },
    vuetifyColors: function () {
      return this.$vuetify.theme.themes.light;
    },
    p9Report() {
      return this.$store.getters["Dashboard/p9Report"];
    },
    reviews() {
      return this.$store.getters["appraisal/reviews"].filter((item) => {
        item.tooltip = "Click to view";
        return item.documentStatus === "Reviewed";
      });
    },
    notifications() {
      return this.reviews.length;
    },
    mini() {
      return this.$store.getters["Dashboard/mini"];
    },
  },
  methods: {
    raiseRequisition() {
      this.$router.push({
        name: "RequisitionList",
        params: {
          documentType: btoa("Purchase Requisition"),
        },
      });
    },
    logout: function () {
      this.$store.dispatch("auth/logout");
    },
    setMiniDrawer: function () {
      this.$store.dispatch("Dashboard/setMiniDrawer", !this.mini);
    },
    getInititals(name) {
      if (!name) return "";
      const names = name.split(" ");
      const initials =
        names.length > 1
          ? names[0].substring(0, 1) + names[1].substring(0, 1)
          : names[0].substring(0, 1);
      return initials;
    },
    viewApproval(item) {
      const RecHeader = item.recordToApprove.split(":")[0];
      console.log(RecHeader);
      if (RecHeader !== "Emp. Perf. Application Header") {
        this.$router.push({
          name: "ApprovalCard",
          params: {
            documentNo: btoa(item.documentNo),
            approverID: btoa(item.approverID),
          },
        });
      } else {
        this.$router.push({
          name: "AppraisalApprovalCard",
          params: {
            documentNo: btoa(item.documentNo),
          },
        });
      }
    },
  },
};
</script>
<style>
@import "../styles.css";
</style>
