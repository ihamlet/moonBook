import Vue from 'vue'
import Vuex from 'vuex'
import axios from './../components/lib/js/api'
// import { isRepeatArr } from './../components/lib/js/util'

import fetchJsonp from 'fetch-jsonp'
import Cookies from 'vue-cookie'
import qs from 'qs'

import articleSetting from './articleSetting'
import manage from './manage'
import openWX from './openWX'

Vue.use(Vuex)

const state = {
  slogan: '阅读照亮人生',
  logo:`${location.origin}/Public/lib/bookshelf/img/logo.png`,
  userData: '',
  message: '',
  tabBtn: [],
  amapApiKey: '0522f462288e296eac959dbde42718ab',
  token: '',
  userPoint: '',
  manager:'',
  releaseSwitch: false,
  weather:''
}

const getters = {
  userDataState: state => {
    let data

    if (state.userData) {
      data = state.userData
    } else {
      if (localStorage.getItem('userData')) {
        data = JSON.parse(localStorage.getItem('userData'))
      }else{
        data = {
          child_id:0,
          teacher_school_id:0
        }
      }
    }

    return data
  },
  MsgLengthState: state => {
    return state.message.count
  },
  managerState: state => {
    return state.manager
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
        return JSON.parse(Cookies.get('userPoint'))
      }
    }
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
  },
  getTabBtn: state => {
    if (state.tabBtn) {
      return state.tabBtn
    } else {
      if (localStorage.getItem('tabBtn')) {
        return JSON.parse(localStorage.getItem('tabBtn'))
      }
    }
  }
}

const mutations = {
  setUserData(state, params) {
    localStorage.setItem('userData', JSON.stringify(params.data))
    state.userData = params.data
  },
  setManager(state, params){
    state.manager = params.data
  },
  setMsgLength(state, params) {
    state.message = params.data
  },
  setUserPoint(state, params) {
    Cookies.set('userPoint', JSON.stringify(params.data), { expires: 7 })
    state.userPoint = params.data
  },
  setToken(state, params) {
    state.token = params.data
  },
  setReleaseSwitch(state, params){
    state.releaseSwitch = params
  },
  setTabBtn(state, params){
    localStorage.setItem('tabBtn', JSON.stringify(params.data))
    state.tabBtn = params.data
  },
  setWeather(state, params){
    state.weather = params
  }
}

