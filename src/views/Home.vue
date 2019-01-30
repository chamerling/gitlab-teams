<template>
  <div class="home">
    <v-tabs v-model="activeTab" dark slider-color="orange">
      <!-- did not find something else than @click to work with default tab and not going into infinite loop with process 100% on Chrome at least -->
      <v-tab key="open" @click="$router.push({ name: 'home' })">
        Open
      </v-tab>
      <v-tab key="merged" to="/mrs/merged">
        Merged
      </v-tab>
      <v-tab key="closed" to="/mrs/closed">
        Closed
      </v-tab>
      <v-tab-item>
        <router-view/>
      </v-tab-item>
      <!--<v-tab-item value="/mrs/merged">
        <router-view v-if="activeTab === '/mrs/merged'"></router-view>
      </v-tab-item>
      <v-tab-item value="/mrs/closed">
        <router-view v-if="activeTab === '/mrs/closed'"></router-view>
      </v-tab-item>
      -->
    </v-tabs>
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "home",
  data() {
    return {
      activeTab: null
    };
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch("loadCurrentUser");
    next();
  },
  beforeRouteUpdate(to, from, next) {
    store.dispatch("loadCurrentUser");
    next();
  }
};
</script>
