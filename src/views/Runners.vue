<template>
  <div class="runners">
    <v-list v-if="runnersSize" two-line dark>
      <template v-for="(runner, index) in runners">
        <runner :item="runner" :key="runner.id"/>
        <v-divider v-if="index + 1 < runners.length" :key="index" ></v-divider>
      </template>
    </v-list>
    <v-layout v-else ma-4>
      <v-flex>
        <span>Looks like you do not have enough rights to access the runners Gitlab API.</span>
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
