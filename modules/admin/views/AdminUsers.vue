<template>
  <v-container fluid>
    <v-card flat class="mx-auto users--top">
      <v-card-title>
        <span>All Users</span>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          class="mx-3"
          dense
          single-line
          hide-details
        />
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="users"
          :search="search"
          class="elevation-0 users--table"
        >
          <template v-slot:item.default_company="{ item }">
            <span class="text-body-2">
              {{ getCompany(item) }}
            </span>
          </template>
          <template v-slot:item.email_verified_at="{ item }">
            <v-chip
              label
              :color="
                item.email_verified_at ? 'green lighten-4' : 'red lighten-4'
              "
            >
              <v-icon v-if="item.email_verified_at" color="green"
                >mdi-check</v-icon
              >
              <v-icon v-else color="red">mdi-close</v-icon>
              <span
                :class="
                  item.email_verified_at
                    ? 'green--text text--darken-4'
                    : 'red--text text--darken-4'
                "
                >{{
                  item.email_verified_at ? "Verified" : "Not Verified"
                }}</span
              >
            </v-chip>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-btn
              small
              class="mr-2 primary text-capitalize"
              @click="editItem(item)"
            >
              <v-icon small> mdi-pencil </v-icon>
              edit
            </v-btn>
            <v-btn
              class="error text-capitalize"
              small
              v-if="!item.is_admin && !item.is_approver"
              @click="deleteItem(item)"
            >
              <v-icon small> mdi-delete </v-icon>
              delete
            </v-btn>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <AdminUserDialog :dialog="dialog" :user="user" @close="closeDialog" />
  </v-container>
</template>
<script>
import AdminUserDialog from "./AdminUserDialog.vue";
export default {
  name: "AdminUsers",
  components: {
    AdminUserDialog,
  },
  data() {
    return {
      dialog: false,
      user: {},
      search: "",
    };
  },
  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.$store.dispatch("Admin/getUsers");
    });
  },
  computed: {
    users() {
      return this.$store.getters["Admin/adminGetters"]("users");
    },
    settings() {
      return this.$store.getters["Admin/adminGetters"]("settings");
    },
    companies() {
      return this.$store.getters["auth/companies"];
    },
    headers() {
      return [
        {
          text: "Name",
          value: "name",
        },
        {
          text: "Email",
          value: "email",
        },
        {
          text: "email Verified",
          value: "email_verified_at",
        },
        {
          text: "employee Number",
          value: "employee",
        },
        {
          text: "Gender",
          value: "gender",
        },
        {
          text: "Default Company",
          value: "default_company",
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
        },
      ];
    },
  },
  methods: {
    editItem(item) {
      this.dialog = true;
      this.user = item;
    },
    deleteItem(item) {
      this.$confirm.show({
        title: "Delete User?",
        text: "Are you sure you want to delete this user? This action is irreversible.",
        onConfirm: () => {
          this.$store.dispatch("Admin/deleteUser", item);
        },
      });
    },
    closeDialog() {
      this.dialog = false;
      this.user = {};
    },
    getCompany(user) {
      let company = this.companies.find((c) => c.id == user.default_company);
      return company ? company.name : "No Company";
    },
  },
};
</script>
<style>
/**.users--table {
  height: 60vh;
  overflow-y: scroll;
}*/
.users--top > .v-card__title {
  position: sticky;
  top: 0;
  z-index: 1;
  background: white;
}
</style>
