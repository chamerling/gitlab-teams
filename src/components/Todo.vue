<template>
  <v-list-tile avatar :href="item.target_url" target="_blank">
    <v-list-tile-avatar @click.prevent="$router.push({ name: 'user', params: {name: item.author.username} })">
      <user-avatar :user="item.author"/>
    </v-list-tile-avatar>

    <v-list-tile-content>
      <v-list-tile-title>{{ item.author.name || item.author.username }} {{ item.action_name }} you in {{ item.target_type }}</v-list-tile-title>
      <v-list-tile-sub-title>
        <div id="subtitle">
          {{ item.created_at | moment("calendar")}}
        </div>
      </v-list-tile-sub-title>
    </v-list-tile-content>

    <v-list-tile-action>
      <div id="actions">
        <v-btn color="primary" fab small dark @click.prevent="markAsRead()">
          <v-icon>check</v-icon>
        </v-btn>
      </div>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
import { mapGetters } from "vuex";
import UserAvatarPopover from "./UserAvatarPopover.vue";

export default {
  name: "Todo",
  props: {
    item: Object
  },
  computed: {
  },
  methods: {
    markAsRead: function() {
      this.$store.dispatch("markTodoAsDone", this.item);
    }
  },
  components: {
    "user-avatar": UserAvatarPopover
  }
};
</script>

<style lang="stylus" scoped>
  #subtitle {
    display: flex
    align-items: center
  }

  #actions {
    display: flex
    align-items: center
  }

  .v-icon {
    padding-right: 3px
  }
</style>
