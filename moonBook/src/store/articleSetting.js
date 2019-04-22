export default {
    namespaced: true,
    state:{
        result:['apps-find'],
        tag:'',
        group:''
    },
    getters:{
        getResult: state => {
           return state.result.sort((a,b)=>a == 'apps-find' ? -1 : 1)
        }
    },
    mutations:{
        setResult(state,params){
            state.result = params
        },
        setGroup(state,params){
            state.group = params
        },
        setTag(state,params){
            state.tag = params
        }
    },
    actions:{
        addResult(context,products){
            context.commit('setResult',products)
        },
        addGroup(context,products){
            context.commit('setGroup', products)
        },
        addTag(context,products){
            context.commit('setTag', products)
        }
    }
}