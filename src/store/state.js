import { constants } from "@/store/utils";

export default {
  gitlabInstance: process.env.VUE_APP_DEFAULT_GITLAB || localStorage.getItem("apiEndpoint"),
  apiToken: process.env.VUE_APP_API_TOKEN || localStorage.getItem("apiToken"),
  mergeRequests: {},
  pipelines: {}, // id is 'mergeRequestId'
  pollingInterval: process.env.VUE_APP_POLING_INTERVAL || 5000,
  teams: JSON.parse(localStorage.getItem("teams") || "[]"),
  team: {},
  projects: {},
  currentUser: null,
  authenticationMethod: constants.authenticationMethod.PERSONAL
};
