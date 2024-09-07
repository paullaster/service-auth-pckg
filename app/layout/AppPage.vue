<template>
  <div style="overflow-y: scroll; max-height: 80vh">
    <router-view name="action"></router-view>
    <router-view name="view"></router-view>
    <app-footer />
    <confirmation />
  </div>
</template>
<style>
@import "../styles.css";
</style>
<script>
import AppFooter from "./AppFooter";
import { mapActions } from "vuex";
import Confirmation from "../../plugins/confirmation/Confirmation";
// import Spinner from '../../plugins/loader/views/Spinner'
export default {
  name: "AppPage",
  components: { Confirmation, AppFooter },
  computed: {
    userData: function () {
      return this.$store.getters["auth/user"];
    },
    loading: function () {
      return this.$store.getters["loader/loading"];
    },
  },
  created() {
    this.loadSetup();
  },
  methods: {
    loadSetup: function () {
      this.$store.dispatch("Setup/getLeaveEmployees");
      if (!this.userData.is_admin) {
        this.$store.dispatch("Setup/getHrmisEmployee", this.userData.employee);
      }
      this.$store.dispatch("Setup/getHrmisJobs");
    },
  },
};
</script>

<style scoped>
.router-link-exact-active {
  font-weight: bold;
}
</style>
