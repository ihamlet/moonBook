import Mock from 'mockjs'
import {
  getRandomArrayElements
} from './../components/lib/js/util'

// 设置全局延时 用来检测数据变化
Mock.setup({
  timeout: '300-600'
})

//底栏icon数据
let barBtn = [{
  iconClass: 'icon-home',
  name: '首页',
  path: '/',
}, {
  iconClass: 'icon-faxian',
  name: '发现',
  path: 'find'
}, {
  iconClass: 'icon-community',
  name: '消息',
  path: 'notice'
}, {
  iconClass: 'icon-people',
  name: '个人中心',
  path: 'my'
}]

Mock.mock('/api/barBtn', (req, res) => {
  return {
    barBtn
  }
})


//首页数据 

let homeData = Mock.mock({
  'banner|8': [{
    link: '#',
    image: '#'
  }],
  apps: [{
    icon: 'https://oss-hys.oss-cn-hangzhou.aliyuncs.com/moonBook/icon-幼儿园.png',
    name: '幼儿园'
  }, {
    icon: 'https://oss-hys.oss-cn-hangzhou.aliyuncs.com/moonBook/icon-听故事.png',
    name: '听故事'
  }, {
    icon: 'https://oss-hys.oss-cn-hangzhou.aliyuncs.com/moonBook/icon-宝妈社区.png',
    name: '宝妈社区'
  }, {
    icon: 'https://oss-hys.oss-cn-hangzhou.aliyuncs.com/moonBook/icon-榜单.png',
    name: '榜单'
  }, {
    icon: 'https://oss-hys.oss-cn-hangzhou.aliyuncs.com/moonBook/icon-教育.png',
    name: '教育'
  }],
  investmentAd: {
    link: 'https://www.wmlife.net/book/franchiseeApply/guide',
    banner: 'https://oss-hys.oss-cn-hangzhou.aliyuncs.com/moonBook/banner-加盟商.png'
  },
  newsList: [{
    id: Mock.mock('@increment'),
    cover: 'https://www.wmlife.net/Public/lib/bookshelf-pandeng/image/qzyd.jpg',
    title: '孩子阅读习惯的养成和培养',
    type: 'article',
    releaseInfo: {
      name: '王伟',
      school: '微美幼儿园',
      time: '2018-09-12',
      watch: 38497
    }
  }, {
    id: Mock.mock('@increment'),
    cover: 'https://www.wmlife.net/Public/lib/bookshelf-pandeng/image/gqpl.jpg',
    title: '钢琴陪练课太贵?看这里,1对1钢琴陪练,一节课只需27元',
    type: 'ad',
    adInfo: {
      school: '雅玲琴行',
    }
  }, {
    id: Mock.mock('@increment'),
    cover: '#',
    title: '未来之星教育',
    type: 'direct',
    directInfo: {
      category: '课外辅导',
      address: '黄石亚光新村29号'
    }
  }],
  'videoList|10': [{
    id: function () {
      return Mock.mock('@increment')
    },
    name: function () {
      return Mock.mock('@cname')
    },
    cover: Mock.mock("@image('750x1134','#909399','#fff','jpeg','封面750x1134')"),
    like: function () {
      return Mock.mock('@natural(10, 1100)')
    },
    getLike: false,
    avatar: Mock.mock("@image('120x120')")
  }]
})

Mock.mock('/api/home', (req, res) => {
  return {
    homeData
  }
})

//课程列表

let courseData = Mock.mock({
  'courseList|20': [{
    title: function () {
      return Mock.mock('@ctitle(8, 30)')
    },
    cover: Mock.mock("@image('400x300','#DCDFE6','#fff','jpeg','400x300')"),
    date: function () {
      return Mock.mock("@now('yyyy-MM-')" + "@datetime('dd')")
    },
    time: function () {
      return Mock.mock('@time("HH:mm:ss")')
    },
    price: function () {
      return Mock.mock('@natural(100, 2000)')
    },
    free: function () {
      return Mock.mock({
        "boolean|1-2": true
      })
    },
    participate: function () {
      return Mock.mock('@natural(0, 19)' + '/' + '@natural(11, 20)')
    }
  }]
})

Mock.mock('/api/courseList', (req, res) => {
  return {
    courseData
  }
})

// 添加喜欢

