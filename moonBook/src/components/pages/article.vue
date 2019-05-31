<template>
  <div class="article page-padding" v-if='hackReset'>
    <div class="cover" v-if='item.template_id == 0&&item.cover'>
      <img :src="item.cover" v-http2https/>
    </div>
    <div class="page-container" :class="item.template_id == 0&&item.cover?'article-top':''">
      <van-nav-bar :border='false' :class="item.cover&&item.template_id == 0&&!themeBarSearch?'theme-nav':''" fixed :zIndex='100' :key="$route.query.id">
        <div class="head-bar-title" slot="title">
          <transition name="slide-fade" mode="out-in">
            <div class="head-bar-title-conent" key="1" v-if='!themeBarSearch'>
              {{$route.query.type=='preview'?'预览':$route.meta.title}}
            </div>
            <div class="head-bar-title-conent flex flex-align flex-justify" key="2" v-else @click="toZoom">
              <div class="avatar" v-if='item.user'>
                <img :src="item.user.avatar" :alt="item.user.username" @error='imgError' v-http2https>
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
      <div class="container" :class="item.template_id == 0&&item.cover?'noTop':''">
        <div class="module-user-card page-padding">
          <userCard :item='item' v-if='item.template_id != "0"' :schoolName='$route.query.school_name' :schoolId='$route.query.school_id'/>
        </div>
        <div class="module">
          <article-content :item='item' @onScrollDomShow='onScrollDomShow' :key="$route.query.id" :isCommentShow='isCommentShow'/>
          <div class="article-card" v-if='post'>
            <van-cell>
              <articleCard cardStyle='article' :type='postType' :childId='item.child_id' :item='post' :detailsId='post.post_id || post.tushu_id' :key="$route.query.id" @toDetails='toArticle'/>
            </van-cell>
          </div>
          <articleOperation :item='item'/>
        </div>
        <div class="comment" ref='commentDom'>
          <comment :item='item' include='include' :key="$route.query.id" :postId='item.post_id' @showComment='onClickisShowComment'/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from './../lib/js/api'
import articleOperation from './../module/mold/articleOperation'
import articleContent from './../module/articleContent'
import articleCard from './../module/card/articleCard'
import comment from './../module/comment'
import media from './../module/mold/media'
import vipLevel from './../module/animate/svg/vipLevel'
import userCard from './../module/mold/userCard'
import { mapState, mapGetters,mapActions } from 'vuex'

export default {
  name: 'detailsArticle',
  components: {
    media,
    comment,
    vipLevel,
    userCard,
    articleContent,
    articleCard,
    articleOperation,
  },
  computed: {
    ...mapState(['slogan','logo']),
    ...mapState('openWX',['ready']),
    ...mapGetters(['userDataState']),
    post(){
      let content
      if(this.item.extra){
        content = JSON.parse(this.item.extra)
      }else{
        content = ''
      }
      return content
    },
    postType(){
      let type
      if(this.item.extra){
        type = JSON.parse(this.item.extra).type
      }else{
        type = ''
      }
      return type
    }
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
      item: {
        photos:[]
      },
      hackReset: true,
      isCommentShow: false
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == "apps-find" || to.name == 'home') {
      to.meta.keepAlive = true
    } else {
      to.meta.keepAlive = false
    }
    next()
  },
  created() {
    this.fetchData()
  },
  updated(){
    this.wxShare()
  },
  watch: {
    '$router': 'fetchData',
    ready(){
      this.wxShare()
    }
  },
  methods: {
    ...mapActions('openWX',['share']),
    wxShare(){
        let data = {
          item: this.item,
          success(){
            console.log('微信分享')
          }
        }
        this.share(data)
    },
    fetchData() {
        this.$toast.loading()

        let articleDetailData = {
          params:{
            ajax:1,
            id:this.$route.query.id||this.$route.query.back_id
          }
        }

        axios.get('/book/SchoolArticle/detail',articleDetailData).then(res => {
          if(res.data.status == 1){
            this.$toast.clear()
            this.item = res.data.data.post
          }
        })
    },
    onScrollDomShow(bl){
      this.themeBarSearch = bl
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
      let data = {
        params:{
          user_id: item.user_id
        }
      }

      axios.get('/book/MemberFollow/subscribe',data).then(res=>{
          this.$toast.success(res.data.msg)
      })
    },
    toArticle(data){
      this.hackReset = false

      this.$router.replace({
        name:data.routeName,
        query:{
          ...this.$route.query,
          id: this.post.post_id
        }
      })
      
      this.$nextTick(() => {
        this.hackReset = true
        this.fetchData()
      })
    },
    onClickisShowComment(bl){
      this.isCommentShow = bl
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

.container.noTop{
  padding-top: 0;
  border-radius: .625rem /* 10/16 */ .625rem /* 10/16 */ 0 0;
  margin-top: -.625rem /* 10/16 */;
  overflow: hidden;
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

.cover{
  height: 170px;
  position: fixed;
  top: 0;
}

.name{
  max-width: 100px;
}

.article-top{
  margin-top: 170px;
}
</style>
