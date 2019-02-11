import _ from "lodash";

export const getTeams = state => state.teams;

export const getConnectedUser = state => state.connectedUser;

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

export const getIssues = ({ issues }) =>
  _.orderBy(Object.values(issues), "created_at", "desc");

export const getIssuesSize = ({ issueSize, issues }) =>
  issueSize || (Object.values(issues) || []).length;

export const isConfigured = state => !!state.apiToken;
