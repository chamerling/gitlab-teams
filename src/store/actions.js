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

export const cleanMergeRequests = ({ commit }) => {
  const gl = gitlab.get();

  gl.unwatchMergeRequests();
  commit("setMergeRequests", {});
  commit("setPipelines", {});
};

export const merge = ({ dispatch }, mr) => {
  const gl = gitlab.get();

  return gl.client.merge(mr).then(() => {
    dispatch("removeMergeRequest", mr);
    // TODO: Stop watchers for this MR
  });
};

export const addMergeRequest = ({ commit }, mr) => {
  commit("addMergeRequest", mr);
};

export const removeMergeRequest = ({ commit }, mr) => {
  commit("removeMergeRequest", mr);
};

export const updateMergeRequest = ({ commit }, mr) => {
  commit("updateMergeRequest", mr);
};

export const addTodo = ({ commit }, todo) => {
  commit("addTodo", todo);
};

export const removeTodo = ({ commit }, todo) => {
  commit("removeTodo", todo);
};

export const updateTodo = ({ commit }, todo) => {
  commit("updateTodo", todo);
};

export const markTodoAsDone = ({ dispatch, state }, todo) => {
  const gl = gitlab.get();

  return gl.client.markTodoAsDone(todo).then(() => {
    dispatch("removeTodo", todo);
    dispatch("setTodoSize", --state.todoSize);
  });
};

export const markAllTodosAsDone = ({ commit, dispatch }) => {
  const gl = gitlab.get();

  return gl.client.markAllTodosAsDone().then(() => {
    dispatch("setTodoSize", 0);
    commit("setTodos", {});
  });
};

export const setTodoSize = ({ commit }, size) => {
  commit("setTodoSize", size);
};

// issues
export const addIssue = ({ commit }, issue) => {
  commit("addIssue", issue);
};

export const removeIssue = ({ commit }, issue) => {
  commit("removeIssue", issue);
};

export const setIssueSize = ({ commit }, size) => {
  commit("setIssueSize", size);
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

export const loadTeam = ({ commit, dispatch }, teamName) => {
  dispatch("cleanMergeRequests");
  commit("setCurrentTeam", teamName);
  dispatch("launchWatchers");
};

export const createTeam = ({ commit }, team) => {
  commit("addTeam", team);
};

export const launchWatchers = ({ dispatch, state }) => {
  const gl = gitlab.get();

  dispatch("fetchUsers").then(() => {
    gl.watchMergeRequestsForUsers({
      userIds: state.team.users.map(user => user.id)
    });
  });
};

export const launchUserWatchers = () => {
  const gl = gitlab.get();

  gl.watchTodos();
  gl.watchIssues();
};
