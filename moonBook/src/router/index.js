import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Error from  '@/components/notFound'
import Home from  '@/components/pages/home'
import Find from '@/components/pages/find'
import Notice from '@/components/pages/notice'
import My from '@/components/pages/my'

import Zoom from '@/components/pages/zoom'

Vue.use(Router)

export default new Router({
  scrollBehavior,
  routes: [
    {
      path: '',
      name: 'hello',
      component: Hello,
      children:[{
        path: '/',
        name: 'home',
        component: Home,
        meta: { scrollToTop: true }
      },{
        path: '/notice',
        name: 'notice',
        component: Notice,
        meta: {
          title: '消息中心',
          scrollToTop: true
        }
      },{
        path: '/find',
        name: 'find',
        component: Find,
        meta: {
          title: '发现',
          scrollToTop: true
        }
      },{
        path: '/my',
        name: 'my',
        component: My,
        meta: {
          title: '个人中心',
          scrollToTop: true
        }
      },{
        path: '/zoom',
        name: 'zoom',
        component: Zoom,
        meta: {
          title: '个人空间',
          scrollToTop: true
        }
      }]
    },{
      path:'*',
      name:'404', //404 路由必须置于 routes 数组末尾
      component: Error
    }
  ]
})

//滚动行为
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    const position = {}
    if (to.hash) {
      position.selector = to.hash
    }
    if (to.matched.some(m => m.meta.scrollToTop)) {
      position.x = 0
      position.y = 0
    }
    return position
  }
}