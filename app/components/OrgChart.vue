<template>
  <div>
    <div id="add_buttons">
      <v-btn
        icon
        large
        style="float: right"
        color="blue accent-4"
        @click="getChart()"
      >
        <v-icon>autorenew</v-icon>
      </v-btn>
    </div>
    <div id="tree" ref="tree"></div>
  </div>
</template>
<style>
html,
body {
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100%;
  font-family: Helvetica;
  overflow: hidden;
}
#tree {
  width: 100%;
  height: 100%;
}
</style>
<script>
export default {
  name: "OrgChart",
  components: {},
  data: () => ({}),
  computed: {
    loading: function () {
      return this.$store.state.loader.loading;
    },
    orgData: function () {
      return this.$store.getters["Dashboard/orgData"];
    },
  },
  watch: {
    orgData() {
      if (this.orgData.length !== 0) {
        this.getChart();
      }
    },
  },
  mounted() {
    this.getChartData();
  },
  created() {},
  methods: {
    getChart: async function () {
      // eslint-disable-next-line no-undef
      OrgChart.templates.ana.field_0 =
        '<text class="field_0"  style="font-size: 20px;" fill="#ffffff" x="125" y="30" text-anchor="middle">{val}</text>';
      // eslint-disable-next-line no-undef
      OrgChart.templates.ana.field_1 =
        '<text class="field_1"  style="font-size: 14px;" fill="#ffffff" x="125" y="50" text-anchor="middle">{val}</text>';
      // eslint-disable-next-line no-undef
      OrgChart.templates.ana.field_2 =
        '<text class="field_2"  style="font-size: 14px;" fill="#ffffff" x="125" y="70" text-anchor="middle">{val}</text>';
      // eslint-disable-next-line no-undef
      OrgChart.templates.ana.field_3 =
        '<text class="field_3"  style="font-size: 14px;" fill="#ffffff" x="125" y="90" text-anchor="middle">{val}</text>';
      // eslint-disable-next-line no-undef
      var chart = new OrgChart(document.getElementById("tree"), {
        template: "ana",
        // sticky: false,
        // eslint-disable-next-line no-undef
        layout: OrgChart.treeLeftOffset,
        // eslint-disable-next-line no-undef
        scaleInitial: OrgChart.match.boundary,
        enableSearch: false,
        nodeBinding: {
          field_0: "name",
          field_1: "title",
          field_2: "phone",
          field_3: "email",
        },
      });
      this.orgData.map((item) => {
        if ("code" in item) {
          chart.add({
            id: item.code,
            pid: item.report_to ? item.report_to : "",
            name: item.description ? item.description : "",
            phone: item.employee_count
              ? `Actual Employees: ${item.employee_count},`
              : "Actual Employees: 0",
            email: item.budgeted
              ? `Budgeted Employees: ${item.budgeted},`
              : "Budgeted Employees: 0",
          });
        }
      });
      // eslint-disable-next-line no-undef
      chart.draw(OrgChart.action.init);
      await this.generateBase64png(chart);
    },
    generateBase64png: function (chart) {
      const svg = chart.getSvg();
      if (typeof window.XMLSerializer !== "undefined") {
        // eslint-disable-next-line no-unused-vars
        var svgData = new XMLSerializer().serializeToString(svg);
      } else if (typeof svg.xml !== "undefined") {
        // eslint-disable-next-line no-unused-vars
        // eslint-disable-next-line no-redeclare
        var svgData = svg.xml;
      }

      const canvas = document.createElement("canvas");
      const svgSize = svg.getBoundingClientRect();
      canvas.width = svgSize.width;
      canvas.height = svgSize.height;
      const ctx = canvas.getContext("2d");

      const img = document.createElement("img");
      img.setAttribute(
        "src",
        "data:image/svg+xml;base64," +
          btoa(unescape(encodeURIComponent(svgData)))
      );

      img.onload = function () {
        ctx.drawImage(img, 0, 0);
        const imgsrc = canvas.toDataURL("image/png");
        send(imgsrc);
      };

      const send = (imgBase64) => {
        // console.log(imgBase64)
        this.sendOrgChart({ base64Picture: /base64,(.+)/.exec(imgBase64)[1] });
      };
    },
    getChartData: function () {
      this.$store.dispatch("Dashboard/getChartData");
    },
    sendOrgChart: function (data) {
      this.$store.dispatch("Dashboard/sendOrgChart", data);
    },
  },
};
</script>
<style scoped></style>
