<template>
  <div class="baby-home page-padding">
    <van-nav-bar fixed :class="[fixedHeaderBar?'theme-nav':'']" :zIndex="100" :title="fixedHeaderBar?$route.meta.title:childInfo.name"
      @click-left="onClickLeft" @click-right="onClickRight">
      <div class="head-bar-text" slot="left">
        <van-icon name="arrow-left" />
        <span class="text">个人中心</span>
      </div>
      <div class="head-bar-icon" slot="right" v-if="childInfo">
        <i class="iconfont">&#xe60c;</i>
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
        <div class="qr-code" @click="showQrcode=true">
          <van-icon name="qr" />
        </div>
      </div>
      <wave />
    </div>
    <div class="container">
      <div class="bar flex flex-align">
        <div class="bar-item totalReading">总阅读量 {{childInfo.read_count}}</div>
        <div class="bar-item praise">赞 {{childInfo.zan_count}}</div>
      </div>
      <div class="baby-class" v-if="childInfo.banji_id > 0">
        <van-cell-group>
          <van-cell :title="`${childInfo.class_name}班`" is-link center @click="toClassHome(childInfo)">
            <div class="icon" slot="icon">
              <i class="iconfont">&#xe802;</i>
            </div>
          </van-cell>
        </van-cell-group>
      </div>
      <lazy-component class="module">
        <reading :list="lateBook" moduleTitle="宝贝最近在读的书" />
      </lazy-component>
      <lazy-component>
        <van-nav-bar title="成长记录" @click-right="releasePageShow = true">
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

    <van-popup v-model="showQrcode" class="card-popup">
      <qr-code :qrImage="qrImage" type="babyHome" :label="childInfo.title" :childInfo="childInfo" @close="showQrcode = false" />
    </van-popup>

    <!-- 发布 -->
    <van-popup v-model="releasePageShow" class="page-popup" position="bottom" get-container='#app'>
      <graphic @close='releasePageShow = false' />
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

export default {
  name: "baby-home",
  components: {
    wave,
    qrCode,
    reading,
    avatar,
    graphicCrad,
    graphic
  },
  data() {
    return {
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
            if(res.child_id > 0){
              axios.get(`/book/baby/getInfo?child_id=${to.query.id}`).then(res => {
                  console.log(`/book/baby/getInfo?child_id=${to.query.id} | 没有班级ID 班级名字是错的`)
                  vm.childInfo = res.data.data
              })
            }else{
              vm.$router.push({
                name: 'edit-child',
                query: {
                  type: 'add',
                  pageTitle:'添加宝贝'
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
      this.$router.push({
        name: "my"
      })
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
    onClickRight() {
      this.$router.push({
        name:'edit-setting',
        query:{
          id: this.$route.query.id
        }
      })
    },
    babySetting(data) {
      this.school = data.school
    },
    toClassHome(data) {
      this.$router.push({
        name: "class-home",
        query: {
          id: data.banji_id
        }
      })
    }
  }
}

</script>
<style scoped>
.header {
  width: 100%;
  height: 11.25rem /* 180/16 */;
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

.baby-info {
  padding: 3.5rem /* 56/16 */ 1.25rem /* 20/16 */;
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

.qr-code {
  position: absolute;
  right: 1.25rem /* 20/16 */;
}

.qr-code i.van-icon {
  font-size: 1.5rem /* 24/16 */;
  color: #fff;
}

.follow .theme-btn {
  border-color: #fff;
  color: #fff;
}

.bar {
  height: 2.875rem /* 46/16 */;
  line-height: 2.875rem /* 46/16 */;
  background: #fff;
  position: relative;
}

.bar::before {
  content: '';
  position: absolute;
  width: 0.0625rem /* 1/16 */;
  height: 1.25rem /* 20/16 */;
  background: #dcdfe6;
  left: 50%;
  top: 50%;
  transform: translate3d(0, -50%, 0);
}

.bar-item {
  flex: 1;
  text-align: center;
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
</style>
