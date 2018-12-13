export default {
  apiEndpoint:
    localStorage.getItem("apiEndpoint") || process.env.VUE_APP_DEFAULT_GITLAB,
  apiToken: process.env.VUE_APP_API_TOKEN || localStorage.getItem("apiToken"),
  mergeRequests: {},
  pipelines: {}, // id is 'mergeRequestId'
  teams: JSON.parse(localStorage.getItem("teams") || "[]"),
  team: {},
  projects: {},
  todos: {},
  todoSize: 0,
  currentUser: null
};
