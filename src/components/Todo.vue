<template>
  <v-list-tile avatar :href="item.target_url" target="_blank">
    <v-list-tile-avatar @click.prevent="$router.push({ name: 'user', params: {name: item.author.username} })">
      <user-avatar :user="item.author"/>
    </v-list-tile-avatar>

    <v-list-tile-content>
      <v-list-tile-title>
        <template v-if="item.action_name === 'assigned'">
          <template v-if="item.target_type === 'Issue'">
            {{ item.author.name || item.author.username }} assigned you the issue {{ getIssueAsText() }}
          </template>
          <template v-if="item.target_type === 'MergeRequest'">
            {{ item.author.name || item.author.username }} assigned you the merge request {{ getMergeRequestAsText() }}
          </template>
        </template>
        <template v-if="item.action_name === 'mentioned'">
          <template v-if="item.target_type === 'Issue'">
            {{ item.author.name || item.author.username }} mentioned you in the issue {{ getIssueAsText() }}
          </template>
          <template v-if="item.target_type === 'MergeRequest'">
            {{ item.author.name || item.author.username }} mentioned you the merge request {{ getMergeRequestAsText() }}
          </template>
        </template>
        <template v-if="item.action_name === 'build_failed'">
          Build failed
        </template>
        <template v-if="item.action_name === 'marked'">
          ?
        </template>
        <template v-if="item.action_name === 'approval_required'">
          <template v-if="item.target_type === 'MergeRequest'">
            {{ item.author.name || item.author.username }} require your approval in merge request {{ getMergeRequestAsText() }}
          </template>
          <template v-else>
            ?
          </template>
        </template>
        <template v-if="item.action_name === 'unmergeable'">
          <template v-if="item.target_type === 'MergeRequest'">
            {{ item.author.name || item.author.username }} marked the merge request as unmergeable in {{ getMergeRequestAsText() }}
          </template>
        </template>
        <template v-if="item.action_name === 'directly_addressed'">
          <template v-if="item.target_type === 'Issue'">
            {{ item.author.name || item.author.username }} directly addressed you in the issue {{ getIssueAsText() }}
          </template>
          <template v-if="item.target_type === 'MergeRequest'">
            {{ item.author.name || item.author.username }} directly addressed you in the merge request {{ getMergeRequestAsText() }}
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
    },
    getMergeRequestAsText() {
      return `${this.item.project.path}!${this.item.target.iid}`;
    },
    getIssueAsText() {
      return `${this.item.project.path}#${this.item.target.iid}`;
    }
  },
  components: {
    "user-avatar": UserAvatarPopover
  }
};
</script>

<style lang="stylus" scoped>
  #actions {
    display: flex
    align-items: center
  }

  .v-icon {
    padding-right: 3px
  }
</style>
