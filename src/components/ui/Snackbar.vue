<template>
  <v-snackbar v-model="show" :timeout="ui.snackbar.timeout">
    {{ ui.snackbar.message }}
    <v-btn dark flat @click="show = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Snackbar",
  computed: {
    show: {
      get() {
        return this.$store.state.ui.snackbar.show;
      },
      set(value) {
        this.$store.dispatch("showSnackbar", value);
      }
    },
    ...mapState(["ui"])
  }
};
</script>
