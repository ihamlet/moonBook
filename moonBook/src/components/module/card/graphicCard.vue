<template>
  <div class="graphic-card">
    <div class="container">
      <div class="user-card flex flex-align">
        <div class="avatar" v-if="type=='babyHome'">
          <img :src="getAvatar(avatar)" alt="宝贝头像" />
        </div>  
        <div class="avatar" v-else @click="item.user_id > 0 && toBookZoom(item)">
          <img :src="getAvatar(item.user.avatar)" :alt="item.user.name">
        </div>
        <div class="info">
          <div class="name flex flex-align">
            <span>{{item.user.name}}</span>
            <vip-level v-if='item.card_level' animate='1' :level='item.card_level.level'/>
          </div>
          <div class="titmeago">
            {{getTimeAgo(item.create_time)}} <span>{{type?type=='babyHome'?`${title}的家长`:title:'家长'}}</span>
          </div>
        </div>
        <div class="follow" v-if='!item.isMe&&item.user_id>0'>
          <van-button class="theme-btn" type="primary" round size='small' plain v-if='item.isSubscribe == 0' @click="follow(item)"> 关注</van-button>
        </div>
        <div class="views" v-if='item.isMe'>
          <span>{{item.views}}</span>
          <span>阅读</span>
        </div>
      </div>

      <media :item='item' type='card'/>

      <div class="temp-type">
        <van-tag color='#ad0000' type="success" size="medium" plain v-if='item.school_id > 0'>
          <span @click="toSchoolHome(item.school_id)">{{item.schoolName}}</span>
        </van-tag>
         <van-tag color="#ffe1e1" text-color="#ad0000" size="medium" v-if='item.cate_name'>#{{item.cate_name}} </van-tag>
      </div>

      <div class="task" v-if='$route.query.tid == 5'>
        <task-card />
      </div>

      <div class="social flex flex-align">
        <div class="share" @click="share(item)">
          <i class="iconfont">&#xe6eb;</i> {{item.share_num>1000?'999+':item.share_num == '0'?'分享':item.share_num}}
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

    <van-popup v-model="shareShow" position='bottom' get-container='#app'>
      <share @hide='shareShow = false' :postId='item.post_id' :item='item'/>
    </van-popup>

    <!-- 生成图片 -->
    <!-- <van-popup v-model="imageShow" class="screenshot-popup" get-container='#app'>
      <article-share :item='item' :userName='item.user.name' :qrImage='qrImage' @close='imageShow = false'/>
    </van-popup> -->
  </div>
</template>
<script>
import axios from "./../../lib/js/api"
import QRCode from "qrcode"
import vipLevel from './../animate/svg/vipLevel'
import share from './../mold/share'
import taskCard from './taskCard'
// import articleShare from './../mold/articleShare'
import media from './../mold/media'
import { timeago } from './../../lib/js/util'

export default {
  name: "graphic-card",
  props: ["item", "type",'avatar','title'],
  components: {
    share,
    // articleShare,
    taskCard,
    vipLevel,
    media
  },
  data() {
    return {
      imgIndex: 0,
      articleShow: false,
      shareShow:false,
      // imageShow:false,
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
    toArticle(item,point){
      this.$router.push({
        name:'article',
        query:{
          id: item.post_id,
          type: item.template_id,
          back: this.$route.name,
          back_id: this.$route.query.id
        }
      })
    },
    follow(item){
      this.$emit('follow',item)
    },
    share(item){
      this.shareShow = true
      this.link = `/article?id=${item.post_id}&type=${item.template_id}`
      QRCode.toDataURL(this.link).then(url => {
        this.qrImage = url
      }).catch(err => {
        console.log(err)
      })
    },
    toBookZoom(item){
      this.$router.push({
        name:'zoom',
        query:{
          id: item.user_id
        }
      })
    },
    toSchoolHome(id){
      if(id > 0){
        this.$router.push({
          name:'apps-school',
          query:{
            id:id,
            back: this.$route.name,
            backPageName: this.$route.meta.title
          }
        })
      }
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
    getAvatar(img) {
      let pos = img.indexOf('http://')
      let result
      if(pos === 0) {
         result = img.replace('http:', 'https:')
      } else {
         result = img
      }
      return result
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
  border-top: 0.0625rem /* 1/16 */ solid #e4e7ed;
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
  flex: 4
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

.follow,
.views{
  flex: .6
}

.views{
  text-align: center;
  border: 1px solid #E4E7ED;
  font-size: .8125rem /* 13/16 */;
  padding: 0 .3125rem /* 5/16 */;
}

.views span{
  display: block;
  height: 1.25rem /* 20/16 */;
  color: #909399;
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
</style>
