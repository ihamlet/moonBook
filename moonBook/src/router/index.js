import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Error from '@/components/notFound'
import Home from '@/components/pages/home'
import Notice from '@/components/pages/notice'
import MyHome from '@/components/pages/my'
import Login from '@/components/pages/login'

import Zoom from '@/components/pages/zoom'
import BabyHome from '@/components/pages/babyHome'
import ClassHome from '@/components/pages/classHome'

import cardList from '@/components/pages/cardList'

import Activity from '@/components/pages/activity'
import Task from '@/components/pages/task/taskList'

import AddFamily from '@/components/pages/invite/addFamily'
import VerifyFamily from '@/components/pages/invite/verifyList'

import Information from '@/components/pages/invite/information'

import Article from '@/components/pages/article'
import BookDetails from '@/components/pages/bookDetails'

import VideoPlayer from '@/components/pages/video/ckplayer'

import School from '@/components/School'
import Banji from '@/components/Banji'
import Find from '@/components/Find'
import Baby from '@/components/Baby'
import My from '@/components/My'

import AppsFind from '@/components/apps/find/find'
import AppsSchool from '@/components/apps/school/schoolHome'

import Register from '@/components/pages/register'
import City from '@/components/pages/city'

import Dialog from '@/components/pages/dialog/dialog'

import Share from '@/components/pages/share'

import Edit from './edit'
import Editor from './editor'
import Manage from './manage'
import Accept from './accept'
import Read from './read'
import Flyers from './flyers'
import Coupon from './coupon'
import Special from './special'
import Audio from './audio'

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
            isFooterBar: true,
            keepAlive: true
          }
        },
        Accept,
        ...Edit,
        {
          path: '/city',
          name: 'city',
          component: City,
          meta: {
            title: '城市',
            isFooterBar: false
          }
        }, 
        {
          path: '/register',
          name: 'register',
          component: Register,
          meta: {
            title: '注册',
            isFooterBar: false
          }
        },
        {
          path: '/login',
          name: 'login',
          component: Login,
          meta: {
            title: '登录',
            isFooterBar: false
          }
        },
        {
          path: '/dialog',
          name:'dialog',
          component: Dialog,
          meta: {
            isFooterBar: false
          }
        },
        {
          path: '/notice',
          name: 'notice',
          component: Notice,
          meta: {
            title: '消息中心',
            isFooterBar: false,
            keepAlive: true
          }
        },
        {
          path: '/activity',
          name: 'activity',
          component: Activity,
          meta: {
            title: '活动',
            isFooterBar: false
          }
        },
        {
          path: '/task',
          name: 'task',
          component: Task,
          meta: {
            isFooterBar: false
          }
        },
        {
          path: '/zoom',
          name: 'zoom',
          component: Zoom,
          meta: {
            title: 'BookZoom',
            isFooterBar: false,
            keepAlive: true
          }
        },
        {
          path: '/card-list',
          name: 'card-list',
          component: cardList,
          meta: {
            title: '我的卡包',
            isFooterBar: false,
            keepAlive: true
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
          path:'/invite/information',
          name:'information',
          component: Information,
          meta: {
            title:'收到的赞',
            isFooterBar: false,
            keepAlive: true
          }
        },
        {
          path: '/invite/verify',
          name: 'verify-list',
          component: VerifyFamily,
          meta: {
            title: '成员审核',
            isFooterBar: false,
            keepAlive: true
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
      path: '/share',
      name: 'share',
      component: Share,
      meta: {
        title: '二维码分享',
        isFooterBar: false,
      }
    },
    {
      path: '/article',
      name: 'article',
      component: Article,
      meta: {
        title: '正文',
        isFooterBar: false,
      }
    },
    {
      path:'/my',
      name:'my',
      component: My,
      children:[{
        path: '/my-home',
        name: 'my-home',
        component: MyHome,
        meta: {
          title: '我的',
          tabActive: 4,
          keepAlive: true,
          isFooterBar: true,
        }
      }]
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
          isFooterBar: false,
          keepAlive: true
        }
      }]
    },{
      path:'/banji',
      name:'banji',
      component: Banji,
      children:[{
        path: '/class-home',
        name: 'class-home',
        component: ClassHome,
        meta: {
          title: '宝贝的班级',
          tabActive: 1,
          isFooterBar: true,
          keepAlive: true
        }
      }]
    },{
      path:'/find',
      name:'find',
      component: Find,
      meta:{
        keepAlive: true
      },
      children:[{
        path: '/apps-find',
        name: 'apps-find',
        component: AppsFind,
        meta: {
          title: '发现',
          isFooterBar: false,
          keepAlive: true
        }
      }]
    },{
      path:'/baby',
      name:'baby',
      component: Baby,
      meta:{
        keepAlive: true
      },
      children:[{
        path: '/baby-home',
        name: 'baby-home',
        component: BabyHome,
        meta: {
          keepAlive: true,
          title: '我的宝贝',
          tabActive: 3,
          isFooterBar: true
        }
      }]
    },
    ...Read,
    ...Flyers,
    ...Coupon,
    ...Special,
    ...Audio,
    Manage,
    Editor,
    {
      path: '*',
      name: '404', //404 路由必须置于 routes 数组末尾
      component: Error
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})