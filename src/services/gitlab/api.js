import Client from "./client";
import { from, timer } from "rxjs";
import { flatMap, switchMap, pluck, distinct } from "rxjs/operators";
import EventEmitter from "eventemitter3";

export default class Api extends EventEmitter {
  constructor(options) {
    super();
    this.options = options;
    this.subscriptions = new Map();
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
      distinct(mr => mr.id)
    );

    const newMergeRequestSubscription = newMergeRequest$.subscribe(mr => {
      this.emit("new-merge-request", mr);
      this.subscriptions.set(mr.id, []);

      const pipelineSubscription = this.watchPipeline(mr).subscribe(
        pipeline => {
          if (pipeline && pipeline[0]) {
            this.emit("updated-pipeline", {
              mergeRequest: mr,
              pipeline: pipeline[0]
            });
          }
        }
      );

      const mergeRequestSubscription = this.watchMergeRequest(mr).subscribe(
        mergeRequest => {
          this.emit("updated-merge-request", mergeRequest);

          if (mergeRequest.state === "merged") {
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
          this.client.fetchPipelines(
            mergeRequest.source_project_id,
            mergeRequest.source_branch
          )
        )
      ),
      pluck("data")
    );
  }
}
