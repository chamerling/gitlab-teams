import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import Settings from "@/views/Settings.vue";
import Team from "@/views/Team.vue";
import Todos from "@/views/Todos.vue";
import User from "@/views/User.vue";
import NewOAuthToken from "@/views/NewOAuthToken";
import CreateTeam from "@/views/CreateTeam.vue";
import { constants } from "@/store/utils";

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/todo",
      name: "todo",
      component: Todos
    },
    {
      path: constants.OAUTH_REDIRECT_PATH,
      component: NewOAuthToken,
      beforeEnter(to, from, next) {
        // Gitlab API redirects with parameters passed in the hash
        // see https://docs.gitlab.com/ee/api/oauth2.html#1-requesting-access-token
        if (to.hash.length >= 1) {
          next(`${constants.OAUTH_REDIRECT_PATH}?${to.hash.slice(1)}`);
        }
        next();
      },
      props: route => ({
        accessToken: route.query.access_token,
        state: route.query.state,
        tokenType: route.query.token_type,
        expiresIn: route.query.expires_in
      })
    },
    {
      path: "/team/:name",
      name: "team",
      component: Team
    },
    {
      path: "/user/:name",
      name: "user",
      component: User
    },
    {
      path: "/settings",
      name: "settings",
      component: Settings
    },
    {
      path: "/settings/team/create",
      name: "create-team",
      component: CreateTeam
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "@/views/About.vue")
    }
  ]
});
