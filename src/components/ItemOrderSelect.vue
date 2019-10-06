<template>
    <v-menu absolute offset-y :close-on-content-click="false">
      <v-btn flat icon slot="activator">
        <v-icon>sort</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile
          v-for="(option, index) in options"
          :key="index"
          @click="setValue(option)"
        >
          <v-list-tile-action>
            <v-icon :class="{
              'sort-icon': true,
              [value.order]: option.field === value.field
            }">
              arrow_upward
            </v-icon>
          </v-list-tile-action>
          <v-list-tile-title>{{ option.label }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
</template>

<script>
export default {
  props: {
    value: Object,
    options: Array
  },
  methods: {
    setValue(option) {
      let newValue = { ...this.value };

      if (option.field === this.value.field) {
        newValue.order = this.value.order === "asc" ? "desc" : "asc";
      } else {
        newValue = {
          field: option.field,
          order: "desc"
        };
      }

      this.$emit("input", newValue);
    }
  }
};
</script>

<style lang="stylus" scoped>
  .sort-icon {
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  }

  .asc {
    opacity: 1;
    transform: none;
  }

  .desc {
    opacity: 1;
    transform: rotate(-180 deg);
  }
</style>
