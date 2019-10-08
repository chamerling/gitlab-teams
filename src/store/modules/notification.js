const state = {
  enabled: false // global notification state
};

const getters = {};

const actions = {
  setNotificationEnabled({ commit }, value) {
    commit("setEnabled", value);
  }
};

const mutations = {
  setEnabled(state, value) {
    state.enabled = value;
  },

  resetNotification(state) {
    state.enabled = false;
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
