<template>
    <v-dialog v-model="showDialog" width="500">
      <v-card>
        <v-toolbar dark>
          <v-btn icon dark @click="showDialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title class="white--text">Create a new team</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <CreateTeam @close="showDialog = false" />
        </v-card-text>
      </v-card>
    </v-dialog>
</template>

<script>
import CreateTeam from "@/components/CreateTeam.vue";

export default {
  props: {
    show: Boolean
  },
  computed: {
    showDialog: {
      get() {
        return this.show;
      },
      set(show) {
        this.$emit("close", show);
      }
    }
  },
  components: {
    CreateTeam
  }
};
</script>
