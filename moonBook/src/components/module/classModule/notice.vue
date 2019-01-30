<template>
  <div class="notice">
    <van-cell is-link center>
      <div slot="title">
        <span class="custom-text" v-if='count > 0'>
            <van-notice-bar background='transparent' v-if='notice[0].details' :text="notice[0].details"/>
            <show-card :imgList="notice[0].photos" v-else-if='notice[0].hasvideo == 0 && notice[0].hasaudio == 0'/>
            <div class="media-content" v-else>
              <svg t="1545218036199" class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4885"><path d="M409.829397 609.524996a238.4 314.9 72.471 1 0 600.555003-189.688505 238.4 314.9 72.471 1 0-600.555003 189.688505Z" fill="#4EEAAB" p-id="4886" data-spm-anchor-id="a313x.7781069.0.i2"></path><path d="M972.8 256H51.2C22.9 256 0 278.9 0 307.2v614.4c0 28.3 22.9 51.2 51.2 51.2h921.6c28.3 0 51.2-22.9 51.2-51.2V307.2c0-28.3-22.9-51.2-51.2-51.2z m-25.6 640H76.8V332.8h870.4V896zM204.8 230.4h614.4c21.2 0 38.4-17.2 38.4-38.4s-17.2-38.4-38.4-38.4H204.8c-21.2 0-38.4 17.2-38.4 38.4s17.2 38.4 38.4 38.4zM307.2 128h409.6c21.2 0 38.4-17.2 38.4-38.4S738 51.2 716.8 51.2H307.2c-21.2 0-38.4 17.2-38.4 38.4S286 128 307.2 128z" fill="#454563" p-id="4887"></path></svg>
              {{zoomCard.photos.length}}个{{zoomCard.hasvideo == 1?'视频':'录音'}}
            </div>
        </span>
        <span class="custom-text" v-else>
            暂无通知
        </span>
      </div>
      <div class="icon" slot='icon'>
          <i class="iconfont">
              &#xe672;
          </i>
      </div>
    </van-cell>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import showCard from './../card/showCrad'

export default {
  name: 'notice',
  props: ['type'],
  components: {
    showCard
  },
  data() {
    return {
      count:0,
      notice: ''
    }
  },
  watch: {
    '$router': 'fetchData'
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      let data = {
        params: {
          cate: '通知'
        }
      }

      if (this.type == 'banji') {
        data.params.banji_id = this.$route.query.id
      }

      if (this.type == 'school') {
        data.params.school_id = this.$route.query.id
      }

      axios.get('/book/SchoolArticle/getList', data).then(res => {
        this.count = res.data.count
        this.notice = res.data.data
      })
    }
  }
}
</script>
<style scoped>
.icon{
    margin-right: .9375rem /* 15/16 */;
}

.icon .iconfont{
    font-size: 1.625rem /* 26/16 */;
    background: linear-gradient(90deg, #FE8537,#F02B2B);
    -webkit-background-clip: text;
    color: transparent;
}
</style>
