<template>
  <div id="app">
    <v-app dark>
      <v-content>
        <v-toolbar dark flat fixed app>
          <v-toolbar-title>Gitlab Teams</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="openSettings" v-if="$route.name === 'home'">
            <v-icon small>settings</v-icon>
          </v-btn>
          <v-btn icon @click="goBack" v-else>
            <v-icon small>clear</v-icon>
          </v-btn>
        </v-toolbar>
        <v-container class="pa-0">
          <transition name="fade" mode="out-in">
            <router-view/>
          </transition>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>
<script>
export default {
  methods: {
    openSettings() {
      this.$router.push('settings');
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  computed: {
    isConfigured() {
      return this.$store.getters.isConfigured;
    }
  },
  mounted() {
    if (!this.isConfigured) {
      this.openSettings();
    } else {
      this.$store.dispatch('launchWatchers');
    }
  }
}
</script>
<style>
.fade-enter-active, .fade-leave-active {
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>

