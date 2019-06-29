const BorrowList = () => import('@/components/pages/borrowList')
const Bookshelf = () => import('@/components/pages/bookshelf')
const RankingList = () => import('@/components/pages/rankingList')
const Ranking = () => import('@/components/pages/ranking')
const BanjiRank = () => import('@/components/pages/ranking/banjiRank')

const ReadStat = () => import('@/components/pages/readStat')
const ReadAmount = () => import('@/components/pages/readAmount')
const ReadGuide = () => import('@/components/pages/guided/readGuide')
const punchBack = () => import('@/components/pages/punch/punchBack')
const punchList = () => import('@/components/pages/punch/punchList')
const punchShare = () => import('@/components/pages/punch/punchShare')
const NewBook = () => import('@/components/pages/newBook')
const advertisingDetails = () => import('@/components/pages/punch/advertisingDetails')
const popupList = () => import('@/components/pages/punch/popupList')
const popupHelp = () => import('@/components/pages/punch/punchHelp')
const punchSpeed = () => import('@/components/pages/punch/punchSpeed')
const writeOff = () => import('@/components/pages/punch/writeOff')
const Calendar = () => import('@/components/module/mold/calendar')

const achievementPage = () => import('@/components/pages/achievement/achievementPage')
const achievementShare = () => import('@/components/pages/achievement/achievementShare')


let readRouter = [{
    path: '/bookshelf',
    name: 'bookshelf',
    component: Bookshelf,
    meta: {
      keepAlive: true
    } 
  },
  {
    path: '/newBook',
    name: 'newBook',
    component: NewBook
  },
  {
    path: '/readAmount',
    name: 'readAmount',
    component: ReadAmount,
    meta: {
      title: '我的书',
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
      
    }
  },
  {
    path: '/read-guide',
    name: 'read-guide',
    component: ReadGuide,
    meta: {
      title: '阶梯阅读指导',
      keepAlive: true,
    }
  },
  {
    path: '/punch-back',
    name: 'punch-back',
    component: punchBack,
    meta: {
      title: '打卡成功',
    }
  },
  {
    path: '/achievement-page',
    name: 'achievement-page',
    component: achievementPage,
  },
  {
    path: '/achievement-share',
    name: 'achievement-share',
    component: achievementShare,
  },
  {
    path:'/punchSpeed',
    name:'punchSpeed',
    component: punchSpeed,
    meta:{
      title: '打卡进度',
      
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
    }
  },
  {
    path: '/punch-share',
    name: 'punch-share',
    component: punchShare,
    meta: {
      title:'打卡分享',
    }
  },{
    path: '/ranking',
    name: 'ranking',
    component: Ranking,
    meta: {
      title: '阅读榜',
      keepAlive: true
    }
  },{
    path: '/RankingList',
    name: 'RankingList',
    component: RankingList,
    meta: {
      title: '榜单列表',
      keepAlive: true
    }
  },{
    path: '/BanjiRank',
    name: 'BanjiRank',
    component: BanjiRank,
    meta: {
      title: '明星榜'
    }
  },{
    path: '/readStat',
    name: 'readStat',
    component: ReadStat,
    meta: {
      title: '阅读统计',
      
    }
  },{
    path: '/calendar',
    name: 'calendar',
    component: Calendar,
    meta: {
      title: '阅读日历',
      
    }
  },{
    path: '/advertisingDetails',
    name: 'advertisingDetails',
    component: advertisingDetails,
    meta: {
      title: '广告详情',
      
    }
  },{
    path:'/popupList',
    name:'popupList',
    component: popupList,
    meta:{
      title:'卡券列表',
      
    }
  },{
    path:'/writeOff',
    name:'writeOff',
    component: writeOff,
    meta:{
      title:'核销',
      
    }
  }]

  export default readRouter