import constants from "./AuthConstants";
import call from "../../service/http";
import AuthService from "./AuthService.js";

export default {
  state: {
    minutes: 0,
  },
  mutations: {
    MUTATE: (state, payload) => {
      state[payload.state] = payload.data;
    },
  },
  getters: {
    minutes: (state) => state.minutes,
  },
  actions: {
    verifyOTP: (context, data) => {
      context.commit("loader/SET_LOADING", true, { root: true });
      call("post", constants.verifyOTP, data)
        .then((res) => {
          context.commit("loader/SET_LOADING", false, { root: true });
          Event.$emit(
            "ApiSuccess",
            "Otp Verified Successfully, logging in ...."
          );
          setTimeout(() => {
            AuthService.login(res.data.data);
          }, 2000);
        })
        .catch((error) => {
          Event.$emit("ApiError", error.response.data.message);
          context.commit("loader/SET_LOADING", false, { root: true });
        });
    },
    resendOTP: (context, data) => {
      context.commit("loader/SET_LOADING", true, { root: true });
      call("post", constants.resendOTP, data)
        .then((res) => {
          Event.$emit("ApiSuccess", res.data.data.message);
          context.commit("MUTATE", {
            state: "minutes",
            data: 0,
          });
          context.dispatch("getOtpMinutes");
          context.commit("loader/SET_LOADING", false, { root: true });
        })
        .catch((error) => {
          Event.$emit("ApiError", error.response.data.message);
          context.commit("loader/SET_LOADING", false, { root: true });
        });
    },
    getOtpMinutes: (context) => {
      context.commit("loader/SET_LOADING", true, { root: true });
      call("get", constants.otp_minutes)
        .then((res) => {
          context.commit("MUTATE", {
            state: "minutes",
            data: res.data.data.minutes,
          });
          context.commit("loader/SET_LOADING", false, { root: true });
        })
        .catch((error) => {
          Event.$emit("ApiError", error.response.data.message);
          context.commit("loader/SET_LOADING", false, { root: true });
        });
    },
  },
};
