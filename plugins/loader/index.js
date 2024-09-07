import Spinner from "./views/Spinner";
import store from "./store";

export default {
  install(Vue, options) {
    options.store.registerModule("loader", store);

    Vue.component("loader", Spinner);
    Vue.mixin({
      mounted() {
        Event.$on("loading", (state) => {
          this.$store.commit("loader/SET_LOADING", state);
        });
      },
    });
  },
};
