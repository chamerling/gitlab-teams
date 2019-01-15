<template>
  <v-snackbar v-model="show" :timeout="snackbar.timeout">
    {{ snackbar.message }}
    <v-btn dark flat @click="snackbar.show = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Snackbar",
  computed: {
    show: {
    	get() {
      	return this.$store.state.snackbar.show;
      },
      set(value) {
      	this.$store.dispatch('showSnackbar', value);
      }
    },
    ...mapState(["snackbar"])
  }
};
</script>
