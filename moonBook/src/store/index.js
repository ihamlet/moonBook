import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../fetch/api'


Vue.use(Vuex)

const state = {
    slogan:'阅读点亮人生',
    userData:{},
    isPay:false,
    msgLength:1,
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
   }
}

const mutations = {
    setUserData(state, params) {
        state.userData = params.data
    },
    setPay(state,params){
        state.isPay = params.data
    },
    setMsgLength(state,params){
        state.msgLength = params.data
    }
}

const actions = {
    getUserData(context){
        axios.get('/book/member/getUser').then(res=>{
            context.commit('setUserData', res.data)
        })
    },
    getMsgLength(context){
        axios.get('/api/messageList').then(res=>{
            context.commit('setMsgLength',{
                data:res.data.messageData.messageList
            })
        })
    },
    pay(context){
        context.commit('setPay', {
            data: true
        })
    }
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
  