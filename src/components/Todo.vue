<template>
  <v-list-tile avatar :href="item.target_url" target="_blank">
    <v-list-tile-avatar @click.prevent="$router.push({ name: 'user', params: {name: item.author.username} })">
      <user-avatar :user="item.author"/>
    </v-list-tile-avatar>

    <v-list-tile-content>
      <v-list-tile-title>
        <template v-if="item.action_name === 'assigned'">
          <template v-if="item.target_type === 'Issue'">
            {{ $t("todos.issues.assigned", { user, issue }) }}
          </template>
          <template v-if="item.target_type === 'MergeRequest'">
            {{ $t("todos.merge_requests.assigned", { user, mergeRequest }) }}
          </template>
        </template>
        <template v-if="item.action_name === 'mentioned'">
          <template v-if="item.target_type === 'Issue'">
            {{ $t("todos.issues.mentioned", { user, issue }) }}
          </template>
          <template v-if="item.target_type === 'MergeRequest'">
            {{ $t("todos.merge_requests.mentioned", { user, issue }) }}
          </template>
        </template>
        <template v-if="item.action_name === 'build_failed'">
          {{ $t("todos.build_failed") }}
        </template>
        <template v-if="item.action_name === 'marked'">
          ?
        </template>
        <template v-if="item.action_name === 'approval_required'">
          <template v-if="item.target_type === 'MergeRequest'">
            {{ $t("todos.merge_requests.requires_approval", { user, issue }) }}
          </template>
          <template v-else>
            ?
          </template>
        </template>
        <template v-if="item.action_name === 'unmergeable'">
          <template v-if="item.target_type === 'MergeRequest'">
            {{ $t("todos.merge_requests.unmergeable", { user, issue }) }}
          </template>
        </template>
        <template v-if="item.action_name === 'directly_addressed'">
          <template v-if="item.target_type === 'Issue'">
            {{ $t("todos.issues.directly_addressed", { user, issue }) }}

          </template>
          <template v-if="item.target_type === 'MergeRequest'">
            {{ $t("todos.merge_requests.directly_addressed", { user, issue }) }}
          </template>
        </template>
      </v-list-tile-title>
      <v-list-tile-sub-title>
        <div class="ellipsis">
          {{ item.created_at | moment("calendar")}}
        </div>
      <v-list-tile-sub-title class="ellipsis">{{ item.body }}</v-list-tile-sub-title>
      </v-list-tile-sub-title>
    </v-list-tile-content>

    <v-list-tile-action>
      <div id="actions">
        <v-btn outline fab small dark @click.prevent="markAsRead()">
          <v-icon>check</v-icon>
        </v-btn>
      </div>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
import UserAvatarPopover from "./UserAvatarPopover.vue";

export default {
  name: "Todo",
  props: {
    item: Object
  },
  methods: {
    markAsRead: function() {
      this.$store.dispatch("markTodoAsDone", this.item);
    }
  },
  computed: {
    issue() {
      return `${this.item.project.path}#${this.item.target.iid}`;
    },
    user() {
      return this.item.author.name || this.item.author.username;
    },
    mergeRequest() {
      return `${this.item.project.path}!${this.item.target.iid}`;
    }
  },
  components: {
    "user-avatar": UserAvatarPopover
  }
};
</script>

<style lang="stylus" scoped>
  #actions {
    display: flex;
    align-items: center;
  }

  .v-icon {
    padding-right: 3px;
  }
</style>
