export default {
    namespaced: true,
    state:{
        articleItem:[]
    },
    getters:{
        getArticleList: state =>{
            return state.articleItem
        }
    },
    mutations:{
        setAdd(state, params){
            state.articleItem.splice(params.index,0,params)
        },
        setDelete(state,params){
           state.articleItem.splice(params,params+1)
        },
        setRevise(state,params){
            switch(params.data.type){
                case 'image':
                    state.articleItem[params.index].photos = params.data 
                break
                case 'video':
                    state.articleItem[params.index].photos = params.data 
                break
                case 'text':
                    state.articleItem[params.index].text = params.data 
                break
            }
        }
    },
    actions:{
        //添加
        add(context,products){
            let data = {
                index:products.index
            }

            switch(products.type){
                case 'image':
                    data.photos = products
                break
                case 'video':
                    data.photos = products
                break
                case 'text':
                    data.text = products
                break
            }

            context.commit('setAdd', data)
        },
        //删除
        delete(context,products){
            context.commit('setDelete', products)
        },
        //修改
        revise(context,products){
            context.commit('setRevise', products)
        }
    }
}