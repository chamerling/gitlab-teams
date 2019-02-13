<template>
  <v-card height="250">
    <v-card-title>
      <v-icon large left>people</v-icon>
      <span class="title font-weight-light">Teams</span>
    </v-card-title>
    <v-card-text>
      <div id="teams" class="ma-3">
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    todos: Array
  }
}
</script>

<style scoped>
  #teams {
    display: flex;
    align-items: center;
    justify-content: center
  }
</style>

