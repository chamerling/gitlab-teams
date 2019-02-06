<template>
  <div>
    <v-tabs v-model="activeTab" dark slider-color="orange">
      <v-tab key="open">
        Open
      </v-tab>
      <v-tab key="merged" @click="fetchData('merged')">
        Merged
      </v-tab>
      <v-tab key="closed" @click="fetchData('closed')">
        Closed
      </v-tab>
      <v-tab-item key="open">
        <template>
          <merge-requests :merge-requests="computedMergeRequests"/>
        </template>
      </v-tab-item>
      <v-tab-item key="merged">
        <template v-if="loaded">
          <merge-requests :merge-requests="mergeRequests"/>
        </template>
        <template v-else>
          <div class="text-xs-center pa-3">
            <v-progress-circular indeterminate></v-progress-circular>
          </div>
        </template>
      </v-tab-item>
      <v-tab-item key="closed">
        <template v-if="loaded">
          <merge-requests :merge-requests="mergeRequests"/>
        </template>
        <template v-else>
          <div class="text-xs-center pa-3">
            <v-progress-circular indeterminate></v-progress-circular>
          </div>
        </template>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import gitlab from "@/gitlab";
import store from "@/store";
import MergeRequests from "@/components/MergeRequests.vue";

export default {
  data() {
    return {
      activeTab: null,
      loaded: false,
      mergeRequests: null
    };
  },
  computed: {
    ...mapGetters({
      computedMergeRequests: "getMergeRequests"
    })
  },
  // TODO: need to fetch the right ones on mount or route change because if you come from a team you will get the team ones displayed here
  // even better: Have the current user in another state property to continuously watch them
  beforeRouteEnter(to, from, next) {
    store.dispatch("loadCurrentUser");
    next();
  },
  beforeRouteUpdate(to, from, next) {
    store.dispatch("loadCurrentUser");
    next();
  },
  methods: {
    fetchData(state /* closed OR merged */) {
      this.loaded = false;
        this.mergeRequests = [];
        gitlab
          .get()
          .client.fetchMergeRequests({ state })
          .then(mrs => (this.mergeRequests = mrs.data))
          .finally(() => (this.loaded = true));
      }
  },
  components: {
    MergeRequests
  }
};
</script>
