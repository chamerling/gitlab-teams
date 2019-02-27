import Client from "./client";
import { from, timer } from "rxjs";
import {
  flatMap,
  switchMap,
  pluck,
  distinct,
  share,
  filter,
  skip,
  startWith,
  map,
  distinctUntilChanged
} from "rxjs/operators";
import EventEmitter from "eventemitter3";

export default class Api extends EventEmitter {
  constructor(options) {
    super();
    this.options = options;
    this.subscriptions = new Map();
    this.userSubscriptions = [];
    this.pollingInterval = options.pollingInterval || 5000;
    this.client = new Client(options.apiEndpoint, options.apiToken);
  }

  watchMergeRequestsForUsers({ userIds }) {
    userIds.forEach(userId => this.watchMergeRequests({ userId }));
  }

  watchMergeRequests({ userId }) {
    const myMergeRequests$ = timer(0, this.pollingInterval).pipe(
      switchMap(() =>
        from(
          this.client.fetchMergeRequests({ state: "opened", author_id: userId })
        )
      ),
      pluck("data")
    );

    const newMergeRequest$ = myMergeRequests$.pipe(
      flatMap(mr => mr),
      // does not work if MR is closed then reopened
      distinct(mr => mr.id)
    );

    const newMergeRequestSubscription = newMergeRequest$.subscribe(mr => {
      this.emit("new-merge-request", mr);
      this.subscriptions.set(mr.id, []);

      const pipelineShare$ = this.watchPipeline(mr).pipe(share());
      const pipelineSubscription = pipelineShare$.subscribe(pipeline => {
        if (pipeline) {
          this.emit("updated-pipeline", {
            mergeRequest: mr,
            pipeline: pipeline
          });
        }
      });

      const pipelineBuildNotifier$ = pipelineShare$.pipe(
        startWith({ status: "failed" }),
        distinctUntilChanged((x, y) => x.status === y.status),
        skip(1),
        filter(pipeline => pipeline.status === "failed")
      );

      const pipelineBuildNotifierSubscription = pipelineBuildNotifier$.subscribe(
        pipeline => this.emit("pipeline-failed", { mergeRequest: mr, pipeline })
      );

      const mergeRequestSubscription = this.watchMergeRequest(mr).subscribe(
        mergeRequest => {
          this.emit("updated-merge-request", mergeRequest);

          if (["merged", "closed"].includes(mergeRequest.state)) {
            this.emit("merged-merge-request", mergeRequest);
            this.subscriptions
              .get(mr.id)
              .forEach(subscription => subscription.unsubscribe());
            this.subscriptions.delete(mr.id);
          }
        }
      );
      this.subscriptions
        .get(mr.id)
        .push(
          ...[
            pipelineBuildNotifierSubscription,
            pipelineSubscription,
            mergeRequestSubscription,
            newMergeRequestSubscription
          ]
        );
    });
  }

  unwatchMergeRequests() {
    this.subscriptions &&
      this.subscriptions.forEach((value, key) => {
        value.forEach(subscription => subscription.unsubscribe());
        this.subscriptions.delete(key);
      });
  }

  watchMergeRequest({ project_id, iid }) {
    return timer(0, this.pollingInterval).pipe(
      switchMap(() => from(this.client.fetchMergeRequest(project_id, iid))),
      pluck("data")
    );
  }

  watchPipeline(mergeRequest) {
    return timer(0, this.pollingInterval).pipe(
      switchMap(() =>
        from(
          this.client.fetchLastPipeline(
            mergeRequest.source_project_id,
            mergeRequest.source_branch
          )
        )
      ),
      pluck("data")
    );
  }

  watchTodos() {
    const todos$ = timer(0, this.pollingInterval).pipe(
      switchMap(() => from(this.client.fetchTodos()))
    );

    const sharedTodos$ = todos$.pipe(share());

    const newTodos$ = sharedTodos$.pipe(
      pluck("data"),
      flatMap(todo => todo),
      distinct(todo => todo.id)
    );

    const todoSize$ = sharedTodos$.pipe(
      pluck("headers"),
      map(headers => headers["x-total"])
    );

    const newTodosSubscription = newTodos$.subscribe(todo => {
      this.emit("new-todo", todo);
    });

    const todosSizeSubscription = todoSize$.subscribe(length => {
      this.emit("todo-length", length);
    });

    this.userSubscriptions.push(newTodosSubscription);
    this.userSubscriptions.push(todosSizeSubscription);
  }

  watchIssues() {
    const issues$ = timer(0, this.pollingInterval * 2).pipe(
      switchMap(() => from(this.client.fetchIssues()))
    );

    const sharedIssues$ = issues$.pipe(share());

    const newIssues$ = sharedIssues$.pipe(
      pluck("data"),
      flatMap(issue => issue),
      distinct(issue => issue.id)
    );

    const issueSize$ = sharedIssues$.pipe(
      pluck("headers"),
      map(headers => headers["x-total"])
    );

    const newIssuesSubscription = newIssues$.subscribe(issue => {
      this.emit("new-issue", issue);
    });

    const issuesSizeSubscription = issueSize$.subscribe(length => {
      this.emit("issue-length", length);
    });

    this.userSubscriptions.push(newIssuesSubscription);
    this.userSubscriptions.push(issuesSizeSubscription);
  }

  unwatchUser() {
    this.userSubscriptions.forEach(subscription => subscription.unsubscribe());
    this.userSubscriptions = [];
  }
}
