<template>
  <v-overlay absolute color="#EBF5FB" opacity="1.0">
    <div>
      <div class="d-flex flex-column my-4">
        <div class="align-self-center">
          <div class="text--primary text-body-1">Switching Companies</div>
        </div>
      </div>
      <div class="d-flex flex-row">
        <div class="align-self-start mx-3">
          <v-badge
            :content="company.displayName[0]"
            bottom
            overlap
            offset-x="20"
            offset-y="20"
          >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-avatar
                  color="blue lighten-4"
                  size="90"
                  v-on="on"
                  v-bind="attrs"
                >
                  <v-img
                    :src="`data:application/jpg;base64,${company.base64Logo}`"
                    contain
                  />
                </v-avatar>
              </template>
              <span class="text--primary text-body-1">
                {{ company.displayName }}
              </span>
            </v-tooltip>
          </v-badge>
        </div>
        <div class="align-self-center">
          <CirclesToRhombusesSpinner
            :animation-duration="1200"
            :circles-num="4"
            :circle-size="15"
            color="#087F23"
          />
        </div>
        <div class="align-self-end mx-4">
          <v-badge
            :content="selectedCompany.name[0]"
            bottom
            overlap
            offset-x="20"
            offset-y="20"
          >
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-avatar
                  color="blue darken-4"
                  size="90"
                  v-on="on"
                  v-bind="attrs"
                >
                  <span class="text-uppercase">{{
                    selectedCompany.name[0] + selectedCompany.name[1]
                  }}</span>
                </v-avatar>
              </template>
              <div class="text--primary text-body-1">
                {{ selectedCompany.displayName }}
              </div>
            </v-tooltip>
          </v-badge>
        </div>
      </div>
    </div>
  </v-overlay>
</template>

<script>
import { CirclesToRhombusesSpinner } from "epic-spinners";
export default {
  name: "Switcher",
  components: { CirclesToRhombusesSpinner },
  computed: {
    company() {
      return this.$store.getters["auth/company"];
    },
    selectedCompany() {
      return this.$store.getters["loader/selectedCompany"];
    },
  },
};
</script>

<style scoped></style>
