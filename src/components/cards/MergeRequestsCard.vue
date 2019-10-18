<template>
  <div id="mrs">
    <merge-requests v-if="mergeRequests.length" :merge-requests="mergeRequests"/>
    <template v-else>
      <div class="pa-3">
        <v-alert :value="true" type="success">
          No merge requests.
        </v-alert>
      </div>
    </template>
  </div>
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
};
</script>
