import gitlab from "@/gitlab";
import find from "lodash/find";
import Vue from "vue";

export default {
  addProject({ projects }, project) {
    Vue.set(projects, project.id, project);
  },

  setProjects(state, projects) {
    state.projects = projects;
  },

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

  setCurrentTeam(state, teamName) {
    state.team = find(state.teams, { name: teamName });
  },

  addTeam(state, team) {
    state.teams.push(team);
    localStorage.setItem("teams", JSON.stringify(state.teams));
  },

  resetTeams(state) {
    localStorage.setItem("teams", JSON.stringify([]));
    state.teams = {};
    state.team = {};
  },

  updatePipeline({ pipelines }, { mergeRequest, pipeline }) {
    Vue.set(pipelines, mergeRequest.id, pipeline);
  },

  removePipeline({ pipelines }, { mergeRequest }) {
    Vue.delete(pipelines, mergeRequest.id);
  },

  setPipelines(state, pipelines) {
    state.pipelines = pipelines;
  },

  updateSettings(state, settings) {
    state.gitlabInstance = settings.gitlabInstance;
    state.apiToken = settings.apiToken;
    localStorage.setItem("gitlabInstance", state.gitlabInstance);
    localStorage.setItem("apiToken", state.apiToken);
    gitlab.get().unwatchMergeRequests();
    gitlab.init(this);
  },

  setUsers(state, users) {
    state.team.users = users;
  },

  setCurrentUser(state, user) {
    state.currentUser = user;
  },

  setAuthenticationMethod(state, authenticationMethod) {
    state.authenticationMethod = authenticationMethod;
  }
};
