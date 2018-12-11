import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Settings from "./views/Settings.vue";
import Team from "./views/Team.vue";
import Todos from "./views/Todos.vue";
import User from "./views/User.vue";
import CreateTeam from "@/views/CreateTeam.vue";

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
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
