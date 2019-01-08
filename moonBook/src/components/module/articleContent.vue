<template>
  <div class="article-content" :class="[type=='screenshot'?'img-content':'',item.template_id!=0?'flex flex-align':'']">
    <article>
      <div class="title" v-if='item.template_id!=1'>{{item.title}}</div>
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
