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
       <v-flex xs12 md6 class="empty-message" style="margin:auto"  >
        <v-layout
           row fill-height
        >
        <v-flex xs12 >
          <v-icon size="100"  :color="(darkMode) ? `grey darken-2` : `grey lighten-4`">list</v-icon>
        </v-flex> 
        </v-layout>
        <v-layout
          row fill-height
        >
        <v-flex xs12 > 
          <span class="text-xs-center display-1">Looks like you do not have anything to do...</span>
        </v-flex> 
        </v-layout>
       
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Todo from "@/components/Todo.vue";

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
<style lang="css" scoped>
  .empty-message{
    margin: auto;
    text-align: center;
    border: 3px solid currentColor;
    border-style: dashed;
    padding: 5%;
  }
</style>
