<template>
  <v-list-item :href="item.target_url" target="_blank">
    <v-list-item-avatar @click.prevent="$router.push({ name: 'user', params: {name: item.author.username} })">
      <user-avatar :user="item.author"/>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>
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
      </v-list-item-title>
      <v-list-item-subtitle>
        <div class="ellipsis">
          {{ item.created_at | moment("calendar")}}
        </div>
      <v-list-item-subtitle class="ellipsis">{{ item.body }}</v-list-item-subtitle>
      </v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <div id="actions">
        <v-btn outlined fab small dark @click.prevent="markAsRead()">
          <v-icon>check</v-icon>
        </v-btn>
      </div>
    </v-list-item-action>
  </v-list-item>
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
