<template>
  <div class="runners">
    <v-list v-if="runnersSize" two-line dark>
      <template v-for="(runner, index) in runners">
        <runner :item="runner" :key="runner.id"/>
        <v-divider v-if="index + 1 < runners.length" :key="index" ></v-divider>
      </template>
    </v-list>
    <v-layout v-else ma-4> 
      <v-flex xs12 md6 class="empty-message" style="margin:auto"  >
        <v-layout
           row fill-height
        >
        <v-flex xs12 >
          <v-icon size="100"  :color="(darkMode) ? `grey darken-2` : `grey lighten-4`">directions_run</v-icon>
        </v-flex> 
        </v-layout>
        <v-layout
          row fill-height
        >
        <v-flex xs12 > 
          <span class="text-xs-center display-1">Looks like you do not have enough rights to access the runners Gitlab API.</span>
        </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Runner from "@/components/Runner.vue";

export default {
  name: "runners",
  components: {
    Runner
  },
  computed: {
    ...mapGetters({
      runners: "getRunners",
      runnersSize: "getRunnersSize"
    })
  },
  methods: {}
};
</script>
<style lang="css" scoped>
  .empty-message{
    margin: auto;
    text-align: center;
    border: 3px solid red;
    border-style: dashed;
    padding: 5%;
  }
</style>
