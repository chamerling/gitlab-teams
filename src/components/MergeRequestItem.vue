<template>
  <v-list-tile avatar :href="mr.web_url" target="_blank">
    <v-list-tile-avatar @click.prevent="$router.push({ name: 'user', params: {name: mr.author.username} })">
      <user-avatar :user="mr.author"/>
    </v-list-tile-avatar>

    <v-list-tile-content>
      <v-list-tile-title id="title">
        <v-tooltip bottom v-if="pipeline">
          <v-icon slot="activator" :color="getPipelineColor()">{{getPipelineIcon()}}</v-icon>
          <span>Pipeline {{pipeline.status}} - </span>
          <span v-if="pipeline.status === 'running'">Started {{ pipeline.updated_at | moment("calendar")}}</span>
          <span v-else>Finished {{ pipeline.finished_at | moment("calendar")}}</span>
        </v-tooltip>
        <span>{{ mr.title }}</span>
      </v-list-tile-title>
      <v-list-tile-sub-title>
        Created {{ mr.created_at | moment("calendar")}} - Updated {{ mr.updated_at | moment('calendar')}}
      </v-list-tile-sub-title>
      <v-list-tile-sub-title>
        <div id="subtitle">
          {{ getProject(mr.project_id).name }}!{{ mr.iid }} - {{ mr.source_branch }} into {{ mr.target_branch }}
        </div>
      </v-list-tile-sub-title>
    </v-list-tile-content>

    <v-list-tile-action>
      <div id="actions">
        <v-badge class="pr-2" overlap left color="orange">
          <span slot="badge">{{ mr.user_notes_count }}</span>
          <v-icon>chat</v-icon>
        </v-badge>
        <v-badge class="pr-2" overlap left color="orange">
          <span slot="badge">{{ mr.upvotes }}</span>
          <v-icon>thumb_up</v-icon>
        </v-badge>
        <v-btn outline fab small dark
          @click.prevent="merge()"
          :disabled="merging || mr.work_in_progress || mr.merge_status !== 'can_be_merged'"
          :loading="merging"
        >
          <v-icon>merge_type</v-icon>
        </v-btn>
      </div>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
import { mapGetters } from "vuex";
import UserAvatarPopover from "./UserAvatarPopover.vue";

export default {
  name: "MergeRequestItem",
  data() {
    return {
      merging: false
    }
  },
  props: {
    mr: Object,
    pipeline: Object
  },
  computed: {
    ...mapGetters({
      getProject: "getProject"
    })
  },
  methods: {
    getPipelineColor() {
      const colors = {
        pending: "warning",
        failed: "error",
        success: "success",
        running: "primary",
        canceled: "black"
      };

      return colors[this.pipeline.status] || "primary";
    },

    getPipelineIcon() {
      const icons = {
        pending: "pause_circle_outline",
        failed: "error_outline",
        success: "check_circle_outline",
        running: "timelapse",
        canceled: "highlight_off"
      };
      return icons[this.pipeline.status] || "help";
    },

    merge() {
      this.merging = true;
      this.$store.dispatch("merge", this.mr).then(() => {
      }).catch(err => {
        // TODO: MR can not be merged
        console.log(err);
      }).finally(() => {
        this.merging = false;
      });
    }
  },
  components: {
    "user-avatar": UserAvatarPopover
  }
};
</script>

<style lang="stylus" scoped>
  #subtitle, #title {
    display: flex
    align-items: center
  }

  #actions {
    display: flex
    align-items: center
  }

  .v-icon {
    padding-right: 3px
  }
</style>
