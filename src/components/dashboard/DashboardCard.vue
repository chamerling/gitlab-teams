<template>
  <div :style="{ width: `${width}px` }" class="card" :id="id">
    <v-card :color="card.color" :width="width" hover raised>
      <v-card-title class="head-drag">
        <v-icon v-if="card.icon" large left>{{card.icon}}</v-icon>
        <span
          v-if="title"
          class="title font-weight-light ml-2"
        >
          {{title}}
        </span>
        <v-spacer/>
        <v-progress-circular v-if="loading" indeterminate :size="20" :width="3" color="primary"></v-progress-circular>
        <v-menu lazy bottom offset-y>
          <v-btn slot="activator" flat icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile>
              <v-list-tile-title class="pr-5">Width</v-list-tile-title>
              <v-list-tile-action class="width-buttons">
                <v-btn icon flat :disabled="!canDecrease" @click="decreaseSize">
                  <v-icon>remove</v-icon>
                </v-btn>
                <v-btn icon flat :disabled="!canIncrease" @click="increaseSize">
                  <v-icon>add</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile disabled @click="remove()">
              <v-list-tile-title>Remove</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-card-title>
      <v-card-text :style="{ height: `${height}px` }">
        <component
          :is="card.component"
          :id="card.id"
          v-bind="card.props"
          @loading="onLoading"
          @updateTitle="onTitleUpdate"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
const MAX_COLUMNS = 3;
const COLUMN_WIDTH = 400;

export default {
  name: "DashboardCard",
  props: {
    id: String,
    card: {
      type: Object,
      required: true
    },
    height: {
      type: Number
    }
  },
  data: () => ({
    loading: false,
    updatedTitle: null,
    columns: 1
  }),
  methods: {
    onLoading(value) {
      this.loading = value;
    },
    onTitleUpdate(value) {
      this.updatedTitle = value;
    },
    remove() {
      this.$emit("deleted");
    },
    increaseSize() {
      this.columns++;
      this.setNewSize();
    },
    decreaseSize() {
      this.columns--;
      this.setNewSize();
    },
    setNewSize() {
      this.$emit("size", { card: this.card, columns: this.columns });
    }
  },
  computed: {
    width() {
      return COLUMN_WIDTH * this.columns + 30 * (this.columns - 1);
    },
    canDecrease() {
      return this.columns > 1;
    },
    canIncrease() {
      return this.columns === 1 || this.columns < MAX_COLUMNS;
    },
    title() {
      return this.updatedTitle || this.card.title;
    }
  },
  mounted() {
    this.columns = this.card.columns || 1;
  }
};
</script>

<style lang="stylus" scoped>
.card {
  min-width: 400px;
  min-height: 150px;
  margin: 15px;
  position: absolute;
  z-index: 1;

  .v-card {
    overflow-x: hidden;
    .v-toolbar__title {
      font-weight: normal;
      text-transform: capitalize;
    }
    .v-toolbar--absolute {
      background-color: transparent!important;
    }
    .subheading {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      max-width: 100%;
    }
    .head-drag {
      cursor: grab;
    }
    >>> .scroller {
      max-height: 302px;
      overflow-y: auto;
    }
  }
}

.width-buttons {
  flex-direction: row;
  align-items: center;
}

.muuri-item-dragging {
  z-index: 3 !important;
  .head-drag {
    cursor: grabbing!important;
  }
}

.muuri-item-releasing {
  z-index: 2 !important;
}

.muuri-item-hidden {
  z-index: 0 !important;
}
</style>
