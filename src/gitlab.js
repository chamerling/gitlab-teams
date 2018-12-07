import Gitlab from "@/services/gitlab";

let gitlabApi = null;

function init(store) {
  gitlabApi = new Gitlab.Api(store);

  gitlabApi.on("new-merge-request", mr => {
    store.dispatch("fetchProject", mr.project_id).then(() => {
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
}

function get() {
  return gitlabApi;
}

export default {
  get,
  init
};
