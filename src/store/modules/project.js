import Vue from "vue";
import { orderBy } from "lodash";

const state = {
  projects: {},
  projectSize: 0
};

const getters = {
  getProjects({ projects }) {
    return orderBy(Object.values(projects), "last_activity_at", "desc");
  },

  getProjectsSize({ projectSize, projects }) {
    return projectSize || (Object.values(projects) || []).length;
  }
};

const actions = {
  addProject({ commit }, project) {
    commit("addProject", project);
  },

  setProjectSize({ commit }, size) {
    commit("setProjectSize", size);
  }
};

const mutations = {
  addProject({ projects }, project) {
    Vue.set(projects, project.id, project);
  },

  setProjectSize(state, size) {
    state.projectSize = parseInt(size);
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
