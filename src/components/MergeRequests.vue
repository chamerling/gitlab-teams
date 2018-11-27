<template>
  <v-list two-line dark>
    <div v-for="mergeRequest in orderedMergeRequests" :key="mergeRequest.id">
      <merge-request-item :mr="mergeRequest" :pipeline="getPipeline(mergeRequest)"/>
    </div>
  </v-list>
</template>

<script>
import _ from "lodash";
import MergeRequestItem from "@/components/MergeRequestItem.vue";

export default {
  name: "MergeRequests",
  props: {
    mergeRequests: Array
  },
  methods: {
    getPipeline(mergeRequest) {
      return this.$store.getters.getPipeline(mergeRequest.id);
    }
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
