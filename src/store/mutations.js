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

  showSnackbar(state, value) {
    state.snackbar.show = value;
  },

  displaySnackbarMessage(state, message) {
    state.snackbar.message = message;
    state.snackbar.show = true;
  }
};
