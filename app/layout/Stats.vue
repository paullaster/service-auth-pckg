<template>
  <v-container fluid grid-list-xl>
    <v-app-bar dense elevation="0" color="transparent">
      <div class="text-lg-h5 ml-n4">My Statistics</div>
      <v-spacer></v-spacer>

      <v-chip class="primary lighten-4 primary--text text--darken-4">
        {{ userData.employee }}
      </v-chip>
    </v-app-bar>
    <div>
      <StatsView :data="allStats"></StatsView>
    </div>
    <v-row>
      <v-col cols="4">
        <v-card class="mt-4">
          <DoughnutChart v-if="doughnutData" :doughnutData="doughnutData" />
        </v-card>
      </v-col>
      <v-col cols="8">
        <div>
          <v-card class="mt-4">
            <MultiDataBarchart :multiData="MultiData" />
          </v-card>
        </div>
      </v-col>
    </v-row>
    <!-- graphs -->
    <!-- custom fields -->
  </v-container>
</template>

<script>
import StatsView from "../../../cassandra-dashboards/Stats/StatsView.vue";
import DoughnutChart from "../../../cassandra-dashboards/Charts/DoughnutChart.vue";
import MultiDataBarchart from "../../../cassandra-dashboards/Charts/MultiDataBarchart.vue";
import helpers from "@kinetics254/cassandra-base/utilities/helpers/helper.js";
import { AuthService } from "@kinetics254/cassandra-base/modules/auth";

export default {
  name: "Stats",
  components: { StatsView, MultiDataBarchart, DoughnutChart },
  data() {
    return {
      show: false,
      months: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    };
  },
  mounted() {
    console.log(this.packages.includes("leave"));
    if (this.packages.includes("Requisition"))
      this.$store.dispatch("Requisition/getRequisitions");
    if (this.packages.includes("imprest"))
      this.$store.dispatch("imprest/getImprests");
    if (this.packages.includes("pettycash"))
      this.$store.dispatch("pettycash/getPettyCash");
    if (this.packages.includes("leave")) this.getApplications();
  },
  computed: {
    packages() {
      return [
        ...new Set(
          Object.keys(this.$store.getters).map((el) => el.split("/")[0])
        ),
      ];
    },
    caption() {
      const user = AuthService.user;
      return user.captions.pettycash_caption;
    },
    userData: function () {
      return this.$store.getters["auth/user"];
    },
    leaveApplications: function () {
      return this.$store.getters["leave/leaveGetter"]
        ? this.$store.getters["leave/leaveGetter"]("applications")
        : [];
    },
    requisitions: function () {
      return this.$store.getters["Requisition/reqGetters"]
        ? this.$store.getters["Requisition/reqGetters"]("requisitions")
        : [];
    },
    pettycash: function () {
      return this.$store.getters["pettycash/pettycashstate"]
        ? this.$store.getters["pettycash/pettycashstate"]("pettycash")
        : [];
    },
    imprest: function () {
      return this.$store.getters["imprest/imprests"]
        ? this.$store.getters["imprest/imprests"]
        : [];
    },
    allStats: function () {
      return [
        {
          count: this.leaveApplications ? this.leaveApplications.length : 0,
          name: "Leave Applications",
          avatarColor: "light-blue lighten-4",
          iconColor: "light-blue darken-4",
          icon: "ti-calendar",
          routePath: "/leave/application",
        },
        {
          count: this.imprest ? this.imprest.length : 0,
          name: "Imprest Requests",
          avatarColor: "teal accent-2",
          iconColor: "teal darken-4",
          icon: "ti-money",
          routePath:
            this.packages.filter((el) => el === "imprest").length !== 0
              ? "/imprest/dashboard"
              : "",
        },
        {
          count: this.requisition ? this.requisition.length : 0,
          name: "Requisition Requests",
          avatarColor: "amber accent-2",
          iconColor: "amber darken-4",
          icon: "all_inbox",
          routePath:
            this.packages.filter((el) => el === "Requisition").length !== 0
              ? "/requisition/reqDashboard"
              : "",
        },
        {
          count: this.pettycash ? this.pettycash.length : [],
          name: `${this.caption ? this.caption : "Petty Cash"} Requests`,
          avatarColor: "indigo accent-2",
          iconColor: "indigo darken-4",
          icon: "payments",
          routePath:
            this.packages.filter((el) => el === "pettycash").length !== 0
              ? "/pettycash/list"
              : "",
        },
      ];
    },
    ReqStats() {
      return this.requisitions;
    },
    ImprestStats() {
      return this.imprest;
    },
    LeaveStats() {
      return this.leaveApplications;
    },
    pettyCashStats() {
      return this.pettycash;
    },
    pieData() {
      return {
        labels: ["Leave", "Requisitions", "Imprests", "Petty Cash"],
        data: [
          this.leaveApplications.length,
          this.requisitions.length,
          this.imprest.length,
          this.pettycash.length,
        ],
        title: "All Statistics",
        backgroundColor: ["Requisitions", "Open", "Pending"].map((el) =>
          helpers.stringToColour(el)
        ),
      };
    },
    doughnutData() {
      return {
        labels: ["Leave", "Requisitions", "Imprests", "Petty Cash"],
        data: [
          this.leaveApplications.length,
          this.requisitions.length,
          this.imprest.length,
          this.pettycash.length,
        ],
        title: "All Statistics",
        backgroundColor: ["Requisitions", "Open", "Pending"].map((el) =>
          helpers.stringToColour(el)
        ),
      };
    },
    MultiData() {
      return {
        labels: this.months,
        data: {
          reqData: this.months.map((el, index) => {
            return this.ReqStats.filter(
              (item) => new Date(item.postingDate).getMonth() === index
            ).length;
          }),
          reqAmount: this.months.map((el, index) => {
            return this.ReqStats.filter(
              (item) => new Date(item.orderDate).getMonth() === index
            ).reduce(function (a, b) {
              return parseInt(a) + parseInt(b.amount);
            }, 0);
          }),
          imprestData: this.months.map((el, index) => {
            return this.ImprestStats.filter(
              (item) => new Date(item.postingDate).getMonth() === index
            ).length;
          }),
          imprestAmount: this.months.map((el, index) => {
            return this.ImprestStats.filter(
              (item) => new Date(item.postingDate).getMonth() === index
            ).reduce(function (a, b) {
              return parseInt(a) + parseInt(b.amountToPayHeader);
            }, 0);
          }),
          pettyCashData: this.months.map((el, index) => {
            return this.pettyCashStats.filter(
              (item) => new Date(item.document_date).getMonth() === index
            ).length;
          }),
          pettyCashAmount: this.months.map((el, index) => {
            return this.pettyCashStats
              .filter(
                (item) => new Date(item.document_date).getMonth() === index
              )
              .reduce(function (a, b) {
                return parseInt(a) + parseInt(b.totalAmount);
              }, 0);
          }),
          leaveData: this.months.map((el, index) => {
            return this.LeaveStats.filter(
              (item) => new Date(item.application_date).getMonth() === index
            ).length;
          }),
        },
      };
    },
  },
  methods: {
    getApplications: function () {
      const employeeNo = this.userData.employee;
      const data = { employeeNo };
      setTimeout(() => {
        this.$store.dispatch("leave/getApplications", data);
      }, 1000);
    },
  },
};
</script>

<style scoped>
@media (min-width: 960px) {
  .flex.md3.lg3-custom {
    width: calc(100% / 3);
    max-width: calc(100% / 3);
    flex-basis: calc(100% / 3);
  }
}
</style>
