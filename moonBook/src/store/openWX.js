import axios from "axios"
import wx from "weixin-js-sdk"
import jsApiList from "./../../src/components/lib/js/jsApiList"

export default {
  namespaced: true,
  state: {
    slogan: "阅读照亮人生",
    logo: `${location.origin}/Public/lib/bookshelf/img/logo.png`,
    ready: "",
    imgList:[],
    resultStr:'',
    readSign:''
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
    },
    setResultStr(state,params){
      state.resultStr = params
    },
    //发布完了清除数据
    clearImg(state){
      state.imgList = []
    },
    setReadSign(state,params){
      state.readSign = params.data
    }
  },
  actions: {
    //配置微信
    wxConfig(context, products) {
      axios.post("/book/weixin/js_params", {
          apiList: jsApiList,
          url: location.href.split('#')[0]
        })
        .then(res => {
          // res.data.debug = true
          wx.config(res.data)
          wx.ready(() => {
            console.log("ready")
            context.commit("setReady", "ready")
          })
        })
    },
    //分享
    share(context, products) {
      if(context.state.ready){     
        let title
        let desc
        let template_id = products.item.template_id?products.item.template_id:"1"
  
        if (template_id == "0") {
          title = `【阅亮书架】${products.item.cate.cate_name?`#${products.item.cate.cate_name}#`:''}${products.item.title}`
          desc = products.item.details.replace(/<[^>]+>/g,"") || context.state.slogan
        } else {
          title = '阅亮书架'
          desc = products.item.hasvideo == "1"? `[小视频]${products.item.details.replace(/<[^>]+>/g,"").length?products.item.details:context.state.slogan}`: `${products.item.details.replace(/<[^>]+>/g,"").length?products.item.details:context.state.slogan}`
        }

        let data = {
          title: title || products.item.title,
          link: location.href.replace('#','/?#'),
          desc: desc,
          imgUrl: products.item.imgUrl||products.item.cover?products.item.cover:context.state.logo,
          success: products.success
        }

        wx.onMenuShareTimeline(data)
        wx.onMenuShareQQ(data)
        wx.onMenuShareWeibo(data)
        wx.onMenuShareQZone(data)
        wx.onMenuShareAppMessage(data)
      }
    },
    //图片接口
    selectImg(context, products){
      if(context.state.ready){     
        wx.chooseImage({
            count: products,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'], 
            success(res){
                let localIds = res.localIds 
                let i = 0 
                let length = localIds.length
                function upload(){
                    wx.uploadImage({
                      localId: localIds[i],
                      isShowProgressTips: 1, 
                      success(res){
                        i++
                        let data = {
                          params:{
                            id:res.serverId
                          }
                        }
                        axios.get('/book/file/upload_weixin_img',data).then(res=>{
                          switch(res.data.status){
                              case 1:
                                context.commit('setImg',res.data.data)
                              break
                          }
                        })
                        if (i < length) {
                          upload()
                        }
                      }
                  })
                }
                upload()
            }
        })
      }
    },
    scanQRcode(context, products){
      if(context.state.ready){
        // alert('微信扫码')
        return new Promise((resolve, reject) => {
          wx.scanQRCode({
            needResult: 1,
            scanType: ["barCode"],
              success(res) {
                let data = {
                  child_id: products.id,
                  isbn: res.resultStr
                }
                
                axios.post('/book/member/read_sign',data).then(res=>{
                  context.commit('setReadSign', {
                    data: res
                  })
                  resolve(res)
                })
              }
          })
        })
      }
    },
    wxGetLocation(){
      return new Promise((resolve, reject) => {
        wx.getLocation({
          type: 'wgs84',
          success: function (res) {
              var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
              var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
              var speed = res.speed; // 速度，以米/每秒计
              var accuracy = res.accuracy; // 位置精度

              resolve(res)
            }
        })
      })  
    }
  }
}