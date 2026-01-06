import { createRouter, createWebHistory } from "vue-router"
import Login from "../views/Login.vue"
import store from "../store";

const routes = [
	{
		path: "/",
		name: "Login",
		component: Login,
	},
	{
		path: "/home",
		name: "Home",
		// Lazy loading for better performance
		component: () => import("../views/Home.vue"),
		meta: { requiresAuth: true },
	},
	{
		path: "/admin",
		name: "Admin",
		component: () => import("../views/AdminView.vue"),
		meta: { requiresAuth: true, roles: ["Admin"] },
	},
	{
		path: "/editor",
		name: "Editor",
		component: () => import("../views/EditorView.vue"),
		meta: { requiresAuth: true, roles: ["Editor", "Admin"] },
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;
  const roles = to.meta.roles;

  if (requiresAuth) {
    if (!store.getters.isLoggedIn) {
      return next("/");
    }

    if (roles && !roles.some((r) => store.getters.roles.includes(r))) {
      return next("/home");
    }
  }

  next();
});

export default router
