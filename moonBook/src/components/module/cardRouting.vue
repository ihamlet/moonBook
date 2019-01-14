<template>
  <div class="card-routing">
    <div class="accept-card">
      <div class="header">
        <div class="card">
            <div class="card-info flex flex-align">
                <img class="logo" src="/Public/lib/bookshelf/img/logo.png" alt="logo" />
                <div class="name">阅亮书架</div>
                <i class="iconfont vip-icon">&#xe70e;</i>
            </div>
            <div class="user-info flex flex-align flex-justify">
                <img  @error='imgError' :src="getAvatar(userDataState.avatar)"/>
                <div class="user-name">{{userDataState.name}}</div>
                <van-icon class="icon" name="arrow" />
            </div>
            <i class="iconfont bg-icon">&#xe70e;</i>
        </div>
      </div>
      <div class="container">
         <i class="iconfont">&#xe62d;</i>
         <b>提升孩子阅读:</b>
         <ul>
            <li>有助于帮助孩子学习良好的生活习惯</li>
            <li>有助于提高语言表达能力</li>
            <li>有助于促进儿童品格的健康发展</li>
         </ul>
      </div>
    </div>
    <div class="square-btn flex flex-align">
      <van-button square class="theme-btn" plain type="primary" size="large" @click="toHome">返回首页</van-button>
      <van-button square class="theme-btn" type="primary" size="large" @click="toAccept">办理借阅卡</van-button>
    </div>

    <van-popup v-model="applyShow" class="page-popup" position="bottom" get-container='#app'>
        <accept @close='applyShow = false' v-model='active'/>
    </van-popup>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import accept from './../module/accept'

export default {
  name: 'card-routing',
  computed: {
    ...mapGetters(['userDataState'])  
  },
  components: {
    accept  
  },
  data() {
    return {
        active:0,
        applyShow:false
    }
  },
  methods: {
    imgError(e) {
      e.target.src = 'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0'
    },
    getAvatar(img) {
      let pos = img.indexOf('http://')
      let result
      if(pos === 0) {
         result = img.replace('http:', 'https:')
      } else {
         result = img
      }
      return result
    },
    toAccept(){
        this.applyShow = true
        this.active = 0
    },
    toHome(){
        this.$router.push({
            name:'home'
        })
    }
  }
}
</script>
<style scoped>
.accept-card {
  width: 18.75rem /* 300/16 */;
  overflow: hidden;
}

.header {
  width: 100%;
  height: 11.25rem /* 180/16 */;
  background: #2196F3;
  position: relative;
  box-shadow: 0 -0.625rem /* 10/16 */ 0.625rem /* 10/16 */ rgba(0, 0, 0, 0.2) inset;
  overflow: hidden;
}

.card {
  width: 16.25rem /* 260/16 */;
  height: 10rem /* 160/16 */;
  background: linear-gradient(127deg, #03A9F4, rgba(255, 235, 59, 0.5));
  position: absolute;
  bottom: -1.25rem /* 20/16 */;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  border-radius: 1.25rem /* 20/16 */;
  box-shadow: 0 -0.125rem /* 2/16 */ 3.125rem /* 50/16 */ rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.logo{
    width: 2rem /* 32/16 */;
    height: 2rem /* 32/16 */;
    margin-right: .625rem /* 10/16 */;
}

.card-info{
    padding: .625rem /* 10/16 */;
}

.name{
    font-size: 1rem /* 16/16 */;
    font-weight: 500;
    color: #fff;
    margin-right: .625rem /* 10/16 */;
}

.vip-icon{
    color: #FFEB3B;
}

.user-name,
.icon{
    color: #fff;
}

.user-name{
    margin-right: .625rem /* 10/16 */;
}

.user-info{
    margin-top: .9375rem /* 15/16 */;
}

.user-info img{
    width: 2.375rem /* 38/16 */;
    height: 2.375rem /* 38/16 */;
    border-radius: 50%;
    margin-right: .625rem /* 10/16 */;
}

.bg-icon{
    position: absolute;
    font-size: 5rem /* 80/16 */;
    right: -.9375rem /* 15/16 */;
    top: 50%;
    transform: translate3d(0, -50%, 0);
    color: #fff;
    opacity: .3;
}

.container{
    padding: 1.25rem /* 20/16 */;
    font-size: .8125rem /* 13/16 */;
    position: relative;
}

.container ul li{
    margin-top: .3125rem /* 5/16 */;
}

.container .iconfont{
    position: absolute;
    top: -.3125rem /* 5/16 */;
    font-size: 3.125rem /* 50/16 */;
    right: .625rem /* 10/16 */;
    background: linear-gradient(0, #E91E63,#FF5722 );
    -webkit-background-clip: text;
    color: transparent;
}

.square-btn{
    padding:1.25rem /* 20/16 */;
}
</style>
