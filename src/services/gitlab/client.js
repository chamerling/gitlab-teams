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
    return this.client.get(
      `/api/v4/projects/${projectId}/merge_requests/${iid}`
    );
  }

  merge({ project_id, iid }) {
    return this.client.put(
      `/api/v4/projects/${project_id}/merge_requests/${iid}/merge`
    );
  }

  fetchPipelines(projectId, refId) {
    return this.client.get(
      `/api/v4/projects/${projectId}/pipelines?ref=${refId}`
    );
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
    return this.client
      .get(`/api/v4/projects/${projectId}`)
      .then(result => result.data);
  }

  fetchTodos() {
    return this.client.get("/api/v4/todos");
  }

  markTodoAsDone(todo) {
    return this.client.post(`/api/v4/todos/${todo.id}/mark_as_done`);
  }

  markAllTodosAsDone() {
    return this.client.post(`/api/v4/todos/mark_as_done`);
  }
}
