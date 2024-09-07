import appAlert from "./appAlert";

const alertPlugin = {
  install(Vue) {
    Vue.component("app-alert", appAlert);
    Vue.prototype.$alertInfo = (params) => {
      Event.$emit("show-app-alert", params);
    };
  },
};

export default alertPlugin;
