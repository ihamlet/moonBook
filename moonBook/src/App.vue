<template>
  <div id="app">
    <transition enter-active-class="slideInDown animated" leave-active-class="slideOutUp animated" mode="out-in">
      <addChild @close='show = false' v-if='show && top2bottom && userDataState.child_id == 0&&routeName'/>
    </transition>
    <div :class="show && top2bottom && userDataState.child_id == 0&&routeName?'page-container-alive':''">
      <transition :name="transitionName"> 
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive" class="Router"></router-view>
        </keep-alive>
      </transition>
        <router-view v-if="!$route.meta.keepAlive" class="Router"></router-view>
    </div>
    <footer-bar v-if='$route.meta.isFooterBar' :userTabBtn='getTabBtn' />

    <el-amap vid="amap" :center="center" :plugin="plugin" v-show='false' />
  </div>
</template>

<script>
// userDataState 数据一定要在vuex中设置默认值

import axios from './../src/components/lib/js/api'
import footerBar from './components/module/footerBar'
import addChild from './components/module/card/addChild'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { watchTouch } from './components/lib/js/mixin'
import './../src/components/lib/css/neat.css'
import 'animate.css'

export default {
  name: 'App',
  mixins:[watchTouch],
  components: {
    footerBar,
    addChild
  },
  computed: {
    ...mapGetters(['userDataState','getTabBtn']),
    routeName(){
      let routeList = ['home','apps-find','article','apps-school','my-home','zoom']

      return routeList.includes(this.$route.name) && this.userDataState.teacher_school_id == 0
    }
  },
  data () {
    const self = this
    return {
      transitionName: 'slide-right',
      show: true,
      center: [114.085947,22.547],
      cityCode:'420200',
      weather:'',
      plugin:[{
          timeout:1000,
          pName: 'Geolocation',
          enableHighAccuracy: true,
          events: {
              init:(map)=>{
                  map.getCurrentPosition( (status, result) => {
                  if (result && result.position) {
                        self.cityCode = result.addressComponent.adcode
                        self.center = [result.position.lng,result.position.lat]
                      }
                  })
              }
          }
      },{
        pName: 'Weather',
        events: {
          init: (map)=>{
            map.getLive(self.cityCode,(err, data)=>{
              if(!err){
                self.weather = data
              }
            })
          }
        }
      }]
    }
  },
  created () {
    console.log('我们都是宇宙的尘埃，茫茫星辰，在找寻闪闪发光的你.....')
    this.wxConfig()

    this.wxGetLocation().then(res=>{
        let location = [res.longitude,res.latitude]
        this.center = location
    })

    this.fetchData() 
  },
  watch: {
    center(val){
        let products = {
          location:val
        }
        this.getUserLocation(products)
    },
    weather(val){
      this.setWeather(val)
    },
    '$route' (to, from) {
        // 切换动画
        let isBack = this.$router.isBack // 监听路由变化时的状态为前进还是后退
        if (isBack) {
          this.transitionName = 'slide-left'
        } else {
          this.transitionName = 'slide-right'
        }
        this.$router.isBack = false
  　},
    '$route': 'fetchData' 
  },
  methods: {
    ...mapActions('openWX',['wxConfig','wxGetLocation']),
    ...mapActions(['getUserData','getMsg','getUserLocation','getManager']),
    ...mapMutations(['setWeather']),
    fetchData(){
      let products = {
        page: 1,
        isRead: 0
      }
      this.getUserData()
      this.getManager()
      this.getMsg(products)
    }
  }
}
</script>
<style>
.Router {
 position: absolute;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 -moz-box-sizing: border-box;
 box-sizing: border-box;
 transition: all .6s cubic-bezier(.55,0,.1,1);
}

.slide-left-enter,
 .slide-right-leave-active {
  opacity: 0;
  transition: all .5s ease;
  -webkit-transition: all .5s ease;
  -moz-transition: all .5s ease;
  -ms-transition: all .5s ease;
  -o-transition: all .5s ease;
}
 
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translateX(30px);
  -webkit-transform: translateX(30px);
  -moz-transform: translateX(30px);
  -ms-transform: translateX(30px);
  -o-transform: translateX(30px);
}


