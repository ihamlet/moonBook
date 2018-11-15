import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import fetchJsonp from 'fetch-jsonp'


Vue.use(Vuex)

const state = {
    slogan:'阅读点亮人生',
    userData:{},
    msgLength:1,
    tabBtn:[],
    baiduApiKey:'ExaEOeurluH5itO8HlEBYFsCclwWDEA6',
    userPoint:''
}

const getters = {
   userDataState: state=> {
       return state.userData
   },
   MsgLengthState: state => {
       return state.msgLength.length
   },
   dryingListLengthState: state =>{
       if(state.userData.dryingList){
            return state.userData.dryingList.length
       }
   },
   userPraiseState: state => {
       let praise = []
       if(state.userData.dryingList){
            state.userData.dryingList.forEach(element => {
                praise.push(element.social.praise.number)
           })
       }

       return praise 
   },
   userPointState: state => {
        if(state.userPoint){
            return state.userPoint
        }
   },
   userCityState: state => {
        if(state.userPoint){
            return state.userPoint.city
        }
   }
}

const mutations = {
    setUserData(state, params){
        state.userData = params.data
    },
    setMsgLength(state,params){
        state.msgLength = params.data
    },
    setTabBtn(state,params){
        state.tabBtn = params.data
    },
    setUserPoint(state,params){
        state.userPoint = params.data
    }
}

const actions = {
    getUserData(context){
        axios.get('/api/userData').then(res=>{
            context.commit('setUserData', {
                data:res.data.userData
            })
        })
    },
    getMsgLength(context){
        axios.get('/api/messageList').then(res=>{
            context.commit('setMsgLength',{
                data:res.data.messageData.messageList
            })
        })
    },
    getTabBtn(context){
        axios.get('/api/barBtn').then(res=>{
            context.commit('setTabBtn',{
                data:res.data.barBtn
            })
        })
    },
    getUserLocation(context){
        let data = {
            Key: context.state.baiduApiKey,
            ip:'',
        }
        let baiduApiLink = `https://api.map.baidu.com/location/ip?ip=${data.ip}&ak=${data.Key}&coor=gcj02`

        fetchJsonp(baiduApiLink).then(response => {
            return response.json()
        }).then(res => {
            let LocationData ={
                city: res.content.address_detail.city,
                x: res.content.point.x,
                y: res.content.point.y
            }
            context.commit('setUserPoint',{
                data: LocationData
            })
        })
    },
    getSchoolList(context,products){
        let data = {
            Key: context.state.baiduApiKey,
            tag:'教育',
            query: '幼儿园',
            region: products.city,
            location:`${products.y},${products.x}`,
            page_size: 20,
            page_num: products.num,
            filter:'sort_name:distance|sort_rule:1', //距离排序
            ret_coordtype: 'gcj02ll'
        }
        
        let baiduApiLink = `https://api.map.baidu.com/place/v2/search?query=${data.query}&location=${data.location}&tag=${data.tag}&region=${data.region}&page_size=${data.page_size}&radius=10000&page_num=${data.page_num}&filter=${data.filter}&ret_coordtype=${data.ret_coordtype}&radius=100000&output=json&ak=${data.Key}`
        
        return new Promise((resolve, reject) => {
            fetchJsonp(baiduApiLink).then(response => {
                return response.json()
            }).then(res => {
                resolve(res)
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
  