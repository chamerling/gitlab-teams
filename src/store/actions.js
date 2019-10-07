import gitlab from "@/gitlab";

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
      userIds: [state.user.currentUser.id]
    });
  });
};

export const launchWatchers = ({ dispatch, state }) => {
  const gl = gitlab.get();

  dispatch("fetchTeamUsers").then(() => {
    gl.watchMergeRequestsForUsers({
      userIds: state.team.team.users.map(user => user.id)
    });
  });
};

export const launchUserWatchers = ({ dispatch }) => {
  const gl = gitlab.get();

  dispatch("fetchConnectedUser");
  gl.watchTodos();
  gl.watchIssues();
  gl.watchProjects();
};

export const cleanAll = ({ dispatch }) => {
  dispatch("updateSettings", { apiEndpoint: undefined, apiToken: undefined });
};
