import _ from "lodash";
import Vue from "vue";

const state = {
  runners: {},
  runnerSize: 0
};

const getters = {
  getRunners({ runners }) {
    return _.orderBy(Object.values(runners), "description");
  },

  getRunnersSize({ runnerSize, runners }) {
    return runnerSize || (Object.values(runners) || []).length;
  }
};

const actions = {
  addRunner({ commit }, runner) {
    commit("addRunner", runner);
  },

  removeRunner({ commit }, runner) {
    commit("removeRunner", runner);
  },

  setRunnerSize({ commit }, size) {
    commit("setRunnerSize", size);
  }
};

const mutations = {
  addRunner({ runners }, runner) {
    Vue.set(runners, runner.id, runner);
  },

  removeRunner({ runners }, runner) {
    Vue.delete(runners, runner.id);
  },

  setRunners(state, runners) {
    state.runners = runners;
  },

  setRunnerSize(state, size) {
    state.runnerSize = parseInt(size);
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
