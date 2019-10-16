<template>
  <v-list-tile avatar :href="mr.web_url" target="_blank">
    <v-list-tile-avatar @click.prevent="$router.push({ name: 'user', params: {name: mr.author.username} })">
      <user-avatar :user="mr.author"/>
    </v-list-tile-avatar>

    <v-list-tile-content>
      <v-list-tile-title id="title">
        <pipeline v-if="pipeline" :pipeline="pipeline" :mr="mr"/>
        <v-tooltip bottom v-if="mr.merge_when_pipeline_succeeds">
          <v-icon slot="activator" class="ml-1" color="orange">merge_type</v-icon>
          <span>{{ $t("merge_requests.merge_automatically") }}</span>
        </v-tooltip>
        <span class="ml-1">{{ mr.title }}</span>
      </v-list-tile-title>
      <v-list-tile-sub-title>
        {{ $t("generic.created") }} {{ mr.created_at | moment("calendar")}} - {{ $t("generic.updated") }} {{ mr.updated_at | moment('calendar')}}
      </v-list-tile-sub-title>
      <v-list-tile-sub-title>
        <div id="subtitle">
          {{ getProject(mr.project_id).name }}!{{ mr.iid }} - {{ mr.source_branch }} {{ $t("generic.into") }} {{ mr.target_branch }}
          <div class="ml-1" v-if="mr.assignee">
            <v-tooltip bottom>
              <v-avatar size="16" slot="activator">
                <img :src="mr.assignee.avatar_url" :alt="mr.assignee.username">
              </v-avatar>
              <span>{{ $t("generic.assigned_to", { assignee: mr.assignee.name }) }}</span>
            </v-tooltip>
          </div>
          <v-tooltip v-if="mr.milestone" bottom>
            <v-chip slot="activator" color="primary" small text-color="white">{{ mr.milestone.title }}</v-chip>
            <span>{{ $t("generic.milestone") }}</span>
          </v-tooltip>
          <v-tooltip v-for="label in mr.labels" :key="label" bottom>
            <v-chip slot="activator" color="orange" small text-color="white">{{ label }}</v-chip>
            <span>{{ $t("generic.label") }}</span>
          </v-tooltip>
        </div>
      </v-list-tile-sub-title>
    </v-list-tile-content>

    <v-list-tile-action>
      <div id="actions" v-if="$vuetify.breakpoint.mdAndUp">
        <v-badge class="pr-2" overlap left>
          <span slot="badge">{{ mr.user_notes_count }}</span>
          <v-icon>chat</v-icon>
        </v-badge>
        <v-badge class="pr-2" overlap left>
          <span slot="badge">{{ mr.upvotes }}</span>
          <v-icon>thumb_up</v-icon>
        </v-badge>
        <v-tooltip bottom>
          <v-btn class="mr-3" outline fab small
            slot="activator"
            @click.prevent="merge()"
            :disabled="merging || closing || mr.work_in_progress || mr.merge_status !== 'can_be_merged' || mr.state !== 'opened'"
            :loading="merging"
          >
            <v-icon>merge_type</v-icon>
          </v-btn>
          <span>{{ $t("merge_requests.merge_it") }}</span>
        </v-tooltip>
        <v-menu offset-y min-width="150">
          <v-btn icon ripple slot="activator" @click.native.prevent>
            <v-icon color="grey darken-1">more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile :href="mr.web_url" target="_blank">
              <v-list-tile-title>{{ $t("generic.view_on_gitlab") }}</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="createTodo()">
              <v-list-tile-title>{{ $t("todos.create") }}</v-list-tile-title>
            </v-list-tile>
            <v-list-tile v-if="canBeClosed" @click="close()">
              <v-list-tile-title>{{ $t("merge_requests.close") }}</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="copyLink()">
              <v-list-tile-title>{{ $t("generic.copy_link") }}</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="showMore=true">
              <v-list-tile-title>{{ $t("generic.show_more") }}</v-list-tile-title>
              <v-dialog v-model="showMore" max-width="800px" lazy>
                <v-card>
                  <v-card-title primary-title>
                    <h3>{{ mr.title }}</h3>
                  </v-card-title>
                  <v-card-text>
                    <merge-request-details :mr="mr"/>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" flat @click="showMore=false">{{ $t("generic.close") }}</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>
      <div v-else>
        <v-menu offset-y min-width="150">
          <v-btn icon ripple slot="activator" @click.native.prevent>
            <v-icon color="grey darken-1">more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile>
              <v-badge class="pr-2" overlap left>
                <span slot="badge">{{ mr.user_notes_count }}</span>
                <v-icon>chat</v-icon>
              </v-badge>
              <v-badge class="pr-2" overlap left>
                <span slot="badge">{{ mr.upvotes }}</span>
                <v-icon>thumb_up</v-icon>
              </v-badge>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile @click.prevent="merge()" :disabled="merging || closing || mr.work_in_progress || mr.merge_status !== 'can_be_merged' || mr.state !== 'opened'">
              {{ $t("merge_requests.merge") }}
            </v-list-tile>
            <v-list-tile :href="mr.web_url" target="_blank">
              <v-list-tile-title>{{ $t("generic.view_on_gitlab") }}</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="createTodo()">
              <v-list-tile-title>{{ $t("todos.create") }}</v-list-tile-title>
            </v-list-tile>
            <v-list-tile v-if="canBeClosed" @click="close()">
              <v-list-tile-title>{{ $t("merge_requests.close") }}</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="copyLink()">
              <v-list-tile-title>{{ $t("generic.copy_link") }}</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="showMore=true">
              <v-list-tile-title>{{ $t("generic.show_more") }}</v-list-tile-title>
              <v-dialog v-model="showMore" max-width="800px" lazy>
                <v-card>
                  <v-card-title primary-title>
                    <h3>{{ mr.title }}</h3>
                  </v-card-title>
                  <v-card-text>
                    <merge-request-details :mr="mr"/>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" flat @click="showMore=false">{{ $t("generic.close") }}</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-list-tile>
          </v-list>
        </v-menu>
      </div>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
