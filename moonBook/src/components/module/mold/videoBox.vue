<template>
  <div class="video-player" id='StudentVideo'>
    <video-player ref="videoPlayer" :playsinline="true" :options="playerOptions" @play="onPlayerPlay($event)"  @pause="onPlayerPause($event)" />
    <i class="iconfont" @click="onPlayerPlay">&#xe602;</i>
    <transition name='fade'>
      <div class="bottomCtrl" v-show="isBottomCtrlShow" id="bottomCtrl">
        <van-progress class="progress-slider" />
        <div class="clearfix">
          <div class="left">
            <!-- 暂停 -->
            <span @click="pause" class="pause">
              <i class="iconfont">&#xe602;</i>
            </span>

            <span class="time">
              {{playerCtrl.currentTime}}/{{playerCtrl.duration}}
            </span>
          </div>
          <div class="right clearfix">
            <!-- 全屏 -->
            <span class="icon left" @click="fullScreenHandle">
              <i class="iconfont">&#xe629; </i>
            </span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'

export default {
  name: 'videoBox',
  props: ['item'],
  components: {
    videoPlayer
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    },
    playerOptions() {
      let options = {
        autoplay: true,
        muted: false,
        loop: false,
        preload: 'auto',
        language: 'zh-CN',
        aspectRatio: '16:9',
        fluid: true,
        sources: [{
          src: this.item.photo
        }],
        poster: this.item.thumb,
        width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试',
        controlBar: false
      }

      return options
    }
  },
  data() {
    return {
        isBottomCtrlShow: false,
        isBtnShow: false,
        playerCtrl:{
            currentTime:'',
            duration:''
        }
    }
  },
  methods: {
    onPlayerPlay(player) {
        this.isBtnShow = false
    },
    onPlayerPause(player) {
        this.isBtnShow = true
    },
    fullScreenHandle(){
        
    }
  }
}
</script>
<style scoped>
</style>
<style>
</style>
