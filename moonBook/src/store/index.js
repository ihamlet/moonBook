import Vue from 'vue'
import Vuex from 'vuex'
import axios from './../components/lib/js/api'
import fetchJsonp from 'fetch-jsonp'
import Cookies from 'js-cookie'

import beautifulArticle from './BeautifulArticle'
import articleSetting from './articleSetting'
import openWX from './openWX'

Vue.use(Vuex)

const state = {
  slogan: '阅读照亮人生',
  logo:`${location.origin}/Public/lib/bookshelf/img/logo.png`,
  userData: {},
  msgLength: 1,
  tabBtn: [],
  amapApiKey: '0522f462288e296eac959dbde42718ab',
  token: '',
  userPoint: '',
  manager:''
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
        state.userPoint = JSON.parse(Cookies.get('userPoint'))
        return state.userPoint
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
        data: res.data.count
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

    let amapApiLink = `https://restapi.amap.com/v3/geocode/regeo?output=json&location=${data.location}&key=${data.Key}`

    fetchJsonp(amapApiLink).then(response => {
        return response.json()
      }).then(res => {
        cityInfo.city = res.regeocode.addressComponent.city
        context.commit('setUserPoint', {
          data: cityInfo
        })
      })
  },
  getSchoolList(context, products) {
    let data = {
      location: products.location,
      lat: products.lat,
      lng: products.lng,
      page: products.page,
      school_type: products.school_type
    }

    let WMlifeSearchSchoolLink = `/book/school/getList`

    return new Promise((resolve, reject) => {
      axios.get(WMlifeSearchSchoolLink,{params:data}).then(res=>{
        let resData = []
        if(res.data.status == 1){
          resData = res.data
        }else{
          resData = []
        }

        resolve(resData)
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

    let wmData = {
      keyword: products.keywords,
      lng: products.lng,
      lat: products.lat,
      school_type: products.schoolType
    }

    let amapApiLink = `https://restapi.amap.com/v3/assistant/inputtips?key=${data.Key}&keywords=${data.keywords}&type=${data.type}&location=${ data.location}&city=${data.city}&citylimit=${data.citylimit}&datatype=${data.datatype}`
    let WMlifeSearchSchoolLink = '/book/school/getList'

    return new Promise((resolve, reject) => {
      axios.get(WMlifeSearchSchoolLink,{params:wmData}).then(res=>{
          if(res.data.data.length){
            resolve( {
              resData: res.data.data,
              searchType: 'wmSearchSchool'
            })
          }else{
            fetchJsonp(amapApiLink).then(response => {
              return response.json()
            }).then(res=>{
              resolve( {
                resData: res.tips,
                searchType: 'amapSearchSchool'
              })
            })
          }
      })
    })
  },
  searchCity(context,products){
    let data = {
      Key: context.state.amapApiKey,
      keywords: products.keywords,
      type: products.type,
      location: products.location,
      city: products.city,
      citylimit: true,
      datatype: products.datatype
    }

    let amapApiLink = `https://restapi.amap.com/v3/assistant/inputtips?key=${data.Key}&keywords=${data.keywords}&type=${data.type}&location=${ data.location}&city=${data.city}&citylimit=${data.citylimit}&datatype=${data.datatype}`
    return new Promise((resolve, reject) => {
      fetchJsonp(amapApiLink).then(response => {
        return response.json()
      }).then(res=>{
        resolve( {
          resData: res.tips,
          searchType: 'amapSearchSchool'
        })
      })
    })
  },
  getCityDistrict(context, products) {
    let data = {
      Key: context.state.amapApiKey,
      keywords: products.city,
      subdistrict: 2,
      type: products.type,
      location: products.location,
      datatype: products.datatype,
      extensions: 'base'
    }

    let amamApiLink = `https://restapi.amap.com/v3/config/district?key=${data.Key}&keywords=${data.keywords}&subdistrict=${data.subdistrict}&extensions=${data.extensions}&type=${data.type}&location=${data.location}&datatype=${data.datatype}`

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
  },
  //文章发布
  release(context, products){
    let setting = context.state.articleSetting
    let data={
      cate_id: setting.tag.cate_id,
      ad_label: setting.group.group_name,
      details: products.details,
      template_id: products.template_id,
      cover: products.cover,
      photos: products.photos,
      child_id: products.child_id,
      banji_id: products.banji_id,
      school_id: products.school_id,
      title: products.title
    }

    setting.result.forEach(e=>{
      switch(e){
        case 'baby-home':
          data.to_baby  = 1
        break
        case 'class-home':
          data.to_banji = 1   
        break
        case 'apps-find':
          data.to_find  = 1
        break
      }
    })

    return new Promise((resolve, reject) => {
      axios.post('/book/SchoolArticle/edit?ajax=1', data).then(res => {
        switch(res.data.status){
          case 1:
            localStorage.removeItem('grapicData') //清空浏览器缓存
          break
        }

        resolve(res.data.status)
      })
    })
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules:{
    beautifulArticle,
    articleSetting,
    openWX
  }
})
