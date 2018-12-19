<template>
  <v-list-tile avatar :href="item.web_url" target="_blank">
    <v-list-tile-avatar @click.prevent="$router.push({ name: 'user', params: {name: item.author.username} })">
      <user-avatar :user="item.author"/>
    </v-list-tile-avatar>

    <v-list-tile-content>
      <v-list-tile-title id="title">
        <span>{{ item.title }}</span>
      </v-list-tile-title>
      <v-list-tile-sub-title>
        <span class="state">{{ getState() }}</span> - Created {{ item.created_at | moment("calendar")}} - Updated {{ item.updated_at | moment('calendar')}}
      </v-list-tile-sub-title>
      <v-list-tile-sub-title>
        <div id="subtitle">
          {{ getProject(item.project_id).name }}#{{ item.iid }}
          <div class="ml-1" v-for="assignee in item.assignees" :key="assignee.id">
            <v-tooltip bottom>
            <v-avatar size="16" slot="activator">
              <img :src="assignee.avatar_url" :alt="assignee.username">
            </v-avatar>
            <span>Assigned to {{assignee.name}}</span>
            </v-tooltip>
          </div>
          <v-chip v-for="label in item.labels" :key="label" color="orange" small text-color="white">{{ label }}</v-chip>
        </div>
      </v-list-tile-sub-title>
    </v-list-tile-content>

    <v-list-tile-action>
      <div id="actions">
        <v-badge class="pr-2" overlap left color="orange">
          <span slot="badge">{{ item.user_notes_count }}</span>
          <v-icon>chat</v-icon>
        </v-badge>
        <v-badge class="pr-2" overlap left color="orange">
          <span slot="badge">{{ item.upvotes }}</span>
          <v-icon>thumb_up</v-icon>
        </v-badge>
        <v-badge class="pr-2" overlap left color="orange">
          <span slot="badge">{{ item.downvotes }}</span>
          <v-icon>thumb_down</v-icon>
        </v-badge>
      </div>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
import { mapGetters } from "vuex";
import UserAvatarPopover from "./UserAvatarPopover.vue";

const states = {
  opened: 'open',
  closed: 'closed'
};

export default {
  name: "Issue",
  props: {
    item: Object
  },
  computed: {
    ...mapGetters({
      getProject: "getProject"
    })
  },
  methods: {
    getState() {
      return states[this.item.state];
    }
  },
  components: {
    "user-avatar": UserAvatarPopover
  }
};
</script>

<style lang="stylus" scoped>
  #subtitle, #title {
    display: flex
    align-items: center

    .v-chip--small {
      height: 16px;
    }
  }

  #actions {
    display: flex
    align-items: center
  }

  .state {
    text-transform: capitalize;
  }

  .v-icon {
    padding-right: 3px
  }
</style>