let addLike = function (options) {
  let id = JSON.parse(options.body).id
  let like = ''
  let getLike = JSON.parse(options.body).getLike
  homeData.videoList.forEach(element => {
    if (id == element.id) {
      element.getLike = getLike
      if (getLike) {
        element.like++
      } else {
        element.like--
      }
      like = element.like
    }
  })
  return {
    like
  }
}

Mock.mock('/api/addLike', addLike)

// 消息中心

let messageData = Mock.mock({
  'messageList|20': [{
    id: function () {
      return Mock.mock('@increment')
    },
    'content|1': [{
        text: '您在实验幼儿园的阅亮书架借阅了一本书',
        type: 'moonBook',
      },
      {
        text: '您归还了一本书',
        type: 'moonBook',
      },
      {
        text: '您邀请的朋友成功办理借阅卡',
        type: 'system',
      }
    ],
    date: function () {
      return Mock.mock("@now('MM-')" + "@datetime('dd')")
    },
    time: function () {
      return Mock.mock('@time("HH:mm:ss")')
    }
  }],
})

Mock.mock('/api/messageList', (req, res) => {
  return {
    messageData
  }
})

let readList = []

let addRead = function (options) {
  let id = JSON.parse(options.body).id
  let index
  messageData.messageList.forEach((element, i) => {
    if (id == element.id) {
      index = i
      readList.push(element)
    }
  })

  messageData.messageList.splice(index, 1)

  return {
    readList,
    messageData
  }
}

let topping = function (options) {
  let id = JSON.parse(options.body).id
  let index
  let item = {}
  messageData.messageList.forEach((element, i) => {
    if (id == element.id) {
      index = i
      item = element
    }
  })

  messageData.messageList.splice(index, 1)
  messageData.messageList.unshift(item)

  return {
    messageData
  }
}

Mock.mock('/api/addRead', addRead)
Mock.mock('/api/topping', topping)
Mock.mock('/api/readList', readList)


//校园列表

let schoolData = Mock.mock({
  'schoolList|20': [{
    id: function () {
      return Mock.mock('@increment')
    },
    schoolName: function () {
      return Mock.mock({
        "name|1": [
          '交运艺术幼儿园',
          '博士友（磁湖幼儿园）',
          '黄石政府机关幼儿园',
          '下陆区团城山幼儿园',
          '黄棉昌大公司幼儿园',
          '银湖月色幼儿园',
          '黄石市委机关幼儿园',
          '金龟子锻压幼儿园',
          '天方幼儿园',
          '黄石市天虹幼儿园',
          '大冶市子规缘幼儿园',
          '大冶市聚龙外国语幼儿园',
          '芳馨幼儿园',
          '阳新县实验幼儿园'
        ]
      })
    },
    schoolAddress: function () {
      return '黄石市' + Mock.mock('@ctitle(5, 10)')
    },
    addChild: function () {
      return Mock.mock({
        "boolean|1": true
      })
    }
  }]
})

Mock.mock('/api/schoolList', (req, res) => {
  return {
    schoolData
  }
})

// 借阅卡信息

let card = [{
  level: {
    id: Mock.mock('@increment'),
    cardId: Mock.mock('@increment(100)'),
    name: 'masonry'
  },
  type: '砖石会员',
  borrow: 7,
  deposit: 399,
  period: 11
}, {
  level: {
    id: Mock.mock('@increment'),
    cardId: Mock.mock('@increment(100)'),
    name: 'ordinary'
  },
  type: '黄金会员',
  borrow: 5,
  deposit: 299,
  period: 9
}, {
  level: {
    id: Mock.mock('@increment'),
    cardId: Mock.mock('@increment(100)'),
    name: 'gold'
  },
  type: '普通会员',
  borrow: 3,
  deposit: 199,
  period: 7
}]

let vipInterval = [{
  day: 365,
  month: 12,
  price: 365
}, {
  day: 90,
  month: 3,
  price: 129
}]

Mock.mock('/api/cardInfo', (req, res) => {
  return {
    card,
    vipInterval
  }
})

let userData = {
  id: Mock.mock('@increment'),
  regInfo: '',
  userInfo: {
    avatar: Mock.mock("@image('120x120')"),
    name: Mock.mock('@cname()'),
  },
  readInfo: {
    read: Mock.mock({
      "number|1-20": 20
    }),
    reading: Mock.mock({
      "number|1-5": 5
    }),
    collection: Mock.mock({
      "number|1-30": 30
    }),
    abrasion: Mock.mock({
      "number|1-3": 2
    }),
  },
  isVip: 0,
  vipInfo: '',
  childInfo: [],
  dryingList: [],
  social: {
    fans: Mock.mock('@natural(20, 100)'),
    follow: Mock.mock('@natural(10, 50)'),
  }

}

