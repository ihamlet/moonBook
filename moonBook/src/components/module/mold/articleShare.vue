<template>
  <div class="article-share">
    <div class="close" @click="close">
      <i class="iconfont">&#xe683;</i>
    </div>
    <div class="image-wrapper" ref="imageWrapper">
      <transition name="fade" mode="out-in">
        <div class="screenshot" v-if='!dataURL'>
          <div class="content">
          <div class="logo flex flex-align">
            <img src="/Public/lib/bookshelf/img/logo.png" alt="logo" />
            <span class="name">阅亮书架</span>
          </div>
            <div class="article-container">
                <div class="title">{{item.title}}</div>
                <div class="flex flex-align">
                  <div class="name">{{userName}}</div>
                  <div class="views">{{item.views}}人读过</div>
                </div>
                <!-- v-html="item.details.replace(/<img.*?>/, '')" -->
                <div class="details" ref='details' v-line-clamp:20="4" v-html='item.details'></div>
            </div>
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
    <div class="punch">
      <van-button class="theme-btn" round size="normal" type="primary" :loading='isLoading' :disabled='isDisabled' @click="toImage">
        {{dataURL?'长按上图保存分享':'生成图片'}}
      </van-button>
    </div>
  </div>
</template>
<script>
import domtoimage  from 'dom-to-image'
// import image2base64 from 'image-to-base64'
import articleContent from './../articleContent'

export default {
  name: 'article-share',
  props: ['item', 'qrImage','userName'],
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
  mounted () {
    this.imgToBase64()
  },
  methods: {
    toImage() {
      this.isLoading = true
      domtoimage.toSvg(this.$refs.imageWrapper).then(dataUrl => {
        this.dataURL = dataUrl
        this.isLoading = false
        this.isDisabled = true
      })
    },
    close() {
      this.$emit('close')
    },
    imgToBase64(){
      console.log(this.$refs.details)
    },
    getAvatar(img) {
      let pos = img.indexOf('http://')
      let result
      if(pos === 0) {
         result = img.replace('http:', 'https:')
      } else {
         result = img
      }
      return result
    }
  }
}
</script>
<style scoped>
.screenshot {
  height: 31.25rem /* 500/16 */;
  border-radius: .625rem /* 10/16 */;
}

.image-wrapper {
  width: 20rem /* 320/16 */;
  overflow: hidden;
  background: #fff;
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

.popup-btn{
  position: fixed;
  bottom: 4.875rem /* 78/16 */;
  left: 50%;
  -webkit-transform: translate3d(-50%, 0, 0);
  transform: translate3d(-50%, 0, 0);
}

.logo img{
  width: 3.125rem /* 50/16 */;
  height: 3.125rem /* 50/16 */;
  margin-right: .625rem /* 10/16 */;
}

.logo .name{
  font-size: 1.125rem /* 18/16 */;
  font-weight: 500;
}

.content{
  padding: 1.25rem /* 20/16 */;
}

.content .title{
  font-size: 1.25rem /* 20/16 */;
  margin-bottom: .625rem /* 10/16 */;
}

.article-container{
  padding: 1.25rem /* 20/16 */ 0;
}

.details{
  width: 100%;
  height: 5rem /* 80/16 */;
  margin-top: 1.875rem /* 30/16 */;
}

.punch{
  bottom: 1.25rem /* 20/16 */;
}

.name{
  margin-right: .625rem /* 10/16 */;
}
</style>
