<template>
  <div class="container">
    <div class="text" :class="item.template_id == 0?'content':''" v-html='item.details' @click="toArticle"></div>
    <div class="media img" v-if='item.template_id == 1 && item.hasvideo == 0 && item.hasaudio == 0'>
      <div :class="[item.photos.length == 4?'layout-4':'']">
        <van-row :gutter="4">
          <van-col :span="item.photos.length == 4?'12':'8'" v-for="(photo,photoIndex) in item.photos" :key="photoIndex">
            <div class="img-grid" :class="[photo.height/photo.width > 18/9&&type!='crad'?'long':'']">
              <img class="img-preview" :class="[photo.height/photo.width > 18/9?'long':'']" :src="photo.thumb" :large="photo.photo" :preview='photo.post_id' />
              <van-tag class="photo-tag" type="danger" v-if='photo.height/photo.width > 18/9'>长图</van-tag>
            </div>
          </van-col>
        </van-row>
      </div>
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
</template>
<script>
export default {
  name: 'media',
  props: ['item', 'type'],
  data () {
      return {

      }
  },
  computed: {
    
  },
  methods: {
    toArticle() {
      if (this.type == 'crad') {
        this.$router.push({
          name: 'article',
          query: {
            id: this.item.post_id,
            type: this.item.template_id
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
          back: this.$route.name
        }
      })
    }
  }
}
</script>
<style scoped>
.container {
  margin: 0.625rem /* 10/16 */ 0;
}

.img-grid {
  background: transparent;
}

.img-grid.long{
    padding-bottom: 150%;
}

.img-preview.long {
  top: 0;
  transform: translate3d(-50%, 0, 0);
}

.img-preview {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 100%;
  transform: translate3d(-50%, -50%, 0);
}

.photo-tag {
  position: absolute;
  right: 0.3125rem /* 5/16 */;
  bottom: 0.3125rem /* 5/16 */;
}

.layout-4 {
  width: 70%;
}
</style>
