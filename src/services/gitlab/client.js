import axios from "axios";

export default class Client {
  constructor(baseURL, privateToken) {
    this.client = this._createClient(baseURL, privateToken);
  }

  _createClient(baseURL, privateToken) {
    return axios.create({
      baseURL,
      headers: {
        "Private-Token": privateToken
      }
    });
  }

  fetchUsers(usernames = []) {
    return Promise.all(usernames.map(username => this.fetchUser(username)));
  }

  fetchUser(username) {
    return this.client
      .get(`/api/v4/users?username=${username}`)
      .then(result => result.data[0]);
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
    return this.client.get(
      `/api/v4/projects/${projectId}/merge_requests/${iid}`
    );
  }

  fetchPipelines(projectId, refId) {
    return this.client.get(
      `/api/v4/projects/${projectId}/pipelines?ref=${refId}`
    );
  }

  getCurrentUser() {
    return this.client.get("/api/v4/user");
  }
}
