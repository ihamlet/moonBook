import BorrowList from '@/components/pages/borrowList'
import Bookshelf from '@/components/pages/bookshelf'
import Ranking from '@/components/pages/ranking'
import ReadStat from '@/components/pages/readStat'
import ReadAmount from '@/components/pages/readAmount'
import ReadGuide from '@/components/pages/guided/readGuide'
import punchBack from '@/components/pages/punch/punchBack'
import punchList from '@/components/pages/punch/punchList'
import advertisingDetails from '@/components/pages/punch/advertisingDetails'
import popupList from '@/components/pages/punch/popupList'
import popupHelp from '@/components/pages/punch/punchHelp'
import punchSpeed from '@/components/pages/punch/punchSpeed'
import writeOff from '@/components/pages/punch/writeOff'
import Calendar from '@/components/module/mold/calendar'


let readRouter = [{
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
    path: '/punch-back',
    name: 'punch-back',
    component: punchBack,
    meta: {
      title: '打卡成功',
      isFooterBar: false
    }
  },
  {
    path:'/punchSpeed',
    name:'punchSpeed',
    component: punchSpeed,
    meta:{
      title: '打卡进度',
      isFooterBar: false
    }
  },{
    path:'/popupHelp',
    name:'popupHelp',
    component: popupHelp
  },
  {
    path: '/punch-list',
    name: 'punch-list',
    component: punchList,
    meta: {
      title:'打卡列表',
      keepAlive: true,
      isFooterBar: false
    }
  },{
    path: '/ranking',
    name: 'ranking',
    component: Ranking,
    meta: {
      title: '阅读榜',
      isFooterBar: false,
      keepAlive: true
    }
  },{
    path: '/readStat',
    name: 'readStat',
    component: ReadStat,
    meta: {
      title: '阅读统计',
      isFooterBar: false
    }
  },{
    path: '/calendar',
    name: 'calendar',
    component: Calendar,
    meta: {
      title: '阅读日历',
      isFooterBar: false
    }
  },{
    path: '/advertisingDetails',
    name: 'advertisingDetails',
    component: advertisingDetails,
    meta: {
      title: '广告详情',
      isFooterBar: false
    }
  },{
    path:'/popupList',
    name:'popupList',
    component: popupList,
    meta:{
      title:'卡券列表',
      isFooterBar: false
    }
  },{
    path:'/writeOff',
    name:'writeOff',
    component: writeOff,
    meta:{
      title:'核销',
      isFooterBar: false
    }
  }]

  export default readRouter