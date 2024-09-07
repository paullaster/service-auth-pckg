import call from "../../service/http";
import constants from "./DashboardConstants";
export default {
  namespaced: true,
  state: {
    notifications: [],
    sideLinks: [],
    mini: false,
    orgData: [],
    contracts: [],
    contract: "",
    contractLetter: "",
    p9Report: {},
    displaySideLinks: false,
    sideLink: {},
    menuLinks: [],
  },
  mutations: {
    MUTATE: (state, payload) => {
      state[payload.stateField] = payload.data;
    },
    ADD_LINK: (state, link) => {
      if (state.sideLinks.find((l) => l.name === link.name) === undefined) {
        state.sideLinks.push(link);
        state.sideLinks.sort((a, b) => a.order - b.order);
      }
    },
    ADD_MENU_LINK: (state, link) => {
      if (
        state.menuLinks.find((l) => l.name === link.name) === undefined &&
        link.enabled
      ) {
        state.menuLinks.push(link);
        state.menuLinks.sort((a, b) => a.order - b.order);
      }
    },
    RESET: (state) => {
      for (const key in state) state[key] = [];
    },
    SET_MINI_DRAWER: (state, payload) => {
      state.mini = payload;
    },
    SET_RIGHT_DRAWER: (state, payload) => {
      state.rightDrawer = payload;
    },
    UPDATE_LINKS: (state, payload) => {
      state.sideLinks = payload;
    },
    SET_DISPLAY_SIDE_LINKS: (state, payload) => {
      state.displaySideLinks = payload;
    },
    SET_SIDE_LINK: (state, payload) => {
      state.sideLink = payload;
    },
  },
  getters: {
    links: (state) => state.sideLinks,
    orgData: (state) => state.orgData,
    p9Report: (state) => state.p9Report,
    displaySideLinks: (state) => state.displaySideLinks,
    sideLink: (state) => state.sideLink,
    contracts: (state) => state.contracts,
    contract: (state) => state.contract,
    contractLetter: (state) => state.contractLetter,
    menuLinks: (state) => state.menuLinks,
    mini: (state) => state.mini,
  },
  actions: {
    setMiniDrawer: ({ commit }, data) => {
      commit("SET_MINI_DRAWER", data);
    },
    setRightDrawer: ({ commit }, data) => {
      commit("SET_RIGHT_DRAWER", data);
    },
    getChartData: ({ commit }) => {
      commit("loader/SET_LOADING", true, { root: true });
      call("get", constants.getChartData)
        .then((res) => {
          commit("loader/SET_LOADING", false, { root: true });
          commit("MUTATE", { stateField: "orgData", data: res.data.data });
        })
        .catch((error) => {
          Event.$emit("ApiError", error.response.data.message);
          commit("loader/SET_LOADING", false, { root: true });
        });
    },
    sendOrgChart: ({ commit }, data) => {
      commit("loader/SET_LOADING", true, { root: true });
      call("post", constants.postOrgChart, data)
        .then((res) => {
          // console.log(res);
          commit("loader/SET_LOADING", false, { root: true });
        })
        .catch((error) => {
          Event.$emit("ApiError", error.response.data.message);
          commit("loader/SET_LOADING", false, { root: true });
        });
    },
    getp9Report: ({ commit }, data) => {
      commit("loader/SET_LOADING", true, { root: true });
      call("post", constants.getp9, data)
        .then((res) => {
          // console.log(res.data);
          commit("loader/SET_LOADING", false, { root: true });
          commit("MUTATE", { stateField: "p9Report", data: res.data.data });
        })
        .catch((error) => {
          Event.$emit("ApiError", error.response.data.message);
          commit("loader/SET_LOADING", false, { root: true });
        });
    },
    setLinks: ({ commit }, data) => {
      commit("UPDATE_LINKS", data);
    },
    getContracts: ({ commit }, data) => {
      commit("loader/SET_LOADING", true, { root: true });
      call("get", constants.contracts(data))
        .then((res) => {
          commit("loader/SET_LOADING", false, { root: true });
          commit("MUTATE", { stateField: "contracts", data: res.data.data });
        })
        .catch((error) => {
          Event.$emit("ApiError", error.response.data.message);
          commit("loader/SET_LOADING", false, { root: true });
        });
    },
    getContract: ({ commit }, data) => {
      commit("loader/SET_LOADING", true, { root: true });
      call("post", constants.contract, data)
        .then((res) => {
          commit("loader/SET_LOADING", false, { root: true });
          commit("MUTATE", { stateField: "contract", data: res.data.data });
        })
        .catch((err) => {
          Event.$emit("ApiError", err.response.data.message);
          commit("loader/SET_LOADING", false, { root: true });
        });
    },
    getContractLetter: ({ commit }, data) => {
      commit("loader/SET_LOADING", true, { root: true });
      call("post", constants.contractLetter, data)
        .then((res) => {
          commit("loader/SET_LOADING", false, { root: true });
          commit("MUTATE", {
            stateField: "contractLetter",
            data: res.data.data,
          });
        })
        .catch((error) => {
          Event.$emit("ApiError", error.response.data.message);
          commit("loader/SET_LOADING", false, { root: true });
        });
    },
    rejectContract: ({ commit }, data) => {
      commit("loader/SET_LOADING", true, { root: true });
      call("patch", constants.rejectContract, data)
        .then((res) => {
          Event.$emit(
            "ApiSuccess",
            "You have successfully rejected this contract."
          );
          commit("loader/SET_LOADING", false, { root: true });
          commit("MUTATE", { stateField: "contracts", data: res.data.data });
        })
        .catch((err) => {
          Event.$emit(("ApiError", err.response.data.message));
          commit("loader/SET_LOADING", false, { root: true });
        });
    },
    getContractAcceptanceOTP: ({ commit }, data) => {
      commit("loader/SET_LOADING", true, { root: true });
      call("post", constants.contractAcceptanceOTP, data)
        .then((res) => {
          Event.$emit("ApiSuccess", res.data.data);
          commit("loader/SET_LOADING", false, { root: true });
        })
        .catch((err) => {
          Event.$emit("ApiError", err.response.data.message);
          commit("loader/SET_LOADING", false, { root: true });
        });
    },
    acceptContract: ({ commit }, data) => {
      commit("loader/SET_LOADING", true, { root: true });
      call("post", constants.acceptContract, data)
        .then((res) => {
          Event.$emit(
            "ApiSuccess",
            "You have successfully accepted this contract."
          );
          commit("loader/SET_LOADING", false, { root: true });
        })
        .catch((err) => {
          Event.$emit("ApiError", err.response.data.message);
          commit("loader/SET_LOADING", false, { root: true });
        });
    },
  },
};
