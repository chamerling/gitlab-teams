import _ from "lodash";

const state = {
  teams: JSON.parse(localStorage.getItem("teams") || "[]"),
  team: {}
};

const getters = {
  getTeams(state) {
    return state.teams;
  }
};

const actions = {
  loadTeam({ commit, dispatch }, teamName) {
    dispatch("cleanMergeRequests");
    commit("setCurrentTeam", teamName);
    dispatch("launchWatchers");
  },

  createTeam({ commit }, team) {
    commit("addTeam", team);
  },

  deleteTeam({ state, commit, dispatch }, team) {
    if (state.team && state.team.name === team.name) {
      dispatch("cleanMergeRequests");
    }
    commit("removeTeam", team);
  }
};

const mutations = {
  setCurrentTeam(state, teamName) {
    const team = _.find(state.teams, { name: teamName });

    state.team = team;
  },

  addTeam(state, team) {
    state.teams.push(team);
    localStorage.setItem("teams", JSON.stringify(state.teams));
  },

  removeTeam(state, team) {
    const index = state.teams.findIndex(e => e.name === team.name);

    if (index > -1) {
      state.teams.splice(index, 1);
    }

    localStorage.setItem("teams", JSON.stringify(state.teams));
  },

  resetTeams(state) {
    localStorage.setItem("teams", JSON.stringify([]));
    state.teams = [];
    state.team = {};
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
