<template>
  <div class="todos">
    <todo v-for="todo in todos" :item="todo" :key="todo.id"/>
  </div>
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
