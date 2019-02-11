import _ from "lodash";

export const getTeams = state => state.teams;

export const getConnectedUser = state => state.connectedUser;


export const getPipeline = ({ pipelines }) => mergeRequestId =>
  pipelines[mergeRequestId];


export const getProject = ({ projects }) => id => projects[id];

export const getIssues = ({ issues }) =>
  _.orderBy(Object.values(issues), "created_at", "desc");

export const getIssuesSize = ({ issueSize, issues }) =>
  issueSize || (Object.values(issues) || []).length;

export const isConfigured = state => !!state.apiToken;
