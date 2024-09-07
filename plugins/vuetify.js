import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: "#00448B",
        secondary: "#27ae60",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
        drawerColor: "#22335E",
        drawerSecondaryColor: "#2C3E50",
      },
    },
  },
  icons: {
    iconfont: "md",
  },
});
