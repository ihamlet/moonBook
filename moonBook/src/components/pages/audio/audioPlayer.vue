<template>
  <div class="audio-player"  v-if='audioList.length'>
    <audio ref="audio" @pause="onPause" @play="onPlay" @ended='onEnded' @timeupdate="onTimeupdate" @loadedmetadata="onLoadedmetadata"  :src="audioList[audioIndex].photos[0].photo" controls="controls" hidden></audio>

    <div class="audio-container">
      <div class="disc" :class="audio.playing?'turn':''">
        <img :src="audioList[audioIndex].cover" />
      </div>
      <div class="square">
        <img class="cover" :src="audioList[audioIndex].cover" />
        <div class="bg-black"></div>
      </div>
      <div class="control">
        <div class="title" v-line-clamp:20="2">{{audioList[audioIndex].title}}</div>
        <div class="progress-bar">
            <div class="bar" @touchstart="handleTouchStart">
                <div class="slider-fill" :style="'width:'+sliderTime+'%'"></div>
                <div class="slider-thumb" :style="'left:'+sliderTime+'%'"></div>
            </div>
          <div class="time flex flex-align">
            <div class="start-time">{{audio.currentTime|formatSecond}}</div>
            <div class="end-time">{{audio.maxTime|formatSecond}}</div>
          </div>
        </div>
        <div class="btn-list flex flex-align">
          <div class="btn">
            <div class="palyer-list-btn" @click="show = true">
              <i class="iconfont">&#xe6b0;</i>
            </div>
          </div>
          <div class="btn">
            <div class="player-btn" @click="startPlayOrPause">
              <i class="iconfont" v-if='audio.playing'>&#xe639;</i>
              <i class="iconfont" v-else>&#xe61e;</i>
            </div>
          </div>
          <div class="btn">
            <div class="next-btn" @click="next">
              <i class="iconfont">&#xe637;</i>
            </div>
          </div>
        </div>
      </div>

      <div class="down" @click="toScrollAetails">
        <i class="iconfont">&#xe6c4;</i>
        <span class="introduction">查看简介</span>
      </div>
    </div>
    <div class="container">
      <van-nav-bar :border='false' title="故事简介"/>
      <div class="details" ref='details'>
        {{audioList[audioIndex].details}}
      </div>
    </div>
    <div class="slogan">
        {{$store.state.slogan}}
    </div>


    <van-popup v-model="show" position="bottom">
        <div class="list scroll-y">
            <div class="item" v-for='(item,index) in audioList' :key="index" @click="selectItem(item,index)">
              <van-cell :title-class='index==audioIndex?"active":""' :title="item.title" is-link center>
                <div class="icon" slot='icon' v-if='index==audioIndex'>
                  <i class="iconfont">&#xe639;</i>
                </div>
              </van-cell>
            </div>
        </div>
    </van-popup>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { realFormatSecond } from './../../lib/js/util'

export default {
  name: 'audio-player',
  data() {
    return {
      count:0,
      audioList: [],
      audioIndex: 0,
      show: false,
      sliderTime:0,
      audio:{
          playing:false,
          currentTime:0,
          maxTime:0,
          minTime:0,
          step:0.1
      }
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$router': 'fetchData'
  },
  methods: {
    fetchData() {
      this.$toast.loading()

      let data = {
        params: {
          tid: 57,
          hasaudio: 1
        }
      }
      axios.get('/book/SchoolArticle/getList', data).then(res => {
        switch (res.data.status) {
          case 1:
            this.audioList = res.data.data
            this.count = res.data.count
            this.$toast.clear()
            this.$nextTick(()=>{
                this.play()
            })
            break
        }
      })
    },
    selectItem(item,index){
        this.audioIndex = index
        this.show = false
        this.$nextTick(()=>{
            this.play()
        })
    },
    next(){
       this.audioIndex < this.count?this.audioIndex++:this.audioIndex=0
       this.$nextTick(()=>{
            this.play()
        })            
    },
    startPlayOrPause() {
        return this.audio.playing ? this.pause() : this.play()
    },
    play(){
        this.$refs.audio.play()
    },
    pause(){
        this.$refs.audio.pause()
    },
    onPause(){
        this.audio.playing = false
    },
    onPlay(){
        this.audio.playing = true
    },
    onEnded(){
        this.next()
    },
    onLoadedmetadata(res){
        this.audio.maxTime = parseInt(res.target.duration)
    },
    onTimeupdate(res){
        this.audio.currentTime = res.target.currentTime
        this.sliderTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100)
    },
    formatProcessToolTip(index = 0) {
        index = parseInt(this.audio.maxTime / 100 * index)
        return '进度条: ' + realFormatSecond(index)
    },
    handleTouchStart(e) {
        this.setValue(e.touches[0])
        document.addEventListener('touchmove', this.handleTouchMove)
        document.addEventListener('touchup', this.handleTouchEnd)
        document.addEventListener('touchend', this.handleTouchEnd)
        document.addEventListener('touchcancel', this.handleTouchEnd)
    },
    handleTouchMove(e){
        this.setValue(e.changedTouches[0])
    },
    handleTouchEnd(e) {
        this.setValue(e.changedTouches[0])
        document.removeEventListener('touchmove', this.handleTouchMove)
        document.removeEventListener('touchup', this.handleTouchEnd)
        document.removeEventListener('touchend', this.handleTouchEnd)
        document.removeEventListener('touchcancel', this.handleTouchEnd)
    },
    setValue(e) {
        const $el=this.$el
        const {
            maxTime,
            minTime,
            step
        } = this.audio
        let value = (e.clientX - $el.getBoundingClientRect().left) / $el.offsetWidth * (maxTime - minTime)
        value = Math.round(value / step) * step + minTime
        value = parseFloat(value.toFixed(5))

        if (value > maxTime) {
            value = maxTime;
        } else if (value < minTime) {
            value = minTime
        }
        this.$refs.audio.currentTime = value
    },
    changeCurrentTime(index){
        this.$refs.audio.currentTime = parseInt(index / 100 * this.audio.maxTime)
    },
    toScrollAetails(){
      this.$refs.details.scrollIntoView({
        behavior:'smooth'
    })
  },
  },
  filters: {
        transPlayPause(value) {
            return value ? '暂停' : '播放'
        },
        formatSecond(second = 0) {
            return realFormatSecond(second)
        }
    }
}
</script>
<style scoped>
.audio-player {
  width: 100%;
  background: #fff;
}

