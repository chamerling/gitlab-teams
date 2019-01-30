<template>
  <div>
    <template>
      <merge-requests :merge-requests="computedMergeRequests" v-if="displayComputed && computedMergeRequests.length"/>
      <template v-if="!displayComputed">
        <merge-requests :merge-requests="mergeRequests" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10"/>
      </template>
    </template>
    <template v-if="loading">
      <div class="text-xs-center pa-3">
        <v-progress-circular indeterminate></v-progress-circular>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import gitlab from "@/gitlab";
import MergeRequests from "@/components/MergeRequests.vue";

export default {
  data() {
    return {
      loading: false,
      nextPage: 1,
      displayComputed: false,
      mergeRequests: null
    };
  },
  created() {
    console.log('Created')
    this.fetchInitialData();
  },
  // prettier-ignore
  watch: {
    "$route": "fetchInitialData"
  },
  computed: {
    ...mapGetters({
      computedMergeRequests: "getMergeRequests"
    })
  },
  methods: {
    fetchMergeRequests({ page = 1, state}) {
      if (this.loading) {
        return;
      }

      this.loading = true;
      console.log('Fetch', page, state)

      return gitlab
        .get()
        .client.fetchMergeRequests({ state, page })
        .then(result => {
          if (result.data && result.data.length) {
            this.mergeRequests = this.mergeRequests.concat(result.data);
          }
          this.nextPage = result.headers['x-next-page'];
        })
        .finally(() => (this.loading = false));
    },
    hasMore() {
      return !!this.nextPage;
    },
    loadMore() {
      console.log('Load more', this.$route.params.state, this.nextPage)
      if (this.hasMore()) {
        this.fetchMergeRequests({ state: this.$route.params.state, page: this.nextPage })
      } else {
        console.log('No more data to fetch');
      }
    },
    fetchInitialData() {
      console.log('Fetch initial data', this.$route.params.state)
      this.nextPage = 1;

      if (
        this.$route.params.state &&
        ["closed", "merged"].includes(this.$route.params.state)
      ) {
        this.displayComputed = false;
        this.mergeRequests = [];
        this.fetchMergeRequests({ state: this.$route.params.state, page: this.nextPage });
      } else {
        this.loading = false;
        this.displayComputed = true;
      }
    }
  },
  components: {
    MergeRequests
  }
};
</script>
