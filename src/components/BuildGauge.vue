<template>
  <div>
    <v-tooltip bottom>
    <v-progress-linear
      slot="activator"
      v-if="stats.success"
      height="20"
      :color="stats.color"
      :value="stats.ratio"
    ></v-progress-linear>
    <span>{{stats.success}} out of {{stats.pipelines}} pipelines are successful ({{stats.ratio}}%)</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: "BuildGauge",
  props: {
    mergeRequests: Array
  },
  methods: {
    getPipeline(mergeRequest) {
      return this.$store.getters.getPipeline(mergeRequest.id);
    }
  },
  computed: {
    stats() {
      const pipelines = this.mergeRequests
        .map(mergeRequest => this.getPipeline(mergeRequest))
        .filter(Boolean);
      const success = pipelines.filter(
        pipeline => pipeline.status === "success"
      );
      const ratio = ((success.length * 100) / pipelines.length).toFixed(2);
      const color = ["error", "warning", "success"][Math.floor(ratio / 40)];

      return {
        ratio,
        color,
        success: success.length,
        pipelines: pipelines.length
      };
    }
  }
};
</script>
