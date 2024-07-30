import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue'//刚开始打开页面的地址

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/city',
      name: 'city',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/city/CityView.vue')
    }
  ]
})

export default router
