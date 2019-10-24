<template>
  <div>
    <div id="count" class="ma-1">
      <span class="font-weight-medium display-3">{{total}}</span>
    </div>
    <v-tooltip bottom v-for="(issue,index) in this.getIssues()" :key="index">
      <v-list slot="activator" v-if="issues.length" two-line dense>
        <issue :item="issue" hide-actions/>
      </v-list>
      <span v-if="issue.title">Last issue: {{issue.title}}</span>
    </v-tooltip>
  </div>
</template>
<script>
import Issue from "@/components/Issue.vue";
export default {
  props: {
    issues: Array,
    total: {
      type: Number,
      default: 0
    }
  },
  components: {
    Issue
  },
  methods: {
    getIssues: function() {
      let lastIssues = _.slice(this.issues, [this.issues.length - 5], [this.issues.length]);
      return this.issues.length < 5 ? this.issues : lastIssues;
    }
  }
};
</script>

<style scoped>
#count {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
