<template>
  <div class="video-page page-padding" v-if='hackReset'>
    <div class="video-box" ref='videoDom'>
      <div id="video" :class="!fixedHeaderBar?'fixed':''" :style="!fixedHeaderBar&&styleObject"></div>
    </div>
    <div class="container">
      <div class="module">
        <van-cell-group>
          <van-cell center @click="toZoom(item)" :value='`${item.views}次播放`' title-class='video-user-info'>
            <div class="user-info-bar" slot="title">
              <div class="info flex flex-align" v-if='item.user'>
                <div class="avatar">
                  <img :src="getAvatar(item.user.avatar)" />
                </div>
                <div class="promulgator flex flex-align">
                  <div class="name" v-line-clamp:20="1">{{item.user.username||''}}</div>
                  <div class="upload-date"> {{timeAgo(item.create_time)}} </div>
                </div>
              </div>
            </div>
          </van-cell>
        </van-cell-group>
      </div>
      <div class="module">
        <video-list title="相关视频" type='video' @refresh='refresh' />
      </div>
      <div>
        <comment :item='item' include='include'/>
      </div>
    </div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { timeago } from './../../lib/js/util'
import videoList from './../../module/video'
import comment from './../../module/comment'
import './../../../../static/ckplayer/ckplayer/ckplayer'
import { mapActions } from 'vuex'

export default {
  name: 'ckplayer',
  components: {
    videoList,
    comment
  },
  computed: {
    player() {
      return new ckplayer(this.videoObject)
    }
  },
  data() {
    return {
      videoObject: {
        container: '#video',
        variable: 'player',
        loaded: 'loadedHandler',
        loop: false,
        config: '',
        debug: true,
        drag: 'start',
        seek: 0,
        video: []
      },
      styleObject:{
        position:'fixed',
        top:'0',
        zIndex:10
      },
      item: '',
      fixedHeaderBar:true,
      domTop: 0,
      hackReset: true,
      scrollTop:0
    }
  },
  mounted() {
    this.getDomTop()
    window.addEventListener('scroll', this.handleScroll)
  },
  created() {
    this.fetchData().then(() => {
      this.player
    })
  },
  updated (){
    this.$nextTick(()=>{
      let data = {
        item: this.item,
        success(){
          console.log('微信分享')
        }
      }

      this.share(data)
    })
  },
  watch: {
    "$router": 'fetchData'
  },
  methods: {
    ...mapActions('openWX',['share']),
    fetchData() {
      return axios.get(`/book/SchoolArticle/detail?ajax=1&id=${this.$route.query.id}`).then(res => {
        if (res.data.status == 1) {
          this.item = res.data.data.post
          let array = res.data.data.post.photos
          let videoArray = []
          array.forEach((element, index) => {
            if(element.is_video == 1){
               videoArray.push([element.photo])
               this.videoObject.poster = element.thumb
            }
          })
          this.videoObject.video = videoArray
        }
      })
    },
    handleScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.scrollTop = scrollTop
      if ( this.domTop < this.scrollTop) {
        this.fixedHeaderBar = false
      } else {
        this.fixedHeaderBar = true
      }
    },
    getDomTop(){
      this.domTop = this.$refs.videoDom.offsetTop
    },
    onClickLeft() {
      if (this.$route.query.back) {
        this.$router.push({
          name: this.$route.query.back,
          query: {
            id: this.$route.query.back_id
          }
        })
      } else {
        this.$router.push({
          name: 'apps-find'
        })
      }
    },
    getAvatar(img) {
      let pos = img.indexOf('http://')
      let result
      if (pos === 0) {
        result = img.replace('http:', 'https:')
      } else {
        result = img
      }
      return result
    },
    timeAgo(time) {
      return timeago(time * 1000)
    },
    toZoom(item) {
      this.$router.push({
        name: 'zoom',
        query: {
          id: item.user_id,
          back: this.$route.name,
          post_id: item.post_id,
          user_id: item.user_id
        }
      })
    },
    refresh() {
      location.reload()
    }
  }
}
</script>
<style scoped>
#video {
  width: 100%;
  margin: 0px auto;
}

#video,
.video-box {
  overflow: hidden;
  height: 15rem /* 240/16 */;
}

.avatar img{
  width: 2rem /* 32/16 */;
  height: 2rem /* 32/16 */;
  margin-right: 0.3125rem /* 5/16 */;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  object-fit: cover;
}

.name{
  font-size: 1rem /* 16/16 */;
  color: #303133;
  font-weight: 500;
  margin-right: .3125rem /* 5/16 */;
  max-width: 6.25rem /* 100/16 */;
}
</style>
<style>
.van-cell__title.video-user-info{
  flex:2
}
</style>
