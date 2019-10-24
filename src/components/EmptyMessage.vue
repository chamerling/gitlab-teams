<template>
  <v-flex xs12 md6 class="empty-message"   style="margin:auto"   :color="(darkMode) ? `grey darken-2` : `grey lighten-4`">
    <v-layout row fill-height>
      <v-flex xs12>
        <v-icon :size="iconSize"  :color="(darkMode) ? `grey darken-2` : `grey lighten-4`">{{ icon }}</v-icon>
      </v-flex>
    </v-layout>
    <v-layout row fill-height>
      <v-flex xs12>
        <span class="text-xs-center" :class="fontSize">{{ message }}</span>
      </v-flex>
    </v-layout>
  </v-flex>
</template>

<script>
export default {
  name: "EmptyMessage",
  props: {
    icon: {
      type: String,
      required: true
    },
    iconSize: {
      type: String,
      required: true
    },
    fontSize: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  computed: {
    darkMode() {
      return this.$store.state.settings.darkMode;
    }
  }
};
</script>
<style lang="css" scoped>
.empty-message{
  margin: auto;
  text-align: center;
  border: 3px solid;
  border-style: dashed;
  padding: 5%;
}
</style>
