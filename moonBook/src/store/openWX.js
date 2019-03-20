import axios from "axios"
import wx from "weixin-js-sdk"
import jsApiList from "./../../src/components/lib/js/jsApiList"

export default {
  namespaced: true,
  state: {
    slogan: "阅读照亮人生",
    logo: `${location.origin}/Public/lib/bookshelf/img/logo.png`,
    ready: "",
    imgList:[]
  },
  getters: {

  },
  mutations: {
    setReady(state, params) {
      state.ready = params
    },
    setImg(state,params){
        let img = new Image()
        img.src = params.path
        img.onload = () => {
           let height = img.height
           let width = img.width

           let data = {
                width: width,
                height: height,
                photo: params.path,
                thumb: params.thumb
           }

           state.imgList.push(data)
        }
    }
  },
  actions: {
    //配置微信
    wxConfig(context, products) {
      axios
        .post("/book/index/getWxJsParams", {
          apiList: jsApiList,
          url: location.href
        })
        .then(res => {
          wx.config(res.data)
          wx.ready(() => {
            console.log("ready")
            context.commit("setReady", "ready")
          })
        })
    },
    //分享
    share(context, products) {
      if (context.state.ready) {
        let title
        let desc

        if (products.item.template_id == "0" && products.item.hasvideo != "1") {
          title = `【阅亮书架】#${products.item.cate.cate_name}#${
            products.item.title
          }`
          desc = context.state.slogan
        } else {
          title = "阅亮书架"
          desc =
            products.item.hasvideo == "1"
              ? `[小视频]${context.state.slogan}`
              : products.item.details
        }

        let data = {
          title: title,
          link: location.href,
          desc: desc,
          imgUrl: context.state.logo,
          success: products.success
        }
        wx.onMenuShareTimeline(data)
        wx.onMenuShareQQ(data)
        wx.onMenuShareWeibo(data)
        wx.onMenuShareQZone(data)
        wx.onMenuShareAppMessage(data)
      }
    },
    //拍照或从手机相册中选图接口
    selectImg(context, products){
        wx.chooseImage({
            count: 9,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'], 
            success(res){
                let localIds = res.localIds 
                localIds.forEach(element => {
                    wx.uploadImage({
                        localId: element.replace('wxLocalResource://imageid',''),
                        isShowProgressTips: 0, 
                        success(res){
                            let data = {
                                params:{
                                    id: res.serverId
                                }
                            }
                            axios.get('/book/file/upload_weixin_img',data).then(res=>{
                                switch(res.data.status){
                                    case 1:
                                        context.commit('setImg',res.data.data)
                                    break
                                }
                            })
                        }
                    })
                })
            }
        })
    }
  }
}
