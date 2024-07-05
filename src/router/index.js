import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("../views/IndexView.vue"),
    },
    {
      path: "/expense/:id",
      name: "expense-detail",
      component: () => import("../views/ExpenseDetailView.vue"),
    },
    {
      path: "/expense/:id/create",
      name: "expense-create",
      component: () => import("../views/ExpenseCreateView.vue"),
    },
    {
      path: "/expense/:id/edit",
      name: "expense-edit",
      component: () => import("../views/ExpenseEditView.vue"),
    },
    {
      path: "/group/create",
      name: "expense-group-create",
      component: () => import("../views/ExpenseGroupCreateView.vue"),
    },
  ],
});

export default router;
