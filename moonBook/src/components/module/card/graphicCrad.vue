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
            <span v-if="type=='babyHome'">{{item.user.name}}的宝贝</span>
            <span v-else>{{item.user.name}}</span>
            <vip-level v-if='item.card_level' animate='1' :level='item.card_level.level'/>
          </div>
          <div class="titmeago">
            {{getTimeAgo(item.create_time)}}
          </div>
        </div>
        <div class="follow" v-if='!item.isMe&&item.user_id>0'>
          <van-button class="theme-btn" type="primary" size='mini' plain v-if='item.isSubscribe == 0' @click="follow(item)"> + 关注</van-button>
        </div>
      </div>
      <div class="text" v-line-clamp:20="2" v-html="item.details" @click="toArticle(item)"></div>
      <!-- 图片  -->
      <div class="media img" v-if='item.hasvideo!=1&&item.hasaudio!=1'>
        <div :class="item.photos.length == 4 ? 'layout-4':'layout-9'">
          <van-row :gutter="4">
            <van-col :span="item.photos.length == 4?'12':'8'" v-for="(photo,photoIndex) in item.photos" :key="photoIndex">
              <div class="img-grid" v-lazy:background-image="photo.thumb" :class="[photo.thumb?'transparent':'']" @click="mediaLamp(item,photoIndex)">
                <van-tag class="photo-tag" type="danger" v-if='photo.height > winH'>长图</van-tag>
              </div>
            </van-col>
          </van-row>
        </div>
      </div>
      <!-- 视频 -->
      <div class="media" :class="item.hasvideo==1?'video-cover':''" v-if='item.hasvideo==1'>
        <div class="thumb" v-for='(videoItem,videoIndex) in item.photos' :key="videoIndex">
            <i class="iconfont" @click="toVideoPage(videoItem)">&#xe602;</i>
            <img :src="`${videoItem.photo}?x-oss-process=video/snapshot,t_6000,f_jpg,w_0,h_0,m_fast`" alt="视频封面"/>
        </div>
      </div>
      <!-- 音频 -->
      <div class="media" :class="item.hasaudio==1?'audio-cover':''" v-if='item.hasaudio==1'>
        <audio controls="controls" v-for='(audioItem,audioIndex) in item.photos' :key="audioIndex">
          <source :src="audioItem.photo">
        </audio>
      </div>

      <div class="temp-type">
        <van-tag type="primary" plain v-if='item.school_id > 0'>
          <span @click="toSchoolHome(item.school_id)">{{item.schoolName}}</span>
        </van-tag>
         <van-tag type="primary" v-if='item.cate_name'>#{{item.cate_name}} </van-tag>
      </div>

      <div class="task" v-if='$route.query.tid == 5'>
        <task-card />
      </div>

      <div class="social flex flex-align">
        <div class="share" @click="share(item)">
          <i class="iconfont">&#xe6eb;</i> {{item.share_num>1000?'999+':item.share_num}}
        </div>
        <div class="message"  @click="toArticle(item)">
          <i class="iconfont">&#xe731;</i> {{item.reply_num>1000?'999+':item.reply_num}}
        </div>
        <div class="praise flex flex-align flex-justify" @click="addPraise(item)">
          <i class="iconfont" v-if="!item.isZan">&#xe644;</i>
          <i class="iconfont highlight rotateInDownLeft animated" v-else>&#xe6e3;</i>
          {{item.zan_num>1000?'999+':item.zan_num}}
        </div>
      </div>
    </div>

    <van-popup v-model="pictureShow" class="picture-box-popup" get-container='#app'>
      <picture-box @close="pictureShow = false" v-model="imgIndex" :item="item"/>
    </van-popup>

    <van-actionsheet v-model="shareShow" title="分享" get-container='#app'>
      <share @show='imageShow = true' />
    </van-actionsheet>

    <!-- 生成图片 -->
    <van-popup v-model="imageShow" class="screenshot-popup" get-container='#app'>
      <article-share :item='item' :userName='item.user.name' :qrImage='qrImage' @close='imageShow = false'/>
    </van-popup>
  </div>
</template>
<script>
import axios from "./../../lib/js/api"
import QRCode from "qrcode"
import pictureBox from "./../mold/pictureBox"
import vipLevel from './../animate/svg/vipLevel'
import share from './../mold/share'
import taskCard from './taskCard'
import articleShare from './../../module/mold/articleShare'
// import videoBox from './../mold/videoBox'
import { timeago } from './../../lib/js/util'

export default {
  name: "graphic-crad",
  props: ["item", "type",'avatar'],
  components: {
    pictureBox,
    share,
    articleShare,
    taskCard,
    vipLevel,
    // videoBox
  },
  computed: {
    winH(){
      return window.innerHeight
    }
  },
  data() {
    return {
      imgIndex: 0,
      pictureShow: false,
      // videoShow:false,
      articleShow: false,
      shareShow:false,
      imageShow:false,
      qrImage:'',
      link:'',
      // videoItem:''
    }
  },
  methods: {
    addPraise(item) {
      item.isZan = !item.isZan
      axios.get(`/book/SchoolArticle/zan?ajax=1&id=${this.item.post_id}`).then(res => {
        item.zan_num = res.data.data.like
      })
    },
    mediaLamp(item, photoIndex) {
      this.pictureShow = true
      this.imgIndex = photoIndex
      this.item = item
    },
    toArticle(item,point){
      this.$router.push({
        name:'article',
        query:{
          id: item.post_id,
          type: item.template_id
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
        console.error(err)
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
  margin-right: 0.625rem /* 10/16 */;
}

.name {
  color: #303133;
  font-size: 1rem /* 16/16 */;
}

.memberships {
  margin-left: .3125rem /* 5/16 */;
}

.avatar img {
  width: 3.125rem /* 50/16 */;
  height: 3.125rem /* 50/16 */;
  border-radius: 50%;
}

.follow {
  position: absolute;
  right: 0;
}

.school {
  text-align: left;
}

.class-name {
  margin-left: 0.625rem /* 10/16 */;
}

.layout-4{
  width: 70%;
}

.task{
  margin-top: .625rem /* 10/16 */;
}

.user-card{
  position: relative;
  z-index: 2;
}

.thumb{
  position: relative;
}

.thumb .iconfont{
  font-size: 3.125rem /* 50/16 */;
  position: absolute;
  left: 50%;
  top: 50%;
  color: #fff;
  transform: translate3d(-50%, -50%, 0);
}

.photo-tag{
  position: absolute;
  right: .3125rem /* 5/16 */;
  bottom: .3125rem /* 5/16 */;
}
</style>
