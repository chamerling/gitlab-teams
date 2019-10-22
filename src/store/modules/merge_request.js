import Vue from "vue";
import gitlab from "@/gitlab";

const state = {
  mergeRequests: {},
  assignedMergeRequests: {},
  assignedMergeRequestsSize: 0
};

const actions = {
  cleanMergeRequests({ commit }) {
    const gl = gitlab.get();

    gl.unwatchMergeRequests();
    commit("setMergeRequests", {});
    commit("setPipelines", {});
  },

  merge({ dispatch }, mr) {
    const gl = gitlab.get();

    return gl.client.merge(mr).then(() => {
      dispatch("removeMergeRequest", mr);
      // TODO: Stop watchers for this MR
    });
  },

  closeMergeRequest({ dispatch }, mr) {
    const gl = gitlab.get();

    return gl.client.closeMergeRequest(mr).then(() => {
      dispatch("removeMergeRequest", mr);
    });
  },

  addMergeRequest({ commit }, mr) {
    commit("addMergeRequest", mr);
  },

  removeMergeRequest({ commit, dispatch }, mr) {
    commit("removeMergeRequest", mr);
    dispatch("removePipelineForMergeRequest", mr);
  },

  updateMergeRequest({ commit }, mr) {
    commit("updateMergeRequest", mr);
  },

  newAssignedMergeRequest({ commit }, mr) {
    commit("addAssignedMergeRequest", mr);
  },

  removeAssignedMergeRequest({ commit }, mr) {
    commit("removeAssignedMergeRequest", mr);
  },

  setAssignedMergeRequestSize({ commit }, size) {
    commit("setAssignedMergeRequestSize", size);
  }
};

const getters = {
  getMergeRequest({ mergeRequests }) {
    return id => mergeRequests[id];
  },

  getMergeRequestsForUser({ mergeRequests }) {
    return username =>
      Object.values(mergeRequests).filter(
        mergeRequest => mergeRequest.author.username === username
      );
  },

  getMergeRequests({ mergeRequests }) {
    return Object.values(mergeRequests);
  },

  getAssignedMergeRequests({ assignedMergeRequests }) {
    return Object.values(assignedMergeRequests);
  }
};

const mutations = {
  addMergeRequest({ mergeRequests }, mergeRequest) {
    Vue.set(mergeRequests, mergeRequest.id, mergeRequest);
  },

  removeMergeRequest({ mergeRequests }, mergeRequest) {
    Vue.delete(mergeRequests, mergeRequest.id);
  },

  setMergeRequests(state, mergeRequests) {
    state.mergeRequests = mergeRequests;
  },

  resetMergeRequests(state) {
    state.mergeRequests = {};
  },

  updateMergeRequest({ mergeRequests }, mergeRequest) {
    Vue.set(mergeRequests, mergeRequest.id, mergeRequest);
  },

  addAssignedMergeRequest({ assignedMergeRequests }, mergeRequest) {
    Vue.set(assignedMergeRequests, mergeRequest.id, mergeRequest);
  },

  removeAssignedMergeRequest({ assignedMergeRequests }, mergeRequest) {
    Vue.delete(assignedMergeRequests, mergeRequest.id, mergeRequest);
  },

  setAssignedMergeRequestSize(state, size) {
    state.assignedMergeRequestsSize = parseInt(size);
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
