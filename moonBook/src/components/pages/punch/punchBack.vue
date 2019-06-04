<template>
  <div class="punch-list page-padding">
    <div class="booth">
      <div class="ad-mould">
        <van-swipe :autoplay="3000" indicator-color="white" :height='120'>
          <van-swipe-item v-for="(ad, index) in banner" :key="index" @click="toAdvertising(ad)">
            <div class="card-banner">
              <img :src="ad.photo" />
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>

    <div class="punch-data">
      <van-nav-bar :border='false' title="阅读打卡" @click-right="onClickShare">
        <div class="share-right theme-color" slot="right">
          分享<i class="iconfont">&#xe96e;</i>
        </div>
      </van-nav-bar>
      <van-cell>
        <div class="flex flex-align">
          <div class="item-data item-today-num">
            <div class="sub">实时打卡</div>
            <div class="people-number">
              <span class="num" v-for='(item,index) in numberOfPeople' :key="index">{{item}}</span>
            </div>
            <i class="iconfont">&#xe6c5;</i>
          </div>

          <div class="item-data item-grade">
            <div class="sub">我的成绩</div>
            <div class="item-box my-data flex">
              <div class="num-number">
                <span class="i-sub">打卡:</span>
                <span>{{$route.query.sign_read_count}}本</span>
              </div>
              <div class="day-number">
                <span class="i-sub">坚持:</span>
                <span>{{$route.query.sign_days}}天</span>
              </div>
            </div>
            <i class="iconfont">&#xe61d;</i>
          </div>

          <div class="item-data item-ability">
            <div class="sub">学习力</div>
            <div class="item-box">超过 <span class="percentage">{{childInfo.ahead_percent}}%</span> 的同学</div>
            <i class="iconfont">&#xe666;</i>
          </div>
        </div>
      </van-cell>
    </div>

    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <van-nav-bar :border='false' right-text="我的进度" @click-right="onClickRight">
         <!-- 阅读进度 -->
        <div class="date-title" slot="title">{{day}}</div>
      </van-nav-bar>
      <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
        <div class="list" v-if='list.length'>
          <van-cell v-for="(item,index) in list" :key="index" :is-link='item.book_id > 0' center>
            <cardPunch :item='item' />
          </van-cell>
        </div>
        <div class="no-list" v-else>
          尚无打卡图书
        </div>
      </van-list>
    </van-pull-refresh>

    <van-popup class="popup-release" v-model="releaseShow" position="bottom" get-container="#app">
      <videoList />
    </van-popup>

    <div class="footer-bar flex">
      <div class="btn-box">
        <van-button class="btn theme-btn" type="primary" round size="normal" @click="setReleaseSwitch(true)">晒一晒</van-button>
      </div>
      <div class="btn-box">
        <van-button class="btn theme-borrowing-btn" round type="primary" size="normal" @click="toSpecialPunch">看一看</van-button>
      </div>
    </div>

    <div class="release-footer-bar">
      <van-popup v-model="showTips" class="tips-popup" :overlayStyle='{backgroundColor:"transparent"}' get-container='.footer-bar' :lock-scroll='false'>
        <tips :isShow='showTips' iconLength='2' position='bottom' @close='setReleaseSwitch(false)' :bookId='extra.book_id'/>
      </van-popup>
    </div>

    <van-popup class="animate-popup" v-model="animateShow" :close-on-click-overlay='false'>
      <van-icon class="close-icon" name="close" @click="animateShow = false"/>
      <trophy :signDays='$route.query.sign_days'/>
      <div class="share flex flex-justify">
        <van-button class="share-btn theme-plain" round plain type="primary" @click="onClickRight">领取奖品</van-button>
      </div>
    </van-popup>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import cardPunch from './cardPunch'
import videoList from './../video/videoList'
import { format } from './../../lib/js/util'
import tips from './../../module/release/tips'
import trophy from './../../module/animate/trophy'

