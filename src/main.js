import "vuetify/dist/vuetify.min.css";
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
import i18n from "./i18n";

Vue.config.productionTip = false;
Vue.use(Vuetify, { theme: style });
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
  i18n,
  render: h => h(App)
}).$mount("#app");
