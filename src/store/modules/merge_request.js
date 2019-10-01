import Vue from "vue";
import gitlab from "@/gitlab";

const state = {
  mergeRequests: {}
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
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
