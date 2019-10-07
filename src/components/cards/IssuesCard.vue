<template>
  <v-card height="250">
    <v-card-title>
      <v-icon large left>bug_report</v-icon>
      <span class="title font-weight-light ml-2">Issues</span>
    </v-card-title>
    <v-card-text>
      <div id="count" class="ma-1">
        <span class="font-weight-medium display-3">{{total}}</span>
      </div>
      <v-tooltip bottom>
        <v-list slot="activator" v-if="issues.length" two-line dark dense>
          <issue :item="last" hide-actions/>
        </v-list>
        <span v-if="last">Last issue: {{last.title}}</span>
      </v-tooltip>
    </v-card-text>
  </v-card>
</template>

<script>
import { head } from "lodash";
import Issue from "@/components/Issue.vue";

export default {
  props: {
    issues: Array,
    total: {
      type: Number,
      default: 0
    }
  },
  computed: {
    last() {
      return head(this.issues);
    }
  },
  components: {
    Issue
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
