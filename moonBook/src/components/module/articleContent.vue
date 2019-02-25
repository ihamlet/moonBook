<template>
  <div class="article-content" :class="[type=='screenshot'?'img-content':'',item.template_id!=0?'flex flex-align':'']">
    <div class="article-header" v-if='item.template_id==0' :class="[!item.cover || item.photos[0]?'no-thumb':'']">
        <div class="media img long-article-thumb" v-if='item.cover || item.photos[0]'>
          <img :src="item.cover || item.photos[0].thumb" :preview='item.post_id'/>
          <van-tag class="photo-tag" type="danger" color="#03A9F4">封面</van-tag>
        </div>
        <div class="title" v-line-clamp:20="2">{{item.title}}</div>
    </div>
    <article :class="[item.template_id==0 ?'long-article':'',!item.cover || item.photos[0]?'no-thumb-long-article':'']" >
      <div class="main">
        <div class="media-content">
          <media :item='item'/>
        </div>
      </div>
    </article>
  </div>
</template>
<script>
import media from './../module/mold/media'

export default {
  name: 'article-content',
  props: ['item', 'type'],
  components: {
    media
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
  font-size: 1.5rem /* 24/16 */;
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
  color: #303133;
}

.article-header{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
}

.article-header .title{
  padding-left: 1.25rem /* 20/16 */;
  padding-right: 1.25rem /* 20/16 */;
}

.photo-tag{
  position: absolute;
  bottom: 0;
  right: 0;
}

.long-article{
  padding-top: 13.75rem /* 220/16 */;
}

.no-thumb .title{
  position: static;
  padding-top: 20px;
}
</style>
