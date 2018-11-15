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
    amapApiKey:'0522f462288e296eac959dbde42718ab',
    userPoint:'',
    location:''
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
    },
    setLocation(state, params){
        state.location = params.data
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
    getLocation(context){
        if(sessionStorage.getItem('location')){
            context.commit('setLocation',{
                data:sessionStorage.getItem('location')
            })
        }
    },
    getUserLocation(context){
        let data = {
            Key: context.state.amapApiKey,
            location: context.state.location,
        }
        let amapApiLink = `https://restapi.amap.com/v3/geocode/regeo?output=json&location=${data.location}&key=${data.Key}`

        fetchJsonp(amapApiLink).then(response => {
            return response.json()
        }).then(res => {
            let LocationData ={
                city: res.regeocode.addressComponent.city,
                location: context.state.location,
            }
            context.commit('setUserPoint',{
                data: LocationData
            })
        })
    },
    getSchoolList(context,products){
        let data = {
            Key: context.state.amapApiKey,
            keywords:'教育',
            types: '幼儿园',
            location: context.state.location,
            offset: 20,
            page: products.page,
            radius: 24000
        }
        
        let amapApiLink = `https://restapi.amap.com/v3/place/around?key=${data.Key}&location=${data.location}&radius=${data.radius}&keywords=${data.keywords}&types=${data.types}&offset=${data.offset}&page=${data.page}`
        
        return new Promise((resolve, reject) => {
            fetchJsonp(amapApiLink).then(response => {
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
  