<template>
  <div class="head head-background" ref="head">
    <van-nav-bar :border='false' :class="[fixedHeaderBar?'theme-nav':'']" :key='$route.query.id' :zIndex="100" fixed :title="fixedHeaderBar?$route.meta.title:userInfo.name" @click-left="onClickLeft">
      <div class="head-bar-icon" slot="left">
        <i class="iconfont">&#xe60e;</i>
      </div>
      <div class="head-bar-icon bar-right" slot="right">
        <i class="iconfont" @click="toHelp">&#xe618;</i>
        <i class="iconfont coupon" @click="toPopupList">&#xe68b;</i>
        <div class="tips" v-if='couponCount > 0' @click="toPopupList">
          <van-tag round type="danger">{{couponCount}}</van-tag>
        </div>
      </div>
    </van-nav-bar>
    <div class="user-info flex flex-justify">
      <div class="info">
        <i class="iconfont" v-if='children'>&#xe668;</i>
        <div class="avatar" v-if='userInfo.avatar'>
          <img :src="userInfo.avatar" v-http2https>
        </div>
        <avatar v-else size='medium' avatarClass='border' />
        <div class="children-info" v-if='children' @click="toBabyHome">
          <img class="children-avatar" :src="children.avatar" v-http2https>
        </div>
        <div class="name">{{userInfo.name}}</div>
      </div>

      <div class="card slideInUp animated">
        <div class="borrow-card">
          <div class="library-card flex flex-align" v-if="userInfo.card_level != '0'" @click="onClickLeft">
            <img class="logo" src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/img/logo.png" />
            <div class="card-info flex flex-align">
              <div class="card-name">{{userInfo.card_name}}</div>
              <vipLevel :level='userInfo.card_level' animate='1'/>
            </div>
          </div>
          <div class="no-service flex flex-align flex-justify" v-else @click="toAccept">您还没有办理借阅卡?
            <div class="theme-color">前往办卡</div>
            <i class="iconfont">&#xe61b;</i>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import axios from "./../../lib/js/api"
import numberGrow from "./../../module/animate/numberGrow"
import avatar from './../avatar'
import vipLevel from './../../module/animate/svg/vipLevel'

export default {
  name: "cardHead",
  components: {
    numberGrow,
    avatar,
    vipLevel
  },
  props: ["userInfo", "children",'couponCount'],
  data() {
    return {
      domHeight: 0,
      scrollTop: 0,
      fixedHeaderBar: true,
      active: 0,
      punchShow: false,
      applyShow: false
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.getDomHeight()
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop
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
    onClickLeft() {
      this.$router.push({ name: "card-list" })
    },
    toHelp(){
      location.href = '/book/manual/user'
    },
    // toCalendar() {
    //   this.$router.push({
    //     name:'calendar'
    //   })
    // },
    toAccept() {
      this.$router.push({
        name:'AcceptSchoolList'
      })
    },
    onAccpetPage() {
      this.applyShow = false
    },
    onStepActiveChange(val) {
      this.active = val
    },
    toBabyHome() {
      this.$router.push({
        name: 'baby-home',
        query: {
          id: this.children.id,
          back: this.$route.name
        }
      })
    },
    toPopupList(){
      this.$router.push({
        name:'popupList'
      })
    }
  }
}
</script>
<style scoped>
.head {
  width: 100%;
  position: relative;
  transition: background-image 0.2s ease;
  background: linear-gradient(223deg, #9ce8dd, #a993da, #f0cb54, #6d93a3);
  background-size: 600% 600%;
  animation: bg-generator 50s ease infinite;
}

@keyframes bg-generator {
  0% {
    background-position: 0% 84%
  }
  50% {
    background-position: 100% 17%
  }
  100% {
    background-position: 0% 84%
  }
}

.card {
  position: absolute;
  bottom: 0;
  padding: 0;
  width: 94%;
  left: 50%;
  margin-left: -47%;
  box-shadow: 0 -5px 20px rgba(0, 0, 0, 0.1);
}

.avatar img {
  box-shadow: 0 5px 40px -10px rgba(0, 0, 0, 0.2);
}

.borrow-card {
  width: 100%;
}

.borrow-card i.iconfont {
  font-size: 1.875rem /* 30/16 */
}

.avatar img {
  width: 58px;
  height: 58px;
  margin: 0 auto;
  display: block;
}

.avatar {
  margin: 0 auto;
}

.avatar img,
.children-avatar {
  border-radius: 50%;
  border: 0.1875rem /* 3/16 */ solid rgba(255, 255, 255, .5)
}

.children-avatar {
  position: absolute;
  width: 26px;
  height: 26px;
  left: 65%;
  top: 50%;
  transform: translate3d(0, -50%, 0);
  z-index: 10;
}

.user-info {
  padding-top: 45px;
  padding-bottom: 50px;
  position: relative;
  overflow: hidden;
}

.info {
  color: #fff;
  position: relative;
}

.info .iconfont {
  position: absolute;
  left: 60%;
  top: 50%;
  font-size: 14px;
  z-index: 11;
  background: linear-gradient(135deg, #f44, #e60000);
  -webkit-background-clip: text;
  color: transparent;
}

.info .name {
  font-size: 16px;
  text-align: center;
  margin-top: 5px;
  margin-bottom: 5px;
  font-weight: 700;
}

.info .school {
  width: 12.5rem /* 200/16 */;
  text-align: center;
  margin: 0 auto;
  font-size: 0.875rem /* 14/16 */;
}

.card-box {
  width: 6.25rem /* 100/16 */;
  height: 3.75rem /* 60/16 */;
  border-radius: 0.625rem /* 10/16 */;
  color: #fff;
  text-align: center;
  line-height: 3.75rem /* 60/16 */;
}

.service,
.no-service {
  font-size: 0.875rem /* 14/16 */;
  width: 100%;
  height: 3.125rem /* 50/16 */;
  background: #fff;
}

.card,
.service,
.no-service,
.library-card{
  border-radius: 15px 15px 0 0;
}

.no-service i.iconfont {
  font-size: 1.5625rem /* 25/16 */;
  margin-left: 0.3125rem /* 5/16 */;
}

.data-flow {
  flex: 1;
  text-align: center;
  display: inline-grid;
}

/* .data-flow .number {
  font-size: 1.875rem
} */

/* .data-flow .card-name {
  font-size: x-small
} */

.head-bar-icon{
  position: relative;
}

.tips{
  position: absolute;
  right: -10px;
  top: -10px;
}

.theme-color {
  margin: 0 0.3125rem /* 5/16 */;
}

.page-punch {
  background: #de4313;
}

.library-card{
  height: 2.625rem /* 42/16 */;
  background: #fff;
  padding: 0 .625rem /* 10/16 */;
  justify-content: space-between;
}

.logo{
  height: 28px;
}

.card-name{
  font-weight: 700;
}

.coupon{
  margin-left: 15px;
}
</style>
