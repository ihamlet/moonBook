import Vue from 'vue'
import Vuex from 'vuex'
import axios from './../components/lib/js/api'
import fetchJsonp from 'fetch-jsonp'
import Cookies from 'js-cookie'

Vue.use(Vuex)

const state = {
  slogan: '阅读照亮人生',
  userData: {},
  msgLength: 1,
  tabBtn: [],
  amapApiKey: '0522f462288e296eac959dbde42718ab',
  token: '',
  userPoint: '',
  footerTab: [
    {
      iconClass: 'icon-home',
      name: '首页',
      path: '/'
    },
    {
      iconClass: 'icon-faxian',
      name: '发现',
      path: 'find'
    },
    {
      iconClass: 'icon-banji',
      name: '班级',
      path: 'class-home'
    },
    {
      iconClass: 'icon-community',
      name: '消息',
      path: 'notice'
    },
    {
      iconClass: 'icon-people',
      name: '个人中心',
      path: 'my'
    }
  ]
}

const getters = {
  userDataState: state => {
    if (state.userData) {
      return state.userData
    } else {
      if (localStorage.getItem('userData')) {
        state.userData = JSON.parse(localStorage.getItem('userData'))
        return state.userData
      }
    }
  },
  MsgLengthState: state => {
    return state.msgLength
  },
  userPraiseState: state => {
    let praise = []
    if (state.userData.dryingList) {
      state.userData.dryingList.forEach(element => {
        praise.push(element.social.praise.number)
      })
    }
    return praise
  },
  userPointState: state => {
    if (state.userPoint) {
      return state.userPoint
    } else {
      if (Cookies.get('userPoint')) {
        state.userPoint = JSON.parse(Cookies.get('userPoint'))
        return state.userPoint
      }
    }
  },
  userTabBtn: state => {
    return state.footerTab
  },
  userToken: state => {
    if (state.token) {
      return state.token
    } else {
      let data
      if (Cookies.get('WWW_TOKEN')) {
        data = Cookies.get('WWW_TOKEN')
      }
      return (state.token = data)
    }
  }
}

const mutations = {
  setUserData(state, params) {
    localStorage.setItem('userData', JSON.stringify(params.data))
    state.userData = params.data
  },

  setMsgLength(state, params) {
    state.msgLength = params.data
  },

  setUserPoint(state, params) {
    Cookies.set('userPoint', params.data, { expires: 7 })
    state.userPoint = params.data
  },

  setToken(state, params) {
    state.token = params.data
  }
}

const actions = {
  getUserData(context) {
    return new Promise((resolve, reject) => {
      axios.get('/book/memberUser/getInfo').then(res => {
        resolve(res.data)
        context.commit('setUserData', {
          data: res.data
        })
      })
    })
  },
  getMsg(context,products) {

    let bookApiLink
    if( products ){
      bookApiLink = `/book/MemberMsg/getList?page=${products.page}`
    }else{
      bookApiLink = '/book/MemberMsg/getList'
    }    
    
    return new Promise((resolve, reject) => {
      axios.get(bookApiLink).then(res => {
        context.commit('setMsgLength', {
          data: res.data.count
        })
        resolve(res.data.data)
      })
    })
  },
  getUserLocation(context, products) {
    let cityInfo = {
      location: products.location
    }

    let data = {
      Key: context.state.amapApiKey,
      location: products.location
    }

    let amapApiLink = `https://restapi.amap.com/v3/geocode/regeo?output=json&location=${
      data.location
    }&key=${data.Key}`

    fetchJsonp(amapApiLink)
      .then(response => {
        return response.json()
      })
      .then(res => {
        cityInfo.city = res.regeocode.addressComponent.city
        context.commit('setUserPoint', {
          data: cityInfo
        })
      })
  },
  getSchoolList(context, products) {
    let data = {
      Key: context.state.amapApiKey,
      keywords: '教育',
      types: 141204,
      location: products.location,
      offset: 20,
      page: products.page,
      radius: 24000
    }

    let amapApiLink = `https://restapi.amap.com/v3/place/around?key=${
      data.Key
    }&location=${data.location}&radius=${data.radius}&keywords=${
      data.keywords
    }&types=${data.types}&offset=${data.offset}&page=${data.page}`

    return new Promise((resolve, reject) => {
      fetchJsonp(amapApiLink)
        .then(response => {
          return response.json()
        })
        .then(res => {
          resolve(res)
        })
    })
  },
  getSearch(context, products) {
    let data = {
      Key: context.state.amapApiKey,
      keywords: products.keywords,
      type: products.type,
      location: products.location,
      city: products.city,
      citylimit: true,
      datatype: 'all'
    }

    let locationArray = context.getters.userPointState.location.split(',')

    let joinData = {
      lat: locationArray[1],
      lng: locationArray[0],
      page: 1,
      keyword: products.keywords
    }

    if (products.searchType == 'joinSchool') {
      let WMlifeSearchSchoolLink = `/book/school/index?ajax=1&lat=${
        joinData.lat
      }&lng=${joinData.lng}&page=${joinData.page}&keyword=${joinData.keyword}`

      return new Promise((resolve, reject) => {
        axios.get(WMlifeSearchSchoolLink).then(res => {
          let datas = {
            searchType: products.searchType,
            resData: res.data
          }
          resolve(datas)
        })
      })
    } else {
      let amamApiLink = `https://restapi.amap.com/v3/assistant/inputtips?key=${
        data.Key
      }&keywords=${data.keywords}&type=${data.type}&location=${
        data.location
      }&city=${data.city}&citylimit=${data.citylimit}&datatype=${data.datatype}`

      return new Promise((resolve, reject) => {
        fetchJsonp(amamApiLink)
          .then(response => {
            return response.json()
          })
          .then(res => {
            resolve(res)
          })
      })
    }
  },
  getCityDistrict(context, products) {
    let data = {
      Key: context.state.amapApiKey,
      keywords: products.city,
      subdistrict: 2,
      extensions: 'base'
    }

    let amamApiLink = `https://restapi.amap.com/v3/config/district?key=${
      data.Key
    }&keywords=${data.keywords}&subdistrict=${data.subdistrict}&extensions=${
      data.extensions
    }`

    return new Promise((resolve, reject) => {
      fetchJsonp(amamApiLink)
        .then(response => {
          return response.json()
        })
        .then(res => {
          let cityInfo = {
            city: res.districts[0].name,
            location: res.districts[0].center
          }
          context.commit('setUserPoint', {
            data: cityInfo
          })
          resolve(res)
        })
    })
  },
  getLogin(context, products) {
    let data = products
    return new Promise((resolve, reject) => {
      axios.post('/book/login/mobileLogin', data).then(res => {
        resolve(res.data)
        context.commit('setToken', {
          data: res.data.token
        })
      })
    })
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
