import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home/:cat',
      name: 'home_cat',
      component: Home
    },
    {
      path: '/item/:cat/:code',
      name: 'item',
      redirect: '/item/:cat/:code/history',
      component: () => import('./views/item/index.vue'),
      children: [
        {
          path: 'history',
          name: 'item_history',
          component: () => import('./views/item/history.vue')
        },
        {
          path: 'liangmian',
          name: 'item_liangmian',
          component: () => import('./views/item/liangmian.vue')
        },
        {
          path: 'fenbu',
          name: 'item_fenbu',
          component: () => import('./views/item/fenbu.vue')
        },
        {
          path: 'zoushi',
          name: 'item_zoushi',
          component: () => import('./views/item/zoushi.vue')
        },
        {
          path: 'luzi',
          name: 'item_luzi',
          component: () => import('./views/item/luzi.vue')
        },
        {
          path: 'changlong',
          name: 'item_changlong',
          component: () => import('./views/item/changlong.vue')
        },
        {
          path: 'yilou',
          name: 'item_yilou',
          component: () => import('./views/item/yilou.vue')
        }
      ]
    }
  ]
})
