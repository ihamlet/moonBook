<template>
  <div class="article-content" :class="[type=='screenshot'?'img-content':'',item.template_id!=0?'flex flex-align':'']">
    <article>
      <div class="title" v-if='item.template_id!=1'>{{item.title}}</div>
      <div class="main">
        <div class="media-content">
          <!-- 图片 -->
          <div class="media img" v-if='item.template_id == 1 && item.hasvideo == 0 && item.hasaudio == 0'>
            <van-row gutter="4">
              <van-col :span="8" v-for="(photo,photoIndex) in item.photos" :key="photoIndex">
                <div class="img-grid" v-lazy:background-image="photo.thumb" :class="[photo.thumb?'transparent':'']"
                  @click="mediaLamp(item,photoIndex)"></div>
              </van-col>
            </van-row>
          </div>
          <!-- 视频 -->
          <div class="media" :class="item.hasvideo==1?'video-cover':''" v-if='item.hasvideo==1'>
            <div class="thumb" v-for='(videoItem,videoIndex) in item.photos' :key="videoIndex">
              <i class="iconfont" @click="toVideoPage(videoItem)">&#xe602;</i>
              <img :src="`${videoItem.photo}?x-oss-process=video/snapshot,t_6000,f_jpg,w_0,h_0,m_fast`" alt="视频封面" />
            </div>
          </div>
          <!-- 音频 -->
          <div class="media" :class="item.hasaudio==1?'audio-cover':''" v-if='item.hasaudio==1'>
            <audio controls="controls" v-for='(audioItem,audioIndex) in item.photos' :key="audioIndex">
              <source :src="audioItem.photo">
            </audio>
          </div>
        </div>
        <div class="text" :class="item.template_id == 0?'content':''" v-html='item.details'></div>
      </div>
    </article>

    <van-popup v-model="pictureShow" class="picture-box-popup" get-container='#app'>
      <picture-box @close="pictureShow = false" v-model="imgIndex" :item="item" />
    </van-popup>
  </div>
</template>
<script>
import pictureBox from './../module/mold/pictureBox'

export default {
  name: 'article-content',
  props: ['item', 'type'],
  components: {
    pictureBox
  },
  data() {
    return {
      imgIndex: '',
      pictureShow: false
    }
  },
  methods: {
    mediaLamp(item, photoIndex) {
      this.pictureShow = true
      this.imgIndex = photoIndex
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
    }
  }
}
</script>
<style scoped>
.text {
  line-height: 1.8;
  overflow: hidden;
  color: #303133;
}

.media-content{
  margin-bottom: .625rem /* 10/16 */;
}

.title {
  font-size: 1.125rem /* 18/16 */;
  margin-bottom: 1.875rem /* 30/16 */;
  font-weight: 700;
}

.article-content.img-content {
  padding: 0.625rem /* 10/16 */ 1.25rem /* 20/16 */;
  overflow: hidden;
  position: relative;
  border-radius: 0.5rem /* 8/16 */;
}

.img-content .title {
  font-size: 1rem /* 16/16 */;
  margin-bottom: 0.625rem /* 10/16 */;
}

.img-content::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: -1.25rem /* 20/16 */;
  width: 100%;
  height: 3.75rem /* 60/16 */;
  background: linear-gradient(bottom, #fff, rgba(255, 255, 255, 0));
}

article {
  width: -webkit-fill-available;
}
</style>
