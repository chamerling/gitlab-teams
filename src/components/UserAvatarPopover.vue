<template>
  <v-menu
    v-model="menu"
    open-on-hover
    :close-on-content-click="false"
    :nudge-width="200"
    offset-y
    bottom
  >
    <v-avatar :size="size" slot="activator">
      <img :src="user.avatar_url" :alt="user.username">
    </v-avatar>
    <v-card>
      <v-list>
        <v-list-tile>
          <v-list-tile-avatar>
            <img :src="user.avatar_url">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ user.name }}</v-list-tile-title>
            <v-list-tile-subtitle>@{{ user.username }}</v-list-tile-subtitle>
            <v-list-tile-subtitle><slot></slot></v-list-tile-subtitle>
          </v-list-tile-content>

          <v-list-tile-action>
            <slot name="action"></slot>
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
    user: Object,
    size: {
      type: Number,
      default: 48
    }
  },
  data: () => ({
    menu: false
  }),
  mounted() {}
};
</script>
