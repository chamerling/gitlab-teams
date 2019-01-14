<template>
  <v-menu
    v-model="menu"
    open-on-hover
    :close-on-content-click="false"
    :nudge-width="200"
    offset-y
    bottom
  >
    <v-icon slot="activator" :color="getPipelineColor()" @click.native.prevent>{{getPipelineIcon()}}</v-icon>
    <v-card>
      <v-card-text>
        <span>Pipeline {{pipeline.status}} - </span>
        <span v-if="pipeline.status === 'running'">Started {{ pipeline.updated_at | moment("calendar")}}</span>
        <span v-else>Finished {{ pipeline.finished_at | moment("calendar")}}</span>
      </v-card-text>
      <!--
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn small color="success">Relaunch</v-btn>
      </v-card-actions>
      -->
    </v-card>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: "pipeline-popover",
  props: {
    pipeline: Object
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
    }
  },
  data: () => ({
    menu: false
  }),
  mounted() {
  }
}
</script>

