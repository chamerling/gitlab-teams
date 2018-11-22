<template>
  <div class="home">
    <merge-requests :merge-requests="mergeRequests" v-if="mergeRequests.length"/>
    <div v-else class="text-xs-center">
      <v-progress-circular
        :size="50"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>
  </div>
</template>

<script>
import MergeRequests from '@/components/MergeRequests.vue'

export default {
  name: 'team',
  components: {
    MergeRequests
  },
  computed: {
    mergeRequests() {
      return this.$store.state.mergeRequests;
    }
  }
}
</script>
