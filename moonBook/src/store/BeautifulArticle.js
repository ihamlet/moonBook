export default {
    namespaced: true,
    state:{
        articleItem: [],
        title:'',
        cover:'',
        percentNum: 0,
    },
    getters:{
        getTitle: state =>{
            return state.title
        },
        getArticleList: state => {
            return state.articleItem
        },
        getArticleContent: state =>{
            let datas = []

            if(state.articleItem.length){
              let array = state.articleItem
              array.forEach((element,i) => {        
                let img = ''
                let video = ''
                let text = ''

                if(element.photos){
                  if(element.photos.type == "image"){
                    img = `<img preview='1' data-pswp-uid='${i}' src='${element.photos.thumb}'></img>`
                  }    
                  if(element.photos.type == 'video'){
                    video = `
                    <video 
                        src='${element.photos.photo}' 
                        poster='${element.photos.thumb}'
                        controls
                        muted
                        x-webkit-airplay="true" 
                        playsinline 
                        webkit-playsinline="true"
                        x5-video-player-type="h5"
                    >
                    </video>`
                  }
                }
      
                if(element.text){
                  text =  element.text.text
                }
      
                let content = [img,video,text].join('\x0c')
                datas.push(content)
              })
            }
      
            return datas.join('\x0c')
        },
        getImageList: state => {
            let datas = []
            let array = state.articleItem
            array.forEach(element => {
                if(element.photos&&element.photos.thumb){
                    datas.push(element.photos.thumb)
                }  
            })

            return datas
        },
        getPercentNum: state => {
            return state.percentNum
        }
    },
    mutations:{
        setAdd(state, params){
            state.articleItem.splice(params.index,0,params)
        },
        setDelete(state,params){
            let index
            state.articleItem.forEach((element,i) => {
                if(element == params){
                    index  = i
                }
            })

            state.articleItem.splice(index,index+1)
        },
        setRevise(state, params){
            switch(params.data.type){
                case 'image':
                    state.articleItem[params.index].photos = params.data 
                break
                case 'video':
                    state.articleItem[params.index].photos = params.data 
                break
                case 'text':
                    state.articleItem[params.index] = {
                        index: params.index,
                        photos: params.photos,
                        text: params.data
                    }
                break
            }
        },
        setPercent(state, params){
            state.percentNum = params
        },
        setSort(state, params){
            state.articleItem = params
        },
        setTitle(state, params){
            state.title = params
        },
        setCover(state, params){
            state.cover = params
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
                    data = {
                        index:products.index,
                        photos:'',
                        text:products
                    }
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
        },
        //进度条
        requestPercent(context,products){
            context.commit('setPercent', products)
        },
        //拖动排序
        upDataList(context,products){
            context.commit('setSort', products)
        },
        //标题
        addTitle(context,products){
            context.commit('setTitle',products)
        },
        addCover(context,products){
            context.commit('setCover',products)
        }
    }
}