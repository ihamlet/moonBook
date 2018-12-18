<template>
  <div class="graphic-card">
    <div class="container">
      <div class="user-card flex flex-align">
        <div class="avatar" v-if="type=='babyHome'">
          <img :src="avatar" alt="宝贝头像" />
        </div>  
        <div class="avatar" v-else>
          <img :src="item.user.avatar" :alt="item.user.name">
        </div>
        <div class="info">
          <div class="name flex flex-align">
            <span v-if="type=='babyHome'">{{item.user.name}}的宝贝</span>
            <span v-else>{{item.user.name}}</span>
            <vip-level v-if='item.card_level' animate='1' :level='item.card_level.level'/>
          </div>
          <div class="school">{{item.schoolName}}</div>
        </div>
        <div class="date">
          <span>{{item.date}}</span>
          <span>{{item.time}}</span>
        </div>
      </div>
      <div class="text" v-line-clamp:20="2" v-html="item.details" @click="toArticle(item)"></div>
      <!-- 媒体图片  -->
      <div class="media img" v-if='item.hasvideo!=1&&item.hasaudio!=1'>
        <div :class="item.photos.length > 4 ? 'layout-9':'layout-4'">
          <van-row :gutter="2">
            <van-col :span="item.photos.length > 4?'8':'12'" v-for="(photo,photoIndex) in item.photos" :key="photoIndex">
              <div class="img-grid" v-lazy:background-image="photo.thumb" :class="[photo.thumb?'transparent':'']" @click="mediaLamp(item,photoIndex)"></div>
            </van-col>
          </van-row>
        </div>
      </div>
      <!-- 媒体视频 -->
      <div class="media" :class="item.hasvideo==1?'video-cover':''" v-if='item.hasvideo==1'>
        <video controls="controls" v-for='(videoItem,videoIndex) in item.photos' :key="videoIndex">
          <source :src="videoItem.photo">
        </video>
      </div>
      <!-- 媒体音频 -->
      <div class="media" :class="item.hasaudio==1?'audio-cover':''" v-if='item.hasaudio==1'>

      </div>

      <div class="temp-type">
         <van-tag plain type="primary" v-if='item.template_id == 0'>长文</van-tag>
         <van-tag plain type="primary" v-if='item.template_id == 1'>微博</van-tag>
      </div>

      <div class="social flex flex-align">
        <div class="share">
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
      <picture-box @close="pictureShow = false" v-model="imgIndex" :item="item" />
    </van-popup>
  </div>
</template>
<script>
import axios from "./../../lib/js/api"
import pictureBox from "./../mold/pictureBox"
import vipLevel from './../animate/svg/vipLevel'

export default {
  name: "graphic-crad",
  props: ["item", "type",'avatar'],
  components: {
    pictureBox,
    vipLevel
  },
  data() {
    return {
      imgIndex: 0,
      pictureShow: false,
      articleShow: false
    }
  },
  methods: {
    addPraise(item) {
      console.log(item)
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

.date {
  position: absolute;
  top: 0;
  right: 0;
  color: #c0c4cc;
  font-size: 0.75rem /* 12/16 */;
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
</style>
