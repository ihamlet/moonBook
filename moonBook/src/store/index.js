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
    city:'',
    baiduApiKey:'ExaEOeurluH5itO8HlEBYFsCclwWDEA6',
}

const getters = {
   userDataState: state=>{
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
   userPraiseState: state =>{
       let praise = []
       if(state.userData.dryingList){
            state.userData.dryingList.forEach(element => {
                praise.push(element.social.praise.number)
           })
       }

       return praise 
   },
   userCity: state =>{
        if(state.city){
            return state.city
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
    setCity(state,params){
        state.city = params.data
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
            context.commit('setCity',{
                data:res.content.address_detail.city
            })
        })
    },
    getSchoolList(context,products){
        let data = {
            Key: context.state.baiduApiKey,
            tag:'教育',
            query:'幼儿园',
            region: products.city,
            page_size:10,
            page_num: products.num,
            filter:'sort_name:distance|sort_rule:1', //距离排序
            ret_coordtype: 'gcj02ll'
        }
        let baiduApiLink = `http://api.map.baidu.com/place/v2/search?
                            query=${data.query}
                            &tag=${data.tag}
                            &region=${data.region}
                            &page_size=${data.page_size}
                            &page_num=${data.page_num}
                            &filter=${data.filter}
                            &ret_coordtype=${data.ret_coordtype}
                            &output=json&ak=${data.Key}`

        fetchJsonp(baiduApiLink).then(response => {
            return response.json()
        }).then(res => {
            console.log(res)
        })
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
  