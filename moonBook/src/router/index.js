import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Error from  '@/components/notFound'
import Home from  '@/components/pages/home'
import Find from '@/components/pages/find'
import Notice from '@/components/pages/notice'
import My from '@/components/pages/my'

import Zoom from '@/components/pages/zoom'
import BabyHome from '@/components/pages/babyHome'
import ClassHome from '@/components/pages/classHome'
import ClassZoom from '@/components/pages/classZoom'

import cardList from '@/components/pages/cardList' 

import Register from '@/components/pages/register'
import Login from '@/components/pages/login'

import EditChild from '@/components/pages/editBaby/child'
import EditSchool from '@/components/pages/editBaby/school'
import EditClass from '@/components/pages/editBaby/class'
import EditStting from '@/components/pages/editBaby/setting'

import Article from '@/components/pages/article'

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
          tabActive:0,
          isFooterBar: true
        }
      },{
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
          title: '注册',
          scrollToTop: true,
          tabActive:0,
          isFooterBar: false
        }
      },{
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
          title: '登录',
          scrollToTop: true,
          tabActive:4,
          isFooterBar: false
        }
      },{
        path: '/find',
        name: 'find',
        component: Find,
        meta: {
          title: '发现',
          scrollToTop: true,
          tabActive:1,
          isFooterBar: true
        }
      },{
        path: '/article',
        name: 'article',
        component: Article,
        meta: {
          title: '正文',
          scrollToTop: true,
          tabActive:1,
          isFooterBar: false
        }
      },{
        path: '/notice',
        name: 'notice',
        component: Notice,
        meta: {
          title: '消息中心',
          scrollToTop: true,
          tabActive:2,
          isFooterBar: true
        }
      },{
        path: '/my',
        name: 'my',
        component: My,
        meta: {
          title: '个人中心',
          scrollToTop: true,
          tabActive:4,
          isFooterBar: true
        }
      },{
        path: '/zoom',
        name: 'zoom',
        component: Zoom,
        meta: {
          title: 'BookZoom',
          scrollToTop: true,
          tabActive:1,
          isFooterBar: true
        }
      },{
        path: '/baby-home',
        name: 'baby-home',
        component: BabyHome,
        meta: {
          title: '宝贝主页',
          scrollToTop: true,
          tabActive:4,
          isFooterBar: true
        }
      },{
        path: '/class-home',
        name: 'class-home',
        component: ClassHome,
        meta: {
          title: '班级主页',
          scrollToTop: true,
          tabActive:3,
          isFooterBar: true
        }
      },{
        path: '/class-zoom',
        name: 'class-zoom',
        component: ClassZoom,
        meta: {
          title: '班级风采',
          scrollToTop: true,
          tabActive:4,
          isFooterBar: true
        }
      },{
        path: '/card-list',
        name: 'card-list',
        component: cardList,
        meta: {
          title: '我的卡包',
          scrollToTop: true,
          tabActive:4,
          isFooterBar: false
        }
      },{
        path: '/edit/child',
        name: 'edit-child',
        component: EditChild,
        meta: {
          scrollToTop: true,
          tabActive:4,
          isFooterBar: false
        }
      },{
        path: '/edit/school',
        name: 'edit-school',
        component: EditSchool,
        meta: {
          scrollToTop: true,
          tabActive:4,
          isFooterBar: false
        }
      },{
        path: '/edit/class',
        name: 'edit-class',
        component: EditClass,
        meta: {
          scrollToTop: true,
          tabActive:4,
          isFooterBar: false
        }
      },{
        path: '/edit/setting',
        name: 'edit-setting',
        component: EditStting,
        meta: {
          scrollToTop: true,
          tabActive:4,
          isFooterBar: false
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
    return { x: 0, y: 0 }
  }
}