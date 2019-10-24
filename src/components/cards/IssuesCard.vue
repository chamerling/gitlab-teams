<template>
  <div>
    <div id="count" class="ma-1">
      <span class="font-weight-medium display-3">{{total}}</span>
    </div>
    <v-tooltip bottom v-for="issue in last" :key="issue.id">
      <v-list slot="activator" v-if="issues.length" two-line dense>
        <issue :item="issue" hide-actions/>
      </v-list>
      <span v-if="issue">{{issue.title}}</span>
    </v-tooltip>
  </div>
</template>
<script>
import { slice } from "lodash";
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
      return slice(this.issues, 0, 5);
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
