<template>
  <div class="container">
    <div class="video-player-content" id='VideoBox' ref='VideoBox'>
      <div class="player-box">
        <video-player ref="videoPlayer" customEventName="customstatechangedeventname" @play="onPlayerPlay($event)"
          @pause="onPlayerPause($event)" @statechanged="playerStateChanged($event)" @timeupdate="onPlayerTimeupdate($event)"
          @ended="onPlayerEnded($event)" :options="playerOptions" :playsinline="true"/>
      </div>

      <div class="control" @click="isControl">
        <transition name="fade">
          <div class="control-content" v-show='isPlayerBarShow'>
            <van-nav-bar class="theme-nav" left-text="返回" left-arrow @click-left="onClickLeft" @click-right="fullScreenHandle">
              <div class="head-bar-text" slot="left">
                <van-icon name="arrow-left" />
              </div>
              <div class="head-bar-icon" slot="right">
                <i class="iconfont">&#xe629;</i>
              </div>
            </van-nav-bar>
            <div class="player-bar flex flex-align">
              <div class="btn-round">
                <i class="iconfont" @click="PlayOrPause">
                  <span v-if='isBtnShow' class="pause">&#xe61e;</span>
                  <span v-else class="play">&#xe639;</span>
                </i>
              </div>
            </div>
            <div class="slider-box">
              <div class="video-time flex flex-align">
                <div class="slider-control l">
                  {{videoCurrentTime}}
                </div>
                <div class="slider-control r">
                  {{videoDuration}}
                </div>
              </div>
              <div class="slider-bar">
                <vue-slider ref="slider" height='5' :dotSize='12' @drag-end='setCurrentTime' :max='duration' :min='0'
                  :fixed='true' :real-time='true' class="video-slider-bar" :tooltip='false' v-model="currentTime"
                  :slider-style='{padding:0}'>
                </vue-slider>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <lazy-component class="comment-scroll">
      <comment :item='item' cid='post_id' />
    </lazy-component>
  </div>
</template>
<script>
import { formatTime } from './../../lib/js/util'
import { videoPlayer } from 'vue-video-player'
import comment from './../comment'
import vueSlider from 'vue-slider-component'
import 'video.js/dist/video-js.css'

export default {
  name: 'videoBox',
  props: ['item'],
  components: {
    videoPlayer,
    vueSlider,
    comment
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  data() {
    return {
      currentTime: '',
      duration: 0,
      timer: null,
      isBottomCtrlShow: false,
      isBtnShow: false,
      isPlayerBarShow: true,
      videoDuration: '',
      videoCurrentTime: '',
      videoIndex:0,
      playerOptions: {
        autoplay: false,
        muted: false,
        loop: false,
        preload: 'auto',
        language: 'zh-CN',
        aspectRatio: '16:9',
        sources:[{
          src: this.item.photo
        }],
        poster: `${this.item.photo}?x-oss-process=video/snapshot,t_6000,f_jpg,w_0,h_0,m_fast`,
        width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试',
        controlBar: false
      }
    }
  },
  created() {
    setTimeout(() => {
      clearInterval(this.timer)
      this.isPlayerBarShow = false
    }, 5000)
  },
  methods: {
    onClickLeft() {
      this.$emit('close')
    },
    onPlayerPlay(player) {
      this.isBtnShow = true
    },
    onPlayerPause(player) {
      this.isBtnShow = false
      this.isPlayerBarShow = true
    },
    onPlayerEnded(player) {
      this.isPlayerBarShow = true
    },
    PlayOrPause() {
      this.isBtnShow = !this.isBtnShow
      if (this.isBtnShow) {
        this.player.play()
      } else {
        this.player.pause()
      }
    },
    isControl() {
      this.isPlayerBarShow = true
      this.timer = setInterval(() => {
        clearInterval(this.timer)
        this.isPlayerBarShow = false
      }, 8000)
    },
    onPlayerTimeupdate(player) {
      this.videoDuration = formatTime(player.duration())
      this.videoCurrentTime = formatTime(player.currentTime())
      this.currentTime = player.currentTime()
      this.duration = player.duration()
    },
    setCurrentTime() {
      this.player.currentTime(this.$refs.slider.getValue())
      // this.$refs.slider.setValue(this.currentTime)
    },
    fullScreenHandle() {
      // if (!this.player.isFullscreen()) {
      //   this.player.requestFullscreen()
      //   this.player.isFullscreen(true)
      // } else {
      //   this.player.exitFullscreen()
      //   this.player.isFullscreen(false)
      // }
    }
  }
}
</script>
<style scoped>
.video-player-content {
  position: relative;
}

.control {
  position: absolute;
  z-index: 2017;
  width: 100%;
  height: 100%;
  top: 0;
}

.player-box {
  position: relative;
  z-index: -1;
}

.slider-box {
  position: absolute;
  bottom: 0;
  z-index: 2019;
}

.player-bar {
  position: absolute;
  left: 50%;
  top: 50%;
  color: #fff;
  transform: translate3d(-50%, -50%, 0);
  z-index: 2018;
}

.btn-round {
  width: 2.875rem /* 46/16 */;
  height: 2.875rem /* 46/16 */;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  text-align: center;
  line-height: 2.875rem /* 46/16 */;
}

.btn-round .iconfont {
  font-size: 1.625rem /* 26/16 */;
}

.slider-box {
  width: 100%;
}

.video-time {
  padding: 0 0.625rem /* 10/16 */;
}

.slider-control {
  flex: 1;
  color: #fff;
  font-size: 0.75rem /* 12/16 */;
}

.slider-control.r {
  text-align: right;
}

.fade-enter-active {
  transition: opacity 1s;
}

.fade-leave-active {
  transition: opacity 4s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.comment-scroll {
  position: relative;
  overflow-y: scroll;
  width: 100%;
}
</style>
<style>
#VideoBox .video-js .vjs-big-play-button{
  display: none;
}

.video-slider-bar.vue-slider-component .vue-slider-dot .vue-slider-dot-handle {
  box-shadow: none;
}

.video-slider-bar.vue-slider-component .vue-slider {
  background-color: rgba(255, 255, 255, 0.5);
}

.video-slider-bar.vue-slider-component .vue-slider-tooltip {
  background-color: #03a9f4;
  border: 0.0625rem /* 1/16 */ solid transparent;
}

.video-slider-bar.vue-slider-component .vue-slider-process {
  background-color: #03a9f4;
}
</style>

