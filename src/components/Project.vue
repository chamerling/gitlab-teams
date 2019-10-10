<template>
  <v-list-tile avatar :href="web_url" target="_blank">
    <v-list-tile-avatar>
      <v-img id="avatar" v-if="avatar_url" :src="avatar_url"></v-img>
    </v-list-tile-avatar>

    <v-list-tile-content>
      <v-list-tile-title id="title">
        <span>{{ name_with_namespace }}</span>
        <v-icon small class="ml-1" v-if="isPrivate">lock</v-icon>
        <v-icon small class="ml-1" v-else>lock_open</v-icon>
      </v-list-tile-title>
      <v-list-tile-sub-title>{{description}}</v-list-tile-sub-title>

      <v-list-tile-sub-title>
        <span>Updated at {{last_activity_at | moment("calendar")}}</span>
        <v-chip small outline v-if="isOwner">
          <span>Owner</span>
        </v-chip>
      </v-list-tile-sub-title>
    </v-list-tile-content>

    <v-list-tile-action>
      <div id="actions" v-if="$vuetify.breakpoint.mdAndUp">
        <v-badge class="pr-2" overlap left>
          <span slot="badge">{{ star_count }}</span>
          <v-icon>star</v-icon>
        </v-badge>
        <v-badge class="pr-2" overlap left>
          <span slot="badge">{{ forks_count }}</span>
          <v-icon>merge_type</v-icon>
        </v-badge>
        <v-badge class="pr-2" overlap left>
          <span slot="badge">{{ open_issues_count }}</span>
          <v-icon>error_outline</v-icon>
        </v-badge>
      </div>
      <div v-else>
        <v-menu offset-y min-width="150">
          <v-btn icon ripple slot="activator" @click.native.prevent>
            <v-icon color="grey darken-1">more_vert</v-icon>
          </v-btn>
          <div>
            <v-list>
              <v-list-tile>
                <v-badge class="pr-2" overlap left>
                  <span slot="badge">{{ star_count }}</span>
                  <v-icon>star</v-icon>
                </v-badge>
                <v-badge class="pr-2" overlap left>
                  <span slot="badge">{{ forks_count }}</span>
                  <v-icon>merge_type</v-icon>
                </v-badge>
                <v-badge class="pr-2" overlap left>
                  <span slot="badge">{{ open_issues_count }}</span>
                  <v-icon>error_outline</v-icon>
                </v-badge>
              </v-list-tile>
            </v-list>
          </div>
        </v-menu>
      </div>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "project",
  props: {
    name_with_namespace: {
      type: String
    },
    description: {
      type: String
    },
    star_count: {
      type: Number
    },
    forks_count: {
      type: Number
    },
    open_issues_count: {
      type: Number
    },
    visibility: {
      type: String
    },
    last_activity_at: {
      type: String
    },
    web_url: {
      type: String
    },
    creator_id: {
      type: Number
    },
    avatar_url: {
      type: String
    }
  },
  computed: {
    ...mapGetters({
      connectedUser: "getConnectedUser"
    }),
    isPrivate() {
      return this.visibility === "private";
    },
    isOwner() {
      return this.creator_id === this.connectedUser.id;
    }
  }
};
</script>

<style lang="stylus" scoped>
.v-icon {
  padding-right: 3px;
}

.v-chip {
  margin: 0 1em;
}
</style>
