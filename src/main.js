import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";
import VueMoment from "vue-moment";
import Vuetify from "vuetify";
import VueAnalytics from "vue-analytics";
import VueClipboard from "vue-clipboard2";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import gitlab from "./gitlab";
import style from "./style";
import notification from "./notification";

Vue.config.productionTip = false;
const opts = {
  theme: {
    dark: true
  }
};
Vue.use(Vuetify);
Vue.use(VueMoment);
Vue.use(VueClipboard);

if (process.env.VUE_APP_GA) {
  Vue.use(VueAnalytics, {
    id: process.env.VUE_APP_GA,
    router
  });
}

gitlab.init(store);
notification.init(store);

new Vue({
  router,
  store,
  vuetify: new Vuetify(opts),
  render: h => h(App)
}).$mount("#app");
