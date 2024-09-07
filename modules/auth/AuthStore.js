import constants from "./AuthConstants";
import call from "../../service/http";
import AuthService from "./AuthService.js";
import AuthOTPStore from "./AuthOTPStore";

export default {
  namespaced: true,
  modules: {
    otp: AuthOTPStore,
  },
  state: {
    company: {},
    companies: [],
  },
  mutations: {
    MUTATE: (state, payload) => {
      state[payload.state] = payload.data;
    },
  },
  getters: {
    token: (state) => AuthService.token,
    user: (state) => AuthService.user,
    company: (state) => state.company,
    companies: (state) => state.companies,
  },
  actions: {
    login: (context, data) => {
      context.commit("loader/SET_LOADING", true, { root: true });
      call("post", constants.login, data)
        .then((res) => {
          context.commit("loader/SET_LOADING", false, { root: true });
          if (res.data.data.token) {
            AuthService.login(res.data.data);
            Event.$emit("ApiSuccess", " logging in");
          } else {
            AuthService.setUserOTP(res.data.data);
            Event.$emit("navigateToOTP");
          }
        })
        .catch((error) => {
          Event.$emit("ApiError", error.response.data.message);
          context.commit("loader/SET_LOADING", false, { root: true });
        });
    },
    windowsLogin: (context, data) => {
      context.commit("loader/SET_LOADING", true, { root: true });
      call("post", constants.windowsLogin, data)
        .then((res) => {
          context.commit("loader/SET_LOADING", false, { root: true });
          AuthService.login(res.data.data);
          Event.$emit("ApiSuccess", " logging in");
        })
        .catch((error) => {
          Event.$emit("ApiError", error.response.data.message);
          context.commit("loader/SET_LOADING", false, { root: true });
        });
    },
    sendLink: (context, data) => {
      context.commit("loader/SET_LOADING", true, { root: true });
      call("post", constants.resetPassword, data)
        .then((res) => {
          Event.$emit(
            "ApiSuccess",
            res.data.message + " Check email to reset your password"
          );
          context.commit("loader/SET_LOADING", false, { root: true });
        })
        .catch((error) => {
          Event.$emit("ApiError", error.response.data.message);
          context.commit("loader/SET_LOADING", false, { root: true });
        });
    },
    requestCredentials: (context, data) => {
      context.commit("loader/SET_LOADING", true, { root: true });
      call("post", constants.requestCredentials, data)
        .then((res) => {
          res.data === null
            ? Event.$emit("ApiWarning", res.data.message)
            : Event.$emit(
                "ApiSuccess",
                res.data.message + " Check your email to set your password"
              );
          context.commit("loader/SET_LOADING", false, { root: true });
        })
        .catch((error) => {
          Event.$emit("ApiError", error.response.data.message);
          context.commit("loader/SET_LOADING", false, { root: true });
        });
    },
    setPassword: (context, data) => {
      context.commit("loader/SET_LOADING", true, { root: true });
      call("post", constants.setPassword, data)
        .then((res) => {
          Event.$emit("ApiSuccess", res.data.message);
          context.commit("loader/SET_LOADING", false, { root: true });
          setTimeout(() => {
            AuthService.login(res.data.data);
          }, 500);
        })
        .catch(() => {
          Event.$emit("ApiError", "User account not set");
          context.commit("loader/SET_LOADING", false, { root: true });
        });
    },
    logout: (context) => {
      call("post", constants.logout).then(() => {
        AuthService.logout();
      });
    },
    company: ({ commit, dispatch }) => {
      commit("loader/SET_LOADING", true, { root: true });
      call("get", constants.company)
        .then((res) => {
          commit("MUTATE", { state: "company", data: res.data.data });
          commit("loader/SET_LOADING", false, { root: true });
        })
        .catch(() => {
          Event.$emit("ApiError", "Failed To fetch company info");
          commit("loader/SET_LOADING", false, { root: true });
        });
    },
    getCompanies: ({ commit }) => {
      commit("loader/SET_LOADING", true, { root: true });
      call("get", constants.companies)
        .then((res) => {
          commit("MUTATE", { state: "companies", data: res.data.data });
          commit("loader/SET_LOADING", false, { root: true });
        })
        .catch(() => {
          Event.$emit("ApiError", "Failed To fetch companies info");
          commit("loader/SET_LOADING", false, { root: true });
        });
    },
    setDefaultCompany: ({ commit }, data) => {
      commit(
        "loader/SET_SWITCH_COMPANY",
        { switch: true, selectedCompany: data },
        { root: true }
      );
      call("post", constants.setCompany, { default_company: data.id })
        .then((res) => {
          AuthService.setUser(res.data.data);
          commit(
            "loader/SET_SWITCH_COMPANY",
            { switch: false, selectedCompany: {} },
            { root: true }
          );
        })
        .catch((error) => {
          Event.$emit("ApiError", error.response.data.message);
          commit(
            "loader/SET_SWITCH_COMPANY",
            { switch: false, selectedCompany: {} },
            { root: true }
          );
        });
    },
  },
};
