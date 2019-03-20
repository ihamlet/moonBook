export default {
    namespaced: true,
    state:{
        result:[],
        tag:'',
        group:''
    },
    getters:{

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