<template>
  <div id="stats">
    <div id="gauge" class="ma-3">
      <avatar-build-gauge :user="user" :merge-requests="mergeRequests" :size="92"/>
    </div>
  </div>
</template>

<script>
import AvatarBuildGauge from "@/components/AvatarBuildGauge.vue";

export default {
  props: {
    user: Object,
    mergeRequests: Array
  },
  components: {
    AvatarBuildGauge
  }
};
</script>

<style lang="stylus" scoped>
  #gauge {
    display: flex
    align-items: center
    justify-content: center
    cursor: pointer
  }
</style>
