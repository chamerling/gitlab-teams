<template>
  <div class="todos">
    <v-layout align-center justify-end row fill-height ma-2>
      <v-btn v-if="todosSize" outline @click="markAllAsRead()">
        Mark all as done
        <v-icon right>done_all</v-icon>
      </v-btn>
    </v-layout>
    <v-list v-if="todosSize" two-line>
      <template v-for="(todo, index) in todos">
        <todo :item="todo" :key="todo.id"/>
        <v-divider v-if="index + 1 < todos.length" :key="index" ></v-divider>
      </template>
    </v-list>
    <v-layout v-else ma-4>
      <empty-message
        message="Looks like you do not have anything to do..."
        icon="list"
        icon-size="100"
        font-size="display-1"
      ></empty-message>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Todo from "@/components/Todo.vue";
import EmptyMessage from "@/components/EmptyMessage.vue";

export default {
  name: "todos",
  components: {
    Todo,
    EmptyMessage
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
