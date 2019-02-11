import _ from "lodash";
import Vue from "vue";
import gitlab from "@/gitlab";

export default {
  addProject({ projects }, project) {
    Vue.set(projects, project.id, project);
  },

  setProjects(state, projects) {
    state.projects = projects;
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
    state.apiEndpoint = settings.apiEndpoint;
    state.apiToken = settings.apiToken;
    localStorage.setItem("apiEndpoint", state.apiEndpoint || "");
    localStorage.setItem("apiToken", state.apiToken || "");
    // FIXME: This MUST not be here
    gitlab.get().unwatchUser();
    gitlab.get().unwatchMergeRequests();
    gitlab.init(this);
  },

  setUsers(state, users) {
    // TODO: move to team module
    state.team.users = users;
  },

  setCurrentUser(state, user) {
    state.currentUser = user;
  },

  setConnectedUser(state, user) {
    state.connectedUser = user;
  },

  // issues
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
  },

  showSnackbar(state, value) {
    state.snackbar.show = value;
  },

  displaySnackbarMessage(state, message) {
    state.snackbar.message = message;
    state.snackbar.show = true;
  }
};
