<template>
  <v-list-tile avatar :href="mr.web_url" target="_blank">
    <v-list-tile-avatar>
      <v-avatar>
        <img :src="mr.author.avatar_url"/>
      </v-avatar>
    </v-list-tile-avatar>

    <v-list-tile-content>
      <v-list-tile-title>{{ mr.title }}</v-list-tile-title>
      <v-list-tile-sub-title>
        <div id="subtitle">
          <v-tooltip bottom v-if="mr.pipeline">
            <v-icon slot="activator" :color="getPipelineColor(mr.pipeline)">{{getPipelineIcon(mr.pipeline)}}</v-icon>
            Pipeline {{mr.pipeline.status}}
          </v-tooltip>
          {{ mr.created_at | moment("calendar")}}
        </div>
      </v-list-tile-sub-title>
    </v-list-tile-content>

    <v-list-tile-action>
      <div id="actions">
        <v-badge class="pr-2" small overlap left>
          <span slot="badge">{{ mr.user_notes_count }}</span>
          <v-icon>chat</v-icon>
        </v-badge>
        <v-badge overlap left>
          <span slot="badge">{{ mr.upvotes }}</span>
          <v-icon>thumb_up</v-icon>
        </v-badge>
      </div>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
export default {
  name: "MergeRequestItem",
  props: {
    mr: Object
  },
  methods: {
    getPipelineColor(pipeline) {
      const colors = {
        pending: "warning",
        failed: "error",
        success: "success",
        running: "primary",
        canceled: "black"
      };

      return colors[pipeline.status] || "primary";
    },

    getPipelineIcon(pipeline) {
      const icons = {
        pending: "pause_circle_outline",
        failed: "error_outline",
        success: "check_circle_outline",
        running: "timelapse",
        canceled: "highlight_off"
      };
      return icons[pipeline.status] || "help";
    }
  }
};
</script>

<style lang="stylus" scoped>
  #subtitle {
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
