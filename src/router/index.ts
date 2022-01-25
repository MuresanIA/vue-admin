import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/pages/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login.vue')
  },
  {
    path: '/wrapper',
    name: 'Wrapper',
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: () => import('@/pages/Dashboard.vue')
      },
      {
        path: '/users',
        name: 'Users',
        component: () => import('@/pages/users/Users.vue')
      },
      {
        path: '/users/create',
        name: 'UserCreate',
        component: () => import('@/pages/users/UserCreate.vue')
      }
    ],
    component: () => import('@/pages/Wrapper.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
