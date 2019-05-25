<template>
  <div class="readstat page-padding">
    <van-nav-bar :zIndex='99' :class="fixedHeaderBar?'theme-nav':''" :key="$route.query.id" :border='false' :title="fixedHeaderBar?$route.meta.title:childInfo.name" fixed>
      <!-- <div class="head-bar-icon" slot="right">
        <i class="iconfont">&#xe635;</i>
      </div> -->
    </van-nav-bar>
    <div class="head" ref="head">
      <div class="baby-info flex flex-align" @click="toPageBabyHome(list)">
        <div class="content">
          <div class="avatar" v-if="childInfo.avatar">
            <img :src="childInfo.avatar" alt="宝贝头像" @error="imgError" v-http2https>
          </div>
          <avatar :gender="childInfo.sex" size='small' v-else />
          <div class="name flex flex-align">
            {{childInfo.name}}
            <van-tag class="tag" color="#FFC107" round type="danger" size='medium'>{{Math.floor(childInfo.read_level)}}级</van-tag>
          </div>
        </div>
      </div>
      <div class="data-list flex flex-align">
        <div class="volume" v-for='(item,index) in dataList' :key="index">
          <div class="name">{{item.name}}</div>
          <div class="number">{{item.val}}</div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="gutter">
        <van-cell title='宝贝成就' :value='level?`${level.type == "punch"?"Rv":"Bv"}.${level.level}"${level.name}"`:""' size="large" is-link center @click="toAchievement">
          <div class="icon cell-icon icon-medal" slot="icon">
            <i class="iconfont">&#xe74a;</i>
          </div>
        </van-cell>
        <van-cell title='排行榜' is-link size="large" @click="toRanking" center>
          <div class="icon cell-icon icon-ranking" slot="icon">
            <i class="iconfont">&#xe61d;</i>
          </div>
        </van-cell>
      </div>

      <div class="gutter gap">
        <div class="learning">
          <div class="title">学习力超过了：</div>
          <div class="learning-circle flex flex-align">
            <van-circle v-model="currentRate" :rate="86" :speed="100" size="80px" color="#2196f3" layer-color="#ebedf0" :stroke-width="60"/>
             <span class="num">{{childInfo.ahead_percent}}%</span>的小朋友
          </div>
        </div>
      </div>

      <div class="gutter gap">
        <van-cell-group>
          <van-cell size='large'>
            <div class="text flex flex-justify">影响<span class="data">{{childInfo.fluent_count}}人</span> 阅读了<span class="data">{{childInfo.fluent_read_count}}
                本</span>图书</div>
          </van-cell>
        </van-cell-group>
      </div>
    </div>


    <!-- 原先的截图分享 弃用 -->
    <!-- <div class="gutter gap">
      <van-button class="theme-btn" round size="large" type="primary" @click="show = true">分享</van-button>
    </div> -->
    <!-- <van-popup v-model="show" class="rank-share-popup" get-container='#app'>
      <rank-share :childInfo='childInfo' @close='show = false' />
    </van-popup> -->

    <slogan />
  </div>
</template>
<script>
import axios from './../lib/js/api'
import avatar from './../module/avatar'
import numberGrow from './../module/animate/numberGrow'
// import rankShare from './../module/mold/rankShare'
import slogan from './../module/slogan'
import { punchLevel } from './../lib/js/speech'

