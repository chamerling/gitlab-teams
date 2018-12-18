<template>
  <div class="todos">
    <v-list v-if="issuesSize" two-line dark>
      <template v-for="(issue, index) in issues">
        <issue :item="issue" :key="issue.id"/>
        <v-divider v-if="index + 1 < issues.length" :key="index" ></v-divider>
      </template>
    </v-list>
    <v-layout v-else ma-4>
      <v-flex>
        <span>Looks like you do not have created any issue...</span>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Issue from "@/components/Issue.vue";
import store from "@/store";

export default {
  name: "issues",
  components: {
    Issue
  },
  computed: {
    ...mapGetters({
      issues: "getIssues",
      issuesSize: "getIssuesSize"
    })
  },
  methods: {
  }
};
</script>
