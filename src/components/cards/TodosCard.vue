<template>
  <v-card height="250">
    <v-card-title>
      <v-icon large left>list</v-icon>
      <span class="title font-weight-light">Todos</span>
    </v-card-title>
    <v-card-text>
      <div id="count" class="ma-3">
        <span class="font-weight-medium display-3">{{todos ? todos.length : 0}}</span>
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
  #count {
    display: flex;
    align-items: center;
    justify-content: center
  }
</style>

