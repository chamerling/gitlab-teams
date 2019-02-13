<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex md12 sm12 lg8>
        <merge-requests-card :merge-requests="mergeRequests"/>
      </v-flex>
      <v-flex md12 sm12 lg4>
        <span>Hello word</span>
      </v-flex>
    </v-layout>
  </v-container>
</template>

</template>

<script>
import MergeRequestsCard from "@/components/cards/MergeRequestsCard.vue";
import { mapGetters } from "vuex";
import store from "@/store";

export default {
  name: "home",
  data() {
    return {};
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
  },
  components: {
    MergeRequestsCard
  }
};
</script>
