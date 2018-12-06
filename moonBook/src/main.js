// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 使用mock模拟数据交互

import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store/index'
import fetch from './fetch/api'
import axios from './fetch/api'

import VueAMap from 'vue-amap'

import Vant from 'vant'
import 'vant/lib/index.css'
import { Lazyload } from 'vant'

import lineClamp from 'vue-line-clamp'

import './mock' //模拟数据

Vue.prototype.$axios = axios

Vue.use(Vuex)
Vue.use(Vant)
Vue.use(Lazyload, {
  preLoad: 1,
  error: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  loading: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
  attempt: 3,
  lazyComponent:true
})

Vue.use(lineClamp)
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  // 高德key
  key: 'fa9f5ec66e1591d348fd0d4b8edd809a',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Geolocation']
})

Vue.config.productionTip = false


// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.LoginRequire)) {
//     if (!store.getters.userToken) {
//       next({
//         name: 'login',
//         query:{
//           link: to.name
//         }
//       })
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
