<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex md12 sm12 lg4>
        <user-stats-card :user="user" :merge-requests="mergeRequests"/>
      </v-flex>
      <v-flex md12 sm12 lg4>
        <todos-card :todos="todos"/>
      </v-flex>
      <v-flex md12 sm12 lg12>
        <merge-requests-card :merge-requests="mergeRequests"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

</template>

<script>
import MergeRequestsCard from "@/components/cards/MergeRequestsCard.vue";
import UserStatsCard from "@/components/cards/UserStatsCard.vue";
import TodosCard from "@/components/cards/TodosCard.vue";
import { mapGetters } from "vuex";
import store from "@/store";

export default {
  name: "home",
  computed: {
    ...mapGetters({
      mergeRequests: "getMergeRequests",
      user: "getConnectedUser",
      todos: "getTodos"
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
    MergeRequestsCard,
    UserStatsCard,
    TodosCard
  }
};
</script>
