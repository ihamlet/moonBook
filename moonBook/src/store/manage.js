export default {
    namespaced: true,
    state:{
        manageSchool:'',
    },
    getters:{
        manageSchoolInfo: state => {
            if (state.manageSchool) {
                return state.manageSchool
            } else {
                if (localStorage.getItem('currentSchoolInfo')) {
                    return JSON.parse(localStorage.getItem('currentSchoolInfo'))
                }
            }
        }
    },
    mutations:{
        setCurrentSchool(state,params){
            localStorage.setItem('currentSchoolInfo', JSON.stringify(params))
            state.manageSchool = params
        }
    },
    actions:{
        getCurrentSchool(context,products){
            context.commit('setCurrentSchool',products)
        }
    }
}