<template>
  <div class="zone">
    <div class="module-card">
      <van-cell-group class="cell-group">
        <van-cell class="cell" center is-link @click="toZoom">
          <span class="icon" slot="icon">
            <i class="iconfont">&#xe606;</i>
          </span>
          <div class="content flex flex-align flex-justify" slot="title">
            <show-card :imgList="imgList" :text='zoomCard.details' v-if='zoomCard.hasvideo == 0 && zoomCard.hasaudio == 0'/>
            <div class="media-content" v-else>
              <svg t="1545218036199" class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4885"><path d="M409.829397 609.524996a238.4 314.9 72.471 1 0 600.555003-189.688505 238.4 314.9 72.471 1 0-600.555003 189.688505Z" fill="#4EEAAB" p-id="4886" data-spm-anchor-id="a313x.7781069.0.i2"></path><path d="M972.8 256H51.2C22.9 256 0 278.9 0 307.2v614.4c0 28.3 22.9 51.2 51.2 51.2h921.6c28.3 0 51.2-22.9 51.2-51.2V307.2c0-28.3-22.9-51.2-51.2-51.2z m-25.6 640H76.8V332.8h870.4V896zM204.8 230.4h614.4c21.2 0 38.4-17.2 38.4-38.4s-17.2-38.4-38.4-38.4H204.8c-21.2 0-38.4 17.2-38.4 38.4s17.2 38.4 38.4 38.4zM307.2 128h409.6c21.2 0 38.4-17.2 38.4-38.4S738 51.2 716.8 51.2H307.2c-21.2 0-38.4 17.2-38.4 38.4S286 128 307.2 128z" fill="#454563" p-id="4887"></path></svg>
              {{zoomCard.photos.length}}个{{zoomCard.hasvideo == 1?'视频':'录音'}}
            </div>
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
