const MINI_DRAWER_LOCALSTORAGE_KEY = "mini_drawer";
const state = {
  snackbar: { color: "red", message: null, timeout: 3000, show: false },
  miniDrawer: JSON.parse(localStorage.getItem(MINI_DRAWER_LOCALSTORAGE_KEY))
};

const types = {
  SET_MINI_DRAWER: "SET_MINI_DRAWER",
  SHOW_SNACKBAR: "SHOW_SNACKBAR",
  DISPLAY_SNACKBAR_MESSAGE: "DISPLAY_SNACKBAR_MESSAGE"
};

const actions = {
  setMiniDrawer({ commit }, value) {
    commit(types.SET_MINI_DRAWER, value);
  },

  showSnackbar({ commit }, value) {
    commit(types.SHOW_SNACKBAR, value);
  },

  displaySnackbarMessage({ commit }, message) {
    commit(types.DISPLAY_SNACKBAR_MESSAGE, message);
  }
};

const mutations = {
  [types.SET_MINI_DRAWER](state, value) {
    state.miniDrawer = value;
    localStorage.setItem(MINI_DRAWER_LOCALSTORAGE_KEY, state.miniDrawer);
  },

  [types.SHOW_SNACKBAR](state, value) {
    state.snackbar.show = value;
  },

  [types.DISPLAY_SNACKBAR_MESSAGE](state, message) {
    state.snackbar.message = message;
    state.snackbar.show = true;
  }
};

const getters = {
  isMiniDrawer(state) {
    return !!state.miniDrawer;
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
