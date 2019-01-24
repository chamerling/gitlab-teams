<template>
  <div>
    <template v-if="loaded">
      <merge-requests :merge-requests="computedMergeRequests" v-if="displayComputed && computedMergeRequests.length"/>
      <merge-requests :merge-requests="mergeRequests" v-if="!displayComputed && mergeRequests.length"/>
    </template>
    <template v-else>
      <div class="text-xs-center">
        <v-progress-circular indeterminate></v-progress-circular>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import gitlab from "@/gitlab";
import MergeRequests from "@/components/MergeRequests.vue";

export default {
  data() {
    return {
      loaded: false,
      displayComputed: false,
      mergeRequests: null
    };
  },
  created() {
    this.fetchData();
  },
  // prettier-ignore
  watch: {
    "$route": "fetchData"
  },
  computed: {
    ...mapGetters({
      computedMergeRequests: "getMergeRequests"
    })
  },
  methods: {
    fetchData() {
      this.loaded = false;

      if (
        this.$route.params.state &&
        ["closed", "merged"].includes(this.$route.params.state)
      ) {
        this.displayComputed = false;
        this.mergeRequests = [];
        gitlab
          .get()
          .client.fetchMergeRequests({ state: this.$route.params.state })
          .then(mrs => (this.mergeRequests = mrs.data))
          .finally(() => (this.loaded = true));
      } else {
        this.loaded = true;
        this.displayComputed = true;
      }
    }
  },
  components: {
    MergeRequests
  }
};
</script>
