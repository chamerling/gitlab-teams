<template>
  <v-card>
    <v-card-title>
      <v-icon large left>merge_type</v-icon>
      <span class="title font-weight-light">Merge Requests</span>
    </v-card-title>
    <v-card-text scrollable>
      <merge-requests v-if="mergeRequests.length" :merge-requests="mergeRequests"/>
      <template v-else>
        <div class="pa-3">
          <v-alert :value="true" type="success">
            No merge requests.
          </v-alert>
        </div>
      </template>

    </v-card-text>
  </v-card>
</template>

<script>
import MergeRequests from "@/components/MergeRequests.vue";

export default {
  props: {
    mergeRequests: Array
  },
  components: {
    MergeRequests
  }
}
</script>

