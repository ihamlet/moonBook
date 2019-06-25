import axios from './../../src/components/lib/js/api'
import { isRepeatArr } from './../components/lib/js/util' 

export default {
    namespaced: true,
    state:{
        schoolList:[],
        manageSchool:'',
        authorizationList:[]
    },
    getters:{
        manageSchoolInfo: state => {
            let data 

            if (state.manageSchool) {
                data = state.manageSchool
                } else {

                if (localStorage.getItem('schoolCurrent')) {
                    data = JSON.parse(localStorage.getItem('schoolCurrent'))
                }else{
                    data = state.schoolList[0]
                }
            }

            return data
        }
    },
    mutations:{
        setSchoolList(state,params){
            state.schoolList = params      
        },
        setManageSchool(state,params){
            localStorage.setItem('schoolCurrent', JSON.stringify(params))
            state.manageSchool = params
        },
        setAuthorizationList(state,params){
            state.authorizationList = params
        }
    },
    actions:{
        async getSchoolList(context,products){
            let schoolId = products || context.getters.manageSchoolInfo.school_id

            await context.dispatch('getMyMenus',schoolId)

            return axios.get('/SchoolManage/school/getSchools').then(res=>{
                switch (res.data.status) {
                case 1:

                    let schoolList = []
                    let arr = res.data.data
        
                    schoolList = isRepeatArr(arr)

                    if(products){
                        schoolList.map((e,i) =>{
                            if(e.school_id == products){
                                localStorage.setItem('schoolActive',i)
                            }
                        })
                    }

                    let index = localStorage.getItem('schoolActive') || 0
                    
                    context.commit('setSchoolList',schoolList)
                    context.commit('setManageSchool',schoolList[index])
        
                    return schoolList[index]                     
                    
                    break
                default:
                    this.$toast(res.data.msg)
                }
            })
        },
        async getMyMenus(context,products){
            axios.get('/SchoolManage/teacher/getMyMenus',{
                params:{
                    school_id: products
                }
            }).then(res=>{
                console.log(res)
                switch(res.data.status){
                    case 1:
                        context.commit('setAuthorizationList',res.data.data)
                        break
                    default:
                        this.$toast(res.data.msg)
                }
            })
        }
    }
}