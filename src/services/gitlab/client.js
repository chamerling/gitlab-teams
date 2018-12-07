import { types } from "@/store/modules/oauth";
import axios from "axios";
import { constants } from "@/store/utils";

export default class Client {
  constructor(store) {
    this.store = store;
    const baseURL = store.state.gitlabInstance;
    this.persoClient = axios.create({ baseURL });
    this.oauthClient = axios.create({ baseURL });
    this.oauthClient.interceptors.request.use(this.oauthInterceptor.bind(this));

    this.updateClient();
  }

  updateClient() {
    const allowedKeys = Object.keys(constants.authenticationMethod);

    if (this.store.state.authenticationMethod === constants.authenticationMethod.PERSONAL) {
      this.persoClient.defaults.headers.common["Private-Token"] = this.store.state.apiToken;
      this.client = this.persoClient;
    } else if (this.store.state.authenticationMethod === constants.authenticationMethod.OAUTH) {
      this.client = this.oauthClient;
    } else if (!allowedKeys.find(it => it === this.store.state.authenticationMethod)) {
      throw new Error(`authenticationMethod must match one of ${allowedKeys}`);
    }
  }

  oauthInterceptor(request) {
    let getOrRefreshToken = () => {
      const { accessToken, expiresIn } = this.store.state.oauth.oauthToken;

      if (expiresIn.getTime() < new Date().getTime()) {
        // TODO: refresh token
      }

      this.oauthClient.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      return request;
    };

    if (!this.store.state.oauth.oauthToken) {
      return this.requestUserAuthorization().then(getOrRefreshToken);
    }

    return Promise.resolve(getOrRefreshToken());
  }

  async requestUserAuthorization() {
    const w = window.open(this.store.getters["oauth/authorizationUri"], "_blank", undefined, false);
    return new Promise((resolve, reject) => {
      w.addEventListener("processComplete", () => {
        this.store
          .dispatch(`oauth/${types.UPDATE_OAUTH_TOKEN}`, this.store.getters["oauth/oauthTokenFromLocalStorage"]())
          .then(resolve)
          .catch(err => reject(`Unable to retreive new token: ${err}`));
      });
    });
  }

  fetchUsers(usernames = []) {
    return Promise.all(usernames.map(username => this.fetchUser(username)));
  }

  fetchUser(username) {
    return this.client.get(`/api/v4/users?username=${username}`).then(result => result.data[0]);
  }

  searchUsers(text) {
    return this.client.get(`/api/v4/users?search=${text}`);
  }

  fetchMergeRequests({ state = "opened", author_id }) {
    // TODO: Use axios query params
    let endpoint = `/api/v4/merge_requests?state=${state}`;

    if (author_id) {
      endpoint = `${endpoint}&scope=all&author_id=${author_id}`;
    }

    return this.client.get(endpoint);
  }

  fetchMergeRequest(projectId, iid) {
    return this.client.get(`/api/v4/projects/${projectId}/merge_requests/${iid}`);
  }

  fetchPipelines(projectId, refId) {
    return this.client.get(`/api/v4/projects/${projectId}/pipelines?ref=${refId}`);
  }

  fetchPipeline(projectId, id) {
    return this.client.get(`/api/v4/projects/${projectId}/pipelines/${id}`);
  }

  fetchLastPipeline(projectId, refId) {
    return this.fetchPipelines(projectId, refId).then(result => {
      if (!result.data || !result.data.length) {
        return {};
      }

      return this.fetchPipeline(projectId, result.data[0].id);
    });
  }

  getCurrentUser() {
    return this.client.get("/api/v4/user");
  }

  fetchProject(projectId) {
    return this.client.get(`/api/v4/projects/${projectId}`).then(result => result.data);
  }

  fetchTodos() {
    return this.client.get("/api/v4/todos");
  }

  markTodoAsDone(todo) {
    return this.client.post(`/api/v4/todos/${todo.id}/mark_as_done`);
  }
}
