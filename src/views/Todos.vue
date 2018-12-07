<template>
    <v-list two-line dark>
      <template v-for="(todo, index) in todos">
        <todo :item="todo" :key="todo.id"/>
        <v-divider v-if="index + 1 < todos.length" :key="index" ></v-divider>
      </template>
    </v-list>
</template>

<script>
import { mapGetters } from "vuex";
import Todo from "@/components/Todo.vue";
import store from "@/store";

export default {
  name: "todos",
  components: {
    Todo
  },
  computed: {
    ...mapGetters({
      todos: "getTodos"
    })
  }
};
</script>
