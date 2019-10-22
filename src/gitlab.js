import Gitlab from "@/services/gitlab";
import notification from "@/services/notification";

let gitlabApi = null;

function init(store) {
  gitlabApi = new Gitlab.Api({
    apiEndpoint: store.state.settings.apiEndpoint,
    apiToken: store.state.settings.apiToken
  });

  gitlabApi.on("pipeline-failed", ({ pipeline }) => {
    notification.notify("pipeline-failed", `Pipeline ${pipeline.id} failed`);
  });

  gitlabApi.on("new-merge-request", mr => {
    store.dispatch("fetchTeamProject", mr.project_id).then(() => {
      store.dispatch("addMergeRequest", mr);
    });
  });

  gitlabApi.on("updated-pipeline", ({ mergeRequest, pipeline }) => {
    store.dispatch("updatePipeline", { mergeRequest, pipeline });
  });

  gitlabApi.on("updated-merge-request", mr => {
    store.dispatch("updateMergeRequest", mr);
  });

  gitlabApi.on("merged-merge-request", mr => {
    store.dispatch("removeMergeRequest", mr);
  });

  gitlabApi.on("new-todo", todo => {
    store.dispatch("addTodo", todo);
  });

  gitlabApi.on("todo-length", length => {
    store.dispatch("setTodoSize", length);
  });

  gitlabApi.on("new-issue", issue => {
    store.dispatch("fetchTeamProject", issue.project_id).then(() => {
      store.dispatch("addIssue", issue);
    });
  });

  gitlabApi.on("issue-length", length => {
    store.dispatch("setIssueSize", length);
  });

  gitlabApi.on("new-project", project => {
    store.dispatch("addProject", project);
  });

  gitlabApi.on("project-length", length => {
    store.dispatch("setProjectSize", length);
  });

  gitlabApi.on("new-runner", runner => {
    store.dispatch("addRunner", runner);
  });

  gitlabApi.on("new-assigned-mr", ({ mr, notify = false }) => {
    if (notify) {
      notification.notify("mr-assigned", `New assigned MR - ${mr.title}`);
    }
    store.dispatch("newAssignedMergeRequest", mr);
  });

  gitlabApi.on("removed-assigned-mr", mr => {
    store.dispatch("removeAssignedMergeRequest", mr);
  });

  gitlabApi.on("new-assigned-mr-length", size => {
    store.dispatch("setAssignedMergeRequestSize", size);
  });
}

function get() {
  return gitlabApi;
}

export default {
  get,
  init
};
