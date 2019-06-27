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
     return axios.post("/book/weixin/js_params", {
          apiList: jsApiList,
          url: location.href.split('#')[0]
        })
        .then(res => {
          wx.config(res.data)
          wx.ready(() => {
            context.commit("setReady", "ready")
          })
        })
    },
    //分享
    share(context, products) {
      wx.ready(() => {
        let title
        let desc
        let imgUrl
        let template_id = products.item.template_id?products.item.template_id:1
  
        if (template_id == 0) {
          title = `【阅亮书架】${products.item.cate.cate_name?`#${products.item.cate.cate_name}#`:''}${products.item.title}`
          
          if(products.item.details){
            desc = products.item.details.replace(/<[^>]+>/g,"")
          } else{
            desc = context.state.slogan
          }
        } else {
          imgUrl = products.item.user?products.item.user.avatar:context.state.logo

          if(products.item.title.indexOf("说") != -1){
            let name  = products.item.user?products.item.user.username:''
            
            title = `${name}在阅亮书架`
            
            if(products.item.cate_id > 0){
              if(products.item.cate_id == 124 ){
                title = `${name}在班级发布了一条通知`
              }

              if(products.item.cate_id == 116 ){
                title = `${name}老师讲的阅读课堂故事`
              }
            }
          }

          if(products.item.details&&products.item.details.replace(/<[^>]+>/g,"").length){
            desc = `${products.item.hasvideo == 1?`[小视频]${products.item.details}`:products.item.details}`
          }else{
            desc = `${products.item.hasvideo == 1?'小视频':''}`
          }
          
        }

        let data = {
          title: title || products.item.title,
          link: window.location.href.split('#')[0] + 'static/redirect.html?app3Redirect=' + encodeURIComponent(window.location.href)          ,
          desc: desc,
          imgUrl: products.item.imgUrl?products.item.imgUrl:imgUrl||products.item.cover,
          success: products.success
        }

        wx.onMenuShareTimeline(data)
        wx.onMenuShareQQ(data)
        wx.onMenuShareWeibo(data)
        wx.onMenuShareQZone(data)
        wx.onMenuShareAppMessage(data)
      })
    },
    //图片接口
     selectImg(context, products){
      wx.ready(() => {
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
            },
            complete(e) {
              if(e.errMsg == 'chooseImage:permission denied'){
                location.reload()
              }
            }
        })
      })
    },
    scanQRcode(context, products){
      return new Promise((resolve, reject)=>{
        let isWeixin = navigator.userAgent.indexOf('MicroMessenger') !== -1
        if (!isWeixin) {
          reject('请在微信中使用此功能')
        }
        wx.ready(()=>{
          wx.scanQRCode({
            needResult: 1,
            scanType: ['barcode'],
            success(res){
              let data = {
                child_id: products.id,
                isbn: res.resultStr
              }

              axios.post('/book/member/read_sign', data).then((res)=>{
                if(res.data.status === 1) {
                  context.commit('setReadSign', {data:res})
                  resolve(res)
                } else {
                  reject(res.data.msg)
                }
              })
            },
            complete(e) {
              if (e.errMsg == 'scanQRCode:permission denied') {
                location.reload()
                reject('permission denied')
              }
            }
          })
        })
      })
    },
    async wxGetLocation(){
      wx.ready(() => {
          wx.getLocation({
            type: 'wgs84',
            success: function (res) {
                var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                var speed = res.speed; // 速度，以米/每秒计
                var accuracy = res.accuracy; // 位置精度

                return res
              }
          })
        })  
    }
  }
}