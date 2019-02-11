import Vue from "vue";

const state = {
  pipelines: {} // id is 'mergeRequestId'
};

const getters = {
  getPipeline({ pipelines }) {
    return mergeRequestId => pipelines[mergeRequestId];
  }
};

const actions = {
  updatePipeline({ commit }, { mergeRequest, pipeline }) {
    commit("updatePipeline", { mergeRequest, pipeline });
  }
};

const mutations = {
  updatePipeline({ pipelines }, { mergeRequest, pipeline }) {
    Vue.set(pipelines, mergeRequest.id, pipeline);
  },

  removePipeline({ pipelines }, { mergeRequest }) {
    Vue.delete(pipelines, mergeRequest.id);
  },

  setPipelines(state, pipelines) {
    state.pipelines = pipelines;
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
