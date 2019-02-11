export default {
  snackbar: { color: "red", message: null, timeout: 3000, show: false },
  apiEndpoint:
    localStorage.getItem("apiEndpoint") || process.env.VUE_APP_DEFAULT_GITLAB,
  apiToken: process.env.VUE_APP_API_TOKEN || localStorage.getItem("apiToken"),
  pipelines: {}, // id is 'mergeRequestId'
  projects: {},
  issues: {},
  issueSize: 0,
  currentUser: null,
  connectedUser: null
};
