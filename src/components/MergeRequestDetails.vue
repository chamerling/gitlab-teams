<template>
  <div>
    <template v-if="loaded">
      <v-list>
        <v-list-tile v-for="commit in commits" :key="commit.id">
          <v-list-tile-avatar>
            <v-avatar size="32" slot="activator">
              <img :src="commit.avatar_url">
            </v-avatar>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>
              <v-tooltip bottom>
                <a slot="activator" class="mr-1" @click="copySha(commit)">{{ commit.short_id }}</a>
                <span>{{ $t("generic.click_to_copy") }}</span>
              </v-tooltip>
              <span>{{ commit.title }}</span>
            </v-list-tile-title>
            <v-list-tile-sub-title>
              <span class="green--text font-weight-medium">+{{ commit.stats.additions }}</span>
              <span class="ml-2 red--text font-weight-medium">-{{  commit.stats.deletions }}</span>
            </v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </template>
    <template v-else>
      <div class="text-xs-center">
        <v-progress-circular indeterminate></v-progress-circular>
      </div>
    </template>
  </div>
</template>

<script>
import gitlab from "@/gitlab";

export default {
  name: "MergeRequestDetails",
  props: {
    mr: Object
  },
  data() {
    return {
      loaded: false,
      commits: []
    };
  },
  methods: {
    copySha(commit) {
      this.$copyText(commit.id)
        .then(() =>
          this.$store.dispatch(
            "displaySnackbarMessage",
            this.$t("generic.sha_copied")
          )
        )
        .catch(() => {
          /* TODO */
        });
    },

    getCommits() {
      return gitlab.get().client.getCommitsForMergeRequest(this.mr);
    },

    getAllCommitsDetails(commits) {
      return Promise.all(
        commits.map(commit =>
          this.getCommit({ project_id: this.mr.project_id, sha: commit.id })
        )
      );
    },

    getCommit({ project_id, sha }) {
      return gitlab
        .get()
        .client.getCommit({ project_id, sha })
        .then(commit => {
          return this.getAvatarUrl(commit).then(url => {
            commit.avatar_url = url;

            return commit;
          });
        });
    },

    getAvatarUrl(commit) {
      return gitlab
        .get()
        .client.getAvatarUrl(commit.author_email)
        .then(url => url.avatar_url);
    }
  },
  mounted() {
    this.getCommits()
      .then(commits => this.getAllCommitsDetails(commits))
      .then(commits => {
        this.commits = commits;
      })
      .catch(() => {})
      .finally(() => (this.loaded = true));
  },
  components: {}
};
</script>
