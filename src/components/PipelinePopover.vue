<template>
  <v-menu
    v-model="menu"
    open-on-hover
    :close-on-content-click="false"
    :nudge-width="200"
    offset-y
    bottom
  >
    <v-icon :size="size" :class="{ running: pipeline.status === 'running' }" slot="activator" :color="getPipelineColor()" @click.native.prevent>{{getPipelineIcon()}}</v-icon>
    <v-card>
      <v-card-text id="card-text">
        <v-icon :class="{ running: pipeline.status === 'running' }" :color="getPipelineColor()" class="mr-1">{{getPipelineIcon()}}</v-icon>
        <span>Pipeline #{{pipeline.id}} {{pipeline.status}}</span>
        <span class="ml-1 mr-1">-</span>
        <span v-if="pipeline.status === 'running'">Started {{ pipeline.updated_at | moment("calendar")}}</span>
        <span v-else>Finished {{ pipeline.finished_at | moment("calendar")}}</span>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-tooltip top v-if="pipeline.status === 'failed' || pipeline.status === 'success' || pipeline.status === 'canceled'" s>
          <v-btn slot="activator" flat icon small @click="retry()">
            <v-icon>replay</v-icon>
          </v-btn>
          <span>Launch again</span>
        </v-tooltip>
        <v-tooltip top v-else>
          <v-btn slot="activator" flat icon small @click="cancel()">
            <v-icon>cancel</v-icon>
          </v-btn>
          <span>Cancel</span>
        </v-tooltip>
        <v-tooltip top v-if="pipeline.web_url" >
          <v-btn class="ml-1" :href="pipeline.web_url" target="_blank" slot="activator" flat icon small>
            <v-icon>open_in_new</v-icon>
          </v-btn>
          <span>Open</span>
        </v-tooltip>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import gitlab from "@/gitlab";

export default {
  name: "pipeline-popover",
  props: {
    pipeline: Object,
    mr: Object,
    size: {
      type: Number,
      default: 24
    }
  },
  methods: {
    retry() {
      gitlab
        .get()
        .client.retryPipeline(this.mr.source_project_id, this.pipeline.id)
        .then(() =>
          this.$store.dispatch(
            "displaySnackbarMessage",
            "Pipeline has been relaunched"
          )
        )
        .catch(() =>
          this.$store.dispatch(
            "displaySnackbarMessage",
            "Can not relaunch pipeline"
          )
        );
    },
    cancel() {
      gitlab
        .get()
        .client.cancelPipeline(this.mr.source_project_id, this.pipeline.id)
        .then(() =>
          this.$store.dispatch(
            "displaySnackbarMessage",
            "Pipeline has been canceled"
          )
        )
        .catch(() =>
          this.$store.dispatch(
            "displaySnackbarMessage",
            "Can not cancel pipeline"
          )
        );
    },
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
    }
  },
  data: () => ({
    menu: false
  })
};
</script>

<style lang="stylus" scoped>
  #card-text {
    display: flex
    align-items: center
  }

  .running {
    animation: pulsate 1.5s ease-out;
    animation-iteration-count: infinite;
    opacity: 0.5;
  }

  @keyframes pulsate {
    0% {
        opacity: 0.5;
    }
    50% {
        opacity: 1.0;
    }
    100% {
        opacity: 0.5;
    }
  }
</style>
