import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ExpensesView from '../views/ExpensesView.vue';
import ExpenseDetailView from "../views/ExpenseDetailView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/expenses", component: ExpensesView },
  { path: "/expenses/:id", component: ExpenseDetailView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
