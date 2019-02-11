import gitlab from "@/gitlab";

export const fetchUsers = ({ state, commit }) => {
  return gitlab
    .get()
    .client.fetchUsers(state.team.usernames)
    .then(users => {
      commit("setUsers", users);
    });
};

export const fetchUser = ({ commit }, userName) => {
  return gitlab
    .get()
    .client.fetchUser(userName)
    .then(user => {
      commit("setCurrentUser", user);
    });
};

export const fetchConnectedUser = ({ commit }) => {
  return gitlab
    .get()
    .client.fetchCurrentUser()
    .then(user => {
      commit("setConnectedUser", user);
    });
};

export const fetchProject = ({ commit, state }, projectId) => {
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
};







export const updatePipeline = ({ commit }, { mergeRequest, pipeline }) => {
  commit("updatePipeline", { mergeRequest, pipeline });
};

export const updateSettings = ({ commit, dispatch }, settings) => {
  commit("updateSettings", settings);
  commit("resetTeams");
  commit("setMergeRequests", {});
  commit("setPipelines", {});
  commit("setProjects", {});
  commit("setTodos", {});
  commit("setConnectedUser", null);
  dispatch("launchWatchers");
  dispatch("launchUserWatchers");
};

export const loadCurrentUser = ({ dispatch }) => {
  const gl = gitlab.get();

  dispatch("cleanMergeRequests");
  gl.watchMergeRequests({});
};

export const loadUser = ({ dispatch, state }, userName) => {
  const gl = gitlab.get();

  dispatch("cleanMergeRequests");
  dispatch("fetchUser", userName).then(() => {
    gl.watchMergeRequestsForUsers({
      userIds: [state.currentUser.id]
    });
  });
};

export const launchWatchers = ({ dispatch, state }) => {
  const gl = gitlab.get();

  dispatch("fetchUsers").then(() => {
    gl.watchMergeRequestsForUsers({
      userIds: state.team.users.map(user => user.id)
    });
  });
};

export const launchUserWatchers = ({ dispatch }) => {
  const gl = gitlab.get();

  dispatch("fetchConnectedUser");
  gl.watchTodos();
  gl.watchIssues();
};

export const cleanAll = ({ dispatch }) => {
  dispatch("updateSettings", { apiEndpoint: undefined, apiToken: undefined });
};

export const showSnackbar = ({ commit }, value) => {
  commit("showSnackbar", value);
};

export const displaySnackbarMessage = ({ commit }, message) => {
  commit("displaySnackbarMessage", message);
};
