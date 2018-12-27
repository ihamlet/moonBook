<template>
  <div class="head head-background" ref='head'>
    <van-nav-bar :class="[fixedHeaderBar?'theme-nav':'']" :zIndex='100' fixed :title="fixedHeaderBar?$route.meta.title:userInfo.name"
      @click-left="onClickLeft">
      <div class="head-bar-icon" slot='left'>
        <i class="iconfont">&#xe60e;</i>
      </div>
      <div class="head-bar-icon bar-right" slot='right'>
        <span class="notice-badge">
          <i class="iconfont" @click="toNotice">&#xe741;</i>
          <b class="read-dot" v-if='msg > 0'></b>
        </span>
        <i class="iconfont" @click="signIn">&#xe609;</i>
      </div>
    </van-nav-bar>
    <div class="user-info flex flex-justify">
      <div class="info">
        <div class="avatar">
          <img :src="userInfo.avatar" :alt="userInfo.name">
        </div>
        <div class="name">{{userInfo.name}}</div>
      </div>
    </div>
    <div class="card">
      <div class="borrow-card flex flex-align">
        <div class="service flex flex-align" v-if='userInfo.isVip'>
          <div class="data-flow" @click="$router.push({name:'card-list'})">
            <i class="iconfont" :class="`vip-${userInfo.card_level}`">&#xe604;</i>
            <b class="card-name" v-line-clamp:20="1">
              {{userInfo.card_name}}
            </b>
          </div>
          <div class="data-flow read" @click="toBorrowList(0)">
            <span class="data-name">读过</span>
            <span class="number">
              <number-grow :value="userInfo.borrow_count" :time='.2' />
            </span>
          </div>
          <div class="data-flow reading" @click="toBorrowList(1)">
            <span class="data-name">在读</span>
            <span class="number">
              <number-grow :value="userInfo.borrowing_count" :time='.2' />
            </span>
          </div>
          <div class="data-flow collection" @click="toBorrowList(2)">
            <span class="data-name">收藏</span>
            <span class="number">
              <number-grow :value="userInfo.collect_count" :time='.2' />
            </span>
          </div>
          <div class="data-flow abrasion" @click="toBorrowList(3)">
            <span class="data-name">破损</span>
            <span class="number">
              <number-grow :value="userInfo.broken_count" :time='.2' />
            </span>
          </div>
        </div>
        <div class="no-service flex flex-align flex-justify" v-else @click="toAccept">
          您还没有办理借阅卡?
          <div class="theme-color">前往办卡</div>
          <i class="iconfont">&#xe61b;</i>
        </div>
      </div>
    </div>

    <!-- 借阅卡办理页面 -->
    <van-popup v-model="applyShow" class="page-popup" position="bottom" :overlay="false">
      <accept @close='onAccpetPage' v-model='active' />
    </van-popup>

    <van-popup v-model="punchShow" class="page-popup page-punch" position="right">
      <punch @close='closePunch' />
    </van-popup>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import numberGrow from './../../module/animate/numberGrow'
import punch from './../../module/punch'
import accept from './../accept'

export default {
  name: 'cardHead',
  components: {
    numberGrow,
    accept,
    punch
  },
  props: ['userInfo','msg'],
  data() {
    return {
      domHeight: 0,
      scrollTop: 0,
      fixedHeaderBar: true,
      active: 0,
      punchShow: false,
      applyShow: false,
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.getDomHeight()
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
    onClickLeft() {
      this.$router.push({name:'card-list'})
    },
    signIn() {
      this.punchShow = true
    },
    toAccept() {
      this.applyShow = true
      this.active = 0
    },
    onAccpetPage() {
      this.applyShow = false
    },
    onStepActiveChange(val) {
      this.active = val
    },
    closePunch() {
      this.punchShow = false
    },
    toBorrowList(num){
      this.$router.push({
        name:'borrow-list',
        query:{
          tabActive:num
        }
      })
    },
    toNotice(){
      this.$router.push({
        name:'notice'
      })
    }
  }
}
</script>
<style scoped>
.head {
  width: 100%;
  position: relative;
}

.card {
  position: absolute;
  bottom: -3.125rem /* 50/16 */;
  padding: 0;
  width: 95%;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}

.borrow-card,
.avatar img {
  box-shadow: 0 0.3125rem /* 5/16 */ 2.5rem /* 40/16 */ -0.625rem /* 10/16 */ rgba(0, 0, 0, 0.2);
}

.borrow-card {
  width: 100%;
  background: #fff;
  padding: 0.3125rem /* 5/16 */ 0;
  border-radius: 0.625rem /* 10/16 */;
}

.borrow-card i.iconfont {
  font-size: 1.875rem /* 30/16 */;
}

.avatar img {
  width: 4.5rem /* 72/16 */;
  height: 4.5rem /* 72/16 */;
  border-radius: 50%;
  border: 0.1875rem /* 3/16 */ solid #fff;
}

.avatar {
  margin: 0 auto;
}

.user-info {
  padding-top: 3.75rem /* 60/16 */;
  padding-bottom: 1.875rem /* 30/16 */;
}

.info {
  color: #fff;
  display: grid;
}

.info .name {
  font-size: 1.25rem /* 20/16 */;
  text-align: center;
  margin-top: 0.625rem; /* 10/16 */
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

.data-flow .number {
  font-size: 1.875rem /* 30/16 */;
}

.data-flow .card-name {
  font-size: x-small;
}

.theme-color {
  margin: 0 0.3125rem /* 5/16 */;
}

.page-punch {
  background: #de4313;
}

span.notice-badge{
  margin-right: .9375rem /* 15/16 */;
  position: relative;
}

b.read-dot{
  position: absolute;
  width: .625rem /* 10/16 */;
  height: .625rem /* 10/16 */;
  background: #f44;
  border-radius: .625rem /* 10/16 */;
  bottom: .9375rem /* 15/16 */;
  right: 0;
}
</style>
