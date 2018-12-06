import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Error from  '@/components/notFound'
import Home from  '@/components/pages/home'
import Find from '@/components/pages/find'
import Notice from '@/components/pages/notice'
import My from '@/components/pages/my'
import Login from '@/components/pages/login'

import Zoom from '@/components/pages/zoom'
import BabyHome from '@/components/pages/babyHome'
import ClassHome from '@/components/pages/classHome'
import ClassZoom from '@/components/pages/classZoom'

import Register from '@/components/pages/register'

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
        meta: { 
          scrollToTop: true, 
          tabActive:0
        }
      },{
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
          title: '注册',
          scrollToTop: true,
          tabActive:0
        }
      },{
        path: '/find',
        name: 'find',
        component: Find,
        meta: {
          title: '发现',
          scrollToTop: true,
          tabActive:1
        }
      },{
        path: '/notice',
        name: 'notice',
        component: Notice,
        meta: {
          title: '消息中心',
          scrollToTop: true,
          tabActive:2
        }
      },{
        path: '/my',
        name: 'my',
        component: My,
        meta: {
          title: '个人中心',
          scrollToTop: true,
          tabActive:3
        }
      },{
        path: '/zoom',
        name: 'zoom',
        component: Zoom,
        meta: {
          title: '个人空间',
          scrollToTop: true
        }
      },{
          path: '/login',
          name: 'login',
          component: Login,
          meta: {
              title: '登陆',
              scrollToTop: true
          }
        },
        {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
          title: '注册',
          scrollToTop: true,
          tabActive:3
        }
      },{
        path: '/baby-home',
        name: 'baby-home',
        component: BabyHome,
        meta: {
          title: '宝贝主页',
          scrollToTop: true,
          tabActive:3
        }
      },{
        path: '/class-home',
        name: 'class-home',
        component: ClassHome,
        meta: {
          title: '班级主页',
          scrollToTop: true,
          tabActive:3
        }
      },{
        path: '/class-zoom',
        name: 'class-zoom',
        component: ClassZoom,
        meta: {
          title: '班级风采',
          scrollToTop: true,
          tabActive:3
        }
      }]
    },

      {
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
    return { x: 0, y: 0 }
  }
}