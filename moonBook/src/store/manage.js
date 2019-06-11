import axios from './../../src/components/lib/js/api'
import { isRepeatArr } from './../components/lib/js/util' 

export default {
    namespaced: true,
    state:{
        schoolList:[],
        manageSchool:''
    },
    getters:{
        manageSchoolInfo: state => {
            if (state.manageSchool) {
                return state.manageSchool
              } else {
                if (localStorage.getItem('schoolCurrent')) {
                    return JSON.parse(localStorage.getItem('schoolCurrent'))
                }else{
                    return state.manageSchool[0]
                }
              }
        }
    },
    mutations:{
        setSchoolList(state,params){
            state.schoolList = params      
        },
        setManageSchool(state,params){
            localStorage.setItem('schoolCurrent', JSON.stringify(params))
            state.manageSchool = params
        }
    },
    actions:{
        getSchoolList(context,products){
            return new Promise((resolve, reject) => {
                axios.get('/SchoolManage/school/getSchools').then(res=>{
                    switch (res.data.status) {
                    case 1:

                        let schoolList = []
                        let arr = res.data.data
            
                        schoolList = isRepeatArr(arr)
                        
                        context.commit('setSchoolList',schoolList)
            
                        resolve(schoolList)                      
                        
                        break
                    default:
                        this.$toast(res.data.msg)
                    }
                })
            })
        }
    }
}