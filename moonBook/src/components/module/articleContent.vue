<template>
  <div class="article-content" :class="[type=='screenshot'?'img-content':'',item.template_id!=0?'flex flex-align':'']">
    <article>
      <div class="title" v-if='item.template_id!=1'>{{item.title}}</div>
      <div class="main">
        <div class="text" :class="item.template_id == 0?'content':''" v-html='item.details'></div>
        <!-- 媒体  -->
        <div class="media-content">
          <div class="media img" v-if='item.template_id == 1'>
            <van-row gutter="4">
              <van-col :span="8" v-for="(photo,photoIndex) in item.photos" :key="photoIndex">
                <div class="img-grid" v-lazy:background-image="photo.thumb" :class="[photo.thumb?'transparent':'']"
                  @click="mediaLamp(item,photoIndex)"></div>
              </van-col>
            </van-row>
          </div>
          <!-- 媒体视频 -->
          <div class="media" :class="item.hasvideo==1?'video-cover':''" v-if='item.hasvideo==1'>
            <video controls="controls" v-for='(videoItem,videoIndex) in item.photos' :key="videoIndex">
              <source :src="videoItem.photo">
            </video>
          </div>
          <!-- 媒体音频 -->
          <div class="media" :class="item.hasaudio==1?'audio-cover':''" v-if='item.hasaudio==1'>
            <audio controls="controls" v-for='(audioItem,audioIndex) in item.photos' :key="audioIndex">
              <source :src="audioItem.photo">
            </audio>
          </div>
        </div>
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
    }
  }
}
</script>
<style scoped>
.text {
  line-height: 1.8;
  text-align: justify;
  overflow: hidden;
}

.media {
  margin-top: 1.25rem /* 20/16 */;
}

.title {
  font-size: 1.125rem /* 18/16 */;
  margin-bottom: 1.875rem /* 30/16 */;
  font-weight: 700;
}

.article-content.img-content {
  padding: 0.625rem /* 10/16 */ 1.25rem /* 20/16 */;
  height: 18.75rem /* 300/16 */;
  border: 0.0625rem /* 1/16 */ solid #ebeef5;
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
