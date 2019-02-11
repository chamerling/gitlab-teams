import gitlab from "@/gitlab";

const state = {
  connectedUser: null,
  currentdUser: null
};

const getters = {
  getConnectedUser(state) {
    return state.connectedUser;
  }
};

const actions = {
  fetchUser({ commit }, userName) {
    return gitlab
      .get()
      .client.fetchUser(userName)
      .then(user => {
        commit("setCurrentUser", user);
      });
  },

  fetchConnectedUser({ commit }) {
    return gitlab
      .get()
      .client.fetchCurrentUser()
      .then(user => {
        commit("setConnectedUser", user);
      });
  }
};

const mutations = {
  setConnectedUser(state, user) {
    state.connectedUser = user;
  },

  setCurrentUser(state, user) {
    state.currentUser = user;
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
