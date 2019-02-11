import _ from "lodash";
import Vue from "vue";
import gitlab from "@/gitlab";

const state = {
  todos: {},
  todoSize: 0
};

const actions = {
  addTodo({ commit }, todo) {
    commit("addTodo", todo);
  },

  removeTodo({ commit }, todo) {
    commit("removeTodo", todo);
  },

  updateTodo({ commit }, todo) {
    commit("updateTodo", todo);
  },

  markTodoAsDone({ dispatch, state }, todo) {
    const gl = gitlab.get();

    return gl.client.markTodoAsDone(todo).then(() => {
      dispatch("removeTodo", todo);
      dispatch("setTodoSize", --state.todoSize);
    });
  },

  markAllTodosAsDone({ commit, dispatch }) {
    const gl = gitlab.get();

    return gl.client.markAllTodosAsDone().then(() => {
      dispatch("setTodoSize", 0);
      commit("setTodos", {});
    });
  },

  setTodoSize({ commit }, size) {
    commit("setTodoSize", size);
  },

  setTodos(state, todos) {
    state.todos = todos;
  }
};

const mutations = {
  addTodo({ todos }, todo) {
    Vue.set(todos, todo.id, todo);
  },

  removeTodo({ todos }, todo) {
    Vue.delete(todos, todo.id);
  },

  setTodoSize(state, size) {
    state.todoSize = parseInt(size);
  }
};

const getters = {
  getTodos({ todos }) {
    return _.orderBy(Object.values(todos), "created_at", "desc");
  },

  getTodosSize({ todoSize, todos }) {
    return todoSize || (Object.values(todos) || []).length;
  }
};

export default {
  namespaced: false,
  state,
  getters,
  actions,
  mutations
};
