<template>
  <v-row>
    <v-col cols="12" md="3">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <div v-on="on" v-bind="attrs">
            <v-switch
              v-model="formData.multiple_currency"
              label="Multiple Currency"
              inset
              dense
            />
          </div>
        </template>
        <span>Cash Management Multiple Currency</span>
      </v-tooltip>
    </v-col>
    <v-col cols="12" md="3">
      <v-text-field
        v-model="formData.default_currency_caption"
        label="Default Currency Caption"
        dense
        outlined
        clearable
        hint="Default Currency Caption"
      />
    </v-col>
    <v-col cols="12" md="3">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <div v-on="on" v-bind="attrs">
            <v-switch
              v-model="formData.show_budget_balances"
              label="Show Budget Balances"
              inset
              dense
            />
          </div>
        </template>
        <span>Show Budget Balances</span>
      </v-tooltip>
    </v-col>
    <v-col cols="12" md="3">
      <v-text-field
        v-model="formData.cashmgt_save_caption"
        label="Cash Management Save Caption"
        dense
        outlined
        clearable
        hint="Cash Management Save Caption"
      />
    </v-col>
    <v-col cols="12" md="3">
      <v-text-field
        v-model="formData.imprest_travel_request_lock_days"
        label="Imprest Travel Request Lock Days"
        dense
        outlined
        clearable
        type="number"
        hint="Imprest Travel Request Lock Days"
      />
    </v-col>
    <v-col cols="12" md="4">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <div v-on="on" v-bind="attrs">
            <v-switch
              v-model="formData.is_training_imprest_fields"
              label="Show Training Imprest Fields"
              inset
              dense
            />
          </div>
        </template>
        <span>Show Training Imprest Fields</span>
      </v-tooltip>
    </v-col>
    <v-col cols="12" md="3">
      <v-autocomplete
        dense
        outlined
        :items="trainingMethods"
        v-model="formData.training_methods"
        label="Training Methods"
        multiple
        clearable
        hint="Training Methods"
        :item-text="(item) => item.text"
        :item-value="(item) => item.value"
      >
        <template v-slot:selection="data">
          <v-chip
            v-bind="data.attrs"
            :input-value="data.selected"
            close
            @click="data.select"
            @click:close="remove(data.item)"
          >
            {{ data.item.text }}
          </v-chip>
        </template>
      </v-autocomplete>
    </v-col>
    <v-col cols="12" md="3">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <div v-on="on" v-bind="attrs">
            <v-switch
              v-model="formData.showReqVendor"
              label="Show Requisition Vendor"
              inset
              dense
            />
          </div>
        </template>
        <span>Show Requisition Vendor</span>
      </v-tooltip>
    </v-col>
    <v-col cols="12" md="3">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <div v-on="on" v-bind="attrs">
            <v-switch
              v-model="formData.showReqDueDate"
              label="Show Requisition Due Date"
              inset
              dense
            />
          </div>
        </template>
        <span>Show Requisition Due Date</span>
      </v-tooltip>
    </v-col>
    <v-col cols="12" md="3">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <div v-on="on" v-bind="attrs">
            <v-switch
              v-model="formData.showReqCategory"
              label="Show Requisition Item Category"
              inset
              dense
            />
          </div>
        </template>
        <span>Show Requisition Item Category</span>
      </v-tooltip>
    </v-col>
    <v-col cols="12" md="12" class="mt-n3">
      <div class="text-body-1 font-weight-bold">
        Cash Management Actions Position
      </div>
      <v-radio-group
        v-model="formData.cashmgt_actions_position"
        row
        class="mt-n2 ml-n3"
      >
        <v-col cols="12" md="6">
          <v-sheet
            outlined
            class="mx-2"
            :color="
              formData.cashmgt_actions_position === 'top' ? 'success' : ''
            "
            rounded
          >
            <v-card
              @click="formData.cashmgt_actions_position = 'top'"
              style="cursor: pointer"
            >
              <v-card-text>
                <v-radio value="top" class="mb-2">
                  <template v-slot:label> Top </template>
                </v-radio>
                <v-card elevation="1">
                  <v-card-actions>
                    <v-btn small width="50" elevation="0" disabled></v-btn>
                    <v-spacer />
                    <v-btn
                      small
                      width="50"
                      class="mx-2"
                      elevation="0"
                      disabled
                    ></v-btn>
                    <v-btn
                      small
                      width="50"
                      class="mx-2"
                      elevation="0"
                      disabled
                    ></v-btn>
                    <v-btn
                      small
                      width="50"
                      class="mx-2"
                      elevation="0"
                      disabled
                    ></v-btn>
                  </v-card-actions>
                  <v-card-text class="mb-n2">
                    <v-btn x-small block rounded elevation="0" disabled></v-btn>
                    <v-btn
                      x-small
                      block
                      rounded
                      class="my-1"
                      elevation="0"
                      disabled
                    ></v-btn>
                  </v-card-text>
                </v-card>
              </v-card-text>
            </v-card>
          </v-sheet>
        </v-col>
        <v-col cols="12" md="6" class="mb-2">
          <v-sheet
            outlined
            class="mx-2"
            :color="
              formData.cashmgt_actions_position === 'bottom' ? 'success' : ''
            "
            rounded
          >
            <v-card
              @click="formData.cashmgt_actions_position = 'bottom'"
              style="cursor: pointer"
            >
              <v-card-text>
                <v-radio value="bottom" class="mb-2">
                  <template v-slot:label> Bottom </template>
                </v-radio>
                <v-card>
                  <v-card-text class="mb-n2">
                    <v-btn x-small block rounded elevation="0" disabled></v-btn>
                    <v-btn
                      x-small
                      block
                      rounded
                      class="my-1"
                      elevation="0"
                      disabled
                    ></v-btn>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn small width="50" elevation="0" disabled></v-btn>
                    <v-spacer />
                    <v-btn
                      small
                      width="50"
                      class="mx-2"
                      elevation="0"
                      disabled
                    ></v-btn>
                    <v-btn
                      small
                      width="50"
                      class="mx-2"
                      elevation="0"
                      disabled
                    ></v-btn>
                    <v-btn
                      small
                      width="50"
                      class="mx-2"
                      elevation="0"
                      disabled
                    ></v-btn>
                  </v-card-actions>
                </v-card>
              </v-card-text>
            </v-card>
          </v-sheet>
        </v-col>
      </v-radio-group>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "CachmgtSettings",
  props: {
    cashmgt_settings: {
      type: Object,
      default: function () {
        return {
          multiple_currency: false,
          imprest_travel_request_lock_days: 0,
          show_budget_balances: false,
          cashmgt_actions_position: "top",
          showReqVendor: true,
          showReqDueDate: true,
          showReqCategory: true,
          cashmgt_save_caption: "",
          is_training_imprest_fields: false,
          default_currency_caption: "KES",
          training_methods: [],
        };
      },
    },
  },
  data: function () {
    return {
      attrs: {
        boilerplate: true,
        elevation: 2,
      },
      trainingMethods: [
        { text: "Virtual", value: "Virtual" },
        { text: "Physical", value: "Physical" },
        { text: "Hybrid", value: "Hybrid" },
      ],
    };
  },
  computed: {
    formData: {
      get() {
        return this.cashmgt_settings;
      },
      set(value) {
        this.$emit("update:settingsFormData.cashmgt_settings", value);
      },
    },
  },
};
</script>
