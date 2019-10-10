<template>
  <v-avatar :color="getColor()" :size="size">
    <img v-if="icon" :src="icon" :alt="name">
    <span v-else class="white--text headline">{{name[0].toUpperCase()}}</span>
  </v-avatar>
</template>

<script>
const COLORS = [
  "#d32f2f",
  "#C2185B",
  "#7B1FA2",
  "#512DA8",
  "#303F9F",
  "#1976D2",
  "#0288D1",
  "#0097A7",
  "#00796B",
  "#388E3C",
  "#689F38",
  "#AFB42B",
  "#FBC02D",
  "#FFA000",
  "#F57C00",
  "#E64A19",
  "#5D4037",
  "#616161",
  "#455A64"
];

export default {
  name: "ProjectAvatar",
  props: {
    icon: {
      type: String,
      default: null
    },
    name: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      default: 36
    }
  },
  methods: {
    getColor() {
      if (this.icon) {
        return;
      }

      const length = this.name.length;
      if (!length || length === 1) {
        return COLORS[0];
      }

      const sum =
        this.name.charCodeAt(length - 1) + this.name.charCodeAt(length - 2);

      return COLORS[sum % COLORS.length];
    }
  }
};
</script>
