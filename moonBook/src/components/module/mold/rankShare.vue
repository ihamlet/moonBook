<template>
  <div class="rank-share">
    <div class="close" @click="closeQrcode">
      <i class="iconfont">&#xe683;</i>
    </div>
    <transition name="fade" mode="out-in">
      <slot v-if="!dataURL">
        <div class="image-wrapper" ref='imageWrapper'>
          <div class="container">
            <div class="time">
              <span class="month">{{month}}</span>
              <span class="day">{{day}}</span>
              <span class="year">{{year}}</span>
            </div>
            <div class="quotes">
              <span>读书使人心明眼亮</span>
              <span>— 伏尔泰</span>
            </div>
            <div class="mask-layer">
              <img class="share-img" src="./../../../assets/img/rank-share.jpg" alt="share-img" />
            </div>
          </div>
          <div class="footer">
            <div class="content flex flex-align">
              <div class="share-text">
                <div class="name">我是{{childInfo.name}}</div>
                <div class="text">在阅亮书架坚持阅读{{childInfo.insist_days}}天,总阅读{{childInfo.read_count}}本</div>
              </div>
              <div class="code-img">
                <img src="./../../../assets/img/code.png" />
              </div>
            </div>
            <div class="explain">
              <span>— 识别二维码 开启阅读生涯 —</span>
              <span> © 阅亮书架 </span>
            </div>
          </div>
        </div>
      </slot>
      <img class="screenshot" :src="dataURL" v-else>
    </transition>
    <div class="popup-btn">
      <van-button class="theme-btn" :loading='isLoading' size="large" square :disabled='isDisabled' type="primary" @click="toImage">
        {{dataURL?'长按上图保存分享':'正在生成图片'}}
      </van-button>
    </div>
  </div>
</template>
<script>
import { format } from './../../lib/js/util'
import domtoimage from 'dom-to-image'

export default {
  name: 'rank-share',
  props: ['childInfo'],
  data() {
    return {
      date: Date.parse(new Date()),
      year: '',
      month: '',
      day: '',
      dataURL: '',
      isDisabled: false,
      isLoading: false,
      count:1,
      timer:null
    }
  },
  created() {
    this.year = format(this.date, 'yyyy')
    this.month = new Date().toDateString().split(" ")[1]
    this.day = format(this.date, 'dd')
    this.threeGo()
  },
  methods: {
    threeGo(){
      this.timer = setInterval(()=>{
        if(this.count > 0 && this.count <= 1){
          this.count--
        }else{
          clearInterval(this.timer)
          this.timer = null
          this.toImage()
        }
		  },500)
    },
    toImage() {
      this.isLoading = true

     let dom = this.$refs.imageWrapper

      domtoimage.toSvg(dom, {
        bgcolor: '#fff',
      }).then(dataUrl => {
        this.dataURL = dataUrl
        this.isLoading = false
        this.isDisabled = true
      })
    },
    closeQrcode() {
      this.$emit('close')
    }
  }
}
</script>
<style scoped>
.time,
.quotes {
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}

.time {
  display: grid;
  position: absolute;
  text-align: center;
  color: #fff;
  top: 0;
  font-size: 1.625rem /* 26/16 */;
  border-bottom: 0.125rem /* 2/16 */ solid #fff;
  padding: 1.25rem /* 20/16 */;
}

.quotes {
  position: absolute;
  color: #fff;
  display: grid;
  justify-items: end;
  bottom: 3.125rem /* 50/16 */;
  font-weight: 500;
}

.content {
  justify-content: space-between;
}

.container {
  position: relative;
  background: #fff;
}

.mask-layer {
  background: #000;
  height: 18.75rem /* 300/16 */;
  overflow: hidden;
}

img.share-img {
  opacity: 0.6;
}

.code-img {
  width: 7.5rem /* 120/16 */;
}

.footer {
  padding: 0.625rem /* 10/16 */;
}

.share-text {
  color: #303133;
}

.share-text .text {
  font-weight: 500;
}

.explain {
  display: grid;
  text-align: center;
}
</style>
