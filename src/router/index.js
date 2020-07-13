import Vue from 'vue'
import VueRouter from 'vue-router'

// Layout
import Layout from '@/layout'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('views/home/index'),
        meta: { title: 'Home' } // add other meta other if necessary
      }
    ]
  },
  {
    path: '/details/:id',
    name: 'details',
    component: () => import('views/details/index')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('views/login/index'),
    meta: { title: 'Login' }
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
