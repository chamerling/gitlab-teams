<template>
  <v-card height="250">
    <v-card-title>
      <v-icon large left>build</v-icon>
      <span class="title font-weight-light ml-2">Pipelines</span>
    </v-card-title>
    <v-card-text>
      <div id="count" class="ma-1">
        <span class="font-weight-medium display-3">{{pipelines ? pipelines.length : 0}}</span>
      </div>
      <div v-if="pipelines.length" class="pipelines ma-1">
        <div class="pipeline ma-1" v-for="pipeline in pipelines" :key="pipeline.id">
          <pipeline :pipeline="pipeline" :mr="getMergeRequest(pipeline)" :size="getSize()"/>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { head } from "lodash";
import PipelinePopover from "@/components/PipelinePopover.vue";

export default {
  props: {
    pipelines: Array
  },
  methods: {
    getSize() {
      return this.pipelines.length > 4 ? 32 : 48;
    },
    getMergeRequest(pipeline) {
      const mergeRequestId = this.$store.getters.getMergeRequestIdForPipeline(
        pipeline.id
      );

      if (mergeRequestId) {
        return this.$store.getters.getMergeRequest(mergeRequestId);
      }

      return {};
    }
  },
  components: {
    pipeline: PipelinePopover
  }
};
</script>

<style scoped>
#count {
  display: flex;
  align-items: center;
  justify-content: center;
}

.pipelines {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
