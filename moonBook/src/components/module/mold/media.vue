<template>
  <div class="container" id='media' @click="toArticle" :class="$route.name == 'article'?'article':''">
    <div class="title" v-if='type=="card"&&item.template_id=="0"' v-line-clamp:20="2">{{item.title}}</div>

    <div class="text" ref='textContent' v-if='item.details&&isDetailsShow' v-line-clamp:20="type == 'card'?2:0" :class="item.template_id == 0?'content':''" v-html='item.details'></div>
    <!-- 视频  -->
    <div class="media" :class="item.hasvideo=='1'?'video-cover':''" v-if='item.hasvideo=="1"'>
      <div class="thumb" v-for='(videoItem,videoIndex) in item.photos' :key="videoIndex">
        <!-- 卡片 -->
        <div class="video-thumb" v-if='videoItem&&videoItem.is_video == "1"'>
          <div class="player-card" :class="[videoItem.rotate == '90'?'vertical':'',isCommentShow?'poster':'']" v-if="type == 'card' || isCommentShow">
            <div class="player">
              <i class="iconfont">&#xe639;</i>
            </div>
            <img :src="item.cover" alt="视频封面" />
            <van-tag class="duration" size="medium" color="rgba(0,0,0,.5)">{{getDuration(videoItem.duration)}}</van-tag>
          </div>
          <div v-else-if='!isCommentShow' class="video-wrapper">
            <video ref='videoPlayer' id='video' controls='controls' :src="videoItem.photo" :poster="videoItem.thumb" preload="auto" x-webkit-airplay='true' airplay="allow" webkit-playsinline="true" x5-playsinline playsinline="true"></video>
          </div>
        </div>
      </div>
    </div>

    <div class="media img" v-if='item.template_id == "1"&&item.photos'>
      <div :class="[type=='card'?`layout-${item.photos.length}`:'']">
        <van-row :gutter="4">
          <van-col :span="grid" v-for="(photo,photoIndex) in item.photos" :key="photoIndex">
            <div class="img-grid" :class="[item.photos.length == 1&&photo.height/photo.width > 1?'long':'',item.photos.length == 1&&type=='details'?'alone':'']" v-if='photo&&photo.is_video==0 && photo.is_audio == 0'>
              <img class="img-preview" :class="[photo.height/photo.width > 2?'long':'']" :src="photo.thumb" :large="photo.photo" :preview='type=="card"?false:photo.post_id' />
              <van-tag class="photo-tag" type="primary" v-if='photo.height/photo.width > 2&&type=="card"&&photoIndex < 1'>长图</van-tag>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>

    <div class="media img long-article-thumb" v-if='item.template_id == "0"&&type == "card"&&item.cover&&item.hasvideo!="1"'>
      <img :src="item.cover || item.photos[0].thumb"  v-http2https/>
      <van-tag class="photo-tag" type="primary">文章</van-tag>
    </div>

    <!-- 音频 -->
    <!-- <div class="media" :class="item.hasaudio==1?'audio-cover':''" v-if='item.hasaudio==1'>
      <audio controls="controls" v-for='(audioItem,audioIndex) in item.photos' :key="audioIndex">
        <source :src="audioItem.photo">
      </audio>
    </div> -->
  </div>
</template>
<script>
import { formatTime } from './../../lib/js/util'

export default {
  name: 'media',
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
      type: String,
      default:''
    },
    coverShow:{
      type: Boolean,
      default: true
    },
    stopClick:{
      type: Boolean,
      default: false
    },
    schoolName:{
      type: String,
      default:''
    },
    schoolId:{
      type: String,
      default:''
    },
    isDetailsShow:{
      type: Boolean,
      default: true
    },
    isCommentShow:{
      type: Boolean,
      default: false
    }
  },
  computed: {
    grid() {
      let num
      if (this.item.photos.length == 4 || this.item.photos.length == 2) {
        num = 12
      } else if (this.item.photos.length == 1 && this.type == 'details') {
        num = 24
      } else {
        num = 8
      }
      return num
    }
  },
  data () {
    return {
      playing: false
    }
  },
  updated () {
    this.$nextTick(()=>{
      let imgs = document.getElementsByTagName('img')
      for(let i = 0; i < imgs.length; i ++){
        if(imgs[i].src.indexOf(location.origin) == -1){
          imgs[i].src = imgs[i].src.replace('http:', 'https:')
        }
      }
    })
  },
  methods: {
    toArticle() {
      if (this.type == 'card' && !this.stopClick) {
        this.$router.push({
          name: 'article',
          query: {
            id: this.item.post_id,
            type: this.item.template_id,
            back: this.$route.name,
            back_id: this.$route.query.id,
            school_name: this.schoolName,
            school_id: this.schoolId
          }
        })
      }
    },
    toVideoPage(videoItem) {
      this.$router.push({
        name: 'video-page',
        query: {
          id: videoItem.post_id,
          user_id: this.item.user_id,
          back: this.$route.name,
          back_id: this.$route.query.id
        }
      })
    },
    getDuration(time) {
      return formatTime(time)
    }
  }
}
</script>
<style scoped>
.container {
  margin: 0.625rem /* 10/16 */ 0;
}

.layout-2,
.layout-4 {
  width: 61.8%;
}

.text {
  font-size: 1.125rem /* 18/16 */;
  margin-bottom: 0.625rem /* 10/16 */;
}

.video-thumb {
  position: relative;
  float: left;
  margin-bottom: 0.625rem /* 10/16 */;
}

.player-card.vertical {
  width: 8.75rem /* 140/16 */;
  height: 13.75rem /* 220/16 */;
  overflow: hidden;
}

.player-card.vertical.poster {
  width: auto;
  height: auto;
  overflow: hidden;
}

.player-card.vertical img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text,
.title {
  line-height: 1.5;
}

.title {
  font-size: 1.25rem /* 20/16 */;
  margin-bottom: 0.625rem /* 10/16 */;
  font-weight: 700;
  text-align: justify;
}

.img-grid.alone {
  padding-bottom: 0;
}

.img-grid.alone .img-preview {
  width: auto;
  height: auto;
  position: static;
}

.video-box.rotate{
  width: 230px;
}

/* .tg-video{
  position: relative;
} */

.video-wrapper{
  position: relative;
}

.btn-player{
  position: absolute;
  width: 60px;
  height: 60px;
  background: rgba(0, 0, 0, .5);
  top: 0;
  text-align: center;
  line-height: 60px;
  border-radius: 50%;
  left: 50%;
  top: 50%;
  margin-left: -30px;
  margin-top: -30px;
}

.btn-player i.iconfont{
  color: #fff;
  font-size: 35px;
}

.player-card.vertical.poster,
#video{
  border-radius: 10px;
}
</style>
<style>
#media .text img,
#media .text p {
  margin: 0.625rem /* 10/16 */ 0;
}

.tags{
  margin-right: 10px;
}
</style>
