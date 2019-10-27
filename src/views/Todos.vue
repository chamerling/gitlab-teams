<template>
  <div class="todos">
    <v-layout align-center justify-end row fill-height ma-2>
      <v-btn v-if="todosSize" outline @click="markAllAsRead()">
        Mark all as done
        <v-icon right>done_all</v-icon>
      </v-btn>
    </v-layout>
    <v-list v-if="todosSize" two-line
      v-infinite-scroll="loadMore" infinite-scroll-disabled="isDataLoading" infinite-scroll-distance="10">
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
import { mapGetters, mapActions } from "vuex";
import Todo from "@/components/Todo.vue";
import infiniteScroll from 'vue-infinite-scroll';

export default {
  name: "todos",
  components: {
    Todo
  },
  directives: {infiniteScroll},
  computed: {
    ...mapGetters({
      todos: "getTodos",
      todosSize: "getTodosSize",
      isDataLoading: "isDataLoading"
    })
  },
  methods: {
    ...mapActions(['loadNexPageTodos']),
    markAllAsRead: function() {
      this.$store.dispatch("markAllTodosAsDone");
    },
    loadMore(){
      this.loadNexPageTodos();
    }
  }
};
</script>