let pay = function (options) {
  let content = JSON.parse(options.body).data
  if (content) {
    userData.isVip = 1
    userData.vipInfo = {
      card:content.card,
      school:content.school.schoolName.name,
      vipInterval:content.vipInterval
    }
    
    messageData.messageList.unshift({
      id: Mock.mock('@increment'),
      content: {
        type: 'system',
        text: `尊敬的${content.card.type},您的借阅卡已成功办理`
      },
      date: Mock.mock("@now('MM-dd')"),
      time: Mock.mock("@now('HH:mm:ss')")
    })
  } else {
    userData.isVip = 0
    messageData.messageList.unshift({
      id: Mock.mock('@increment'),
      content: {
        type: 'system',
        text: `支付失败-您的借阅卡办理失败,如有疑问请联系客服`
      },
      date: Mock.mock("@now('MM-dd')"),
      time: Mock.mock("@now('HH:mm:ss')")
    })
  }
  return {
    userData
  }
}

//用户信息
Mock.mock('/api/userData', (req, res) => {
  return {
    userData
  }
})

Mock.mock('/api/pay', pay)

//发现页面数据
let freshData = Mock.mock({
  'freshList|10-20': [{
    id: function () {
      return Mock.mock('@increment')
    },
    avatar: Mock.mock("@image('120x120')"),
    name: function () {
      return Mock.mock('@cname()')
    }
  }]
})

let schoolArray = []
schoolData.schoolList.forEach(e=>{
  schoolArray.push(e.schoolName.name)
})

let dryingData = Mock.mock({

  'dryingList|25': [{
    avatar: Mock.mock("@image('120x120')"),
    id: function () {
      return Mock.mock('@increment')
    },
    "isVip|1": [0, 1],
    "vipType|1": card,
    name: function () {
      return Mock.mock('@cname()')
    },
    date: function () {
      return Mock.mock("@now('MM-')" + "@datetime('dd')")
    },
    time: function () {
      return Mock.mock('@time("HH:mm:ss")')
    },
    text: function () {
      return Mock.mock('@cparagraph(0,5)')
    },
    'school|1': schoolArray,
    "media|1": [{
      videoCover: Mock.mock("@image('750x1134','#000','#fff','jpeg','封面750x1134')")
    }, {
      'imgList|1-9': [{
        img: function () {
          return Mock.mock("@dataImage()")
        }
      }]
    }],
    social: {
      praise: function () {
        return Mock.mock({
          "number|1-1200": 50
        })
      },
      share: function () {
        return Mock.mock({
          "number|1-1200": 50
        })
      },
      message: function () {
        return Mock.mock({
          "number|1-1200": 50
        })
      }
    },
    getPraise: false
  }]
})

Mock.mock('/api/fresh', (req, res) => {
  return {
    freshData
  }
})


// 数据是否有学校字段
let schoolName = function(){
  var name = ''
  if (userData.childInfo.length!=0) {
    name = userData.childInfo[0].school
  } else if (userData.vipInfo) {
    name = userData.vipInfo.school
  } else {
    name = ''
  }
  return name
}



let addDrying = function (options) {
  let data = JSON.parse(options.body).graphic
  let result = JSON.parse(options.body).result
  let array = {
    id: Mock.mock('@increment'),
    avatar: userData.userInfo.avatar,
    name: userData.userInfo.name,
    date: Mock.mock("@now('MM-dd')"),
    time: Mock.mock('@now("HH:mm:ss")'),
    media: {
      imgList: data.images
    },
    isVip: userData.isVip,
    vipType: userData.vipInfo.card,
    school: schoolName(),
    text: data.text,
    social: {
      praise: Mock.mock({
        "number|1-1200": 50
      }),
      share: Mock.mock({
        "number|1-1200": 50
      }),
      message: Mock.mock({
        "number|1-1200": 50
      })
    },
    getPraise: false
  }

  result.forEach(e => {
    if (e == 'find') {
      dryingData.dryingList.unshift(array)
    }

    if(e == 'classHome') {
      classAticleList.unshift(array)
    }

    if(e == 'babyHome'){
      childAticleList.unshift(array)
    }
  })

  userData.dryingList.unshift(array)

  return {
    dryingData
  }
}

//孩子文章列表

let childAticleList = []