.audio-container {
  position: relative;
}

.square {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}

.cover{
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
    background: inherit;
    filter: blur(4px);
}

.disc,
.disc img {
  border-radius: 50%;
}

.disc {
  width: 180px;
  height: 180px;
  position: absolute;
  left: 50%;
  bottom: 50%;
  margin-left: -100px;
  overflow: hidden;
  border: 10px solid rgba(0, 0, 0, 0.5);
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.3);
  z-index: 10;
}

.disc img {
  width: 174px;
  height: 174px;
  border: 3px solid #fff;
}

.bg-black {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  z-index: 2;
}

.control {
  position: absolute;
  bottom: 80px;
  width: 100%;
  z-index: 10;
}

.btn-list {
  margin: 0 auto;
}

.btn-list div {
  flex: 1;
}

.btn {
  color: #fff;
}

.player-btn {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #fff;
  text-align: center;
  line-height: 60px;
}

.player-btn i.iconfont {
  font-size: 35px;
  background: linear-gradient(127deg, #ff9800, #e91e63);
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0 0.0625rem /* 1/16 */ 0.375rem /* 6/16 */ rgba(233, 30, 99, 0.3);
}

.player-btn,
.palyer-list-btn,
.next-btn {
  margin: 0 auto;
  text-align: center;
}

.palyer-list-btn i.iconfont,
.next-btn i.iconfont {
  font-size: 35px;
}

.btn-list,
.progress-bar,
.title{
  width: 80%;
}

.progress-bar {
  background: #fff;
  margin: 0 auto 30px;
  border-radius: 5px;
}

.title {
  color: #fff;
  text-align: center;
  margin: 20px auto;
}

.details{
    padding: 0 20px;
    text-align: justify;
}

.container{
    padding-bottom: 30px;
}

.slogan{
    text-align: center;
    height: 45px;
    line-height: 45px;
    font-size: 13px;
    color: #C0C4CC;
}

.list{
    height: 50vh;
    overflow-y: scroll;
}

.time{
    color: #fff;
    justify-content: space-between;
    height: 36px;
    line-height: 36px;
    font-size: 13px;
}

.progress-bar,
.slider-fill{
  height: 2px;
  position: relative;
}

.slider-fill{
    background: linear-gradient(127deg, #ff9800, #e91e63);
}

.slider-thumb{
    position: absolute;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #fff;
    top: -6px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
}

.turn{
    animation:5s linear infinite CDturn
}

.icon{
  background: linear-gradient(127deg, #ff9800, #e91e63);
  -webkit-background-clip: text;
  color: transparent;
  margin-right: 5px;
}

.down{
  position: absolute;
  bottom: 0;
  z-index: 11;
  width: 100%;
  text-align: center;
  animation:2s cubic-bezier(0.4, 0, 1, 1) infinite downIcon;
  display: grid;
  opacity: 0.5;
}

.down i.iconfont{
  font-size: 28px;
  color: #fff;
}

.introduction{
  font-size: 12px;
  color: #fff;
}

@keyframes CDturn{
    from{transform:rotate(0deg)}
    to{transform:rotate(360deg)}
}

@keyframes downIcon{
    0%{height: 30px}
    50%{height: 58px}
    100%{height: 30px}
}
</style>
<style>
.van-cell__title.active{
    background: linear-gradient(90deg, #FE8537,#F02B2B);
    -webkit-background-clip: text;
    color: transparent;
}
</style>

