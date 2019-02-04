const MINI_DRAWER_LOCALSTORAGE_KEY = "mini_drawer";
const state = {
  miniDrawer: JSON.parse(localStorage.getItem(MINI_DRAWER_LOCALSTORAGE_KEY))
};

const types = {
  SET_MINI_DRAWER: "SET_MINI_DRAWER"
};

const actions = {
  setMiniDrawer({ commit }, value) {
    commit(types.SET_MINI_DRAWER, value);
  }
};

const mutations = {
  [types.SET_MINI_DRAWER](state, value) {
    state.miniDrawer = value;
    localStorage.setItem(MINI_DRAWER_LOCALSTORAGE_KEY, state.miniDrawer);
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