Mock.mock('/api/childAticleList', (req, res) => {
  return {
    childAticleList,
    length:childAticleList.length
  }
})

//班级文章列表

let classAticleList = []

Mock.mock('/api/classAticleList', (req, res) => {
  return {
    classAticleList,
    length:classAticleList.length
  }
})

Mock.mock('/api/addDrying', addDrying)

// 点赞
let addPraise = function (options) {
  let id = JSON.parse(options.body).id
  let praise = ''
  let getPraise = JSON.parse(options.body).getPraise
  dryingData.dryingList.forEach(element => {
    if (id == element.id) {
      element.getPraise = getPraise
      if (element.getPraise) {
        element.social.praise.number++
      } else {
        element.social.praise.number--
      }
      praise = element.social.praise.number
    }
  })
  return {
    praise
  }
}

Mock.mock('/api/drying', (req, res) => {
  return {
    dryingData
  }
})

Mock.mock('/api/addPraise', addPraise)

let bookSort = [
  '感情认知', '兴趣爱好', '英文启蒙', '科普百科', '启蒙认知', '人文历史', '品格塑造', '习惯养成', '必读'
]

// 图书数据
let bookData = Mock.mock({
  'list|5-20': [{
    id: function () {
      return Mock.mock('@increment')
    },
    cover: function () {
      return Mock.mock("@image('300x300','#DCDFE6','#fff','jpeg','封面')")
    },
    name: function () {
      return Mock.mock('@ctitle(3, 20)')
    },
    borrow: function () {
      return Mock.mock('@integer(800, 3000)')
    },
    author: function () {
      return Mock.mock('@name(true)')
    },
    sort: function () {
      return getRandomArrayElements(bookSort, Math.ceil(Math.random() * 4))
    }
  }]
})

Mock.mock('/api/bookData', (req, res) => {
  return {
    bookData
  }
})

let childReading = function (){
  let data = {
    totalReading: Mock.mock({
      "number|20-100": 50
    }), //总阅读量
    readings: Mock.mock({
      "number|10-30": 20
    }), //周阅读量
    praise: Mock.mock({
      "number|10-30": 20
    }), //总获赞数
  }

  let statistics = {
    totalReading: data.totalReading.number,
    readings: data.readings.number,
    praise: data.praise.number
  }

  return statistics
}

// 添加孩子信息
let addChild = function (options) {
  let data = JSON.parse(options.body).childInfo

  userData.childInfo.unshift({
    id: Mock.mock('@increment'),
    dataStatistics: childReading(),
    dryingList:'',
    school: schoolName(),
    lateBook: bookData.list, //最近在读
    setting:{
      current: true,
      public: true,
    },
    data
  })

  userData.childInfo.forEach((element,i)=>{
    if(i != 0){
      element.setting.current = false
      element.dryingList = []
    }
  })

  return {
    userData
  }
}

//孩子设置

let childSetting = function (options) {

    let id = JSON.parse(options.body).id
    let setting = JSON.parse(options.body).setting

    let child = ''
    userData.childInfo.forEach(element => {
      if (id == element.id) {
        element.school = setting.babySchool
        child = element
      }
    })
    
    return {
      child
    }
}

Mock.mock('/api/childSetting', childSetting) //添加设置

//编辑孩子信息
let editChild = function (options) {
  let id = JSON.parse(options.body).id
  let data = JSON.parse(options.body).childInfo
  userData.childInfo.forEach(element => {
    if (id == element.id) {
      element.data = data
    }
  })

  return {
    userData
  }
}

let ChildInfo = function (options) {
  let id = JSON.parse(options.body).id
  let child
  userData.childInfo.forEach(element => {
    if (id == element.id) {
      child = element
    }
  })

  return {
    child
  }
}

let deleteChild = function (options) {
  let id = JSON.parse(options.body).id
  let index
  userData.childInfo.forEach((element, i) => {
    if (id == element.id) {
      index = i
    }
  })
  userData.childInfo.splice(index, 1)

  return {
    userData
  }
}


Mock.mock('/api/addChild', addChild) //增
Mock.mock('/api/deleteChild', deleteChild) //删
Mock.mock('/api/editChild', editChild) //改
Mock.mock('/api/ChildInfo', ChildInfo) //查

// 话题列表

let topicList = ['生活', '才艺', '阅读', '幼儿园', '萌宝']

Mock.mock('/api/topicList', (req, res) => {
  return {
    topicList
  }
})

