<template>
  <div class="article-content" :class="[type=='screenshot'?'img-content':'']">
    <div>
      <div class="title">{{item.title}}</div>
      <div class="main">
        <div class="text" :class="item.template_id == 0?'content':''" v-html='item.details'></div>
        <!-- 媒体图片  -->
        <div class="media img" v-if='item.hasvideo!=1&&item.hasaudio!=1'>
          <van-row gutter="5">
            <van-col :span="8" v-for="(photo,photoIndex) in item.photos" :key="photoIndex">
              <div class="img-grid" v-lazy:background-image="photo.thumb" @click="mediaLamp(item,photoIndex)"></div>
            </van-col>
          </van-row>
        </div>
        <!-- 媒体视频 -->
        <div class="media" :class="item.hasvideo==1?'video-cover':''" v-if='item.hasvideo==1'>
          <div class="video-cover">
            <div class="play">
              <i class="iconfont">&#xe602;</i>
            </div>
            <img :src="item.cover" alt="视频封面">
          </div>
        </div>
        <!-- 媒体音频 -->
        <div class="media" :class="item.hasaudio==1?'audio-cover':''" v-if='item.hasaudio==1'>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'article-content',
  props: ['item', 'type']
}
</script>
<style scoped>
.text {
  line-height: 1.8;
}

.media {
  margin-top: 1.25rem /* 20/16 */;
}

.title {
  font-size: 1.125rem /* 18/16 */;
  margin-bottom: 1.875rem /* 30/16 */;
  font-weight: 700;
}

.img-content {
  height: 17.5rem /* 280/16 */;
  overflow: hidden;
  position: relative;
}

.article-content.img-content{
    padding: .625rem /* 10/16 */ 1.25rem /* 20/16 */;
    border: .0625rem /* 1/16 */ solid #EBEEF5;
    overflow: hidden;
    position: relative;
    border-radius: .5rem /* 8/16 */;
}

.img-content .title{
    font-size: 1rem /* 16/16 */;
    margin-bottom: .625rem /* 10/16 */;
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
</style>
