// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store/index'

// 高德地图vue组件
import VueAMap from 'vue-amap'

//vant框架
import Vant from 'vant'
import 'vant/lib/index.css'

// 懒加载
import { Lazyload } from 'vant'

// 文字溢出
import lineClamp from 'vue-line-clamp'

// 图片灯箱
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'

import './components/lib/js/wxAdapter'

let options = {
  fullscreenEl: false,
  history: true
}

Vue.use(preview,options)

Vue.use(Vuex)
Vue.use(Vant)
Vue.use(Lazyload, {
  preLoad: 1,
  error: require('@/assets/img/no-cover.jpg'),
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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


//设置一个全局指令
Vue.directive('http2https', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted(el){
    if(el.src.indexOf(location.origin) == -1){
      el.src = el.src.replace('http:', 'https:')
    }
  }
})
