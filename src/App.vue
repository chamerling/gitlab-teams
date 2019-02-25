<template>
  <div id="app">
    <v-app dark>
      <v-navigation-drawer
        :mini-variant="miniDrawer"
        v-model="drawer"
        fixed
        clipped
        hide-overlay
        app
      >

      <v-list-tile v-if="miniDrawer" @click.stop="miniDrawer = !miniDrawer">
        <v-list-tile-action>
          <v-icon>chevron_right</v-icon>
        </v-list-tile-action>
      </v-list-tile>

      <v-list dense class="pa-1" v-if="connectedUser">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <v-avatar size="44px">
              <img v-if="connectedUser" :src="connectedUser.avatar_url">
              <v-icon v-else>account_circle</v-icon>
            </v-avatar>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ connectedUser.name }}</v-list-tile-title>
          </v-list-tile-content>

        <v-list-tile-action>
            <v-btn icon @click.stop="miniDrawer = !miniDrawer">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <v-list dense>
        <v-list-tile v-if="isConfigured" @click="$router.push({ name: 'home' })">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              Home
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="isConfigured" @click="$router.push({ name: 'mrs' })">
          <v-list-tile-action>
            <v-icon>merge_type</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="with-badge">
              Merge Requests
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="isConfigured" @click="$router.push({ name: 'issues' })">
          <v-list-tile-action>
            <v-icon>bug_report</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="with-badge">
              Issues
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="isConfigured" @click="$router.push({ name: 'todo' })">
          <v-list-tile-action>
            <v-badge v-if="miniDrawer" right overlap>
              <span slot="badge">{{todosSize}}</span>
              <v-icon>list</v-icon>
            </v-badge>
            <v-icon v-else>list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="with-badge">
              <span>Todo</span>
              <v-spacer/>
              <v-chip v-if="todosSize" color="orange" small text-color="white">{{todosSize}}</v-chip>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list>
          <v-list-tile v-if="isConfigured" class="mt-3">
            <v-list-tile-action>
              <v-btn icon ripple @click="createTeam">
                <v-icon color="grey darken-1">add_circle_outline</v-icon>
              </v-btn>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                <span class="grey--text text--darken-1">TEAMS</span>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile :to="`/team/${team.name}`" active-class="grey darken-2" v-for="team in teams" :key="team.name" avatar>
            <v-list-tile-avatar>
              <team-avatar :team="team" :size="32"/>
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-text="team.name"></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-menu offset-y min-width="150">
                <v-btn icon ripple slot="activator" @click.native.prevent>
                  <v-icon color="grey darken-1">more_vert</v-icon>
                </v-btn>
                <v-list>
                  <v-list-tile @click.prevent="deleteTeam(team)">
                    <v-list-tile-title>Delete</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
        <v-list-tile @click="openSettings">
          <v-list-tile-action>
            <v-icon color="grey darken-1">settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">Settings</v-list-tile-title>
        </v-list-tile>
        <v-list-tile href="https://github.com/chamerling/gitlab-teams/" target="_blank">
          <v-list-tile-action>
            <v-icon color="grey darken-1">info</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">About</v-list-tile-title>
        </v-list-tile>
      </v-list>
      </v-navigation-drawer>
      <v-toolbar dark flat fixed app clipped-left dense color="orange darken-4">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>GitLab Teams</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="goBack" v-if="isConfigured && $route.name === 'settings'">
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
      <snackbar/>
    </v-app>
  </div>
</template>
<script>
import _ from "lodash";
import { mapGetters } from "vuex";
import Snackbar from "@/components/ui/Snackbar.vue";
import TeamAvatar from "@/components/TeamAvatar.vue";

export default {
  data: () => ({
    drawer: null
  }),
  methods: {
    openSettings() {
      this.$router.push({ name: "settings" });
    },
    createTeam() {
      this.$router.push({ name: "create-team" });
    },
    deleteTeam(team) {
      this.$store.dispatch("deleteTeam", team);
      this.$router.push({ name: "home" });
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
      return _.orderBy(
        this.$store.getters.getTeams,
        [team => team.name.toLowerCase()],
        "asc"
      );
    },
    miniDrawer: {
      set(mini) {
        this.$store.dispatch("setMiniDrawer", mini);
      },
      get() {
        return this.$store.state.ui.miniDrawer;
      }
    },
    ...mapGetters({
      todosSize: "getTodosSize",
      connectedUser: "getConnectedUser"
    })
  },
  mounted() {
    if (!this.isConfigured) {
      this.openSettings();
    } else {
      // FIXME: Also need to dispatch loadCurrentUser to watchMergeRequests
      this.$store.dispatch("launchUserWatchers");
    }
  },
  components: {
    Snackbar,
    TeamAvatar
  }
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.with-badge {
  display: flex;
}

.v-chip {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
