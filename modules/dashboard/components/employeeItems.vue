<template>
  <v-card>
    <v-card-title>
      <v-btn color="error" text @click="changeView('Stats')">
        <v-icon class="mr-2">mdi-arrow-left</v-icon>
        back
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-data-table :headers="headers" :items="employeeItems">
        <template v-slot:[`item.returnable`]="{ item }">
          <div>
            <v-simple-checkbox
              small
              disabled
              class="shrink mr-2"
              v-model="item.returnable"
            ></v-simple-checkbox>
          </div>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "employeeItems",
  computed: {
    employeeItems() {
      return this.$store.getters["Exit/exitGetters"]("employeeItems");
    },
    headers() {
      return [
        { text: "No", value: "no", align: "center" },
        { text: "Type", value: "type", align: "center" },
        { text: "Description", value: "description", align: "center" },
        { text: "Returnable", value: "returnable", align: "center" },
      ];
    },
  },
  mounted() {
    this.$store.dispatch("Exit/employeeItems");
  },
  methods: {
    changeView(item) {
      Event.$emit("changeComponent", item);
    },
  },
};
</script>
