<template>
  <v-card height="250">
    <v-card-title>
      <v-icon large left>list</v-icon>
      <span class="title font-weight-light ml-2">{{ $t("todos.title") }}</span>
    </v-card-title>
    <v-card-text>
      <div id="count" class="ma-1">
        <span class="font-weight-medium display-3">{{todosSize}}</span>
      </div>
      <v-tooltip bottom>
        <v-list slot="activator" v-if="todos.length" two-line dense>
          <todo :item="last"/>
        </v-list>
        <span v-if="last">{{ $t("todos.last_todo") }}: {{last.body}}</span>
      </v-tooltip>
    </v-card-text>
  </v-card>
</template>

<script>
import { head } from "lodash";
import Todo from "@/components/Todo.vue";

export default {
  props: {
    todos: Array,
    todosSize: Number
  },
  computed: {
    last() {
      return head(this.todos);
    }
  },
  components: {
    Todo
  }
};
</script>

<style scoped>
#count {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
