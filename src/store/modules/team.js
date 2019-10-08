import _ from "lodash";
import Vue from "vue";
import gitlab from "@/gitlab";

const state = {
  teams: JSON.parse(localStorage.getItem("teams") || "[]"),
  team: {},
  projects: {}
};

const getters = {
  getTeams(state) {
    return state.teams;
  },

  getProject: ({ projects }) => id => projects[id]
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
  },

  fetchTeamUsers({ state, commit }) {
    return gitlab
      .get()
      .client.fetchUsers(state.team.usernames)
      .then(users => {
        commit("setTeamUsers", users);
      });
  },

  fetchTeamProject({ commit, state }, projectId) {
    if (state.projects[projectId]) {
      return Promise.resolve(state.projects[projectId]);
    }

    return gitlab
      .get()
      .client.fetchProject(projectId)
      .then(project => {
        commit("addTeamProject", project);

        return project;
      });
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
  },

  setTeamUsers(state, users) {
    state.team.users = users;
  },

  addTeamProject({ projects }, project) {
    Vue.set(projects, project.id, project);
  },

  setTeamProjects(state, projects) {
    state.projects = projects;
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
