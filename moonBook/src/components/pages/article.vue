<template>
  <div class="article">
    <van-nav-bar left-text="发现" left-arrow fixed :zIndex='100' @click-left="onClickLeft" @click-right="shareShow = true">
      <div class="head-bar-title" slot="title">
        <transition name="slide-fade" mode="out-in">
          <div class="head-bar-title-conent" :key="1" v-if='!themeBarSearch'>
            {{$route.meta.title}}
          </div>
          <div class="head-bar-title-conent flex flex-align flex-justify" :key="2" v-else>
            <div class="avatar" v-if='item.user'>
              <img :src="item.user.avatar" :alt="item.user.username">
            </div>
            <div class="name" v-if='item.user'>{{item.user.username}}</div>
            <vip-level v-if='item.card_level' :animate='true' :level='item.card_level.level'/>
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
              <vip-level v-if='item.card_level' :animate='true' :level='item.card_level.level'/>
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
      <comment :item='item'/>
    </div>

    <van-popup v-model="pictureShow" class="picture-box-popup" get-container='#app'>
      <picture-box @close="pictureShow = false" v-model="imgIndex" :item="item" />
    </van-popup>

    <van-popup v-model="shareShow" class="share-popup" position="bottom" get-container='#app'>
      <share @close='shareShow = false' @show='imageShow = true' />
    </van-popup>

    <!-- 生成图片 -->
    <van-popup v-model="imageShow" class="screenshot-popup" get-container='#app'>
      <article-share :item='item' :qrImage='qrImage' @close='imageShow = false'/>
    </van-popup>
  </div>
</template>
<script>
import axios from './../lib/js/api'

import html2canvas from 'html2canvas'
import QRCode from "qrcode"
import pictureBox from "./../module/mold/pictureBox"
import share from './../module/mold/share'
import articleShare from './../module/mold/articleShare'
import comment from './../module/comment'
import articleContent from './../module/articleContent'
import vipLevel from './../module/animate/svg/vipLevel'

export default {
  name: 'detailsArticle',
  components: {
    pictureBox,
    articleContent,
    comment,
    share,
    articleShare,
    vipLevel
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
      qrImage:'',
      item: ''
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .18s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.share-box{
  width: 100%;
  overflow: hidden;
}
</style>
