<template>
  <div class="zone">
    <div class="module-card">
      <van-cell-group class="cell-group">
        <van-cell class="cell" center is-link @click="toZoom">
          <span class="icon" slot="icon">
            <i class="iconfont">&#xe606;</i>
          </span>
          <div class="content flex flex-align flex-justify" slot="title">
            <show-card :imgList="imgList" :text='text'/>
          </div>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import showCard from "./../card/showCrad"

export default {
  name: "zone",
  props: ['zoomCard','userInfo'],
  components: {
    showCard
  },
  computed: {
    imgList(){
      if(this.zoomCard.photos){
        return this.zoomCard.photos
      }else{
        return ''
      }
    },
    text(){
      let text
      if(this.zoomCard.details.length > 1){
        text = this.zoomCard.details
      }else{
        text = this.zoomCard.title
      }

      return `《${this.zoomCard.title}》`
    }
  },
  methods: {
    toZoom(){
      this.$router.push({
        name:'zoom',
        query: {
          id: this.userInfo.id,
          back: this.$route.name
        }
      })
    }
  }
}
</script>
<style scoped>
.cell.van-cell {
  line-height: normal;
}

.cell {
  height: 5rem /* 80/16 */;
}

.cell-group {
  border-radius: 0.625rem /* 10/16 */;
  overflow: hidden;
}

.icon i.iconfont {
  font-size: 1.625rem /* 26/16 */;
  background-image: linear-gradient(135deg, #fdeb71 10%, #f8d800 100%);
  -webkit-background-clip: text;
  color: transparent;
}

.icon {
  margin-right: 0.625rem /* 10/16 */;
}

.media-content svg.icon{
  font-size: 1.625rem /* 26/16 */;
}
</style>
