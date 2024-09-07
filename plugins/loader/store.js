export default {
  namespaced: true,
  state: { loading: false, switch: false, selectedCompany: {} },
  mutations: {
    SET_LOADING: (state, payload) => {
      state.loading = payload;
    },
    SET_SWITCH_COMPANY: (state, payload) => {
      state.switch = payload.switch;
      state.selectedCompany = payload.selectedCompany;
    },
  },
  getters: {
    loading: (state) => state.loading,
    switch: (state) => state.switch,
    selectedCompany: (state) => state.selectedCompany,
  },
};
