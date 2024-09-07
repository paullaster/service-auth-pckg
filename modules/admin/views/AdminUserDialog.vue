<template>
  <v-dialog v-model="dialog" persistent width="60%">
    <v-card class="mx-auto">
      <v-card-title>
        <span class="headline">Update User Details</span>
        <v-spacer />
        <v-btn icon color="red" @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-form ref="userForm" v-model="isValid">
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="userFormData.name"
                  :rules="[rules.required]"
                  label="User Name"
                  dense
                  outlined
                  clearable
                  prepend-inner-icon="mdi-account"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="userFormData.email"
                  :rules="[rules.email, rules.required]"
                  label="User Email"
                  dense
                  outlined
                  prepend-inner-icon="mdi-email"
                  clearable
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-autocomplete
                  v-model="userFormData.employee"
                  :items="employees"
                  :item-text="(item) => `${item.first_name} - ${item.number}`"
                  :item-value="(item) => item.number"
                  :rules="[rules.required]"
                  label="Employee Number"
                  dense
                  outlined
                  clearable
                  prepend-inner-icon="mdi-account"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-autocomplete
                  v-model="userFormData.default_company"
                  :items="companies"
                  :item-text="(item) => `${item.name}`"
                  :item-value="(item) => item.id"
                  :rules="[rules.required]"
                  label="Default Company"
                  dense
                  outlined
                  clearable
                  prepend-inner-icon="mdi-account"
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-autocomplete
                  v-model="userFormData.gender"
                  :items="['Male', 'Female', 'Other']"
                  label="Gender"
                  dense
                  outlined
                  clearable
                  prepend-inner-icon="mdi-account"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          @click="saveUser"
          :disabled="$store.getters['loader/loading']"
          :loading="$store.getters['loader/loading']"
          >Save</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "AdminUserDialog",
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    Event.$on("close-dialog", () => {
      this.close();
    });
  },
  data: function () {
    return {
      isValid: false,
      userFormData: {
        name: "",
        email: "",
        default_company: "",
        gender: "",
        employee: "",
      },
    };
  },
  computed: {
    rules() {
      return {
        required: (v) => !!v || "Required.",
        email: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      };
    },
    companies() {
      return this.$store.getters["auth/companies"];
    },
    employees() {
      return this.$store.getters["Setup/setupGetter"]("leaveEmployees");
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    saveUser() {
      if (!this.isValid) {
        this.$refs.userForm.validate();
      } else {
        this.$confirm.show({
          title: "Update User",
          text: "Are you sure you want to update this user?",
          onConfirm: () => {
            this.$store.dispatch("Admin/updateUser", { ...this.userFormData });
          },
        });
      }
    },
  },
  watch: {
    user: {
      handler: function (val) {
        this.userFormData = val;
      },
      deep: true,
    },
  },
};
</script>
