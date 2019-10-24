<template>
  <div class="todos">
    <v-list v-if="issuesSize" two-line>
      <template v-for="(issue, index) in issues">
        <issue :item="issue" :key="issue.id"/>
        <v-divider v-if="index + 1 < issues.length" :key="index" ></v-divider>
      </template>
    </v-list>
    <v-layout v-else ma-4>
      <empty-message
        message="Looks like you do not have created any issue..."
        icon="bug_report"
        icon-size="100"
        font-size="display-1"
      ></empty-message>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Issue from "@/components/Issue.vue";
import EmptyMessage from "@/components/EmptyMessage.vue";

export default {
  name: "issues",
  components: {
    Issue,
    EmptyMessage
  },
  computed: {
    ...mapGetters({
      issues: "getIssues",
      issuesSize: "getIssuesSize"
    })
  },
  methods: {}
};
</script>
