import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Settings from "./views/Settings.vue";
import Team from "./views/Team.vue";
import Todos from "./views/Todos.vue";
import Issues from "./views/Issues.vue";
import Runners from "./views/Runners.vue";
import User from "./views/User.vue";
import MergeRequests from "./views/MergeRequests.vue";
import Projects from "./views/Projects.vue";
import store from "@/store";

Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/mrs",
      name: "mrs",
      component: MergeRequests
    },
    {
      path: "/todo",
      name: "todo",
      component: Todos
    },
    {
      path: "/issues",
      name: "issues",
      component: Issues
    },
    {
      path: "/runners",
      name: "runners",
      component: Runners,
      meta: {
        requiresAdmin: true
      }
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
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/projects",
      name: "projects",
      component: Projects
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (!isAdmin()) {
      next({ name: "home" });
    }
  }
  next();
});

function isAdmin() {
  return (
    store.state.user &&
    store.state.user.connectedUser &&
    store.state.user.connectedUser.is_admin
  );
}

export default router;
