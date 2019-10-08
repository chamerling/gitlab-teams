import axios from "axios";

export default class Client {
  constructor(baseURL, privateToken) {
    this.baseURL = baseURL;
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

  fetchCurrentUser() {
    return this.client.get("/api/v4/user").then(result => result.data);
  }

  searchUsers(text) {
    return this.client.get(`/api/v4/users?search=${text}`);
  }

  getAvatarUrl(email) {
    return this.client
      .get(`/api/v4/avatar?email=${email}`)
      .then(result => result.data);
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

  merge({ project_id, iid }) {
    return this.client.put(
      `/api/v4/projects/${project_id}/merge_requests/${iid}/merge`
    );
  }

  closeMergeRequest({ project_id, iid }) {
    return this.client.put(
      `/api/v4/projects/${project_id}/merge_requests/${iid}`,
      {
        state_event: "close"
      }
    );
  }

  getCommitsForMergeRequest({ project_id, iid }) {
    return this.client
      .get(`/api/v4/projects/${project_id}/merge_requests/${iid}/commits`)
      .then(result => result.data);
  }

  getCommit({ project_id, sha }) {
    return this.client
      .get(`/api/v4/projects/${project_id}/repository/commits/${sha}`)
      .then(result => result.data);
  }

  fetchPipelines(projectId, refId) {
    return this.client.get(`/api/v4/projects/${projectId}/pipelines`, {
      params: {
        ref: refId
      }
    });
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

  cancelPipeline(projectId, id) {
    return this.client
      .post(`/api/v4/projects/${projectId}/pipelines/${id}/cancel`)
      .then(result => result.data);
  }

  retryPipeline(projectId, id) {
    return this.client
      .post(`/api/v4/projects/${projectId}/pipelines/${id}/retry`)
      .then(result => result.data);
  }

  getCurrentUser() {
    return this.client.get("/api/v4/user");
  }

  fetchProject(projectId) {
    return this.client
      .get(`/api/v4/projects/${projectId}`)
      .then(result => result.data);
  }

  fetchTodos() {
    return this.client.get("/api/v4/todos");
  }

  fetchIssues() {
    return this.client.get("/api/v4/issues");
  }

  markTodoAsDone(todo) {
    return this.client.post(`/api/v4/todos/${todo.id}/mark_as_done`);
  }

  markAllTodosAsDone() {
    return this.client.post(`/api/v4/todos/mark_as_done`);
  }

  createTodoFromMergeRequest({ project_id, iid }) {
    return this.client
      .post(`/api/v4/projects/${project_id}/merge_requests/${iid}/todo`)
      .then(result => result.data);
  }

  fetchProjects() {
    return this.client
      .get(`/api/v4/projects?starred=true&order_by=name`)
      .then(result => result);
  }
}
