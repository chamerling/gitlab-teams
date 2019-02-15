<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout wrap>
      <v-flex sm6 md6 lg3>
        <user-stats-card :user="user" :merge-requests="mergeRequests"/>
      </v-flex>
      <v-flex sm6 md6 lg3>
        <todos-card :todos="todos"/>
      </v-flex>
      <v-flex sm6 md6 lg3>
        <issues-card :issues="issues" :total="issuesSize"/>
      </v-flex>
      <v-flex sm6 md6 lg3>
        <pipelines-card :pipelines="pipelines"/>
      </v-flex>
      <v-flex md12 sm12 lg12>
        <merge-requests-card :merge-requests="mergeRequests"/>
      </v-flex>
      <v-flex sm6 md6 lg3>
        <teams-card :teams="teams"/>
      </v-flex>
    </v-layout>
  </v-container>
</template>

</template>

<script>
import MergeRequestsCard from "@/components/cards/MergeRequestsCard.vue";
import UserStatsCard from "@/components/cards/UserStatsCard.vue";
import TodosCard from "@/components/cards/TodosCard.vue";
import IssuesCard from "@/components/cards/IssuesCard.vue";
import TeamsCard from "@/components/cards/TeamsCard.vue";
import PipelinesCard from "@/components/cards/PipelinesCard.vue";
import { mapGetters, mapState } from "vuex";
import store from "@/store";

export default {
  name: "home",
  computed: {
    ...mapGetters({
      mergeRequests: "getMergeRequests",
      user: "getConnectedUser",
      issues: "getIssues",
      issuesSize: "getIssuesSize",
      todos: "getTodos",
      pipelines: "getPipelines"
    }),
    teams() {
      return _.orderBy(
        this.$store.getters.getTeams,
        [team => team.name.toLowerCase()],
        "asc"
      );
    }
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
    TodosCard,
    IssuesCard,
    PipelinesCard,
    TeamsCard
  }
};
</script>
