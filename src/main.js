import "vuetify/dist/vuetify.min.css";
import VueMoment from "vue-moment";
import Vuetify from "vuetify";
import VueAnalytics from "vue-analytics";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import gitlab from "./gitlab";

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(VueMoment);

if (process.env.VUE_APP_GA) {
  Vue.use(VueAnalytics, {
    id: process.env.VUE_APP_GA
  });
}

gitlab.init(store);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
