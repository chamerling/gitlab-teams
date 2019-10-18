<template>
  <v-container fluid>
    <div class="dashboard">
      <dashboard-card-grid :cards="orderedCards" @order="setCardsOrder"/>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import store from "@/store";
import DashboardCardGrid from "@/components/dashboard/DashboardCardGrid.vue";
import MergeRequestsCard from "@/components/cards/MergeRequestsCard.vue";
import UserStatsCard from "@/components/cards/UserStatsCard.vue";
import TodosCard from "@/components/cards/TodosCard.vue";
import IssuesCard from "@/components/cards/IssuesCard.vue";
import TeamsCard from "@/components/cards/TeamsCard.vue";
import ProjectsCard from "@/components/cards/ProjectsCard.vue";
import PipelinesCard from "@/components/cards/PipelinesCard.vue";

export default {
  name: "home",
  computed: {
    ...mapGetters({
      getDashboard: "dashboard/getDashboard",
      mergeRequests: "getMergeRequests",
      user: "getConnectedUser",
      issues: "getIssues",
      issuesSize: "getIssuesSize",
      todos: "getTodos",
      todosSize: "getTodosSize",
      pipelines: "getPipelines"
    }),
    teams() {
      // eslint-disable-next-line no-undef
      return _.orderBy(
        this.$store.getters.getTeams,
        [team => team.name.toLowerCase()],
        "asc"
      );
    },
    projects() {
      // eslint-disable-next-line no-undef
      return _.orderBy(
        this.$store.getters.getProjects,
        [project => project.name.toLowerCase()],
        "asc"
      );
    },
    cards() {
      return {
        mrs: {
          id: "mrs",
          title: "Merge Requests",
          icon: "merge_type",
          component: MergeRequestsCard,
          props: { mergeRequests: this.mergeRequests },
          columns: 3
        },
        stats: {
          id: "stats",
          title: "My Stats",
          icon: "bar_chart",
          component: UserStatsCard,
          props: { user: this.user, mergeRequests: this.mergeRequests }
        },
        todos: {
          id: "todos",
          title: "Todos",
          icon: "list",
          component: TodosCard,
          props: { todos: this.todos, todosSize: this.todosSize }
        },
        issues: {
          id: "issues",
          title: "Issues",
          icon: "bug_report",
          component: IssuesCard,
          props: { issues: this.issues, total: this.issuesSize }
        },
        pipelines: {
          id: "pipelines",
          title: "Pipelines",
          icon: "build",
          component: PipelinesCard,
          props: { pipelines: this.pipelines }
        },
        teams: {
          id: "teams",
          title: "Teams",
          icon: "lightbulb",
          component: TeamsCard,
          props: { teams: this.teams }
        },
        projects: {
          id: "projects",
          title: "Projects",
          icon: "people",
          component: ProjectsCard,
          props: { projects: this.projects }
        }
      };
    },
    orderedCards() {
      const dashboard = this.getDashboard("home");

      if (!dashboard || !dashboard.cards || !dashboard.cards.length) {
        return Object.values(this.cards);
      }

      return dashboard.cards.map(e => this.cards[e]).filter(Boolean);
    }
  },
  methods: {
    setCardsOrder(cards) {
      store.dispatch("dashboard/setCardsOrder", { name: "home", cards });
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
    DashboardCardGrid
  }
};
</script>
