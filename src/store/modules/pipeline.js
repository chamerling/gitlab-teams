import Vue from "vue";
import { orderBy, findKey } from "lodash";

const state = {
  pipelines: {} // id is 'mergeRequestId'
};

const getters = {
  getPipeline({ pipelines }) {
    return mergeRequestId => pipelines[mergeRequestId];
  },

  getPipelines({ pipelines }) {
    return orderBy(Object.values(pipelines), "created_at", "desc");
  },

  getMergeRequestIdForPipeline({ pipelines }) {
    return pipelineId =>
      findKey(pipelines, pipeline => pipeline.id === pipelineId);
  }
};

const actions = {
  updatePipeline({ commit }, { mergeRequest, pipeline }) {
    commit("updatePipeline", { mergeRequest, pipeline });
  },

  removePipelineForMergeRequest({ commit }, mergeRequest) {
    commit("removePipeline", { mergeRequest });
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
