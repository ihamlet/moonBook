<template>
  <div class="baby-home page-padding">
    <van-nav-bar fixed :class="[fixedHeaderBar?'theme-nav':'']" :zIndex="100" :title="pageTitle" @click-left="onClickLeft">
      <div class="head-bar-text" slot="left">
        <van-icon name="arrow-left" />
        <span class="text">{{this.$route.query.back?'返回':'首页'}}</span>
      </div>
    </van-nav-bar>
    <div class="header" ref="head" :class="[childInfo.sex=='boy'?'theme-background':'background']">
      <div class="baby-info flex flex-align">
        <div class="avatar" v-if="childInfo.avatar">
          <img class="avatar-img" :src="childInfo.avatar" :alt="childInfo.name">
        </div>
        <avatar :gender="childInfo.sex" v-else />
        <div class="baby-data">
          <div class="list flex flex-align">
            <div class="item name">{{childInfo.name}}</div>
            <div class="item detail">
              <span class="gender">
                <i class="iconfont" v-if="childInfo.sex=='boy'">&#xe646;</i>
                <i class="iconfont" v-else>&#xe645;</i>
              </span>
              <span class="age">{{childInfo.age}}岁</span>
            </div>
          </div>
          <div class="label">{{childInfo.title}}</div>
          <div class="school" v-line-clamp:20="1">{{childInfo.school_name}}</div>
        </div>
        <div class="add-praise" @click="babyPraise(childInfo)">
          <i class="iconfont">&#xe6e3;</i>
        </div>
        <div class="qr-code" @click="showQrcode=true">
          <i class="iconfont">&#xe622;</i>
        </div>
      </div>
      <wave />
    </div>
    <div class="container">
      <div class="bar flex flex-align">
        <div class="bar-item totalReading">
          <span class="number">{{childInfo.read_count}}</span>
          <span class="bar-title">阅读量</span>
        </div>
        <div class="bar-item praise">
          <span class="number">{{childInfo.zan_count}}</span>
          <span class="bar-title">赞</span>
        </div>
        <div class="bar-item diary">
          <span class="number">{{childInfo.post_count}}</span>
          <span class="bar-title">日记</span>
        </div>
        <div class="bar-item task">
          <span class="number">0</span>
          <span class="bar-title">亲子任务</span>
        </div>
      </div>
      <lazy-component class="module" v-if="childInfo.is_mine">
        <family />
      </lazy-component>

      <lazy-component class="module">
        <activity />
      </lazy-component>

      <div class="baby-class" v-if='childInfo.is_mine'>
        <lazy-component>
          <class-show :banji_name='childInfo.banji_name' :banji_id='childInfo.banji_id' />
        </lazy-component>
        <van-cell-group>
          <van-cell :title="childInfo.banji_name" is-link center @click="toClassHome(childInfo)">
            <div class="icon" slot="icon">
              <i class="iconfont">&#xe802;</i>
            </div>
          </van-cell>
        </van-cell-group>
      </div>
      <lazy-component class="module">
        <reading :list="lateBook" moduleTitle="宝贝最近在读的书" />
      </lazy-component>
      <lazy-component v-if="childInfo.is_mine">
        <van-nav-bar title="成长日记" @click-right="releasePageShow = true">
          <div class="head-bar-btn theme-color" slot="right">
            <i class="iconfont">&#xe72c;</i>发布
          </div>
        </van-nav-bar>
        <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
          <div class="no-list" v-if='list.length == 0'>
            没有记录
          </div>
          <div class="list">
            <div class="item" v-for="(item,index) in list" :key="index">
              <van-cell>
                <graphic-crad :item="item" type="babyHome" :avatar='childInfo.avatar' />
              </van-cell>
            </div>
          </div>
        </van-list>
      </lazy-component>
    </div>

    <slogan v-if="!childInfo.is_mine"/>

    <van-popup v-model="showQrcode" class="card-popup">
      <qr-code :qrImage="qrImage" type="babyHome" :label="childInfo.title" :childInfo="childInfo" @close="showQrcode = false" />
    </van-popup>

    <!-- 发布 -->
    <van-popup v-model="releasePageShow" class="page-popup" position="bottom" get-container='#app'>
      <graphic @close='releasePageShow = false' />
    </van-popup>

    <van-popup v-model="zanShow" class="add-count-popup" :overlay="false" :lock-scroll='false' get-container='#app'>
      <i class="iconfont" :class="[zanShow?'rotateInDownLeft animated':'']">&#xe6e3;</i>
    </van-popup>
  </div>
</template>
<script>
import axios from "./../lib/js/api"
import { mapActions } from 'vuex'
import { format } from "./../lib/js/util.js"
import QRCode from "qrcode"
import wave from "./../module/animate/anWave"
import qrCode from "./../module/mold/qrCode"
import avatar from "./../module/avatar"
import reading from "./../module/reading"
import graphicCrad from "./../module/card/graphicCrad"
import graphic from './../module/release/graphic'
import classShow from './../module/classModule/classShow'
import family from './../module/myModule/family'
import activity from './../module/activity/activity'
import slogan from './../module/slogan'