.page-container-alive{
  transform: translate3d(0, 0, 0);
}

/* 公共样式 */
*::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
  display: none;
}

input,
textarea {
  border: 0;
  -webkit-appearance: none;
}

@font-face {
  font-family: 'iconfont';  /* project id 893274 */
  src: url('//at.alicdn.com/t/font_893274_1raj7zfzvay.eot');
  src: url('//at.alicdn.com/t/font_893274_1raj7zfzvay.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_893274_1raj7zfzvay.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_893274_1raj7zfzvay.woff') format('woff'),
  url('//at.alicdn.com/t/font_893274_1raj7zfzvay.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_893274_1raj7zfzvay.svg#iconfont') format('svg');
}

.toast-icon .van-icon.van-icon-success,
.iconfont {
  font-family: 'iconfont' !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.van-field__control::placeholder{
  font-family: 'iconfont' !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.theme-textarea .van-field__control::placeholder{
  letter-spacing:8px;
}

.toast-icon .van-icon.van-icon-success{
  font-size: 2.875rem /* 46/16 */;
}

.zan-icon .van-icon.van-icon-success::before{
   content: '\e6e3'
}

.like-icon .van-icon.van-icon-success::before{
  content: '\e668'
}

.shoucang-icon .van-icon.van-icon-success::before{
  content: '\e606'
}

.icon-weibo::before {
  content: '\e6d6'
}

.icon-wenzhang::before {
  content: '\e976'
}

.icon-paishipin::before {
  content: '\e62a'
}

.icon-shipin::before {
  content: '\e62b'
}

.icon-tiwen::before {
  content: '\e62c'
}

.icon-ketang::before {
  content: '\e673'
}

.icon-daqia1::before {
  content: '\e6c5'
}

.wrap {
  flex-wrap: wrap;
}

.flex {
  display: flex;
}

.flex-wrap {
  display: flex;
  flex-wrap: wrap;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.flex-align {
  align-items: center;
}

.van-overlay.bg-opacity{
  background: rgba(0, 0, 0, 0.2);
}

.flex-justify {
  justify-content: center;
}

.text-center {
  text-align: center;
}

body {
  color: #606266;
  background: #f2f6fc;
  text-size-adjust: 100% !important;
}

.item{
  margin-bottom: .125rem /* 2/16 */;
}

.scroll-x,
.scroll-y {
  -webkit-overflow-scrolling: touch;
}

.scroll-x {
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0.625rem /* 10/16 */ 0;
  background: #fff;
  display: flex;
  flex-wrap: nowrap;
}

.scroll-item {
  display: inline-block;
}

.head-background {
  background-image: linear-gradient(30deg, #2afadf 10%, #4c83ff 100%);
}

/* 动画 */
.first {
  animation-delay: 0.1s;
}

.second {
  animation-delay: 1s;
}

.third {
  animation-delay: 2s;
}

.an-0 {
  animation-delay: 50ms;
}

.an-1 {
  animation-delay: 150ms;
}

.an-2 {
  animation-delay: 300ms;
}

.an-3 {
  animation-delay: 500ms;
}

.an-4 {
  animation-delay: 750ms;
}

/* 列表 */
.cover {
  width: 100%;
  height: 6.25rem /* 100/16 */;
  overflow: hidden;
  position: relative;
}


/* 主题色 */
.theme-btn.van-button--primary,
.order-popup .content::before,
.theme-switch .van-switch--on,
.theme-background {
  background: linear-gradient(135deg, #00bcd4, #0084ff);
}

.theme-switch .van-switch {
  background-color: #ebeef5;
}

.theme-btn.van-button--plain.van-button--primary,
.theme-radio.van-radio .van-icon-checked,
body.theme .van-nav-bar__text,
body.theme .van-dialog__confirm,
body.theme .van-dialog__confirm:active,
body.theme .head-bar-text,
.theme-color {
  color: #0084ff;
}

.theme-checkbox .van-checkbox__icon--checked .van-icon {
  background-color: #0084ff;
  border-color: #0084ff;
}

.theme-btn.van-button--plain.van-button--primary {
  border: 0.0625rem /* 1/16 */ solid #0084ff;
}

.theme-btn.van-button--plain.van-button--primary,
.theme-plain.van-button--plain.van-button--primary{
  background: transparent;
}

.theme-plain.van-button--plain.van-button--primary{
  border: 0.0625rem /* 1/16 */ solid #FFF;
  color: #fff;
}

.punch .theme-btn,
.theme-borrowing-btn {
  background: linear-gradient(90deg, #ff765c, #ff23b3);
}

.theme-borrowing-btn.van-button--primary,
.theme-btn.van-button--primary {
  border: none;
}

.theme-textarea .van-field__control {
  border-radius: 0.3125rem /* 5/16 */;
  font-size: 1rem /* 16/16 */;
  line-height: 1.8;
}

.theme-btn i.iconfont {
  margin-right: 0.3125rem /* 5/16 */;
}

.theme-nav.van-nav-bar{
  background: transparent;
}

.theme-nav.van-nav-bar .van-nav-bar__title{
  color: #fff;
}

.theme-nav.van-nav-bar::after {
  display: none;
}

.theme-nav.van-nav-bar .btn-right .van-icon {
  color: #fff;
  font-size: 1.25rem /* 20/16 */;
}

.head-bar-icon i.iconfont {
  font-size: 1.25rem /* 20/16 */;
}

.theme-nav .head-bar-icon i.iconfont{
  color: #fff;
}

.theme-nav .head-bar-text .text,
.theme-nav .head-bar-text .van-icon-arrow-left {
  color: #fff;
}

.default-head-bar-background {
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0));
}

.module {
  margin-bottom: 1px;
  background: #fff;
}

.punch,
.apply {
  position: fixed;
  bottom: 4.875rem /* 78/16 */;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
  z-index: 999;
}

.apply .theme-btn {
  box-shadow: 0 0.125rem /* 2/16 */ 0.625rem /* 10/16 */ rgba(64, 158, 255, 0.3);
}

.apply .theme-borrowing-btn {
  box-shadow: 0 0.125rem /* 2/16 */ 0.625rem /* 10/16 */ rgba(255, 35, 179, 0.3);
}

/* cell底栏布局 */
.foot-bar-left,
.foot-bar-right {
  position: absolute;
  bottom: 0;
}

.foot-bar-right {
  right: 0;
}

.card-list {
  padding: 1.25rem /* 20/16 */;
}

.card-top{
  margin-top: .625rem /* 10/16 */;
}

.img-grid {
  width: 100%;
  padding-bottom: 100%;
  position: relative;
  overflow: hidden;
  background: transparent;
  margin-top: .3125rem /* 5/16 */;
  background-size: cover;
  background-position: 50%;
}

.img-grid.transparent {
  background-color: transparent;
}

/* 图片懒加载 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

img.lazy {
  display: block;
}

img.lazy[lazy='error'],
img.lazy[lazy='loaded'] {
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: fadeIn;
}

img.lazy[lazy='loading'],
img.lazy[lazy='error'],
.cover {
  background: #dcdfe6;
}

/* 搜索 */
.head-bar {
  width: 100%;
  padding: 6px 0;
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
}

.left-btn,
.right-btn {
  flex: 1;
  text-align: center;
  color: #fff;
}

.left-btn {
  font-size: 0.8125rem /* 13/16 */;
}

.right-btn span {
  font-size: 0.75rem /* 12/16 */;
  color: #fff;
}

.right-btn i.iconfont {
  font-size: 1.375rem /* 22/16 */;
  color: rgba(255, 255, 255, 0.8);
}

.head-bar,
.search-bar {
  height: 2.125rem /* 34/16 */;
}

.theme-background .search-bar {
  background: #fff;
}

.search-bar {
  flex: 5;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 34px;
  margin: 0 auto;
  line-height: 34px;
  padding-left: 32px;
  font-size: 13px;
  position: relative;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.search-bar i.iconfont {
  position: absolute;
  left: 0.625rem /* 10/16 */;
}

/* swipe 轮播图 */
.swipe-content .van-swipe-item:nth-child(even) {
  background-color: #39a9ed;
}

.swipe-content .van-swipe-item:nth-child(odd) {
  background-color: #66c6f2;
}

.swipe-content {
  width: 100%;
  overflow: hidden;
}

.swipe-content .van-swipe-item {
  color: #fff;
  font-size: 1.5rem /* 24/16 */;
  text-align: center;
}

.swipe-content .van-swipe__indicator {
  background: rgba(255, 255, 255, 0.6);
  transition: width 600ms cubic-bezier(0.215, 0.61, 0.355, 1);
}

.swipe-content .van-swipe__indicator--active {
  background: #fff;
  width: 0.9375rem /* 15/16 */;
  border-radius: 0.375rem;
}

.swipe-content .van-swipe__indicators {
  margin-bottom: 0.9375rem /* 15/16 */;
}

/* 模块 */
.card {
  padding: 0 0.3125rem /* 5/16 */;
}

.module-title {
  font-size: 0.875rem /* 14/16 */;
  color: #303133;
  background: #fff;
  height: 3rem /* 48/16 */;
  line-height: 3rem /* 48/16 */;
  text-align: center;
  position: relative;
}

.module-title::before,
.module-title::after {
  content: '';
  width: 3.125rem /* 50/16 */;
  height: 0.0625rem /* 1/16 */;
  background: #dcdfe6;
  position: absolute;
  bottom: 50%;
}

.module-title::before {
  left: 25%;
}

.module-title::after {
  right: 25%;
}

.page-padding {
  padding-bottom: 7.5rem /* 120/16 */;
}

.bottom-btn {
  width: 100%;
  position: fixed;
  bottom: 0;
}

/* 文字排版 */
.title {
  font-size: 1rem /* 16/16 */;
  color: #303133;
}

.info {
  color: #909399;
}

.price {
  color: #f56c6c;
  font-size: 1.125rem /* 18/16 */;
}

.price span.unit {
  font-size: 0.8125rem /* 13/16 */;
  margin-right: 0.125rem /* 2/16 */;
}

.price span.free {
  font-size: 1rem /* 16/16 */;
  color: #e6a23c;
}

.school {
  text-align: right;
}

.cropper-popup,
.page-popup {
  width: 100%;
  height: 100vh;
}

.card-popup.van-popup{
  width: 100%;
  height: 100vh;
  overflow: hidden;
  transform: translate3d(-50%,-50%,0) scale(0.7);
}

.page-popup-layer {
  width: 100%;
}

.filter-popup{
  width: 80%;
  height: 100vh;
}

.cropper-popup {
  width: 100%;
  height: 100vh;
}

.cropper-popup .theme-btn {
  position: fixed;
  bottom: 1.875rem /* 30/16 */;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}

/* 图片灯箱 */
.video-box-popup.van-popup,
.picture-box-popup.van-popup {
  width: 100%;
  height: 100vh;
}

.video-box-popup.van-popup{
  background: #fff;
}

.picture-box-popup.van-popup {
  background: #000;
}

.icon-right {
  line-height: 2;
  color: #dcdfe6;
}

.icon-right i.iconfont {
  font-size: 1.5rem /* 24/16 */;
}

/* 徽章 */
.badge {
  padding: 0 0.25em;
  text-align: center;
  min-width: 1.4em;
  line-height: 1.4;
  text-align: center;
  border-radius: 0.7em;
  background: #f44336;
  color: #fff;
  font-size: 0.75rem /* 12/16 */;
  transform: scale(0.9);
}

.explain {
  color: #bbb;
}

.explain b {
  margin-bottom: 0.3125rem /* 5/16 */;
  display: block;
}

.explain p {
  margin-bottom: 0.3125rem /* 5/16 */;
  line-height: 1.8;
  text-align: justify;
}
/* end */
/* icon */
i.iconfont.rotate-45,
i.iconfont.rotate {
  display: inline-block;
  transition: all 600ms cubic-bezier(0.19, 1, 0.22, 1);
}

i.iconfont.rotate-45 {
  transform: rotate(45deg);
}

i.iconfont.rotate {
  transform: rotate(180deg);
}

.iconfont.highlight {
  background: linear-gradient(135deg, #FF9800, #F44336);
  -webkit-background-clip: text;
  color: transparent;
  display: inline-block;
}

.iconfont.highlight.star{
  background: linear-gradient(135deg, #FFEB3B, #FF9800);
  -webkit-background-clip: text;
  color: transparent;
  display: inline-block;
}

.social div {
  flex: 1;
  text-align: center;
}

.social div i.iconfont {
  margin-right: 0.3125rem /* 5/16 */;
}

.module-card {
  background: #fff;
  border-radius: 0.625rem /* 10/16 */;
  box-shadow: 0 0.3125rem /* 5/16 */ 1.25rem /* 20/16 */ -0.3125rem /* 5/16 */ rgba(0, 0, 0, 0.1);
}

.form-title {
  font-size: 0.875rem /* 14/16 */;
  margin-left: 0.9375rem /* 15/16 */;
  height: 2.25rem /* 36/16 */;
  line-height: 2.25rem /* 36/16 */;
}

.avatar-uploader {
  width: 6.25rem /* 100/16 */;
  height: 6.25rem /* 100/16 */;
  margin: 0 auto;
  padding: 1.25rem /* 20/16 */ 0;
  position: relative;
}

.avatar-uploader img {
  width: 6.25rem /* 100/16 */;
  height: 6.25rem /* 100/16 */;
  border-radius: 50%;
}

.avatar-uploader i.iconfont {
  position: absolute;
  font-size: 1.875rem /* 30/16 */;
  top: 0.9375rem /* 15/16 */;
  left: -0.125rem /* 2/16 */;
  transform: rotate(-40deg);
}

.avatar-uploader .van-uploader {
  width: 100%;
  height: 100%;
}

.prompt {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.prompt .text {
  position: absolute;
  z-index: 10;
  bottom: -0.125rem /* 2/16 */;
  height: 1.5625rem /* 25/16 */;
  width: 6.25rem /* 100/16 */;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  font-size: 0.75rem /* 12/16 */;
  color: #fff;
  transform: scale(0.9);
}

.form-submit {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 10;
}

.btn-submit {
  padding: 1.25rem /* 20/16 */ 0.625rem /* 10/16 */;
}

.form .van-field__error-message {
  text-align: right !important;
}

.silde {
  height: 0;
}

.school-name {
  font-size: 17px;
  color: #303133;
}

.school-address {
  width: 18.75rem /* 300/16 */;
  color: #909399;
}

/* 搜索 */
.form-search {
  position: relative;
}

.form-search i.clear {
  position: absolute;
  right: 0.625rem /* 10/16 */;
  font-size: 1.25rem /* 20/16 */;
  color: #c0c4cc;
}

/* 尚无记录 */
.not-content {
  width: 100%;
  height: 7.5rem /* 120/16 */;
  line-height: 7.5rem /* 120/16 */;
  background: #fff;
  text-align: center;
  color: #c0c4cc;
}

.bar-fixed.van-nav-bar--fixed {
  position: sticky;
}

/* 登录 */
.login .van-cell-group {
  background: transparent;
}

.login .form .van-field__control {
  height: 2rem /* 32/16 */;
  line-height: 2rem /* 32/16 */;
  padding-left: 2.5rem /* 40/16 */;
  font-size: 1rem /* 16/16 */;
  font-weight: 700;
}

.login .form .van-field__control::-webkit-input-placeholder {
  font-weight: normal;
}

.login .van-field {
  margin-bottom: 0.625rem /* 10/16 */;
  box-shadow: 0 0.625rem /* 10/16 */ 1.875rem /* 30/16 */ -0.5rem /* 8/16 */ rgba(0, 0, 0, 0.1);
  border-radius: 0.3125rem /* 5/16 */;
}

/* 底部tab */
.footer-bar .van-info {
  top: -0.25rem /* 4/16 */;
  border: none;
}

/* 内容 */
.video-cover {
  position: relative;
  width: 100%;
}

.video-cover .play {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 3.5rem /* 56/16 */;
  height: 3.5rem /* 56/16 */;
  text-align: center;
  line-height: 3.5rem /* 56/16 */;
  transform: translate3d(-50%, -50%, 0);
}

.video-cover .play i.iconfont {
  color: #fff;
  font-size: 3.5rem /* 56/16 */;
}

video {
  width: 100%;
}

/* 文章 */
.article-content {
  background: #fff;
  padding: 0.625rem 0.9375rem;
  position: relative;
  overflow: hidden;
}

.article-content .content img {
  margin: 1.25rem /* 20/16 */ auto;
  display: block;
  width: 100%;
}

.article-content .content p {
  font-size: 1.125rem /* 18/16 */ !important;
  margin: 0.625rem /* 10/16 */ 0;
}

.article-content .content h1{
  display: none !important;
}

.long-article-thumb{
  width: 100%;
  height: 9.375rem /* 150/16 */;
  overflow: hidden;
  margin-bottom: .625rem /* 10/16 */;
  position: relative;
}

.long-article-thumb img{
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  object-fit: cover;
}

.close {
  position: absolute;
  right: 0.625rem /* 10/16 */;
  top: 0.625rem /* 10/16 */;
  z-index: 10;
}

.close i.iconfont {
  font-size: 1.5rem /* 24/16 */;
  color: #dcdfe6;
}

/* 卡列表 */
.no-list {
  text-align: center;
  height: 12.5rem /* 200/16 */;
  line-height: 12.5rem /* 200/16 */;
  color: #c0c4cc;
  background: #fff;
}

i.iconfont.vip-2 {
  background-image: linear-gradient(-60deg, #ff5858 0%, #f09819 100%);
  -webkit-background-clip: text;
  color: transparent;
}

i.iconfont.vip-3 {
  background-image: linear-gradient(-225deg,  #2cd8d5 0%,#c5c1ff 56%,#ffbac3 100%);
  -webkit-background-clip: text;
  color: transparent;
}

i.iconfont.vip-1 {
  background-image: linear-gradient(to right, #ff758c 0%, #ff7eb3 100%);
  -webkit-background-clip: text;
  color: transparent;
}

/* 3D封面 */
.three-d-book {
  perspective: 350;
  position: relative;
}

.three-d-book-cover {
  background: linear-gradient(135deg, #00bcd4, #0084ff);
  width: 6.875rem /* 110/16 */;
  margin: 0 auto;
  padding: 0.625rem 0;
  transform: rotateY(8deg);
  position: relative;
  perspective: 80;
}

.three-d-book-cover::before {
  content: '';
  width: 0.625rem /* 10/16 */;
  height: 100%;
  background: linear-gradient(135deg, #f2f6fc, #dcdfe6);
  position: absolute;
  transform: rotateY(-32deg);
  left: -0.5rem /* 8/16 */;
  top: 0;
}

.three-d-box,
.three-d-book-cover {
  height: 7.5rem /* 120/16 */;
}

.three-d-book-name {
  color: #fff;
  width: 5.625rem /* 90/16 */;
  margin: 0 auto;
  font-size: 0.8125rem;
  height: 3.125rem /* 50/16 */;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
}

.three-d-book-author {
  padding: 0.625rem;
  text-align: right;
  background-image: linear-gradient(180deg, #fff, #f2f6fc);
  font-size: 0.75rem;
  box-shadow: 0 5px 20px -9px rgba(0, 0, 0, 0.5);
  margin-top: 1.25rem;
}

.thumb{
  position: relative;
  overflow: hidden;
}

.player{
  width: 3.125rem /* 50/16 */;
  height: 3.125rem /* 50/16 */;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  transform: translate3d(-50%, -50%, 0);
  left: 50%;
  top: 50%;
  text-align: center;
  line-height: 3.125rem /* 50/16 */;
}

.thumb .player .iconfont{
  font-size: 1.875rem /* 30/16 */;
  color: #fff;
}

.img-grid.long{
  padding-bottom: 150%;
}

.cover img,
.img-preview {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  vertical-align: top;
}

.photo-tag,
.duration{
  position: absolute;
  bottom: 0.3125rem /* 5/16 */;
}

.photo-tag {
  left: 0.3125rem /* 5/16 */;
}

.duration{
  right: .3125rem /* 5/16 */;
}

.apps{
  margin-top: -.625rem /* 10/16 */;
  padding: 0 .625rem /* 10/16 */;
}


.add-school,
.add-class {
  position: fixed;
  bottom: 0;
  z-index: 10;
  width: 100%;
}

.fx-box {
  background: #fff;
  padding: 0.625rem /* 10/16 */ 1.25rem /* 20/16 */;
  justify-content: space-between;
}

.type-select{
  justify-content: space-between;
}

.select-type .theme-btn{
  margin-left: .625rem /* 10/16 */;
}


.dialog-title{
  text-align: center;
  padding: 20px 0;
}

.photo-upload {
  position: absolute;
  top: 56%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  text-align: center;
  color: #9e9e9e;
  width: 4.375rem /* 70/16 */;
}

.photo-upload i.iconfont,
.photo-upload .directions {
  display: block;
}

.photo-upload i.iconfont {
  font-size: 2.1875rem /* 35/16 */;
}

.photo-upload .directions {
  font-size: 0.8125rem /* 13/16 */;
  margin-top: 0.625rem /* 10/16 */;
}

.share-img{
  width: 100%;
  position: relative;
}

.share-img img{
  max-width:  250px;
  width: 15.625rem /* 250/16 */;
}

.share-popup.van-popup{
  background: transparent;
  transform: none;
  top:0;
  left: auto;
  right: 0;
}

.date-title {
  width: 100%;
  height: 2.8125rem /* 45/16 */;
  text-align: center;
  line-height: 2.8125rem /* 45/16 */;
  background: #fff;
  position: relative;
  color: #303133;
  font-weight: 700;
}

.date-title::before {
  content: '';
  position: absolute;
  width: 1.875rem /* 30/16 */;
  height: 5px;
  background:#0084ff;
  border-radius: .3125rem /* 5/16 */;
  bottom:0;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}

.page-loading.van-toast--default{
  width: 3.125rem /* 50/16 */;
  min-height: 3.125rem /* 50/16 */;
}

.page-loading.van-toast{
  background-color: rgba(0, 0, 0, 0.3);
}

.icon-weibo::before {
  color: #7197e7;
}

.icon-ketang::before {
  color: #35c7da;
}

.icon-paishipin::before {
  color: #ec736e;
}

.icon-shipin::before {
  color: #6ddea7;
}

.icon-daqia1::before {
  color: #f5c944;
}

.qrcode {
  flex: 1;
  text-align: right;
  color: #fff;
}

.qrcode i.iconfont {
  font-size: 1.625rem /* 26/16 */;
}

.dialog-field{
  flex: 2
}

.dialog-btn{
  flex: 1
}

.dialog-footer{
  padding: 10px 20px;
}

.release-footer-bar{
  position: fixed;
  bottom: 70px;
  width: 100%;
  z-index: 999;
}

.release-footer-bar .theme-btn{
  margin: 0 auto;
  display: block;
}

.tips-popup.van-popup{
  transform: none;
  background-color: transparent;
  bottom: 0;
  left: 0;
  overflow-y: initial;
  width: 100%;
}

.slogan{
  text-align: center;
  color: #c0c4cc;
  font-size: 13px;
  height: 50px;
  line-height: 50px;
}

.listening i.iconfont{
  font-size: 1.75rem /* 28/16 */;
  color: #f02b2b;
  display: block;
}

.theme-btn.more-btn,
.theme-btn.theme-release{
  background: linear-gradient(135deg, #FFC107, #FF9800);
  box-shadow: 0 2px 6px rgba(255, 152, 0, 0.2)
}

.origin{
  margin: 0 .3125rem /* 5/16 */;
}


.create-time{
  height: 2.25rem /* 36/16 */;
  padding-left: .3125rem /* 5/16 */;
  line-height: 2.25rem /* 36/16 */;
  font-weight: 700;
  position: relative;
  margin-bottom: .625rem /* 10/16 */;
}

.create-time::before{
  content: '';
  position: absolute;
  bottom: 0;
  width: 20px;
  height: 4px;
  border-radius: 4px;
  background: #0084ff;
}

.van-nav-bar--fixed{
  transform: translate3d(0,0,0);
}

.van-cell__value.switch-cell-value{
  overflow: initial;
}

.cell-actions{
  justify-content: space-between;
  padding: 0 15px;
  text-align: center;
}

.cell-actions .van-action-sheet__name{
  flex: 1;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  text-align: left;
}
</style>