import gitlab from "@/gitlab";
import { mapGetters } from "vuex";
import UserAvatarPopover from "@/components/UserAvatarPopover.vue";
import PipelinePopover from "@/components/PipelinePopover.vue";
import MergeRequestDetails from "@/components/MergeRequestDetails.vue";

export default {
  name: "MergeRequestItem",
  data() {
    return {
      showMore: false,
      merging: false,
      closing: false
    };
  },
  props: {
    mr: Object,
    pipeline: Object
  },
  computed: {
    canBeClosed() {
      return this.mr.state === "opened";
    },
    ...mapGetters({
      getProject: "getProject"
    })
  },
  methods: {
    createTodo() {
      // TODO: Dispatch so that we can update the TODO counter and list
      gitlab
        .get()
        .client.createTodoFromMergeRequest({
          project_id: this.mr.project_id,
          iid: this.mr.iid
        })
        .then(() =>
          this.$store.dispatch(
            "displaySnackbarMessage",
            this.$t("todos.created")
          )
        )
        .catch(() =>
          this.$store.dispatch(
            "displaySnackbarMessage",
            this.$t("todos.creation_error")
          )
        );
    },
    copyLink() {
      const link = `${this.mr.title} - ${this.mr.web_url}`;

      this.$copyText(link)
        .then(() =>
          this.$store.dispatch(
            "displaySnackbarMessage",
            this.$t("generic.link_copied")
          )
        )
        .catch(() => {
          /* TODO */
        });
    },

    merge() {
      this.merging = true;
      this.$store
        .dispatch("merge", this.mr)
        .then(() => {})
        .catch(err => {
          // TODO: MR can not be merged
          console.log(err);
        })
        .finally(() => {
          this.merging = false;
        });
    },

    close() {
      this.closing = true;
      this.$store
        .dispatch("closeMergeRequest", this.mr)
        .catch(() =>
          this.$store.dispatch(
            "displaySnackbarMessage",
            this.$t("merge_requests.close_error")
          )
        )
        .finally(() => {
          this.closing = false;
        });
    }
  },
  components: {
    "user-avatar": UserAvatarPopover,
    pipeline: PipelinePopover,
    "merge-request-details": MergeRequestDetails
  }
};
</script>

<style lang="stylus" scoped>
  #subtitle, #title {
    display: flex
    align-items: center

    .v-chip--small {
      height: 16px;
    }
  }

  #actions {
    display: flex
    align-items: center
  }

  .v-icon {
    padding-right: 3px
  }
</style>
