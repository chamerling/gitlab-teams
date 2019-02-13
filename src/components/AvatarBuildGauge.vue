<template>
  <div :class="{ running: stats.isRunning }">
    <v-progress-circular :size="58" :width="5" :value="stats.ratio" :color="stats.color" >
      <v-badge overlap>
        <span slot="badge">{{ mergeRequests.length }}</span>
        <user-avatar-popover :user="user">
          <span v-if="stats.success">Pipelines: {{stats.success}} success, {{stats.failed}} failed</span>
        </user-avatar-popover>
      </v-badge>
    </v-progress-circular>
  </div>
</template>

<script>
import UserAvatarPopover from "@/components/UserAvatarPopover.vue";

export default {
  name: "AvatarBuildGauge",
  props: {
    user: Object,
    mergeRequests: Array
  },
  methods: {
    getPipeline(mergeRequest) {
      return this.$store.getters.getPipeline(mergeRequest.id);
    }
  },
  computed: {
    stats() {
      const pipelines = this.mergeRequests.map(mergeRequest => this.getPipeline(mergeRequest)).filter(Boolean);
      const success = pipelines.filter(pipeline => pipeline.status === "success");
      const failed = pipelines.filter(pipeline => pipeline.status === "failed");
      const isRunning = pipelines.some(pipeline => pipeline.status === "running");
      const ratio = ((success.length * 100) / pipelines.length).toFixed(2);
      const color = ['error', 'warning', 'success'][Math.floor(ratio / 40)] || "grey darken-3";

      return {
        ratio,
        color,
        success: success.length,
        failed: failed.length,
        pipelines: pipelines.length,
        isRunning
      };
    }
  },
  components: {
    UserAvatarPopover
  }
}
</script>

<style scoped>
.running {
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(204,169,44, 0.4);
  }
  70% {
      box-shadow: 0 0 0 5px rgba(204,169,44, 0);
  }
  100% {
      box-shadow: 0 0 0 0 rgba(204,169,44, 0);
  }
}
</style>


