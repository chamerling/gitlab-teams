<template>
<!--  Fix access to apiEndpoint-->
  <v-list-tile avatar :href="'https://ci.linagora.com/api/v4/runners/' + item.id" target="_blank">
    <v-list-tile-content>
      <v-list-tile-title id="name">
        <span>{{ item.name }}</span>
      </v-list-tile-title>
    </v-list-tile-content>

    <v-list-tile-action v-if="!hideActions">
      <div id="actions">
      </div>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>

export default {
  name: "Runner",
  props: {
    item: Object,
    hideActions: {
      type: Boolean,
      default: false
    }
  },
  computed: {
  },
  methods: {
  },
  components: {
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
