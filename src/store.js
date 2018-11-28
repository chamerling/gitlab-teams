import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";
import gitlab from "./gitlab";
import createLogger from "vuex/dist/logger";

const plugins = process.env.NODE_ENV !== "production" ? [createLogger()] : [];

Vue.use(Vuex);

export default new Vuex.Store({
  plugins,
  state: {
    apiEndpoint:
      process.env.VUE_APP_GITLAB ||
      localStorage.getItem("apiEndpoint") ||
      "https://gitlab.com",
    apiToken: process.env.VUE_APP_API_TOKEN || localStorage.getItem("apiToken"),
    mergeRequests: {},
    pipelines: {}, // id is 'mergeRequestId'
    teams: JSON.parse(localStorage.getItem("teams") || "[]"),
    team: {},
    currentUser: null
  },
  getters: {
    getTeams(state) {
      return state.teams;
    },
    getMergeRequest({ mergeRequests }, id) {
      return mergeRequests[id];
    },
    getPipeline: ({ pipelines }) => mergeRequestId => {
      return pipelines[mergeRequestId];
    },
    getMergeRequests({ mergeRequests }) {
      return _.values(mergeRequests);
    },
    isConfigured(state) {
      return !!state.apiToken;
    }
  },
  mutations: {
    addMergeRequest({ mergeRequests }, mergeRequest) {
      Vue.set(mergeRequests, mergeRequest.id, mergeRequest);
    },

    removeMergeRequest({ mergeRequests }, mergeRequest) {
      Vue.delete(mergeRequests, mergeRequest.id);
    },

    setMergeRequests(state, mergeRequests) {
      state.mergeRequests = mergeRequests;
    },

    updateMergeRequest({ mergeRequests }, mergeRequest) {
      Vue.set(mergeRequests, mergeRequest.id, mergeRequest);
    },

    setCurrentTeam(state, teamName) {
      const team = _.find(state.teams, { name: teamName });

      state.team = team;
    },

    addTeam(state, team) {
      state.teams.push(team);
      localStorage.setItem("teams", JSON.stringify(state.teams));
    },

    updatePipeline({ pipelines }, { mergeRequest, pipeline }) {
      Vue.set(pipelines, mergeRequest.id, pipeline);
    },

    removePipeline({ pipelines }, { mergeRequest }) {
      Vue.delete(pipelines, mergeRequest.id);
    },

    setPipelines(state, pipelines) {
      state.pipelines = pipelines;
    },

    updateSettings(state, settings) {
      state.apiEndpoint = settings.apiEndpoint;
      state.apiToken = settings.apiToken;
      localStorage.setItem("apiEndpoint", state.apiEndpoint);
      localStorage.setItem("apiToken", state.apiToken);
      gitlab.get().unwatchMergeRequests();
      gitlab.init(this);
    },

    setUsers(state, users) {
      state.team.users = users;
    },

    setCurrentUser(state, user) {
      state.currentUser = user;
    }
  },

  actions: {
    fetchUsers({ state, commit }) {
      return gitlab
        .get()
        .client.fetchUsers(state.team.usernames)
        .then(users => {
          commit("setUsers", users);
        });
    },

    fetchUser({ commit }, userName) {
      return gitlab
        .get()
        .client.fetchUser(userName)
        .then(user => {
          commit("setCurrentUser", user);
        });
    },

    cleanMergeRequests({ commit }) {
      const gl = gitlab.get();

      gl.unwatchMergeRequests();
      commit("setMergeRequests", {});
      commit("setPipelines", {});
    },

    addMergeRequest({ commit }, mr) {
      commit("addMergeRequest", mr);
    },

    removeMergeRequest({ commit }, mr) {
      commit("removeMergeRequest", mr);
    },

    updateMergeRequest({ commit }, mr) {
      commit("updateMergeRequest", mr);
    },

    updatePipeline({ commit }, { mergeRequest, pipeline }) {
      commit("updatePipeline", { mergeRequest, pipeline });
    },

    updateSettings({ commit, dispatch }, settings) {
      commit("updateSettings", settings);
      dispatch("launchWatchers");
    },

    loadCurrentUser({ dispatch }) {
      const gl = gitlab.get();

      dispatch("cleanMergeRequests");
      gl.watchMergeRequests({});
    },

    loadUser({ dispatch, state }, userName) {
      const gl = gitlab.get();

      dispatch("cleanMergeRequests");
      dispatch("fetchUser", userName).then(() => {
        gl.watchMergeRequestsForUsers({
          userIds: [state.currentUser.id]
        });
      });
    },

    loadTeam({ commit, dispatch }, teamName) {
      dispatch("cleanMergeRequests");
      commit("setCurrentTeam", teamName);
      dispatch("launchWatchers");
    },

    createTeam({ commit }, team) {
      commit("addTeam", team);
    },

    launchWatchers({ dispatch, state }) {
      const gl = gitlab.get();

      dispatch("fetchUsers").then(() => {
        gl.watchMergeRequestsForUsers({
          userIds: state.team.users.map(user => user.id)
        });
      });
    }
  }
});
