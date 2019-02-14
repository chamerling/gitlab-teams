<template>
  <v-card height="250">
    <v-card-title>
      <v-icon large left>bug_report</v-icon>
      <span class="title font-weight-light ml-2">Issues</span>
    </v-card-title>
    <v-card-text>
      <div id="count" class="ma-3">
        <span class="font-weight-medium display-3">{{total}}</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    issues: Array,
    total: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>
  #count {
    display: flex;
    align-items: center;
    justify-content: center
  }
</style>

