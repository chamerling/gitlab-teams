<template>
  <v-list two-line dark>
    <div v-for="mergeRequest in orderedMergeRequests" :key="mergeRequest.iid">
      <merge-request-item :mr="mergeRequest"/>
    </div>
  </v-list>
</template>

<script>
import MergeRequestItem from "@/components/MergeRequestItem.vue";
import _ from "lodash";

export default {
  name: "MergeRequests",
  props: {
    mergeRequests: Array
  },
  computed: {
    orderedMergeRequests() {
      return _.orderBy(this.mergeRequests, "created_at", "desc");
    }
  },
  components: {
    MergeRequestItem
  }
};
</script>
