<template>
  <div class="graphic-card">
    <div class="container">
      <div class="user-card flex flex-align">
        <div class="avatar" v-if="type=='babyHome'">
          <img :src="avatar" @error='imgError' v-http2https/>
        </div>  
        <div class="avatar" v-else @click="item.user_id > 0 && toBookZoom(item)">
          <img :src="item.user.avatar" @error='imgError' v-http2https>
        </div>
        <div class="info">
          <div class="name flex flex-align">
            <span v-line-clamp:20="1" :class="[item.card_level>'0'?'vip-highlight':'']">{{item.user.name}}</span>
            <vip-level v-if='item.card_level' animate='1' :level='item.card_level.level'/>
          </div>
          <div class="titmeago">
            {{getTimeAgo(item.create_time)}} <span v-if='item.sign_days!="0"&&item.tags'>{{`坚持打卡${item.sign_days}天`}}</span>
          </div>
        </div>
        <div class="follow" v-if='!item.isMe&&item.user_id>0&&type!="zoom"'>
           <van-button size="small" class="theme-btn" :plain='item.isSubscribe?true:false' type="primary" round @click="follow(item)">{{item.isSubscribe?'已关注':'关注'}}</van-button>
        </div>
        <div v-if='moreBtn' class="more" @click="more(item)"><i class="iconfont">&#xe6f7;</i></div>
      </div>

      <media :item='item' type='card' :key="$route.query.id"/>
      <div class="article-card" v-if='post&&post.sign_read_count'>
        <articleCard :item='post' :detailsId='post.post_id || post.tushu_id' @toDetails='toArticleShare'/>
      </div>
      <div class="temp-type flex flex-align">
        <div class="temp-list flex flex-align">
          <van-tag round color='#0084ff' class="school-tag"  v-line-clamp:20="1" size="large" v-if='item.from_page&&item.from_page=="banji"&&userDataState.teacher_school_id'>
            <div @click="toTeacherSchoolHome">{{userDataState.teacher_school_name}}</div>
          </van-tag> 
          <van-tag round color='#0084ff' class="school-tag"  v-line-clamp:20="1" size="large" v-else-if='item.user_school_id > 0'>
            <div @click="toSchoolHome(item)">{{item.user_school_name}}</div>
          </van-tag>
          <div class="cate theme-color" size="large" plain v-if='item.tags' @click='toPopupHelp(item)'>
              #{{item.tags}}#
          </div>
        </div>
      </div>
      <div class="task" v-if='$route.query.tid == 5'>
        <task-card />
      </div>

      <div class="social flex flex-align">
        <div class="share">
          <i class="iconfont">&#xe654;</i> {{item.views>1000?'999+':item.views == '0'?'浏览':item.views}}
        </div>
        <div class="message"  @click="toArticle(item)">
          <i class="iconfont">&#xe731;</i> {{item.reply_num>1000?'999+':item.reply_num == '0'?'评论':item.reply_num}}
        </div>
        <div class="praise flex flex-align flex-justify" @click="addPraise(item)">
          <i class="iconfont" v-if="!item.isZan">&#xe644;</i>
          <i class="iconfont highlight rotateInDownLeft animated" v-else>&#xe6e3;</i>
          {{item.zan_num>1000?'999+':item.zan_num == '0'?'赞':item.zan_num}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "./../../lib/js/api"
import QRCode from "qrcode"
import vipLevel from './../animate/svg/vipLevel'
import share from './../mold/share'
import taskCard from './taskCard'
import media from './../mold/media'
import articleCard from './../card/articleCard'
import { timeago } from './../../lib/js/util'
import { mapGetters } from 'vuex'

export default {
  name: "graphic-card",
  props:{
    item:{
      type: Object,
      default(){
        return {
          photos:[]
        }
      }
    },
    type:{
      type:String,
      default:''
    },
    avatar:{
      type: String,
      default:''
    },
    title:{
      type: String,
      default: ''
    },
    moreBtn:{
      required: false,
      type: Boolean,
      default: true
    }
  },
  components: {
    taskCard,
    vipLevel,
    articleCard,
    media
  },
  computed: {
    ...mapGetters(['userPointState','userDataState']),
    post(){
      let content = JSON.parse(this.item.extra)
      return content
    }
  },
  data() {
    return {
      imgIndex: 0,
      articleShow: false,
      shareShow:false,
      qrImage:'',
      link:''
    }
  },
  methods: {
    addPraise(item) {
      item.isZan = !item.isZan
      axios.get(`/book/SchoolArticle/zan?ajax=1&id=${this.item.post_id}`).then(res => {
        item.zan_num = res.data.data.like
      })
    },
    toArticle(item){
      this.$router.push({
        name:'article',
        query:{
          id: item.post_id,
          type: item.template_id,
          back: this.$route.name,
          back_id: this.$route.query.id,
          point: 'comments'
        }
      })
    },
    toArticleShare(data){
      this.$router.push({
        name:data.routeName,
        query:{
          id:data.detailsId
        }
      })
    },
    follow(item){
      this.$emit('follow',item)
    },
    toBookZoom(item){
      this.$router.push({
        name:'zoom',
        query:{
          id: item.user_id
        }
      })
    },
    toSchoolHome(item){
      if(item.user_school_id > 0){
        this.$router.push({
          name:'apps-school',
          query:{
            id: item.user_school_id,
            back: this.$route.name,
            backPageName: this.$route.meta.title
          }
        })
      }
    },
    toTeacherSchoolHome(){
      this.$router.push({
        name:'apps-school',
        query:{
          id: this.userDataState.teacher_school_id,
          back: this.$route.name,
          backPageName: this.$route.meta.title
        }
      })
    },
    toVideoPage(videoItem){
      this.$router.push({
        name:'video-page',
        query:{
          id: videoItem.post_id,
          user_id: this.item.user_id,
          page_id: this.$route.query.id,
          back: this.$route.name
        }
      })
    },
    getTimeAgo(time){
      return timeago(time*1000)
    },
    more(item){
      this.$emit('more',item)
    },
    imgError(e) {
      e.target.src = 'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0'
    },
    toPopupHelp(item){
      let type = 'baby'

      if(item.tags == '宝贝主页'){
        type = 'baby'
      }else{
        type = 'read'
      }

      this.$router.push({
        name:'popupHelp',
        query:{
          type: type
        }
      })
    }
  }
}
</script>
<style scoped>
.text {
  margin: 0.9375rem /* 15/16 */0;
  text-align: justify;
  font-size: .9375rem /* 15/16 */;
}

.social {
  margin-top: 0.625rem /* 10/16 */;
  height: 2.25rem /* 36/16 */;
  border-top: 0.0625rem /* 1/16 */ solid #F2F6FC;
}

.media {
  margin-bottom: 0.625rem /* 10/16 */;
}

.info i.iconfont {
  font-size: 1.25rem /* 20/16 */;
}

.avatar {
  margin-right: .625rem /* 10/16 */;
}

.info{
  flex: 3
}

.more{
  flex: .5;
  text-align: right;
}

.name {
  color: #303133;
  font-size: 1rem /* 16/16 */;
}

.memberships {
  margin-left: .3125rem /* 5/16 */;
}

.avatar img {
  width: 2.625rem /* 42/16 */;
  height: 2.625rem /* 42/16 */;
  border-radius: 50%;
}

.follow{
  flex: .6
}

.school {
  text-align: left;
}

.class-name {
  margin-left: 0.625rem /* 10/16 */;
}

.task{
  margin-top: .625rem /* 10/16 */;
}

.user-card{
  position: relative;
  z-index: 2;
}

.school-tag{
  margin-right: .625rem /* 10/16 */;
  max-width: 180px;
}

.vip-highlight{
  color: #FF9800;
}

.temp-type{
  padding: .3125rem /* 5/16 */ 0;
  justify-content: space-between;
}

.article-card{
  margin-bottom: 10px;
}
</style>
