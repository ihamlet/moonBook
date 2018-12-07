<template>
  <div class="article-share">
    <div class="close" @click="close">
      <i class="iconfont">&#xe683;</i>
    </div>
    <div class="image-wrapper" ref="imageWrapper">
      <transition name="fade" mode="out-in">
        <div class="screenshot" v-if='!dataURL'>
          <div class="user flex flex-align" v-if='item.user'>
            <div class="avatar">
              <img :src="item.user.avatar" :alt="item.user.username" />
            </div>
            <div class="name">{{item.user.username}}</div>
          </div>
          <div class="content">
            <article-content :item='item' type='screenshot' />
          </div>
          <div class="press flex flex-align">
            <div class="text">
              <span>长按二维码识别查看更多</span>
              <span>© 阅亮书架</span>
            </div>
            <div class="qr-image">
              <img :src="qrImage" alt="页面二维码" />
            </div>
          </div>
        </div>
        <img :src='dataURL' v-else>
      </transition>
    </div>
    <div class="popup-btn">
      <van-button class="theme-btn" :loading='isLoading' size="large" square :disabled='isDisabled' type="primary"
        @click="toImage">
        {{dataURL?'长按上图保存分享':'生成图片'}}
      </van-button>
    </div>
  </div>
</template>
<script>
import html2canvas from 'html2canvas'
import articleContent from './../articleContent'

export default {
  name: 'article-share',
  props: ['item', 'qrImage'],
  components: {
      articleContent
  },
  data() {
    return {
      dataURL: '',
      isLoading: false,
      isDisabled: false
    }
  },
  methods: {
    toImage() {
      this.isLoading = true
      html2canvas(this.$refs.imageWrapper, {
        logging: false,
        timeout: 1000,
        windowWidth: this.$refs.imageWrapper.clientWidth,
        windowHeight: this.$refs.imageWrapper.clientHeight,
      }).then(canvas => {
        let dataURL = canvas.toDataURL("image/png")
        this.dataURL = dataURL
        this.isLoading = false
        this.isDisabled = true
      })
    },
    close(){
        this.$emit('close')
    }
  }
}
</script>
<style scoped>
.screenshot {
  width: 17.5rem /* 280/16 */;
  overflow: hidden;
  padding: 0.625rem /* 10/16 */ 1.25rem /* 20/16 */;
}

.image-wrapper {
  width: 20rem /* 320/16 */;
  overflow: hidden;
}

.image-wrapper .content {
  background: #fff;
}

.screenshot .user {
  margin-bottom: 0.625rem /* 10/16 */;
}

.screenshot .user .avatar {
  width: 2.875rem /* 46/16 */;
  height: 2.875rem /* 46/16 */;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 0.3125rem /* 5/16 */;
}

.press {
  margin-top: 0.625rem /* 10/16 */;
  font-size: 0.75rem /* 12/16 */;
  justify-content: space-between;
}

.press .text {
  display: grid;
  padding-left: 0.9375rem /* 15/16 */;
}

.qr-image {
  width: 6.25rem /* 100/16 */;
  height: 6.25rem /* 100/16 */;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
