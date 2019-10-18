<template>
  <div>
    <div id="count" class="ma-1">
      <span class="font-weight-medium display-3">{{todosSize}}</span>
    </div>
    <v-tooltip bottom>
      <v-list slot="activator" v-if="todos.length" two-line dense>
        <todo :item="last"/>
      </v-list>
      <span v-if="last">Last todo: {{last.body}}</span>
    </v-tooltip>
  </div>
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
