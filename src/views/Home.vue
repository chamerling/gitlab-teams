<template>
  <div class="home">
    <v-tabs v-model="active" dark slider-color="orange">
      <v-tab ripple>
        My Merge Requests
      </v-tab>
      <v-tab-item>
        <merge-requests :merge-requests="mergeRequests" v-if="mergeRequests.length"/>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import MergeRequests from "@/components/MergeRequests.vue";
import store from "@/store";

export default {
  name: "home",
  data() {
    return {
      active: null
    }
  },
  components: {
    MergeRequests
  },
  computed: {
    ...mapGetters({
      mergeRequests: "getMergeRequests"
    })
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch("loadCurrentUser");
    next();
  },
  beforeRouteUpdate(to, from, next) {
    store.dispatch("loadCurrentUser");
    next();
  }
};
</script>
