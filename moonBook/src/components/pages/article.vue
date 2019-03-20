<template>
  <div class="article page-padding">
    <van-nav-bar :border='false' :left-text="this.$route.query.back?'返回':'发现'" left-arrow fixed :zIndex='100' @click-left="onClickLeft">
      <div class="head-bar-title" slot="title">
        <transition name="slide-fade" mode="out-in">
          <div class="head-bar-title-conent" key="1" v-if='!themeBarSearch'>
            {{$route.query.type=='preview'?'预览':$route.meta.title}}
          </div>
          <div class="head-bar-title-conent flex flex-align flex-justify" key="2" v-else @click="toZoom">
            <div class="avatar" v-if='item.user'>
              <img :src="getAvatar(item.user.avatar)" :alt="item.user.username" @error='imgError'>
            </div>
            <div class="name" v-if='item.user'>{{item.user.username}}</div>
            <vip-level v-if='item.card_level' animate='1' :level='item.card_level.level'/>
          </div>
        </transition>
      </div>
      <div class="head-bar-right" slot="right" v-if='item.isSubscribe!=3'>
        <transition name="slide-fade" mode="out-in">
           <van-button size="small" v-if='themeBarSearch' class="theme-btn" :plain='item.isSubscribe?true:false' type="primary" round @click="follow(item)">{{item.isSubscribe?'已关注':'关注'}}</van-button>
        </transition>
      </div>
    </van-nav-bar>
    <div class="container">
      <div class="module-user-card page-padding">
        <userCard :item='item' v-if='item.template_id != "0"'/>
      </div>
      <div class="module">
        <article-content :item='item' @onScrollDomShow='onScrollDomShow'/>
        <articleOperation :item='item'/>
      </div>
      <div>
        <comment :item='item' include='include'/>
      </div>
    </div>
  </div>
</template>
<script>
import axios from './../lib/js/api'

import QRCode from "qrcode"
import articleShare from './../module/mold/articleShare'
import articleOperation from './../module/mold/articleOperation'
import comment from './../module/comment'
import articleContent from './../module/articleContent'
import vipLevel from './../module/animate/svg/vipLevel'
import userCard from './../module/mold/userCard'
import { mapState, mapGetters,mapActions } from 'vuex'

export default {
  name: 'detailsArticle',
  components: {
    articleContent,
    comment,
    articleShare,
    vipLevel,
    userCard,
    articleOperation
  },
  computed: {
    ...mapState(['slogan','logo']),
    ...mapGetters(['userDataState']),
    ...mapGetters('beautifulArticle',['getArticleContent','getTitle'])
  },
  data() {
    return {
      domHeight: '',
      scrollTop: '',
      themeBarSearch: false,
      imageShow: false,
      headBar: false,
      imgIndex: '',
      qrImage:'',
      item: ''
    }
  },
  created() {
    this.fetchData()    
  },
  //数据加载完成后执行该方法
  updated (){
    this.$nextTick(()=>{
      let toast = this.$toast
      let data = {
        item: this.item,
        success(){
          toast('分享成功')
        }
      }

      this.share(data)
    })
  },
  watch: {
    '$router': 'fetchData'
  },
  methods: {
    ...mapActions('openWX',['share']),
    fetchData() {
      if(this.$route.query.type == 'preview'){
        this.item = {
          details:this.getArticleContent,
          create_time: Math.floor(new Date().getTime()/1000),
          views:'999+',
          title: this.getTitle,
          template_id:'0',
          user:{
            avatar: this.userDataState.avatar,
            username: this.userDataState.name,
            user_id: this.userDataState.id
          },
          card_level:{
            level: this.userDataState.card_level
          },
          school:{
            title: this.userDataState.school_name
          }
        } 
      }else{
        let articleDetailData = {
          params:{
            ajax:1,
            id:this.$route.query.id||this.$route.query.back_id
          }
        }

        axios.get('/book/SchoolArticle/detail',articleDetailData).then(res => {
          if(res.data.status == 1){
            this.item = res.data.data.post
          }
        })
      }
    },
    onScrollDomShow(bl){
      this.themeBarSearch = bl
    },
    onClickLeft() {
      // 活动页需要跳转tid
      if(this.$route.query.back&&this.$route.query.back != 'activity'){
        this.$router.push({
          name: this.$route.query.back,
          query: {
            id: this.$route.query.back_id,
            type: this.$route.query.type,
            back: this.$route.query.back_name
          }
        })
      }else if(this.$route.query.back){
          this.$router.push({
            name: this.$route.query.back,
            query: {
              id: this.$route.query.back_id,
              tid: this.$route.query.tid
            }
          })
      }else{
        this.$router.push({
          name:'apps-find'
        })
      }
    },
    // qrcode() {
    //   QRCode.toDataURL(window.location.href).then(url => {
    //     this.qrImage = url
    //   }).catch(err => {
    //     console.error(err)
    //   })
    // },
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
    imgError(e) {
      e.target.src = 'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0'
    },
    toZoom(){
      this.$router.push({
        name:'zoom',
        query:{
          id:this.item.user_id,
          back: this.$route.name,
          back_id: this.$route.query.id
        }
      })
    },
    follow(item){
      item.isSubscribe = !item.isSubscribe
      axios.get(`/book/MemberFollow/subscribe?user_id=${item.user_id}`).then(res=>{
          this.$toast.success(res.data.msg)
      })
    }
  }
}
</script>
<style scoped>
.container {
  background: #f2f6fc;
  padding-top: 2.8125rem /* 45/16 */;
  padding-bottom: 3.125rem /* 50/16 */;
}

.head-bar-title .avatar,
.head-bar-title .avatar img{
  width: 2rem /* 32/16 */;
  height: 2rem /* 32/16 */;
}

.head-bar-title .avatar{
  margin-right: 0.3125rem /* 5/16 */;
}

.head-bar-title .avatar img{
  border-radius: 50%;
  overflow: hidden;
}

.memberships {
  margin-left: 0.3125rem /* 5/16 */;
}

.slide-fade-enter-active {
  transition: all 0.18s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

.share-box{
  width: 100%;
  overflow: hidden;
}

.screenshot-popup {
  overflow: hidden;
}

.module-user-card{
  padding: 0 10px;
  background: #fff;
}
</style>
