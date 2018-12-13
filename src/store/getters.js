import _ from "lodash";

export const getTeams = state => state.teams;

export const getMergeRequest = ({ mergeRequests }, id) => mergeRequests[id];

export const getMergeRequestsForUser = ({ mergeRequests }) => username =>
  Object.values(mergeRequests).filter(
    mergeRequest => mergeRequest.author.username === username
  );

export const getPipeline = ({ pipelines }) => mergeRequestId =>
  pipelines[mergeRequestId];

export const getMergeRequests = ({ mergeRequests }) =>
  Object.values(mergeRequests);

export const getProject = ({ projects }) => id => projects[id];

export const getTodos = ({ todos }) =>
  _.orderBy(Object.values(todos), "created_at", "desc");

export const getTodosSize = ({ todoSize, todos }) =>
  todoSize || (Object.values(todos) || []).length;

export const isConfigured = state => !!state.apiToken;
