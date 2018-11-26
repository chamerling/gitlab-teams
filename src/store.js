import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";
import gitlab from "./gitlab";
import createLogger from "vuex/dist/logger";
import teams from "@/teams.json";

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
    mergeRequests: [],
    teams,
    team: {},
    currentUser: null
  },
  getters: {
    getTeams(state) {
      return state.teams;
    },
    getMergeRequest(state, id) {
      return _.find(state.mergeRequests, { id });
    },
    isConfigured(state) {
      return !!state.apiToken;
    }
  },
  mutations: {
    addMergeRequest(state, mergeRequest) {
      state.mergeRequests.push(mergeRequest);
    },

    removeMergeRequest(state, mergeRequest) {
      state.mergeRequests.splice(
        _.findIndex(state.mergeRequests, mr => mr.id === mergeRequest.id),
        1
      );
    },

    setMergeRequests(state, mergeRequests) {
      state.mergeRequests = mergeRequests;
    },

    updateMergeRequest(state, mergeRequest) {
      const mr = _.find(state.mergeRequests, { id: mergeRequest.id });
      // TODO use array.map like in https://stackoverflow.com/questions/50416063/update-data-using-vuex
      if (mr) {
        mr.user_notes_count = mergeRequest.user_notes_count;
        mr.upvotes = mergeRequest.upvotes;
        mr.title = mergeRequest.title;
      }
    },

    setCurrentTeam(state, teamName) {
      const team = _.find(state.teams, { name: teamName });

      state.team = team;
    },

    updatePipeline(state, { mergeRequest, pipeline }) {
      const mr = _.find(state.mergeRequests, { id: mergeRequest.id });

      if (mr) {
        Vue.set(mr, "pipeline", pipeline);
      }
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

    // TODO: replace with commit("setMergeRequest", [])
    cleanMergeRequests({ commit }) {
      const gl = gitlab.get();

      gl.unwatchMergeRequests();
      commit("setMergeRequests", []);
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

    updatePipeline({ commit }, mr, pipeline) {
      commit("updatePipeline", mr, pipeline);
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
