<template>
  <div class="todos">
    <v-list v-if="issuesSize" two-line>
      <template v-for="(issue, index) in issues">
        <issue :item="issue" :key="issue.id"/>
        <v-divider v-if="index + 1 < issues.length" :key="index" ></v-divider>
      </template>
    </v-list>
    <v-layout v-else ma-4>
      <v-flex xs12 md6 class="empty-message" style="margin:auto"  >
        <v-layout
           row fill-height
        >
        <v-flex xs12 >
          <v-icon size="100"  :color="(darkMode) ? `grey darken-2` : `grey lighten-4`">bug_report</v-icon>
        </v-flex> 
        </v-layout>
        <v-layout
          row fill-height
        >
        <v-flex xs12 > 
          <span class="text-xs-center display-1">Looks like you do not have created any issue...</span>
        </v-flex> 
        </v-layout>
       
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Issue from "@/components/Issue.vue";

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
  methods: {}
};
</script>
<style lang="css" scoped>
  .empty-message{
    margin: auto;
    text-align: center;
    border: 3px solid currentColor;
    border-style: dashed;
    padding: 5%;
  }
</style>
