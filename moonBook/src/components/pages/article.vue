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
     
      <article-content :item='item'/>


      <div class="comment">
        <div class="comment-list">
          <div class="user-card flex flex-align">

          </div>
        </div>
      </div>
    </div>

    <comment :item='item' />

    <van-popup v-model="pictureShow" class="picture-box-popup" get-container='#app'>
      <picture-box @close="pictureShow = false" v-model="imgIndex" :item="item" />
    </van-popup>

    <van-popup v-model="shareShow" class="share-popup" position="bottom" get-container='#app'>
      <share @close='shareShow = false' @generateImg='toImage'/>
    </van-popup>

    <!-- 生成图片 -->
    <van-popup v-model="imageShow" get-container='#app'>
      <div class="screenshot" ref="imageWrapper" v-if='!dataURL'>
        <div class="user flex flex-justify" v-if='item.user'>
          <div class="avatar">
            <img :src="item.user.avatar" :alt="item.user.username"/>
          </div>
          <div class="name">{{item.user.username}}</div>
        </div>

        <div class="content">
          <article-content :item='item' type='screenshot'/>
        </div>

        <div class="press">
          <span>长按二维码识别</span>
          <span>查看更多</span>
        </div>
      </div>
      <img :src='dataURL' v-else>
    </van-popup>
  </div>
</template>
<script>
import axios from './../lib/js/api'

import html2canvas from 'html2canvas'

import pictureBox from "./../module/mold/pictureBox"
import share from './../module/mold/share'
import comment from './../module/mold/comment'
import articleContent from './../module/articleContent'


export default {
  name: 'detailsArticle',
  components: {
    pictureBox,
    comment,
    articleContent,
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
      dataURL: ''
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
    toProxy(element) {
      return new Promise((resolve, reject) => {
        let imgs = element.querySelectorAll('img')
        imgs.forEach((img) => {
          let host = img.src.indexOf(location.host)
          if(host === -1) {           
            img.setAttribute('crossOrigin', 'anonymous')
            img.src = '/book/api/remotePic?url=' + encodeURIComponent(img.src)
          }
          resolve()
        })
      })
    },
    toImage() {
      this.imageShow = true
      this.toProxy(this.$refs.imageWrapper).then(()=>{
        html2canvas(this.$refs.imageWrapper, {
          logging: false,
          useCORS: true,
          timeout: 1000,
          backgroundColor: '#fff',
          windowWidth: this.$refs.imageWrapper.clientWidth,
          windowHeight: this.$refs.imageWrapper.clientHeight,
        }).then(canvas => {
          // this.shareShow = false
        
          let dataURL = canvas.toDataURL("image/png")
          this.dataURL = dataURL
        })
      })
    },
    toImage() {
      this.toProxy(this.$refs.imageWrapper).then(() => {       
        html2canvas(this.$refs.imageWrapper, {
          logging: true,
          timeout: 1000,
          backgroundColor: '#fff',
          windowWidth: this.$refs.imageWrapper.clientWidth,
          windowHeight: this.$refs.imageWrapper.clientHeight,
        }).then(canvas => {
          let dataURL = canvas.toDataURL("image/png")
          this.dataURL = dataURL
        })
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
  margin-bottom: .3125rem /* 5/16 */;
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

.screenshot{
  width: 17.5rem /* 280/16 */;
  height: 37.5rem /* 600/16 */;
  background: #f2f6fc;
  padding: .625rem /* 10/16 */ 1.25rem /* 20/16 */;
}

.screenshot .user{
  display: grid;
  margin-bottom: 1.25rem /* 20/16 */;
}

.screenshot .user .avatar{
  width: 3.75rem /* 60/16 */;
  height: 3.75rem /* 60/16 */;
  border-radius: 50%;
  overflow: hidden;
  margin: .625rem /* 10/16 */ auto;
}

.press{
  display: grid;
  text-align: center;
  margin: .625rem /* 10/16 */ 0;
  font-size: .75rem /* 12/16 */;
}
</style>
