import Vue from "vue";

export default {
  addProject({ projects }, project) {
    Vue.set(projects, project.id, project);
  },

  setProjects(state, projects) {
    state.projects = projects;
  },

  setUsers(state, users) {
    // TODO: move to team module
    state.team.users = users;
  }
};
