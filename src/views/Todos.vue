<template>
  <div class="todos">
    <v-layout align-center justify-end row fill-height ma-2>
      <v-btn v-if="todosSize" outline @click="markAllAsRead()">
        Mark all as done
        <v-icon right>done_all</v-icon>
      </v-btn>
    </v-layout>
    <v-list v-if="todosSize" two-line dark>
      <template v-for="(todo, index) in todos">
        <todo :item="todo" :key="todo.id"/>
        <v-divider v-if="index + 1 < todos.length" :key="index" ></v-divider>
      </template>
    </v-list>
    <v-layout v-else ma-4>
      <v-flex>
        <span>Looks like you do not have anything to do...</span>
      </v-flex>
    </v-layout>
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
      todos: "getTodos",
      todosSize: "getTodosSize"
    })
  },
  methods: {
    markAllAsRead: function() {
      this.$store.dispatch("markAllTodosAsDone");
    }
  }
};
</script>
