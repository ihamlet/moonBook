// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 使用mock模拟数据交互

import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store/index'

import Vant from 'vant'
import { Lazyload } from 'vant';
import 'vant/lib/vant-css/index.css'

import lineClamp from 'vue-line-clamp'

import './mock' //模拟数据

Vue.use(Vuex)
Vue.use(Vant)
Vue.use(Lazyload, {
  preLoad: 1.3,
  error: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  loading: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
  attempt: 1,
  observer: true,
  observerOptions: {
    rootMargin: '0px',
    threshold: 0.1
  },
  lazyComponent:true
})

Vue.use(lineClamp)

// Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
