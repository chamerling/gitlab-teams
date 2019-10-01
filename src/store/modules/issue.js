import _ from "lodash";
import Vue from "vue";

const state = {
  issues: {},
  issueSize: 0
};

const getters = {
  getIssues({ issues }) {
    return _.orderBy(Object.values(issues), "created_at", "desc");
  },

  getIssuesSize({ issueSize, issues }) {
    return issueSize || (Object.values(issues) || []).length;
  }
};

const actions = {
  addIssue({ commit }, issue) {
    commit("addIssue", issue);
  },

  removeIssue({ commit }, issue) {
    commit("removeIssue", issue);
  },

  setIssueSize({ commit }, size) {
    commit("setIssueSize", size);
  }
};

const mutations = {
  addIssue({ issues }, issue) {
    Vue.set(issues, issue.id, issue);
  },

  removeIssue({ issues }, issue) {
    Vue.delete(issues, issue.id);
  },

  setIssues(state, issues) {
    state.issues = issues;
  },

  setIssueSize(state, size) {
    state.issueSize = parseInt(size);
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
