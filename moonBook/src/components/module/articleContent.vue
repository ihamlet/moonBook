<template>
  <div class="article-content" :class="[type=='screenshot'?'img-content':'',item.template_id!=0?'flex flex-align':'']">
    <div class="article-header" v-if='item.template_id==0'>
        <div class="title">{{item.title}}</div>
        <div class="userCard" ref="userCard">
          <userCard :item='item'/>
        </div>
    </div>
    <article>
      <!-- <adLabel :item='item' v-if='item.ad_label'/> -->
      <div class="main">
        <div class="media-content">
          <media :item='item' type='details' :key="$route.query.id" :isCommentShow='isCommentShow'/>
        </div>
      </div>
    </article>
  </div>
</template>
<script>
import media from './../module/mold/media'
import userCard from './../module/mold/userCard'

export default {
  name: 'article-content',
  props: ['item', 'type', 'isCommentShow'],
  components: {
    media,
    userCard,
  },
  data () {
    return {
      scrollTop:'',
      domHeight:''
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      if (this.$refs.userCard) {
        this.domHeight = this.$refs.userCard.offsetHeight + 50
      }
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.scrollTop = scrollTop
      if (this.scrollTop > this.domHeight) {
        this.$emit('onScrollDomShow',true)
      } else {
        this.$emit('onScrollDomShow',false)
      }
    }
  }
}
</script>
<style scoped>
.media-content{
  margin-bottom: .625rem /* 10/16 */;
  text-align: justify;
  min-height: 100px;
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

/* .article-header{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
} */

.photo-tag{
  position: absolute;
  bottom: .625rem /* 10/16 */;
  right: .625rem /* 10/16 */;
}

.no-thumb .title{
  position: static;
  padding-top: 20px;
}
</style>
