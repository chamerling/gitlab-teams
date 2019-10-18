<template>
  <v-menu bottom left offset-y>
    <v-avatar slot="activator" size="36">
      <img :src="connectedUser.avatar_url">
    </v-avatar>
    <v-list>
      <v-list-tile>
        <v-list-tile-content>
        <v-list-tile-title>{{connectedUser.name}}</v-list-tile-title>
        <v-list-tile-sub-title>{{connectedUser.email}}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider/>
      <v-list-tile @click="openSettings">
        <v-list-tile-title>Settings</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      connectedUser: "getConnectedUser"
    })
  },
  methods: {
    openSettings() {
      this.$router.push({ name: "settings" });
    }
  }
};
</script>