export default {
  name: 'punchBack',
  components: {
    cardPunch,
    videoList,
    tips,
    trophy
  },
  computed: {
    ...mapGetters(['userDataState']),
    ...mapState(['releaseSwitch']),
    showTips: {
      get() {
        return this.releaseSwitch
      },
      set(val) {
        this.setReleaseSwitch(val)
      }
    },
    numberOfPeople(){
      return this.punchNumber.toString().split('')
    }
  },
  data() {
    return {
      timer: null,
      loading: false,
      finished: false,
      list: [],
      bookInfo: '',
      page: 1,
      day: '',
      show: false,
      punchNumber: 4950,
      count:5000,
      interval:50,
      animateShow: false,
      releaseShow: false,
      releaseType: [{
        icon: 'icon-weibo',
        text: '发图文',
        index: 0
      }, {
        icon: 'icon-paishipin',
        text: '拍小视频',
        index: 1
      }],
      banner: [],
      extra:'',
      childInfo:''
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$router': 'fetchData'
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    ...mapMutations(['setReleaseSwitch']),
    fetchData() {
      let data = {
        params: {
          site_name: '打卡阅读',
          school_id: this.userDataState.teacher_school_id > 0 ? this.userDataState.teacher_school_id : this.userDataState.school_id
        }
      }
      axios.get('/book/api/ads', data).then(res => {
        switch(res.data.status){
          case 1:
            res.data.data.forEach(element => {
              if(element.photo!=null){
                this.banner.push(element)
              }
            })
            break
        }
      })

      axios.get('/book/baby/getInfo',{params:{child_id:this.$route.query.child_id}}).then(res=>{
        switch(res.data.status){
          case 1:
            this.childInfo = res.data.data
            break
        }
      })

      // 判断打卡天数有没有14天
      if(this.$route.query.sign_days == 14){
        this.animateShow = true
      }      

      this.getReadSignCount()
      this.timer = setInterval(this.setCount, 3000)
    },
    getReadSignCount(){
      axios.get('/book/member/read_sign_stat').then(res=>{
        switch(res.data.status){
          case 1:
            this.count = res.data.data.count
            this.punchNumber = res.data.data.count - this.interval
          break
        }
      })
    },
    setCount(){
      if(this.punchNumber < this.count){
        this.punchNumber += Math.floor(Math.random()*5+1)
      }else{
        this.punchNumber
      }     
    },
    onLoad() {
      this.day = format(new Date(), 'yyyy-MM-dd')

      let data = {
        params: {
          page: this.page,
          child_id: this.$route.query.child_id,
          create_date_min: this.day
        }
      }

      return axios.get('/book/member/get_read_sign_list', data).then(res => {
        switch (res.data.status) {
          case 1:
            this.extra = {
              book_id:0,
              ...res.data.data[0]
            }
            if (this.page == 1) {
              this.list = res.data.data
            } else {
              this.list = this.list.concat(res.data.data)
            }
            this.loading = false
            this.page++

            if (this.list.length >= res.data.count) {
              this.finished = true
            }
            break
          case 0:
            this.page = 1
            this.loading = false
            this.finished = true
            this.list = []
            break
        }
      })
    },
    onRefresh() {
      this.page = 1
      this.onLoad().then(() => {
        this.loading = false
      })
    },
    comeBack() {
      this.$router.push({
        name: this.$route.query.back,
        query: {
          id: this.$route.query.id
        }
      })
    },
    thumb(img) {
      if (img) {
        let hostMatch = img.match(/https?:\/\/(.+?)\//)
        if (hostMatch) {
          return `/book/api/remotePic?url=${img}`
        } else {
          return img
        }
      }
    },
    toAdvertising(ad){
      if(ad.link_url&&ad.link_url != null){
        this.$router.push(ad.link_url)
      }
    },
    toSpecialPunch() {
      this.$router.push({
        name: 'specialPunch',
        query: {
          ...this.$route.query,
          cate_id: this.$route.query.cate_id,
          tags: this.$route.query.tags,
          book_id: this.extra.book_id
        }
      })
    },
    onClickRight(){
      this.$router.push({
        name:'punchSpeed'
      })
    },
    onClickShare(){
      this.$router.push({
        name:'punch-share',
        query:{
          ...this.extra,
          day: this.day
        }
      })
    }
  }
}
</script>
<style scoped>
.booth{
  padding:10px;
  background: #fff;
}

.ad-mould {
  width: 100%;
  color: #c0c4cc;
  text-align: center;
}

.ad-mould,
.ad-mould .card-banner{
  border-radius: 8px;
  overflow: hidden;
}

.btn-box {
  flex: 1;
  padding: 0 0.625rem /* 10/16 */;
}

.btn {
  width: 100%;
}

.footer-bar {
  position: fixed;
  padding: 10px 0;
  width: 100%;
  z-index: 10;
  bottom: 0;
}

.success {
  background: #fff;
  margin-bottom: 3.75rem /* 60/16 */;
}

.thumb {
  width: 5rem /* 80/16 */;
  height: 5rem /* 80/16 */;
  margin: 0.625rem /* 10/16 */ auto;
}

.book-name {
  text-align: center;
}

.book-info {
  margin-bottom: 1.25rem /* 20/16 */;
}

.popup-punch {
  border-radius: 0.625rem /* 10/16 */ 0.625rem /* 10/16 */ 0 0;
}

.slogan {
  height: 2.875rem /* 46/16 */;
  text-align: center;
  line-height: 2.875rem /* 46/16 */;
}

.btn-icon,
.text {
  text-align: center;
}

.text {
  font-size: 0.875rem /* 14/16 */;
}

.release-box {
  padding: 1.25rem /* 20/16 */ 0;
}

.slogan-img {
  width: 280px;
  margin: 20px auto;
}

.round-icon {
  width: 45px;
  height: 45px;
  text-align: center;
  line-height: 45px;
  margin: 0 auto;
  border-radius: 50%;
}

.round-icon .iconfont {
  font-size: 26px;
  color: #fff;
}

.release-box .btn:nth-child(1) .round-icon {
  background-image: linear-gradient(to top, #c471f5 0%, #fa71cd 100%);
}

.release-box .btn:nth-child(2) .round-icon {
  background-image: linear-gradient(
    to right,
    #f78ca0 0%,
    #f9748f 19%,
    #fd868c 60%,
    #fe9a8b 100%
  );
}

.popup-release {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.text {
  margin-top: 0.625rem /* 10/16 */;
}

.card-banner{
  width: 100%;
  height: 100%;
  position: relative;
}

.card-banner img{
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.animate-popup{
  width: 300px;
  height: 300px;
  background: transparent;
}

.share-btn{
  position: absolute;
  bottom: 0;
}

.close-icon{
  position: absolute;
  right: 0;
  font-size: 24px;
  color: #fff;
  z-index: 10;
  opacity: 0.5;
}

.my-data{
  display: grid;
  font-size: 14px;
  margin-top: 10px;
}

.percentage{
  font-size: 19px;
  font-style: italic;
  background: linear-gradient(90deg, #FE8537,#F02B2B);
  -webkit-background-clip: text;
  color: transparent;
}

.people-number{
  font-size: 20px;
  margin-top: 20px;
}

.people-number .num{
  background: #000;
  color: #fff;
  margin-right: 2px;
  width: 16px;
  text-align: center;
  display: inline-block;
}

.unit{
  font-size: 14px;
}

.item-grade{
  margin: 0 10px;
}

.item-data{
  flex: 1;
  text-align: center;
  height: 100px;
  padding: 10px 0;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.item-data .iconfont{
  position: absolute;
  font-size: 80px;
  right: -5px;
  bottom: 16px;
  color: #fff;
  z-index: 1;
  opacity: 0.8;
}

.people-number,
.item-box{
  position: relative;
  z-index: 2;
}

.item-box{
  padding: 0 10px;
}

.item-data:nth-child(1){
  background: linear-gradient(135deg, #dbe0ff, #ddefff);
}

.item-data:nth-child(2){
  background: linear-gradient(135deg, #fcecff, #f4edff);
}

.item-data:nth-child(3){
  background: linear-gradient(135deg, #def5ff, #e0fcff);
}

.item-ability .item-box{
  margin-top: 10px;
}

.item-data .sub{
  font-size: 16px;
  font-weight: 700;
  padding-bottom: 10px;
  position: relative;
}

.item-data .sub::before{
  content: '';
  position: absolute;
  bottom: 0;
  height: 1px;
  width: 80px;
  background: rgba(0, 0, 0, .1);
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}

.share-grade-btn{
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 20px;
}

.share-right i.iconfont{
  margin-left: 10px;
}
</style>
