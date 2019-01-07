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
import EditSchool from '@/components/pages/school'
import EditClass from '@/components/pages/class'
import EditStting from '@/components/pages/setting'
import EditManager from '@/components/pages/editManager/manager'

import AddFamily from '@/components/pages/invite/addFamily'
import VerifyFamily from '@/components/pages/invite/verifyList'

import BorrowList from '@/components/pages/borrowList'

import Article from '@/components/pages/article'
import BookDetails from '@/components/pages/bookDetails'

import AppsSchool from '@/components/pages/apps/schoolHome'

import Ranking from '@/components/pages/ranking'

import VideoPlayer from '@/components/pages/video/ckplayer'


Vue.use(Router)

export default new Router({
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
          tabActive:4,
          isFooterBar: true
        }
      },{
        path: '/my',
        name: 'my',
        component: My,
        meta: {
          title: '我的',
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
          title: '我的宝贝',
          scrollToTop: true,
          tabActive:2,
          isFooterBar: true
        }
      },{
        path: '/class-home',
        name: 'class-home',
        component: ClassHome,
        meta: {
          title: '宝贝的班级',
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
          isFooterBar: false
        }
      },{
        path: '/edit/child',
        name: 'edit-child',
        component: EditChild,
        meta: {
          scrollToTop: true,
          isFooterBar: false
        }
      },{
        path: '/edit/school',
        name: 'edit-school',
        component: EditSchool,
        meta: {
          scrollToTop: true,
          isFooterBar: false
        }
      },{
        path: '/edit/class',
        name: 'edit-class',
        component: EditClass,
        meta: {
          scrollToTop: true,
          isFooterBar: false
        }
      },{
        path: '/edit/setting',
        name: 'edit-setting',
        component: EditStting,
        meta: {
          scrollToTop: true,
          isFooterBar: false
        }
      },{
        path: '/edit/manager',
        name: 'edit-manager',
        component: EditManager,
        meta: {
          scrollToTop: true,

          isFooterBar: false
        }
      },{
        path: '/book/details',
        name: 'book-details',
        component: BookDetails,
        meta: {
          title: '图书详情',
          scrollToTop: true,
          isFooterBar: false
        }
      },{
        path: '/invite/family',
        name: 'add-family',
        component: AddFamily,
        meta: {
          title: '加入家庭',
          scrollToTop: true,
          isFooterBar: false
        }
      },{
        path: '/invite/verify',
        name: 'verify-list',
        component: VerifyFamily,
        meta: {
          title:'成员审核',
          scrollToTop: true,
          isFooterBar: false
        }
      },{
        path: '/borrow-list',
        name: 'borrow-list',
        component: BorrowList,
        meta: {
          title:'借阅记录',
          scrollToTop: true,
          isFooterBar: false
        }
      },{
        path: '/apps-school',
        name: 'apps-school',
        component: AppsSchool,
        meta: {
          title:'学校主页',
          scrollToTop: true,
          tabActive:0,
          isFooterBar: true
        }
      },{
        path: '/ranking',
        name: 'ranking',
        component: Ranking,
        meta: {
          title:'阅读榜',
          scrollToTop: true,
          isFooterBar: false
        }
      },{
        path: '/video-page',
        name: 'video-page',
        component: VideoPlayer,
        meta: {
          scrollToTop: true,
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