export default {
  name: 'readstat',
  components: {
    numberGrow,
    avatar,
    slogan,
    // rankShare
  },
  computed: {
    text() {
      return this.currentRate.toFixed(0) + '%'
    },
    dataList(){
      let arr = [{
        name:'借阅量',
        val: this.childInfo.read_count
      },{
        name:'阅读打卡',
        val: this.childInfo.sign_read_count
      },{
        name:'坚持阅读',
        val: this.childInfo.sign_days
      }]

      return arr
    }
  },
  data() {
    return {
      childInfo: '',
      ranking: [],
      fixedHeaderBar: true,
      domHeight: "",
      show: false,
      currentRate:85,
      level:''
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll)
  },
  created() {
    this.fetchData()
  },
  watch: {
    "$router": 'fetchData'
  },
  methods: {
    fetchData() {
      axios.get(`/book/baby/getInfo?child_id=${this.$route.query.id}`).then(res => {
        this.childInfo = res.data.data

        this.level = punchLevel(res.data.data.sign_days).pop() //勋章等级

        let banjiData = {
          params: {
            group: 'baby',
            child_id: this.$route.query.id,
            region: 'banji'
          }
        }

        let schoolData = {
          params: {
            group: 'baby',
            child_id: this.$route.query.id,
            region: 'school'
          }
        }

        axios.get('/book/SchoolTushuBorrow/getRank', banjiData).then(res => {
          this.ranking.push({
            myInfo: res.data.data.myInfo,
            type: 'banji',
            name: '班级',
            rankDiff: this.childInfo.month_banji_rank_diff
          })
        })

        axios.get('/book/SchoolTushuBorrow/getRank', schoolData).then(res => {
          this.ranking.push({
            myInfo: res.data.data.myInfo,
            type: 'school',
            name: '学校',
            rankDiff: this.childInfo.month_school_rank_diff
          })
        })
      })
    },
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
    toAchievement(){
      this.$router.push({
        name: 'achievement-page',
        query: {
          ...this.childInfo,
          back: this.$route.name
        }
      })
    },
    toRanking() {
      this.$router.push({
        name: 'ranking',
        query: {
          id: this.$route.query.id,
          back: this.$route.name
        }
      })
    },
    imgError(e) {
      e.target.src = 'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0'
    }
  }
}
</script>
<style scoped>
.head {
  width: 100%;
  overflow: hidden;
  background: linear-gradient(-135deg, #2196f3, #00bcd4);
}

.avatar img {
  width: 3.75rem /* 60/16 */;
  height: 3.75rem /* 60/16 */;
  border-radius: 50%;
  overflow: hidden;
  border: 0.1875rem /* 3/16 */ solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 0.3125rem /* 5/16 */ 0.9375rem /* 15/16 */ rgba(0, 0, 0, 0.1);
}

.baby-info {
  padding: 45px 0 0;
  color: #fff;
}

.baby-info .content {
  text-align: center;
}

.baby-info .content,
.baby-info .content .avatar {
  margin: auto;
}

.volume {
  display: grid;
  text-align: center;
}

.number {
  font-size: 1.75rem /* 28/16 */;
  font-weight: 500;
}

.name {
  margin-top: 0.625rem /* 10/16 */;
}

.unit {
  line-height: 2.1875rem /* 35/16 */;
  margin-left: 0.3125rem /* 5/16 */;
}

.flex-box {
  flex: 1;
  text-align: center;
}

.flex-box i.iconfont {
  font-size: 1.75rem /* 28/16 */;
  margin-right: 0.625rem /* 10/16 */;
}

.certificate i.iconfont {
  background: linear-gradient(127deg, #ffc107, #ff5722);
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0 0.0625rem /* 1/16 */ 0.3125rem /* 5/16 */
    rgba(255, 87, 34, 0.28);
}

.safflower i.iconfont {
  background: linear-gradient(90deg, #f44336, #ff5722);
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0 0.0625rem /* 1/16 */ 0.3125rem /* 5/16 */
    rgba(255, 87, 34, 0.28);
}

.honor {
  width: 100%;
  height: 3.75rem /* 60/16 */;
  background: #fff;
  box-shadow: 0 0.3125rem /* 5/16 */ 1.875rem /* 30/16 */ rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.container{
  margin-top: -10px;
}

.gutter {
  padding: 0 0.625rem /* 10/16 */;
}

.gap-top {
  margin-top: 3.75rem /* 60/16 */;
}

.gap {
  margin-top: 0.625rem /* 10/16 */;
}

.ranking {
  background: #fff;
}

.ranking .circle {
  flex: 1;
  position: relative;
}

.ranking-content {
  padding: 0.625rem /* 10/16 */ 0 1.875rem /* 30/16 */ 0;
  height: 7.5rem /* 120/16 */;
}

.ranking-content .number {
  width: 6.25rem /* 100/16 */;
  height: 6.25rem /* 100/16 */;
  text-align: center;
  line-height: 6.25rem /* 100/16 */;
  border-radius: 50%;
}

.ranking-content .number b {
  position: relative;
}

.ranking-content .number.banji {
  background: linear-gradient(90deg, #00bcd4, #2196f3);
  color: #2196f3;
}

.ranking-content .number.school {
  background: linear-gradient(90deg, #ff5722, #f44336);
  border-color: #ff5722;
  color: #ff5722;
}

.ranking-content .number.banji,
.ranking-content .number.school {
  position: relative;
}

.ranking-content .number.banji::before,
.ranking-content .number.school::before {
  content: '';
  position: absolute;
  width: 5.75rem /* 92/16 */;
  height: 5.75rem /* 92/16 */;
  border-radius: 50%;
  background: #fff;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
}

.ranking-content .diff,
.ranking-content .name {
  position: absolute;
  bottom: -1.5625rem /* 25/16 */;
}

.ranking-content .name {
  width: 5rem /* 80/16 */;
  height: 1.625rem /* 26/16 */;
  line-height: 1.625rem /* 26/16 */;
  bottom: 0;
  text-align: center;
  background: #fff;
  border: 0.0625rem /* 1/16 */ solid #9e9e9e;
  border-radius: 1.625rem /* 26/16 */;
}

.data,
.rise {
  color: #8bc34a;
}

.drop {
  color: #f44336;
}

.data {
  font-size: 1.25rem /* 20/16 */;
  font-weight: 500;
  margin: 0 0.625rem /* 10/16 */;
}

.rank-share-popup {
  width: 18.75rem /* 300/16 */;
}

.tag {
  margin-left: 0.3125rem /* 5/16 */;
}

.learning{
  padding:0 15px 20px 15px;
  background: #fff;
}

.title{
  height: 48px;
  line-height: 48px;
}

.num{
  font-size: 40px;
  margin: 0 15px;
  color: #2196f3;
}

.learning-circle{
  justify-content: center;
}

.data-list{
  color: #fff;
  padding-bottom: 20px;
}

.data-list .volume{
  flex: 1;
}

.cell-icon i.iconfont{
  font-size: 26px;
  margin-right: 10px;
}

.icon-medal i.iconfont{
  background-image: linear-gradient(127deg, #FFC107 0%, #FF5722 100%);
  -webkit-background-clip: text;
  color: transparent;
}

.icon-ranking i.iconfont{
  background-image: linear-gradient(127deg, #FFEB3B 0%, #FFC107 100%);
  -webkit-background-clip: text;
  color: transparent;
}
</style>
<style>
.learning .van-circle .van-circle__text{
  font-size: 30px;
  font-weight: 700;
  color: #2196f3;
}
</style>
