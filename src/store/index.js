import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";
import actions from "@/store/actions";
import getters from "@/store/getters";
import mutations from "@/store/mutations";
import state from "@/store/state";
import oauth from "@/store/modules/oauth";

const plugins = process.env.NODE_ENV !== "production" ? [createLogger()] : [];

Vue.use(Vuex);

export default new Vuex.Store({
  plugins,
  state,
  getters,
  mutations,
  actions,
  modules: {
    oauth
  }
});