let hotCity = ['黄石市', '武汉市', '北京市', '广州市', '上海市', '重庆市', '杭州市', '南京市']

Mock.mock('/api/hotCity', (req, res) => {
  return {
    hotCity
  }
})

//注册
let reg = function (options) {
  let data = JSON.parse(options.body).data
  userData.regInfo = data
  userData.childInfo[0].reg = data
  userData.childInfo[0].school = data.school
  return {
    userData
  }
}

Mock.mock('/api/reg', reg)

//班级数据
let classData = Mock.mock({
  'classList': [{
    title: '小班',
    'class|10': [{
      name: function () {
        return `向日葵${Mock.mock('@cword(一二三四五六七八九十)')}班`
      },
      people: function () {
        return Mock.mock({
          "number|15-50": 20
        })
      },  		
      sort:'小班',
      weekList:{
        'week|10-30':[{
          avatar: Mock.mock("@image('120x120')"),
          name: function () {
            return Mock.mock('@cname()')
          },
          id: function () {
            return Mock.mock('@increment')
          },
          num: function(){
            return Mock.mock('@natural(5, 30)')
          },
          lateBook: bookData.list
        }],	
        'total|15-30':[{
          avatar: Mock.mock("@image('120x120')"),
          name: function () {
            return Mock.mock('@cname()')
          },
          id: function () {
            return Mock.mock('@increment')
          },
          num: function(){
            return Mock.mock('@natural(5, 30)')
          },
          lateBook: bookData.list
        }]
      }
    }]
  }, {
    title: '中班',
    'class|10': [{
      name: function () {
        return `彩虹岛${Mock.mock('@cword(一二三四五六七八九十)')}班`
      },
      people: function () {
        return Mock.mock({
          "number|15-50": 20
        })
      },
      sort:'中班',
      weekList:{
        'week|15-30':[{
          avatar: Mock.mock("@image('120x120')"),
          name: function () {
            return Mock.mock('@cname()')
          },
          id: function () {
            return Mock.mock('@increment')
          },
          num: function(){
            return Mock.mock('@natural(5, 30)')
          },
          lateBook: bookData.list
        }],	
        'total|15-30':[{
          avatar: Mock.mock("@image('120x120')"),
          id: function () {
            return Mock.mock('@increment')
          },
          name: function () {
            return Mock.mock('@cname()')
          },
          num: function(){
            return Mock.mock('@natural(5, 30)')
          },
          lateBook: bookData.list
        }]
      }
    }]
  }, {
    title: '大班',
    'class|10': [{
      name: function () {
        return `四叶草${Mock.mock('@cword(一二三四五六七八九十)')}班`
      },
      people: function () {
        return Mock.mock({
          "number|15-50": 20
        })
      },
      sort:'大班',
      weekList:{
        'week|20-30':[{
          avatar: Mock.mock("@image('120x120')"),
          name: function () {
            return Mock.mock('@cname()')
          },
          id: function () {
            return Mock.mock('@increment')
          },
          num: function(){
            return Mock.mock('@natural(5, 30)')
          },
          lateBook: bookData.list
        }],	
        'total|20-30':[{
          avatar: Mock.mock("@image('120x120')"),
          name: function () {
            return Mock.mock('@cname()')
          },
          id: function () {
            return Mock.mock('@increment')
          },
          num: function(){
            return Mock.mock('@natural(5, 30)')
          },
          lateBook: bookData.list
        }]
      }
    }]
  }]
})

Mock.mock('/api/classData', (req, res) => {
  return {
    classData
  }
})

// 添加班级
let addClass = function (options) {
  let data = JSON.parse(options.body).data
  userData.childInfo.forEach(e => {
    if(e.id == data.id){
        e.class = {
          name:data.className,
          people:data.people.number,
          sort:data.sort,
          weekList:data.weekList
        }
      }
  })

  return {
    userData
  }
}

Mock.mock('/api/addClass', addClass)

//班级成员

let classMemberData = Mock.mock({
  'memberList|20-30':[{
      avatar: Mock.mock("@image('120x120')"),
      name: function () {
        return Mock.mock('@cname()')
      },
      id: function () {
        return Mock.mock('@increment')
      },
      num: function(){
        return Mock.mock('@natural(5, 30)')
      }
  }]
})

classMemberData.memberList[0].name = `${Mock.mock('@cfirst()')}老师`
classMemberData.memberList[0].teacher = true

Mock.mock('/api/classMemberData', (req, res) => {
  return {
    classMemberData
  }
})