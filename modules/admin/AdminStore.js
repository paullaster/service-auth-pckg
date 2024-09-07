import AdminConstants from "./AdminConstants";
import call from "../../service/http";

export default {
  namespaced: true,
  state: {
    settings: {},
    users: [],
  },
  mutations: {
    MUTATE: (state, payload) => {
      state[payload.state] = payload.data;
    },
  },
  getters: {
    adminGetters: (state) => (val) => state[val],
    settings: (state) => state.settings,
  },
  actions: {
    getSettings: ({ commit }) => {
      call("get", AdminConstants.admin_settings)
        .then((res) => {
          commit("MUTATE", { state: "settings", data: res.data.data });
        })
        .catch((error) => {
          Event.$emit("ApiError", error.response.data.message);
        });
    },
    addSettings: ({ commit, dispatch }, payload) => {
      commit("loader/SET_LOADING", true, { root: true });
      call("post", AdminConstants.admin_settings, payload)
        .then((res) => {
          commit("loader/SET_LOADING", false, { root: true });
          dispatch("getSettings");
        })
        .catch((error) => {
          Event.$emit("ApiError", error.response.data.message);
          commit("loader/SET_LOADING", false, { root: true });
        });
    },
    updateSettings: ({ commit, dispatch }, payload) => {
      commit("loader/SET_LOADING", true, { root: true });
      call("post", AdminConstants.update_settings, payload)
        .then((res) => {
          commit("loader/SET_LOADING", false, { root: true });
          dispatch("getSettings");
        })
        .catch((error) => {
          Event.$emit("ApiError", error.response.data.message);
          commit("loader/SET_LOADING", false, { root: true });
        });
    },
    getUsers: ({ commit }, page) => {
      commit("loader/SET_LOADING", true, { root: true });
      call("get", AdminConstants.user_settings)
        .then((res) => {
          commit("loader/SET_LOADING", false, { root: true });
          commit("MUTATE", { state: "users", data: res.data.data });
        })
        .catch((error) => {
          commit("loader/SET_LOADING", false, { root: true });
          Event.$emit("ApiError", error.response.data.message);
        });
    },
    updateUser: ({ commit, dispatch }, payload) => {
      commit("loader/SET_LOADING", true, { root: true });
      call("post", AdminConstants.update_user(payload.id), payload)
        .then((res) => {
          commit("loader/SET_LOADING", false, { root: true });
          dispatch("getUsers");
          Event.$emit("close-dialog");
        })
        .catch((error) => {
          Event.$emit("ApiError", error.response.data.message);
          commit("loader/SET_LOADING", false, { root: true });
        });
    },
    deleteUser: ({ commit, dispatch }, payload) => {
      commit("loader/SET_LOADING", true, { root: true });
      call("post", AdminConstants.delete_user(payload.id), payload)
        .then((res) => {
          commit("loader/SET_LOADING", false, { root: true });
          dispatch("getUsers");
        })
        .catch((error) => {
          Event.$emit("ApiError", error.response.data.message);
          commit("loader/SET_LOADING", false, { root: true });
        });
    },
    sendActivationLink: ({ commit, dispatch }, payload) => {
      commit("loader/SET_LOADING", true, { root: true });
      call("post", AdminConstants.send_activation_link, payload)
        .then((res) => {
          commit("loader/SET_LOADING", false, { root: true });
          dispatch("getUsers");
        })
        .catch((error) => {
          Event.$emit("ApiError", error.response.data.message);
          commit("loader/SET_LOADING", false, { root: true });
        });
    },
  },
};
