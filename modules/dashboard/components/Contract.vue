<template>
  <v-container fluid>
    <v-card>
      <v-card-title>My Contracts</v-card-title>
      <v-flex xs12>
        <v-data-table :headers="headers" :items="contracts" :items-per-page="5">
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.No }}</td>
              <td>{{ item.employeeName }}</td>
              <td>{{ item.employeeNo }}</td>
              <td>{{ item.status }}</td>
              <td v-if="item.status !== 'Declined'">
                <v-btn
                  class="mr-6 white"
                  color="primary"
                  @click="getContract(item.No)"
                  >View</v-btn
                >
                <v-btn
                  v-if="item.status === 'Pending'"
                  class=""
                  color="orange"
                  @click="getContractLetter(item.No)"
                  >Consent</v-btn
                >
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-flex>
    </v-card>
  </v-container>
</template>
<script>
export default {
  name: "Contract",
  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.getContracts();
    });
  },
  computed: {
    headers() {
      return [
        {
          text: "Contract Number",
          align: "start",
          sortable: false,
          value: "No",
        },
        {
          text: "Employee Name",
          align: "start",
          sortable: false,
          value: "employeeName",
        },
        {
          text: "Employee Number",
          align: "start",
          sortable: false,
          value: "employeeNo",
        },
        {
          text: "Status",
          align: "start",
          value: "status",
        },
        {
          text: "Actions",
          value: "actions",
          align: "start",
        },
      ];
    },
    userData() {
      return this.$store.getters["auth/user"];
    },
    contracts() {
      return this.$store.getters["Dashboard/contracts"];
    },
  },
  methods: {
    getContracts() {
      this.$store.dispatch("Dashboard/getContracts", this.userData.employee);
    },
    getContract(contractNo) {
      this.$router.push({
        name: "ContractDocument",
        params: { contractNo: contractNo },
      });
    },
    getContractLetter(contractNo) {
      this.$router.push({
        name: "ContractLetter",
        params: { contractNo: contractNo },
      });
    },
  },
};
</script>
