<template>
  <div class="container" id='media' @click="toArticle">
    <div class="title" v-if='type=="card"&&item.template_id=="0"' v-line-clamp:20="2">{{item.title}}</div>

    <div class="text" ref='textContent' v-line-clamp:20="type == 'card'?4:0" :class="item.template_id == 0?'content':''" v-html='item.details'></div>

    <!-- 视频  -->
    <div class="media" :class="item.hasvideo=='1'?'video-cover':''" v-if='item.hasvideo=="1"'>
      <div class="thumb" v-for='(videoItem,videoIndex) in item.photos' :key="videoIndex">
        <div class="video-thumb"  v-if='videoItem&&videoItem.is_video == "1"&&videoIndex == 1' @click="toVideoPage(videoItem)">
          <div class="player">
            <i class="iconfont">&#xe639;</i>
          </div>
          <img :src="`${videoItem.photo}?x-oss-process=video/snapshot,t_6000,f_jpg,w_0,h_0,m_fast`" alt="视频封面"/>
          <van-tag class="photo-tag" color='#7232dd'>{{videoIndex > 1?'视频专辑':'视频'}}</van-tag>
        </div>
      </div>
    </div>

    <div class="media img" v-if='item.template_id == "1"'>
      <div :class="[item.photos.length == 4?'layout-4':'']">
        <van-row :gutter="4">
          <van-col :span="grid" v-for="(photo,photoIndex) in item.photos" :key="photoIndex">
            <div class="img-grid" :class="[item.photos.length == 1&&photo.height/photo.width > 18/9?'long':'',item.photos.length == 1&&type=='details'?'alone':'']" v-if='photo&&photo.is_video==0 && photo.is_audio == 0'>
              <img class="img-preview" :class="[photo.height/photo.width > 18/9?'long':'']" :src="photo.thumb" :large="photo.photo" :preview='photo.post_id' />
              <van-tag class="photo-tag" type="primary" v-if='photo.height/photo.width > 18/9&&type=="card"'>长图</van-tag>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>

    <div class="media img long-article-thumb" v-if='item.template_id == "0"&&type == "card"&&item.cover'>
      <img :src="item.cover || item.photos[0].thumb" :preview='item.post_id'/>
      <van-tag class="photo-tag" type="primary">长文</van-tag>
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
export default {
  name: 'media',
  props: ['item', 'type'],
  computed: {
    grid(){
      let num
      if(this.item.photos.length == 4){
        num = 12
      }else if( this.item.photos.length == 1 && this.type == 'details'){
        num = 24
      }else{
        num = 8
      }
      return num
    }
  },
  methods: {
    toArticle(e) {
      if (this.type == 'card' && e.target.tagName!='IMG') {
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
          back: this.$route.name,
          back_id: this.$route.query.id
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

.layout-4 {
  width: 70%;
}

.text{
  font-size: 1.0625rem /* 17/16 */;
  line-height: 1.8; 
  margin-bottom: .625rem /* 10/16 */;
}

.video-thumb{
  position: relative;
  float: left;
  margin-bottom: .625rem /* 10/16 */;
}

.title{
  font-size: 1.125rem /* 18/16 */;
  margin-bottom: .625rem /* 10/16 */;
  font-weight: 700;
}

.img-grid.long.alone{
  padding-bottom: 0
}

.img-grid.alone .img-preview{
  width: auto;
  height: auto;
  position: static;
}
</style>
<style>
#media .text img,
#media .text p{
  margin: .625rem /* 10/16 */ 0;
}
</style>
