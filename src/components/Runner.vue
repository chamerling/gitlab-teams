<template>
<!--  Fix access to apiEndpoint-->
  <v-list-tile avatar :href="url" target="_blank">
    <v-list-tile-content>
      <v-list-tile-title id="name">
        <span>{{ item.name }}</span>
      </v-list-tile-title>
      <v-list-tile-sub-title>
        <span v-bind:class="statusColor" >{{ item.status }}</span> - {{ item.description }}
      </v-list-tile-sub-title>
    </v-list-tile-content>

    <v-list-tile-action v-if="!hideActions">
      <div id="actions">
      </div>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>

const STATUS_COLORS = {
  online: "status-green",
  offline: "status-red",
  paused: "status-yellow"
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
    statusColor: function() {
      return STATUS_COLORS[this.item.status];
    }
  },
  url: function() {
    return `${this.$store.state.settings.apiEndpoint}/runners/${this.item.id}`;
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
