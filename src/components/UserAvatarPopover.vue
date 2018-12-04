<template>
  <v-menu
    v-model="menu"
    open-on-hover
    :close-on-content-click="false"
    :nudge-width="200"
    offset-y
    bottom
  >
    <v-avatar size="48" slot="activator">
      <img :src="user.avatar_url" :alt="user.username">
    </v-avatar>
    <v-card>
      <v-list>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img :src="user.avatar_url">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ user.name }}</v-list-tile-title>
            <v-list-tile-sub-title>@{{ user.username }}</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: "user-avatar-popover",
  props: {
    user: Object
  },
  data: () => ({
    menu: false
  }),
  mounted() {
    console.log(this.user);
  }
}
</script>

