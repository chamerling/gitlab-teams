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
            <v-icon v-if="value.field  === option.value">
              {{ value.order === "asc" ? "arrow_upward" : "arrow_downward" }}
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

      if (option.value === this.value.field) {
        newValue.order = this.value.order === "asc" ? "desc" : "asc";
      } else {
        newValue.field = option.value;
        newValue.order = "desc";
      }

      this.$emit("input", newValue);
    }
  }
};
</script>
