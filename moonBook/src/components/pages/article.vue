<template>
  <div class="article">
    <van-nav-bar left-text="发现" left-arrow fixed :zIndex='100' @click-left="onClickLeft" @click-right="shareShow = true">
      <div class="head-bar-title" slot="title">
        <transition name="slide-fade" mode="out-in">
          <div class="head-bar-title-conent" :key="1" v-if='!themeBarSearch'>
            {{$route.meta.title}}
          </div>
          <div class="head-bar-title-conent flex flex-align flex-justify" :key="2" v-else>
            <div class="avatar">
              <img :src="item.user.avatar" :alt="item.user.username">
            </div>
            <div class="name">{{item.user.username}}</div>
          </div>
        </transition>
      </div>
      <div class="head-bar-right" slot="right">
        <i class="iconfont">&#xe635;</i>
      </div>
    </van-nav-bar>
    <div class="container page-padding">
      <div class="user-card flex flex-align" ref="userCard" v-if='item.user'>
        <div class="avatar">
          <img :src="item.user.avatar" :alt="item.user.username">
        </div>
        <div class="info">
          <div class="name">
            <div class="flex flex-align">
              <span>{{item.user.username}}</span>
              <div class="memberships" v-if='item.card_level&&item.card_level.type == 1'>
                <i class="iconfont vip-masonry" v-if="item.card_level.level == 3">&#xe611;</i>
                <i class="iconfont vip-gold" v-if="item.card_level.level == 2">&#xe611;</i>
                <i class="iconfont vip-ordinary" v-if="item.card_level.level == 1">&#xe611;</i>
              </div>
            </div>
          </div>
          <div class="date">
            <span>{{item.createDate}}</span>
          </div>
        </div>
        <div class="follow-ben">
          <van-button size="small" round>+ 关注</van-button>
        </div>
      </div>
      <article-content :item='item' />
      <comment-list />
      <comment :item='item' />
    </div>

    <van-popup v-model="pictureShow" class="picture-box-popup" get-container='#app'>
      <picture-box @close="pictureShow = false" v-model="imgIndex" :item="item" />
    </van-popup>

    <van-popup v-model="shareShow" class="share-popup" position="bottom" get-container='#app'>
      <share @close='shareShow = false' @show='imageShow = true' />
    </van-popup>

    <!-- 生成图片 -->
    <van-popup v-model="imageShow" class="screenshot-popup" get-container='#app'>
      <div class="close" @click="imageShow = false">
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
    </van-popup>
  </div>
</template>
<script>
import axios from './../lib/js/api'

import html2canvas from 'html2canvas'
import QRCode from "qrcode"
import pictureBox from "./../module/mold/pictureBox"
import share from './../module/mold/share'
import commentList from './../module/commentList'
import comment from './../module/mold/comment'
import articleContent from './../module/articleContent'


export default {
  name: 'detailsArticle',
  components: {
    pictureBox,
    comment,
    articleContent,
    commentList,
    share
  },
  data() {
    return {
      domHeight: '',
      scrollTop: '',
      themeBarSearch: false,
      imageShow: false,
      headBar: false,
      pictureShow: false,
      shareShow: false,
      imgIndex: '',
      item: '',
      dataURL: '',
      qrImage: '',
      isLoading: false,
      isDisabled: false
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$router': 'fetchData'
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      if (this.$refs.userCard) {
        this.domHeight = this.$refs.userCard.offsetHeight
      }
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.scrollTop = scrollTop
      if (this.scrollTop > this.domHeight) {
        this.themeBarSearch = true
      } else {
        this.themeBarSearch = false
      }
    },
    fetchData() {
      this.qrcode()
      axios.get(`/book/SchoolArticle/detail?ajax=1&id=${this.$route.query.id}`).then(res => {
        this.item = res.data.data.post
      })
    },
    onClickLeft() {
      this.$router.push({
        name: 'find'
      })
    },
    mediaLamp(item, photoIndex) {
      this.pictureShow = true
      this.imgIndex = photoIndex
      this.item = item
    },
    qrcode() {
      QRCode.toDataURL(window.location.href).then(url => {
        this.qrImage = url
      }).catch(err => {
        console.error(err)
      })
    },
    toImage() {
      this.isLoading = true
      html2canvas(this.$refs.imageWrapper, {
        logging: false,
        useCORS: true,
        timeout: 1000,
        windowWidth: this.$refs.imageWrapper.clientWidth,
        windowHeight: this.$refs.imageWrapper.clientHeight,
      }).then(canvas => {
        let dataURL = canvas.toDataURL("image/png")
        this.dataURL = dataURL
        this.isLoading = false
        this.isDisabled = true
      })
    }
  }
}
</script>
<style scoped>
.container {
  background: #f2f6fc;
  padding-top: 2.8125rem /* 45/16 */;
}

.head-bar-title .avatar {
  width: 2rem /* 32/16 */;
  height: 2rem /* 32/16 */;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 0.3125rem /* 5/16 */;
}

.user-card {
  padding: 0.625rem /* 10/16 */;
  background: #fff;
  margin-bottom: 0.3125rem /* 5/16 */;
}

.user-card .avatar {
  width: 3.125rem /* 50/16 */;
  height: 3.125rem /* 50/16 */;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 0.625rem /* 10/16 */;
}

.user-card .name {
  color: #303133;
}

.user-card .date {
  margin-top: 0.3125rem /* 5/16 */;
  color: #909399;
  font-size: 0.8125rem /* 13/16 */;
}

.memberships {
  margin-left: 0.3125rem /* 5/16 */;
}

.slide-fade-enter-active {
  transition: all 0.18s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

.follow-ben {
  position: absolute;
  right: 0.625rem /* 10/16 */;
}

.screenshot-popup {
  overflow: hidden;
}

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
