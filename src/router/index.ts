import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    redirect:'/home'
  },

]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router