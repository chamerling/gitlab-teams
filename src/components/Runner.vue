<template>
<!--  Fix access to apiEndpoint-->
  <v-list-tile avatar :href="'https://ci.linagora.com/api/v4/runners/' + item.id" target="_blank">
    <v-list-tile-content>
      <v-list-tile-title id="name">
        <span>{{ item.name }}</span>
      </v-list-tile-title>
      <v-list-tile-sub-title v-if="getStatus() === 'online'">
        <span class="status-green">{{ getStatus() }}</span> - {{ item.description }}
      </v-list-tile-sub-title>
      <v-list-tile-sub-title v-else-if="getStatus() === 'offline'">
        <span class="status-red">{{ getStatus() }}</span> - {{ item.description }}
      </v-list-tile-sub-title>
      <v-list-tile-sub-title v-else>
        <span class="status-yellow">{{ getStatus() }}</span> - {{ item.description }}
      </v-list-tile-sub-title>
    </v-list-tile-content>

    <v-list-tile-action v-if="!hideActions">
      <div id="actions">
      </div>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>

const status = {
  online: "online",
  offline: "offline",
  paused: "paused"
};

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
    getStatus() {
      return status[this.item.status];
    }
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

  .status-green {
    text-transform: capitalize;
    color: green;
  }

  .status-red {
    text-transform: capitalize;
    color: red;
  }

  .status-yellow {
    text-transform: capitalize;
    color: yellow;
  }

  .v-icon {
    padding-right: 3px
  }
</style>
