import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Error from '@/components/notFound'
import Home from '@/components/pages/home'
import Notice from '@/components/pages/notice'
import My from '@/components/pages/my'

import Zoom from '@/components/pages/zoom'
import BabyHome from '@/components/pages/babyHome'
import ClassHome from '@/components/pages/classHome'
import ClassZoom from '@/components/pages/classZoom'

import cardList from '@/components/pages/cardList'

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

import Ranking from '@/components/pages/ranking'

import VideoPlayer from '@/components/pages/video/ckplayer'


import School from '@/components/School'
import Find from '@/components/Find'
import Baby from '@/components/Baby'

import AppsFind from '@/components/apps/find/find'
import AppsSchool from '@/components/apps/school/schoolHome'


import Register from '@/components/pages/register'
import Login from '@/components/pages/login'

import Editor from '@/components/Editor'
import Publishing from '@/components/pages/editor/Publishing'
import Graphic from '@/components/pages/editor/Graphic'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'hello',
      component: Hello,
      children: [
        {
          path: '/',
          name: 'home',
          component: Home,
          meta: {
            tabActive: 0,
            isFooterBar: true
          }
        },
        {
          path: '/register',
          name: 'register',
          component: Register,
          meta: {
            title: '注册',
            tabActive: 0,
            isFooterBar: false
          }
        },
        {
          path: '/login',
          name: 'login',
          component: Login,
          meta: {
            title: '登录',
            tabActive: 4,
            isFooterBar: false
          }
        },
        {
          path: '/article',
          name: 'article',
          component: Article,
          meta: {
            title: '正文',
            tabActive: 1,
            isFooterBar: false
          }
        },
        {
          path: '/notice',
          name: 'notice',
          component: Notice,
          meta: {
            title: '消息中心',
            tabActive: 4,
            isFooterBar: true
          }
        },
        {
          path: '/my',
          name: 'my',
          component: My,
          meta: {
            title: '我的',
            tabActive: 4,
            isFooterBar: true
          }
        },
        {
          path: '/zoom',
          name: 'zoom',
          component: Zoom,
          meta: {
            title: 'BookZoom',
            tabActive: 1,
            isFooterBar: true
          }
        },
        {
          path: '/class-home',
          name: 'class-home',
          component: ClassHome,
          meta: {
            title: '宝贝的班级',
            tabActive: 1,
            isFooterBar: true
          }
        },
        {
          path: '/class-zoom',
          name: 'class-zoom',
          component: ClassZoom,
          meta: {
            title: '班级风采',
            tabActive: 4,
            isFooterBar: true
          }
        },
        {
          path: '/card-list',
          name: 'card-list',
          component: cardList,
          meta: {
            title: '我的卡包',
            isFooterBar: false
          }
        },
        {
          path: '/edit/child',
          name: 'edit-child',
          component: EditChild,
          meta: {
            isFooterBar: false
          }
        },
        {
          path: '/edit/school',
          name: 'edit-school',
          component: EditSchool,
          meta: {
            isFooterBar: false
          }
        },
        {
          path: '/edit/class',
          name: 'edit-class',
          component: EditClass,
          meta: {
            isFooterBar: false
          }
        },
        {
          path: '/edit/setting',
          name: 'edit-setting',
          component: EditStting,
          meta: {
            isFooterBar: false
          }
        },
        {
          path: '/edit/manager',
          name: 'edit-manager',
          component: EditManager,
          meta: {
            isFooterBar: false
          }
        },
        {
          path: '/book/details',
          name: 'book-details',
          component: BookDetails,
          meta: {
            title: '图书详情',
            isFooterBar: false
          }
        },
        {
          path: '/invite/family',
          name: 'add-family',
          component: AddFamily,
          meta: {
            title: '加入家庭',
            isFooterBar: false
          }
        },
        {
          path: '/invite/verify',
          name: 'verify-list',
          component: VerifyFamily,
          meta: {
            title: '成员审核',
            isFooterBar: false
          }
        },
        {
          path: '/borrow-list',
          name: 'borrow-list',
          component: BorrowList,
          meta: {
            title: '借阅记录',

            isFooterBar: false
          }
        },
        {
          path: '/ranking',
          name: 'ranking',
          component: Ranking,
          meta: {
            title: '阅读榜',

            isFooterBar: false
          }
        },
        {
          path: '/video-page',
          name: 'video-page',
          component: VideoPlayer,
          meta: {
            isFooterBar: false
          }
        }
      ]
    },
    {
      path:'/school',
      name:'school',
      component: School,
      children:[{
        path: '/apps-school',
        name: 'apps-school',
        component: AppsSchool,
        meta: {
          title: '学校主页',
          tabActive: 0,
          isFooterBar: true
        }
      }]
    },{
      path:'/find',
      name:'find',
      component: Find,
      children:[{
        path: '/apps-find',
        name: 'apps-find',
        component: AppsFind,
        meta: {
          title: '发现',
          tabActive: 0,
          isFooterBar: true
        }
      }]
    },{
      path:'/baby',
      name:'baby',
      component: Baby,
      children:[{
        path: '/baby-home',
        name: 'baby-home',
        component: BabyHome,
        meta: {
          title: '我的宝贝',
          tabActive: 0,
          isFooterBar: true
        }
      }]
    },{
      path: '/editor',
      name: 'editor',
      component: Editor,
      children:[{
        path: '/editor/publishing',
        name: 'publishing',
        component: Publishing,
        meta: {
          title: '发布长文',
          type:'long'
        }
      },
      {
        path: '/editor/graphic',
        name: 'graphic',
        component: Graphic,
        meta: {
          title: '发布长文',
          type:'webo'
        }
      }]
    },
    {
      path: '*',
      name: '404', //404 路由必须置于 routes 数组末尾
      component: Error
    }
  ]
})
