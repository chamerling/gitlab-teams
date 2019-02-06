<template>
  <div class="home">
    <merge-requests :merge-requests="computedMergeRequests" v-if="computedMergeRequests.length"/>
    <template v-else>
      <div class="text-xs-center">
        <v-progress-circular indeterminate></v-progress-circular>
      </div>
    </template>
  </div>
</template>

<script>
import MergeRequests from "@/components/MergeRequests.vue";
import { mapGetters } from "vuex";
import store from "@/store";

export default {
  name: "home",
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      computedMergeRequests: "getMergeRequests"
    })
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch("loadCurrentUser");
    next();
  },
  beforeRouteUpdate(to, from, next) {
    store.dispatch("loadCurrentUser");
    next();
  },
  components: {
    MergeRequests
  }
};
</script>
