<template>
  <div class="container" id='media' @click="toArticle" :class="$route.name == 'article'?'article':''">
    <div class="title" v-if='type=="card"&&item.template_id=="0"' v-line-clamp:20="2">{{item.title}}</div>

    <div class="text" ref='textContent' v-line-clamp:20="type == 'card'?2:0" :class="item.template_id == 0?'content':''"
      v-html='item.details'></div>
    <!-- 视频  -->
    <div class="media" :class="item.hasvideo=='1'?'video-cover':''" v-if='item.hasvideo=="1"'>
      <div class="thumb" v-for='(videoItem,videoIndex) in item.photos' :key="videoIndex">
        <!-- 卡片 -->
        <div class="video-thumb" v-if='videoItem&&videoItem.is_video == "1"'>
          <div class="player-card" :class="videoItem.rotate == '90'?'vertical':''" v-if="type=='card'">
            <div class="player">
              <i class="iconfont">&#xe639;</i>
            </div>
            <img :src="item.cover" alt="视频封面" />
            <van-tag class="duration" size="medium" color="rgba(0,0,0,.5)">{{getDuration(videoItem.duration)}}</van-tag>
          </div>

          <!-- 正文播放 -->
          <div class="video-box" :class="videoItem.rotate == 90?'rotate':''" ref='videoDom' v-else>
            <div id="video"></div>
          </div>
        </div>
      </div>

    </div>

    <div class="media img" v-if='item.template_id == "1"'>
      <div :class="[item.photos.length == 4?'layout-4':'']">
        <van-row :gutter="4">
          <van-col :span="grid" v-for="(photo,photoIndex) in item.photos" :key="photoIndex">
            <div class="img-grid" :class="[item.photos.length == 1&&photo.height/photo.width > 18/9?'long':'',item.photos.length == 1&&type=='details'?'alone':'']"
              v-if='photo&&photo.is_video==0 && photo.is_audio == 0'>
              <img class="img-preview" :class="[photo.height/photo.width > 2?'long':'']" :src="photo.thumb" :large="photo.photo"
                :preview='type=="card"?false:photo.post_id' />
              <van-tag class="photo-tag" type="primary" v-if='photo.height/photo.width > 18/9&&type=="card"'>长图</van-tag>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>

    <div class="media img long-article-thumb" v-if='item.template_id == "0"&&type == "card"&&item.cover&&item.hasvideo!="1"'>
      <img :src="item.cover || item.photos[0].thumb" />
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
import userCard from './../mold/userCard'
import { formatTime } from './../../lib/js/util'
import './../../../../static/ckplayer/ckplayer/ckplayer'

export default {
  name: 'media',
  props:{
    item:{
      type: Object,
      default:{
        photos:[]
      }
    },
    type:{
      type:String,
      default:''
    }
  },
  components: {
    userCard
  },
  computed: {
    grid() {
      let num
      if (this.item.photos.length == 4) {
        num = 12
      } else if (this.item.photos.length == 1 && this.type == 'details') {
        num = 24
      } else {
        num = 8
      }
      return num
    },
    player() {
      let obj = this.videoObject
      let array = this.item.photos
      let videoArray = []

      array.forEach(element => {
        if(element.is_video == 1){
          videoArray.push([element.photo])
          obj.poster = element.thumb
        }
      })

      obj.video = videoArray

      return new ckplayer(obj)
    }
  },
  data () {
    return {
      videoObject: {
        container: '#video',
        variable: 'player',
        loaded: 'loadedHandler',
        loop: false,
        config: '',
        debug: true,
        drag: 'start',
        seek: 0,
        video: []
      }
    }
  },
  updated () {
    this.$nextTick(()=>{
      this.player
    })
  },
  methods: {
    toArticle() {
      if (this.type == 'card') {
        this.$router.push({
          name: 'article',
          query: {
            id: this.item.post_id,
            type: this.item.template_id,
            back: this.$route.name,
            back_id: this.$route.query.id
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

.layout-4 {
  width: 60%;
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

</style>
<style>
#media .text img,
#media .text p {
  margin: 0.625rem /* 10/16 */ 0;
}
</style>
