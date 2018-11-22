<template>
  <div id="app">
    <v-app dark>
      <v-navigation-drawer
        v-model="drawer"
        fixed
        clipped
        app
      >
      <v-list dense>
        <v-subheader class="mt-3 grey--text text--darken-1">TEAMS</v-subheader>
        <v-list>
          <v-list-tile v-for="team in teams" :key="team.name" avatar @click="openTeam(team)">
            <v-list-tile-avatar>
              <v-avatar size="36">
                <span class="white--text headline">{{team.icon}}</span>
              </v-avatar>
            </v-list-tile-avatar>
            <v-list-tile-title v-text="team.name"></v-list-tile-title>
          </v-list-tile>
        </v-list>
        <v-list-tile class="mt-3" @click="createTeam">
          <v-list-tile-action>
            <v-icon color="grey darken-1">add_circle_outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">Create Team</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="openSettings">
          <v-list-tile-action>
            <v-icon color="grey darken-1">settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">Settings</v-list-tile-title>
        </v-list-tile>
      </v-list>
      </v-navigation-drawer>
      <v-toolbar dark flat fixed app clipped-left dense color="orange darken-4">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>Gitlab Teams</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="goBack" v-if="$route.name !== 'home'">
          <v-icon small>clear</v-icon>
        </v-btn>
      </v-toolbar>
      <v-content>
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
  data: () => ({
    drawer: null
  }),
  methods: {
    openSettings() {
      this.$router.push('settings');
    },
    openTeam(team) {
      this.$router.push({ name: 'team', params: { name: team.name }})
    },
    createTeam() {

    },
    goBack() {
      this.$router.go(-1);
    }
  },
  computed: {
    isConfigured() {
      return this.$store.getters.isConfigured;
    },
    teams() {
      return this.$store.getters.getTeams;
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

