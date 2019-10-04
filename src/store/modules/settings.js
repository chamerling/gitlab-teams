import gitlab from "@/gitlab";

const state = {
  darkMode: localStorage.getItem("darkMode"),
  apiEndpoint:
    localStorage.getItem("apiEndpoint") || process.env.VUE_APP_DEFAULT_GITLAB,
  apiToken: process.env.VUE_APP_API_TOKEN || localStorage.getItem("apiToken")
};

const getters = {
  isConfigured(state) {
    return !!state.apiToken;
  }
};

const actions = {
  updateSettings({ commit, dispatch }, settings) {
    commit("updateSettings", settings);
    commit("resetTeams");
    commit("setMergeRequests", {});
    commit("setPipelines", {});
    commit("setTeamProjects", {});
    commit("setTodos", {});
    commit("setConnectedUser", null);
    dispatch("launchWatchers");
    dispatch("launchUserWatchers");
  },
  updateTheme({ commit }, mode) {
    commit("updateTheme", mode);
  }
};

const mutations = {
  updateSettings(state, settings) {
    state.apiEndpoint = settings.apiEndpoint;
    state.apiToken = settings.apiToken;
    localStorage.setItem("apiEndpoint", state.apiEndpoint || "");
    localStorage.setItem("apiToken", state.apiToken || "");
    // FIXME: This MUST not be here
    gitlab.get().unwatchUser();
    gitlab.get().unwatchMergeRequests();
    gitlab.init(this);
  },
  updateTheme(state, mode) {
    state.darkMode = mode;
    localStorage.setItem("darkMode", mode);
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
