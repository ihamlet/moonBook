// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store/index'
import axios from './../src/components/lib/js/api'

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
let options = {
  fullscreenEl: false
}

Vue.use(preview,options)

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

if (typeof (Worker) !== "undefined") {

  //创建 Web Worker 对象
  if (typeof (Worker) == "undefined") {
    Worker = new Worker("./../static/webworker.js")
    Worker.postMessage("测试");
  }
  Worker.onmessage = function (event) {
      console.log(event.data);
  }
}else {
  console.log("浏览器不支持Web Worker");
}

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
