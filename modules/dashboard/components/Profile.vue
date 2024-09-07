<template>
  <v-card class="mx-auto mb-2" flat>
    <v-card-title>
      <v-spacer></v-spacer>
      <div class="d-flex justify-end">
        <v-btn
          class="mr-2 text-capitalize blue-grey text--darken-4"
          elevation="0"
          dark
          v-if="showContract"
          @click="contracts"
        >
          <v-icon class="mx-3">description</v-icon>
          View Contract
        </v-btn>
        <v-btn
          class="pa-2 mr-2 text-capitalize primary lighten-5 primary--text text--darken-4 mx-2"
          elevation="0"
          :disabled="position.length === 0"
          @click="jobDesc"
        >
          <v-icon class="mx-3">work_outline</v-icon>
          View Job Description
        </v-btn>
        <v-btn
          color="primary"
          class="mr-2 text-capitalize"
          @click="changeView('IssuedItems')"
          v-if="showItems"
        >
          View Issued items
        </v-btn>
      </div>
    </v-card-title>

    <v-card-text class="mt-n5">
      <v-row>
        <v-col cols="12" md="2">
          <v-badge
            bottom
            bordered
            color="success"
            style="margin-bottom: 0"
            icon="mdi-check"
            offset-x="37"
            offset-y="37"
          >
            <v-avatar size="150">
              <v-img
                :src="
                  profilePicture !== ''
                    ? `data:application/jpg;base64,${profilePicture}`
                    : getUserImage()
                "
              ></v-img>
            </v-avatar>
          </v-badge>
        </v-col>
        <v-col cols="12" md="4">
          <v-list-item class="mt-n1">
            <v-list-item-content>
              <v-list-item-title
                class="text-lg-h5 font-weight-bold"
                v-if="employee"
              >
                {{ getEmployeeName(employee) }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-lg-h5 black--text">
                {{ employee.job_title }}
                <v-chip
                  small
                  class="text-body-2 mx-2 green lighten-4 green--text text--darken-4"
                >
                  {{ employee.is_approver ? "Approver" : "Employee"
                  }}<v-icon
                    color="blue"
                    v-if="employee.is_approver"
                    class="mx-1"
                    >verified</v-icon
                  ></v-chip
                >
              </v-list-item-subtitle>
              <v-chip small label class="my-1">
                <v-icon class="mr-2">email</v-icon>
                {{ employee.email }}
              </v-chip>
              <v-chip small label class="my-1">
                <span class="mr-2">Employment Date:</span>
                {{ formatDate(employee.employment_date) }}
              </v-chip>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-divider vertical inset />
        <v-col cols="12" md="3">
          <v-list-item class="mt-3">
            <v-list-item-content>
              <v-chip small label class="mt-5">
                <v-icon class="mr-2">phone</v-icon>
                {{ employee.phone_no }}
              </v-chip>
              <v-chip small label class="my-1">
                <span class="mr-2">Staff No:</span>
                {{ employee.number }}
              </v-chip>
              <v-chip small label class="my-1">
                <span class="mr-2">Department:</span>
                {{ employee.jobTitle }}
              </v-chip>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-divider vertical inset />
        <v-col cols="12" md="3">
          <v-list-item class="mt-3">
            <v-list-item-content>
              <v-chip small label class="mt-5" v-if="employee.gender">
                Gender:
                <v-icon>{{ genderIcon(employee.gender) }}</v-icon>
                {{ employee.gender }}
              </v-chip>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import { helper } from "@kinetics254/cassandra-base/utilities";
export default {
  name: "Profile",
  props: {
    employee: {
      type: Object,
      default: () => {},
    },
    profilePicture: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      tab: null,
    };
  },
  computed: {
    hrEmployee() {
      return this.$store.getters["Setup/setupGetters"]("hrEmployee");
    },
    position() {
      return this.employees ? this.hrEmployee[0].position : "";
    },
    showItems() {
      return process.env.VUE_APP_SHOW_ITEMS === "true";
    },
    showContract() {
      return process.env.VUE_APP_SHOW_CONTRACT === "true";
    },
  },
  methods: {
    getEmployeeName(employee) {
      return employee.full_name
        ? employee.full_name
        : `${employee.first_name} ${employee.middle_name} ${employee.last_name}`;
    },
    jobDesc() {
      this.$router.push({
        name: "jobDescription",
        params: { position: this.position },
      });
    },
    contracts() {
      this.$router.push({
        name: "Contract",
      });
    },
    getUserImage() {
      return require("../../../assets/user.png");
    },
    formatDate(date) {
      return helper.getDateFormat(date);
    },
    genderIcon(gender) {
      if (gender === " ") {
        return "agender";
      } else if (gender.toLowerCase() === "male") {
        return "male";
      } else {
        return "female";
      }
    },
    changeView(item) {
      Event.$emit("changeComponent", item);
    },
  },
};
</script>
