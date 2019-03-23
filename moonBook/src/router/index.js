import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Error from '@/components/notFound'
import Home from '@/components/pages/home'
import Notice from '@/components/pages/notice'
import My from '@/components/pages/my'
import Login from '@/components/pages/login'

import Zoom from '@/components/pages/zoom'
import BabyHome from '@/components/pages/babyHome'
import ClassHome from '@/components/pages/classHome'

import cardList from '@/components/pages/cardList'

import EditChild from '@/components/pages/editBaby/child'
import EditSchool from '@/components/pages/school'
import EditClass from '@/components/pages/class'
import EditStting from '@/components/pages/setting'
import EditManager from '@/components/pages/editManager/manager'

import Activity from '@/components/pages/activity'
import Task from '@/components/pages/task/taskList'

import AddFamily from '@/components/pages/invite/addFamily'
import VerifyFamily from '@/components/pages/invite/verifyList'

import Information from '@/components/pages/invite/information'

import BorrowList from '@/components/pages/borrowList'

import Bookshelf from '@/components/pages/bookshelf'

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

import Editor from '@/components/Editor'
import Publishing from '@/components/pages/editor/Publishing'
import Graphic from '@/components/pages/editor/Graphic'
import BeautifulArticle from '@/components/pages/editor/BeautifulArticle'
import changeCover from '@/components/pages/editor/mould/changeCover'
import articleSetting from '@/components/pages/editor/mould/articleSetting'

import ReadStat from '@/components/pages/readStat'
import ReadAmount from '@/components/pages/readAmount'

import Train from '@/components/train'
import AppsTrain from '@/components/apps/train/trainHome'

import Dialog from '@/components/pages/dialog/dialog'

//办卡
import Accept from '@/components/pages/accept/accept'
import SchoolList from '@/components/pages/accept/schoolList'
import cardLevel from '@/components/pages/accept/cardLevel'
import cardTime from '@/components/pages/accept/cardTime'


//阅读指导
import ReadGuide from '@/components/pages/guided/readGuide'


Vue.use(Router)

export default new Router({
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
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
          path: '/dialog',
          name:'dialog',
          component: Dialog,
          meta: {
            isFooterBar: false
          }
        },
        {
          path:'/accept',
          name:'accept',
          component: Accept,
          meta:{
            title:'阅读卡办理',
            isFooterBar: false
          },
          children:[{
            path:'/accept/schoolList',
            name:'AcceptSchoolList',
            component: SchoolList,
            meta:{
              active:0,
              keepAlive: true
            }
          },{
            path:'/accept/cardLevel',
            name:'AcceptCardLevel',
            component: cardLevel,
            meta:{
              active:1
            }
          },{
            path:'/accept/cardTime',
            name:'AcceptCardTime',
            component: cardTime,
            meta:{
              active:2
            }
          }]
        },
        {
          path: '/notice',
          name: 'notice',
          component: Notice,
          meta: {
            title: '消息中心',
            tabActive: 4,
            isFooterBar: true,
            keepAlive: true
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
          path: '/readStat',
          name: 'readStat',
          component: ReadStat,
          meta: {
            title: '阅读统计',
            isFooterBar: false
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
            tabActive: 4,
            isFooterBar: true,
            keepAlive: true
          }
        },
        {
          path: '/class-home',
          name: 'class-home',
          component: ClassHome,
          meta: {
            title: '宝贝的班级',
            tabActive: 1,
            isFooterBar: true,
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
          path: '/ranking',
          name: 'ranking',
          component: Ranking,
          meta: {
            title: '阅读榜',
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
      path: '/article',
      name: 'article',
      component: Article,
      meta: {
        title: '正文',
        tabActive: 1,
        isFooterBar: false,
      }
    },
    {
      path: '/bookshelf',
      name: 'bookshelf',
      component: Bookshelf,
      meta: {
        isFooterBar: false,
        keepAlive: true
      } 
    },
    {
      path: '/readAmount',
      name: 'readAmount',
      component: ReadAmount,
      meta: {
        title: '我的书',
        isFooterBar: false,
        keepAlive: true
      }
    },
    {
      path: '/borrow-list',
      name: 'borrow-list',
      component: BorrowList,
      meta: {
        title: '借阅记录',
        keepAlive: true,
        isFooterBar: false
      }
    },
    {
      path: '/read-guide',
      name: 'read-guide',
      component: ReadGuide,
      meta: {
        title: '阶梯阅读指导',
        keepAlive: true,
        isFooterBar: false
      }
    },
    {
      path:'/train',
      name:'train',
      component: Train,
      children:[{
        path:'/apps-train',
        name:'apps-train',
        component: AppsTrain,
        meta:{
          title: '教育',
          tabActive:0,
          isFooterBar: true
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
          tabActive: 0,
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
          tabActive: 0,
          isFooterBar: true,
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
          type:'long',
          keepAlive: true
        }
      },
      {
        path: '/editor/beautifulArticle',
        name: 'beautifulArticle',
        component: BeautifulArticle,
        meta: {
          title: '编辑',
          type:'beautifulArticle'
        },
      },
      {
        path: '/editor/changeCover',
        name:'changeCover',
        component: changeCover,
        meta: {
          title: '设置封面'
        }
      },
      {
        path: '/editor/graphic',
        name: 'graphic',
        component: Graphic,
        meta: {
          title: '发布',
          type:'webo'
        }
      },{
        path:'/editor/articleSetting',
        name:'articleSetting',
        component: articleSetting,
        meta: {
          title: '发布设置'
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
