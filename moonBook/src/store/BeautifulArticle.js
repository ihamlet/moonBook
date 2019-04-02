export default {
    namespaced: true,
    state:{
        articleItem: [{
            index:0,
            photos:'',
            text:''
        }],
        title:'',
        cover:'',
        percentNum: 0,
        index:0,
    },
    getters:{
        getArticleContent: state =>{
            let datas = []

            if(state.articleItem.length){
              let array = state.articleItem
              array.forEach((element,i) => {        
                let img = ''
                let video = ''
                let text = ''

            
                if(element.type == "image"){
                    img = `<img preview='1' data-pswp-uid='${i}' src='${element.photos.thumb}'></img>`
                }    
                if(element.type == 'video'){
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
                
                if(element.text){
                  text =  element.text
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
        }
    },
    mutations:{
        setIndex(state,params){
            state.index = params
        },
        setAdd(state, params){
            if(params.length){
                state.articleItem.splice(state.index,0,params[params.length - 1])
            }else{
                state.articleItem.splice(state.index,0,params)
            }

            state.index++
        },
        setDelete(state,params){
            state.articleItem.splice(params, params + 1)
        },
        setChange(state, params){
            state.articleItem.forEach(e =>{
                if(e.index == params.index){
                    if(params.text){
                        e.text = params.text
                    }else{
                        e.photos = params.photos
                    }
                }
            })
        },
        setPercent(state, params){
            state.percentNum = params
        },
        setTitle(state, params){
            state.title = params
        },
        setCover(state, params){
            state.cover = params
        },
        setDrag(state,params){
            state.articleItem = params
        }
    },
    actions:{
        //添加
        add(context,products){           
           context.commit('setAdd', products)
        },
        //删除
        delete(context,products){
            context.commit('setDelete', products)
        },
        //修改
        change(context,products){
            context.commit('setChange',products)
        },
        //进度条
        requestPercent(context,products){
            context.commit('setPercent', products)
        },
        //标题
        addTitle(context,products){
            context.commit('setTitle',products)
        },
        //封面
        addCover(context,products){
            context.commit('setCover',products)
        },
        //拖动
        drag(context,products){
            context.commit('setDrag',products)
        }
    }
}