export default {
  name: "baby-home",
  components: {
    wave,
    qrCode,
    reading,
    avatar,
    graphicCrad,
    graphic,
    classShow,
    family,
    slogan,
    activity
  },
  computed: {
    pageTitle() {
      let name = ''

      if (this.childInfo.is_mine) {
        if (this.fixedHeaderBar) {
          name = this.$route.meta.title
        } else {
          name = this.childInfo.name
        }
      } else {
        name = `${this.childInfo ? this.childInfo.name : ''}小朋友`
      }

      return name
    }
  },
  data() {
    return {
      zanShow: false,
      fixedHeaderBar: true,
      domHeight: "",
      childInfo: "",
      qrImage: "",
      showQrcode: false,
      lateBook: [],
      list: [],
      loading: false,
      finished: false,
      releasePageShow: false,
      page: 1
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.qrcode()
      vm.getUserData().then(res => {
        if (res.child_id > 0) {
          axios.get(`/book/baby/getInfo?child_id=${to.query.id}`).then(res => {
            vm.childInfo = res.data.data
          })
        } else {
          vm.$router.push({
            name: 'edit-child',
            query: {
              type: 'add',
              pageTitle: '添加宝贝'
            }
          })
        }
      })
    })
  },
  created() {
    this.fetchData();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll)
  },
  watch: {
    $router: "fetchData"
  },
  methods: {
    ...mapActions(["getUserData"]),
    fetchData() {
      axios.get(`/book/BabyBorrow/getList?page=1&limit=20&child_id=${this.$route.query.id}`).then(res => {
        this.lateBook = res.data.data
      })
    },
    onClickLeft() {
      if(this.$route.query.back){
        this.$router.push({
          name:this.$route.query.back,
          query:{
            id:this.$route.query.banji_id
          }
        })
      }else{
        this.$router.push({
          name: "home"
        })
      }
    },
    qrcode() {
      QRCode.toDataURL(window.location.href).then(url => {
        this.qrImage = url
      }).catch(err => {
        console.error(err)
      })
    },
    handleScroll() {
      this.getDomHeight();
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.scrollTop = scrollTop
      if (this.domHeight < this.scrollTop) {
        this.fixedHeaderBar = false
      } else {
        this.fixedHeaderBar = true
      }
    },
    getDomHeight() {
      if (this.$refs.head) {
        this.domHeight = this.$refs.head.offsetHeight / 2
      }
    },
    onLoad() {
      axios.get(`/book/SchoolArticle/getList?page=${this.page}&sort=new&child_id=${this.$route.query.id}`).then(res => {
        this.page++

        this.list = this.list.concat(res.data.data)
        this.loading = false

        if (this.list.length >= res.data.count) {
          this.finished = true
        }
      })
    },
    toClassHome(childInfo) {
      if (childInfo.banji_id > 0) {
        this.$router.push({
          name: "class-home",
          query: {
            id: childInfo.banji_id
          }
        })
      } else {
        this.$router.push({
          name: "class-home",
          query: {
            id: childInfo.child_id,
            schoolId: childInfo.school_id
          }
        })
      }
    },
    babyPraise(childInfo) {
      axios.get(`/book/baby/zan?child_id=${this.$route.query.id}`).then(res => {
        if (res.data.status == 1) {
          this.zanShow = true
          childInfo.zan_count = res.data.data.zan_count
        } else {
          this.$toast(res.data.msg)
        }

        setTimeout(() => {
          this.zanShow = false
        }, 2000)
      })
    }
  }
}

</script>
<style scoped>
.header {
  width: 100%;
  height: 9.375rem /* 150/16 */;
  position: relative;
}

.background {
  background: linear-gradient(-135deg, #ff765c, #ff23b3);
}

.baby-info .avatar {
  margin-right: 0.625rem /* 10/16 */;
  width: 3.75rem /* 60/16 */;
  height: 3.75rem /* 60/16 */;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0.3125rem /* 5/16 */ 1.25rem /* 20/16 */ rgba(0, 0, 0, 0.2);
  border: 0.1875rem /* 3/16 */ solid #fff;
}

.baby-info .avatar img {
  width: 3.75rem /* 60/16 */;
  height: 3.75rem /* 60/16 */;
  border-radius: 50%;
}

.baby-info {
  padding: 3.5rem /* 56/16 */ 1.25rem /* 20/16 */;
  position: relative;
  z-index: 1;
}

.list {
  color: #fff;
}

.detail,
.school {
  font-size: 0.875rem /* 14/16 */;
}

.school {
  width: 10rem /* 160/16 */;
  text-align: left;
  margin-top: 0.3125rem /* 5/16 */;
  color: #fff;
}

.add-praise,
.qr-code {
  position: absolute;
}

.qr-code {
  right: 1.25rem /* 20/16 */;
}

.add-praise {
  right: 4.375rem /* 70/16 */;
}

.add-praise i.iconfont,
.qr-code i.iconfont {
  font-size: 1.5rem /* 24/16 */;
  color: #fff;
  text-shadow: 0 0.125rem /* 2/16 */ 0.375rem /* 6/16 */ rgba(0, 0, 0, 0.1);
}

.follow .theme-btn {
  border-color: #fff;
  color: #fff;
}

.bar {
  background: #fff;
  padding: 0.625rem /* 10/16 */ 0;
}

.bar-item {
  flex: 1;
  text-align: center;
  display: grid;
}

.bar-item .number {
  font-size: 1.375rem /* 22/16 */;
  font-weight: 500;
}

.bar-item .bar-title {
  font-size: 0.875rem /* 14/16 */;
}

.label {
  font-size: 0.8125rem /* 13/16 */;
  color: #fff;
}

.baby-class .icon {
  margin-right: 0.625rem /* 10/16 */;
}

.baby-class .icon i.iconfont {
  font-size: 1.5rem /* 24/16 */;
  background-image: linear-gradient(135deg, #795548 10%, #000 100%);
  -webkit-background-clip: text;
  color: transparent;
}

.add-count-popup .iconfont {
  font-size: 2.25rem /* 36/16 */;
  background: linear-gradient(90deg, #ff2a00, #ff00af);
  -webkit-background-clip: text;
  color: transparent;
  display: block;
}

.name{
  margin-right: .625rem /* 10/16 */;
}
</style>
<style>
.add-count-popup.van-popup {
  background: transparent;
}
</style>