const actions = {
  async getUserData(context) {
     return axios.get('/book/memberUser/getInfo').then(res => {
        let tabArray = [{
          iconClass: 'icon-home',
          name: '首页',
          path: '/'
        },
        {
          iconClass: 'icon-banji',
          name: '班级',
          path: 'class-home',
          id: res.data.teacher_banji_id > 0?res.data.teacher_banji_id:res.data.banji_id
        },
        {
          iconClass: 'icon-release',
          name: '发布',
          path: ''
        },
        {
          iconClass: 'icon-crown',
          name: '宝贝',
          path: 'baby-home',
          id: res.data.child_id
        },
        {
          iconClass: 'icon-people',
          name: '我的',
          path: 'my-home'
        }]

        context.commit('setUserData', {
          data: res.data
        })

        context.commit('setTabBtn', {
          data: tabArray
        })

        return res.data
      })
  },
  getManager(context){
    axios.get('/book/MemberBanji/getList').then(res=>{
      context.commit('setManager', {
        data: res.data.data
      })
    })
  },
  getMsg(context) {
    let  bookApiLink = '/book/MemberMsg/getList'
    axios.get(bookApiLink).then(res => {
      context.commit('setMsgLength', {
        data: res.data
      })
    })
  },
  getUserLocation(context, products) {
  
    let cityInfo = {
      location: products.location.join(",")
    }

    let data = {
      Key: context.state.amapApiKey,
      location: products.location.join(",")
    }
  
    let amapApiLink = `https://restapi.amap.com/v3/geocode/regeo?output=json&${qs.stringify(data)}`

    fetchJsonp(amapApiLink).then(response => {
        return response.json()
      }).then(res => {
        cityInfo.city = res.regeocode.addressComponent.city
        context.commit('setUserPoint', {
          data: cityInfo
        })
      })
  },
  async getSchoolList(context, products) {
    let data = {
      location: products.location,
      lat: products.lat,
      lng: products.lng,
      page: products.page,
      school_type: products.school_type
    }

    let WMlifeSearchSchoolLink = `/book/school/getList`

    return axios.get(WMlifeSearchSchoolLink,{params:data}).then(res=>{
        let resData = []
        if(res.data.status == 1){
          resData = res.data
        }else{
          resData = []
        }

        return resData
      })
    
  },
  async getSearch(context, products) {
    let data = {
      Key: context.state.amapApiKey,
      keywords: products.keywords,
      type: products.type,
      location: products.location,
      city: products.city,
      citylimit: true,
      datatype: 'all'
    }

    let wmData = {
      keyword: products.keywords,
      lng: products.lng,
      lat: products.lat,
      school_type: products.schoolType
    }

    let amapApiLink = `https://restapi.amap.com/v3/assistant/inputtips?${qs.stringify(data)}`
    let WMlifeSearchSchoolLink = '/book/school/getList'

    return axios.get(WMlifeSearchSchoolLink,{params:wmData}).then(res=>{
          if(res.data.data.length){
            return {
              resData: res.data.data,
              searchType: 'wmSearchSchool'
            }
          }else{
            fetchJsonp(amapApiLink).then(response => {
              return response.json()
            }).then(res=>{
              return {
                resData: res.tips,
                searchType: 'amapSearchSchool'
              }
            })
          }
      })
  },
  async searchCity(context,products){
    let data = {
      Key: context.state.amapApiKey,
      keywords: products.keywords,
      type: products.type,
      location: products.location,
      city: products.city,
      citylimit: true,
      datatype: products.datatype
    }

    let amapApiLink = `https://restapi.amap.com/v3/assistant/inputtips?${qs.stringify(data)}`
   
      fetchJsonp(amapApiLink).then(response => {
        return response.json()
      }).then(res=>{
        return {
          resData: res.tips,
          searchType: 'amapSearchSchool'
        }
      })
  },
  async getCityDistrict(context, products) {
    let data = {
      Key: context.state.amapApiKey,
      keywords: products.city,
      subdistrict: 2,
      type: products.type,
      location: products.location,
      datatype: products.datatype,
      extensions: 'base'
    }

    let amamApiLink = `https://restapi.amap.com/v3/config/district?${qs.stringify(data)}`


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
          return res
        })
  },
  async getLogin(context, products) {
    let data = products
      axios.post('/book/login/mobileLogin', data).then(res => {
        context.commit('setToken', {
          data: res.data.token
        })

        return res.data
      })
  },
  //文章发布
  async release(context, products){
    let setting = context.state.articleSetting
    let extraData = products.extra

    console.log(products.banji_id)
    
    let data = {
      cate_id: setting.tag.cate_id,
      ad_label: setting.group.group_name,
      banji_id: context.getters.userDataState.teacher_banji_id,
      school_id: context.getters.userDataState.teacher_school_id,
      ...products,
      to_school: 1
    }

    setting.result.forEach(e=>{
      switch(e){
        case 'apps-find':
          data.to_find  = 1
        break
        case 'baby-home':
          data.to_baby  = 1
        break
        case 'class-home':
          data.to_banji = 1   
        break
      }
    })
    
    return axios.post('/book/SchoolArticle/edit?ajax=1', data).then(res => {
        switch(res.data.status){
          case 1:
            localStorage.removeItem('grapicData') //清空浏览器缓存
            context.commit('setReleaseSwitch',false)
          break
        }
        return res
      })
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules:{
    articleSetting,
    manage,
    openWX
  }
})
