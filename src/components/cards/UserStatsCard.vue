<template>
  <v-card height="250">
    <v-card-title>
      <v-icon large left>bar_chart</v-icon>
      <span class="title font-weight-light ml-2">My Stats</span>
    </v-card-title>
    <v-card-text>
      <div id="gauge" class="ma-3">
        <avatar-build-gauge :user="user" :merge-requests="mergeRequests" :size="92"/>
      </div>
    </v-card-text>
  </v-card>
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
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer
  }
</style>
