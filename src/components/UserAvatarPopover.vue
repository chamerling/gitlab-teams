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
        <v-list-item>
          <v-list-item-avatar>
            <img :src="user.avatar_url">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ user.name }}</v-list-item-title>
            <v-list-item-subtitle>@{{ user.username }}</v-list-item-subtitle>
            <v-list-item-subtitle><slot></slot></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <slot name="action"></slot>
          </v-list-item-action>
        </v-list-item>
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
