<template>
  <div class="video-page page-padding" v-if='hackReset'>
    <van-nav-bar :zIndex='100' left-arrow left-text="返回" @click-left="onClickLeft" />
    <div class="video-box" ref='videoDom'>
      <div id="video"></div>
    </div>
    <div class="container">
      <lazy-component class="module">
        <van-cell-group>
          <van-cell is-link center :value="item.user?item.user.username:''" @click="toZoom(item)">
            <div class="user-info-bar" slot="title">
              <div class="info flex flex-align" v-if='item.user'>
                <div class="avatar">
                  <img :src="getAvatar(item.user.avatar)" />
                </div>
                <div class="promulgator flex flex-align">
                  <div class="time">{{timeAago(item.create_time)}}</div>
                  <div class="play-num">{{item.views}}次播放</div>
                </div>
              </div>
            </div>
          </van-cell>
        </van-cell-group>
      </lazy-component>
      <lazy-component class="module">
        <video-list title="相关视频" type='video' @refresh='refresh' />
      </lazy-component>
      <lazy-component>
        <comment :item='item'/>
      </lazy-component>
    </div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { timeago } from './../../lib/js/util'
import videoList from './../../module/video'
import comment from './../../module/comment'
import './../../../../static/ckplayer/ckplayer/ckplayer'

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
      item: '',
      hackReset: true
    }
  },
  created() {
    this.fetchData().then(() => {
      this.player
    })
  },
  watch: {
    "$router": 'fetchData'
  },
  methods: {
    fetchData() {
      return axios.get(`/book/SchoolArticle/detail?ajax=1&id=${this.$route.query.id}`).then(res => {
        if (res.data.status == 1) {
          this.item = res.data.data.post
          let array = res.data.data.post.photos
          let videoArray = []
          array.forEach((element, index) => {
            videoArray.push([element.photo])
            if (index == 0) {
              this.videoObject.poster = `${element.photo}?x-oss-process=video/snapshot,t_6000,f_jpg,w_0,h_0,m_fast`
            }
          })
          this.videoObject.video = videoArray
        }
      })
    },
    onClickLeft() {
      if (this.$route.query.back) {
        this.$router.push({
          name: this.$route.query.back,
          query: {
            id: this.$route.query.id
          }
        })
      } else {
        this.$router.push({
          name: 'find'
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
    timeAago(time) {
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

.video-box {
  overflow: hidden;
  height: 13.4375rem /* 215/16 */;
}

.avatar {
  width: 2rem /* 32/16 */;
  height: 2rem /* 32/16 */;
  margin-right: 0.3125rem /* 5/16 */;
}

.avatar img {
  border-radius: 50%;
}

.time {
  font-size: 0.75rem /* 12/16 */;
  margin-right: .3125rem /* 5/16 */;
}
</style>
