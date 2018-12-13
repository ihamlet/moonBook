<template>
  <div class="qrcode-image">
    <div class="close" :class="[type=='classHome'?'plate':'']" @click="closeQrcode">
      <i class="iconfont">&#xe683;</i>
    </div>
    <transition name="fade" mode="out-in">
     
      <slot v-if="!dataURL">
        <div class="container" ref="imageWrapper" v-if="type=='babyHome'">
          <div class="bg">
            <div class="flex-justify">
              <div class="baby-info">
                <div class="avatar" v-if='childInfo.avatar'>
                  <img crossOrigin="anonymous" class="avatar-img" :src="avatar(childInfo.avatar)" :alt="childInfo.name" />
                </div>
                <avatar :gender='childInfo.gender' v-else />
                <div class="name">{{childInfo.name}}</div>
                <div class="school">{{schoolEllipsis}}</div>               
                <div class="label">{{label}}</div>
              </div>
              <div class="text" v-if='childInfo.read_count!=0'>
                <span>{{childInfo.name}}宝贝在阅亮书架一共阅读了图书</span>
                <span class="book-number">{{childInfo.read_count}}本</span>
              </div>
              <div class="code-img flex flex-justify">
                <img :src="qrImage" alt="二维码">
              </div>
              <div class="explain">
                <span> — 长按识别二维码进入 — </span>
                <span> © 阅亮书架 </span>
              </div>
            </div>
            <round />
          </div>
        </div>

        <div class="container" ref="imageWrapper" :class="[type=='classHome'?'plate':'']" v-if="type=='classHome'">
          <div class="img-bg"></div>
          <div class="card flex flex-align">
            <div class="class-card">
              <div class="name">
                <span>{{classInfo.name}}</span>
                <span class="people">{{classInfo.people}}人</span>
              </div>
              <div class="school">{{schoolEllipsis}}</div>
            </div>
            <div class="code-img">
              <img :src="qrImage" alt="二维码">
            </div>
          </div>
          <div class="explain">
            <span> — 长按识别二维码进入 — </span>
            <span> © 阅亮书架 </span>
          </div>
        </div>
      </slot>
      <img :src="dataURL" v-else>
    </transition>
    <div class="popup-btn">
      <van-button class="theme-btn" :loading='isLoading' size="large" square :disabled='isDisabled' type="primary"
        @click="toImage">
        {{dataURL?'长按上图保存分享':'生成图片'}}
      </van-button>
    </div>
  </div>
</template>
<script>
import round from './../animate/round'
import domtoimage  from 'dom-to-image'
import avatar from './../../module/avatar'

export default {
  name: 'qr-code',
  props: ['childInfo', 'classInfo', 'qrImage', 'label', 'type'],
  components: {
    round,
    avatar
  },
  computed: {
    schoolEllipsis() {
      if (this.childInfo.school_name.length > 10) {
        return this.childInfo.school_name.substr(0, 9) + '...'
      } else {
        return this.childInfo.school_name
      }
    }
  },
  data() {
    return {
      isLoading: false,
      isDisabled: false,
      dataURL: '',
    }
  },
  methods: {
    toImage() {
      this.isLoading = true
      domtoimage.toPng(this.$refs.imageWrapper).then(dataUrl => {
        console.log(dataUrl)
        this.dataURL = dataUrl
        this.isLoading = false
        this.isDisabled = true
      })
    },  
    closeQrcode() {
      this.$emit('close')
    },
    avatar(img){
      let hostMatch = img.match(/https?:\/\/(.+?)\//)
      if(hostMatch) {
        return `/book/api/remotePic?url=${img}`
      } else {
        return img
      }
    }
  }
}

</script>
<style scoped>
.baby-info {
  display: grid;
  padding: 1.875rem /* 30/16 */ 0;
}

.avatar {
  margin: 0 auto;
}

.label,
.school {
  text-align: center;
  font-size: 0.8125rem /* 13/16 */;
}

.avatar {
  width: 5rem /* 80/16 */;
  height: 5rem /* 80/16 */;
  border-radius: 50%;
  box-shadow: 0 0.125rem /* 2/16 */ 1.25rem /* 20/16 */ rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.school {
  margin: 0.3125rem /* 5/16 */ auto 0;
  width: 80%;
}

.name {
  margin-top: 0.3125rem /* 5/16 */;
  text-align: center;
  color: #303133;
}

.code-img {
  width: 100%;
  padding: 1.25rem /* 20/16 */ 0;
  margin: 0 auto;
}

.code-img img {
  width: 6.25rem /* 100/16 */;
  height: 6.25rem /* 100/16 */;
  margin:  0 auto;
}

.bg,
.bg .welt {
  width: 100%;
  height: 31.25rem /* 500/16 */;
}

.bg .welt {
  position: absolute;
  z-index: -10;
  top: 0;
  background: #fff;
}

.explain {
  display: grid;
  text-align: center;
  color: #303133;
}

.explain span {
  margin-bottom: 0.3125rem /* 5/16 */;
}

.avatar-img {
  background: transparent;
}

.qrcode-image {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.close.plate i.iconfont {
  color: #fff;
}

.close i.iconfont {
  color: #f56c6c;
}

.text {
  font-size: 0.875rem /* 14/16 */;
  text-align: center;
  display: grid;
}

.book-number {
  font-size: 1.75rem /* 28/16 */;
  color: #000;
}

.img-bg {
  width: 100%;
  height: 21.25rem /* 340/16 */;
  background: url('/Public/images/qc-bg-img.png');
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
}

.card {
  width: 16.25rem /* 260/16 */;
  padding: 0.3125rem /* 5/16 */ 1.25rem; /* 20/16 */;
  justify-content: space-between;
}

.plate .class-card {
  flex: 2;
  padding-left: .625rem /* 10/16 */;
}

.plate .explain {
  margin-top: 0;
  padding-bottom: 1.25rem; /* 20/16 */
}

.plate .class-card .name,
.plate .class-card .school {
  text-align: left;
}

.plate .class-card .school {
  margin: 0.3125rem /* 5/16 */ 0;
}

.plate .class-card .name {
  font-size: 1.125rem /* 18/16 */;
  margin-top: 0;
}

span.people {
  font-size: 0.75rem /* 12/16 */;
}

.plate .code-img {
  flex: 1;
  padding: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
