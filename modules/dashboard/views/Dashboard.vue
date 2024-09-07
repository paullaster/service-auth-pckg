<template>
  <v-container fluid>
    <div v-if="employee.number">
      <Profile
        :employee="employee"
        :profilePicture="profilePicture"
        v-if="employee.number && isEmployee"
      />
      <v-card rounded flat>
        <component :is="view"></component>
        <!-- <Stats /> -->
      </v-card>
    </div>
    <div v-else>
      <v-row>
        <v-col cols="12" md="2">
          <v-skeleton-loader type="avatar">
            <v-skeleton-loader type="image" />
          </v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="4">
          <v-skeleton-loader type="list-item-three-line"></v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="3">
          <v-skeleton-loader type="list-item-three-line"></v-skeleton-loader>
        </v-col>
        <v-col cols="12" md="3">
          <v-skeleton-loader type="list-item-three-line"></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-card flat>
        <v-row>
          <v-col cols="12" md="3">
            <v-skeleton-loader type="action" />
          </v-col>
          <v-col cols="12" md="3">
            <v-skeleton-loader type="action" />
          </v-col>
          <v-col cols="12" md="3">
            <v-skeleton-loader type="action" />
          </v-col>
          <v-col cols="12" md="3">
            <v-skeleton-loader type="action" />
          </v-col>
          <v-col cols="12" md="6">
            <v-skeleton-loader type="card"></v-skeleton-loader>
          </v-col>
          <v-col cols="12" md="6">
            <v-skeleton-loader type="card"></v-skeleton-loader>
          </v-col>
        </v-row>
      </v-card>
    </div>
  </v-container>
</template>
<script>
import Profile from "../components/Profile.vue";
import Stats from "../../../app/layout/Stats.vue";
import IssuedItems from "../components/employeeItems";
export default {
  name: "Dashboard",
  components: {
    Profile,
    Stats,
    IssuedItems,
  },
  data: function () {
    return {
      tab: null,
      view: "",
    };
  },
  beforeRouteEnter(to, from, next) {
    next((v) => {
      if (!v.isEmployee) {
        v.$store.dispatch("profile/getEmployee", {
          User_Name: v.userData.username,
        });
        v.$router.push({
          name: "InventoryDashboard"
        });
      } else {
        v.$store.dispatch("profile/getEmployee", {
          number: v.userData.employee,
        });
      }
      v.$store.dispatch("Setup/getProfilePic", {
        employee_code: v.userData.employee,
      });
      if (v.userData.is_admin) {
        v.$router.push("/admin");
      }
    });
  },
  mounted() {
    if (this.isEmployee) {
      this.view = Stats;
      Event.$on("changeComponent", (view) => (this.view = view));
    }
  },
  computed: {
    userData: function () {
      return this.$store.getters["auth/user"];
    },
    isEmployee: function () {
      return this.userData.employee;
    },
    employeeData: function () {
      return this.$store.getters["profile/employee"];
    },
    employee: function () {
      return this.employeeData[0] || {};
    },
    path: function () {
      return this.$router.currentRoute.meta.breadcrumb;
    },
    profilePicture: function () {
      return this.$store.getters["Setup/setupGetter"]("profilePicture");
    },
  },
  methods: {
    getEmployeeName: function (employee) {
      return `${employee.first_name} ${employee.last_name}`;
    },
  },
};
</script>
<style>
@import url("../styles.css");
</style>
