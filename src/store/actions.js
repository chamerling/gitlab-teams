import gitlab from "@/gitlab";

export default {
  fetchUsers({ state, commit }) {
    return gitlab
      .get()
      .client.fetchUsers(state.team.usernames)
      .then(users => commit("setUsers", users));
  },

  fetchUser({ commit }, userName) {
    return gitlab
      .get()
      .client.fetchUser(userName)
      .then(user => commit("setCurrentUser", user));
  },

  fetchProject({ commit, state }, projectId) {
    if (state.projects[projectId]) {
      return Promise.resolve(state.projects[projectId]);
    }

    return gitlab
      .get()
      .client.fetchProject(projectId)
      .then(project => {
        commit("addProject", project);

        return project;
      });
  },

  cleanMergeRequests({ commit }) {
    const gl = gitlab.get();

    gl.unwatchMergeRequests();
    commit("setMergeRequests", {});
    commit("setPipelines", {});
  },

  addMergeRequest({ commit }, mr) {
    commit("addMergeRequest", mr);
  },

  removeMergeRequest({ commit }, mr) {
    commit("removeMergeRequest", mr);
  },

  updateMergeRequest({ commit }, mr) {
    commit("updateMergeRequest", mr);
  },

  updatePipeline({ commit }, { mergeRequest, pipeline }) {
    commit("updatePipeline", { mergeRequest, pipeline });
  },

  updateSettings({ commit, dispatch }, settings) {
    commit("updateSettings", settings);
    commit("resetTeams");
    commit("setMergeRequests", {});
    commit("setPipelines", {});
    commit("setProjects", {});
    dispatch("launchWatchers");
  },

  loadCurrentUser({ dispatch }) {
    const gl = gitlab.get();

    dispatch("cleanMergeRequests");
    gl.watchMergeRequests({});
  },

  loadUser({ dispatch, state }, userName) {
    const gl = gitlab.get();

    dispatch("cleanMergeRequests");
    dispatch("fetchUser", userName).then(() => {
      gl.watchMergeRequestsForUsers({
        userIds: [state.currentUser.id]
      });
    });
  },

  loadTeam({ commit, dispatch }, teamName) {
    dispatch("cleanMergeRequests");
    commit("setCurrentTeam", teamName);
    dispatch("launchWatchers");
  },

  createTeam({ commit }, team) {
    commit("addTeam", team);
  },

  launchWatchers({ dispatch, state }) {
    const gl = gitlab.get();

    dispatch("fetchUsers").then(() => {
      gl.watchMergeRequestsForUsers({
        userIds: state.team.users.map(user => user.id)
      });
    });
  }
};
