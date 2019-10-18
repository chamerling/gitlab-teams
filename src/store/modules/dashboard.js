import Vue from "vue";
const LOCALSTORAGE_KEY = "gitab-teams.dashboards";

const state = {
  dashboards: JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || "{}")
};

const actions = {
  setCardsOrder({ commit }, { name, cards }) {
    commit("setOrder", { name, cards });
  }
};

const mutations = {
  setOrder({ dashboards }, { name, cards }) {
    Vue.set(dashboards, name, cards);
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(state.dashboards));
  }
};

const getters = {
  getDashboard: state => name => state.dashboards[name] || {}
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
