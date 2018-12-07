import values from "lodash/values";

export default {
  getTeams(state) {
    return state.teams;
  },
  getMergeRequest({ mergeRequests }, id) {
    return mergeRequests[id];
  },
  getMergeRequestsForUser: ({ mergeRequests }) => username =>
    Object.values(mergeRequests).filter(mergeRequest => mergeRequest.author.username === username),
  getPipeline: ({ pipelines }) => mergeRequestId => {
    return pipelines[mergeRequestId];
  },
  getMergeRequests({ mergeRequests }) {
    return values(mergeRequests);
  },
  getProject: ({ projects }) => id => projects[id],
  isConfigured(state) {
    return !!state.apiToken;
  }
};
