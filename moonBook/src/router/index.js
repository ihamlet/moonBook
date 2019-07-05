import Vue from 'vue'
import Router from 'vue-router'

const Hello = () => import('@/components/Hello')
const Error = () => import('@/components/notFound')
const Home = () => import('@/components/pages/home')
const Notice = () => import('@/components/pages/notice')
const MyHome = () => import('@/components/pages/my')
const Login = () => import('@/components/pages/login')

const Zoom = () => import('@/components/pages/zoom')
const BabyHome = () => import('@/components/pages/babyHome')
const ClassHome = () => import('@/components/pages/classHome')
const cardList = () => import('@/components/pages/cardList')
const Activity = () => import('@/components/pages/activity')
const Task = () => import('@/components/pages/task/taskList')
const AddFamily = () => import('@/components/pages/invite/addFamily')
const VerifyFamily = () => import('@/components/pages/invite/verifyList')
const Information = () => import('@/components/pages/invite/information')
const Article = () => import('@/components/pages/article')
const BookDetails = () => import('@/components/pages/bookDetails')

const VideoPlayer = () => import('@/components/pages/video/ckplayer')
const School = () => import('@/components/School')
const Banji = () => import('@/components/Banji')
const Find = () => import('@/components/Find')
const Baby = () => import('@/components/Baby')
const My = () => import('@/components/My')

const AppsFind = () => import('@/components/apps/find/find')
const AppsSchool = () => import('@/components/apps/school/schoolHome')
const SchoolIntro = () => import('@/components/apps/school/schoolIntro')

const Register = () => import('@/components/pages/register')
const City = () => import('@/components/pages/city')
const Dialog = () => import('@/components/pages/dialog/dialog')
const Share = () => import('@/components/pages/share')

const Search = () => import('@/components/module/search/searchPage')
const videoPage = () => import('@/components/pages/video/videoPage')

const Invest = () => import('@/components/pages/invest')

const Iframe = () => import('@/cloud/iframe') //外部引入

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
          path:'/Iframe',
          name:'iframe',
          component: Iframe
        },
        {
          path:'/Invest',
          name:'Invest',
          component: Invest
        },
        {
          path:'/video-page',
          name:'videoPage',
          component: videoPage
        },
        {
          path:'/search',
          name:'search',
          component: Search
        },
        {
          path: '/city',
          name: 'city',
          component: City,
          meta: {
            title: '城市'
          }
        }, 
        {
          path: '/register',
          name: 'register',
          component: Register,
          meta: {
            title: '注册'
          }
        },
        {
          path: '/login',
          name: 'login',
          component: Login,
          meta: {
            title: '登录'
          }
        },
        {
          path: '/dialog',
          name:'dialog',
          component: Dialog
        },
        {
          path: '/notice',
          name: 'notice',
          component: Notice,
          meta: {
            title: '消息中心',
            keepAlive: true
          }
        },
        {
          path: '/activity',
          name: 'activity',
          component: Activity,
          meta: {
            title: '活动'
          }
        },
        {
          path: '/task',
          name: 'task',
          component: Task
        },
        {
          path: '/zoom',
          name: 'zoom',
          component: Zoom,
          meta: {
            title: 'BookZoom',
            keepAlive: true
          }
        },
        {
          path: '/card-list',
          name: 'card-list',
          component: cardList,
          meta: {
            title: '我的卡包',
            keepAlive: true
          }
        },
        {
          path: '/book/details',
          name: 'book-details',
          component: BookDetails,
          meta: {
            title: '图书详情'
          }
        },
        {
          path: '/invite/family',
          name: 'add-family',
          component: AddFamily,
          meta: {
            title: '加入家庭'
          }
        },
        {
          path:'/invite/information',
          name:'information',
          component: Information,
          meta: {
            title:'收到的赞',
            keepAlive: true
          }
        },
        {
          path: '/invite/verify',
          name: 'verify-list',
          component: VerifyFamily,
          meta: {
            title: '成员审核',
            keepAlive: true
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
      }
    },
    {
      path: '/article',
      name: 'article',
      component: Article,
      meta: {
        title: '正文',
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
          keepAlive: true
        }
      },{
        path: '/school-intro',
        name: 'school-intro',
        component: SchoolIntro,
        meta: {
          title: '学校介绍',
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
      path: '/video-page',
      name: 'video-page',
      component: VideoPlayer
    },
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