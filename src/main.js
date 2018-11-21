import "vuetify/dist/vuetify.min.css";
import VueMoment from "vue-moment";
import Vuetify from "vuetify";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import gitlab from "./gitlab";

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(VueMoment);

gitlab.init(store);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
