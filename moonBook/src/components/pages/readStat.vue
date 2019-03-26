<template>
  <div class="readstat page-padding">
    <van-nav-bar :zIndex='99' :class="fixedHeaderBar?'theme-nav':''" :title="fixedHeaderBar?$route.meta.title:childInfo.name" fixed @click-right="show = true">
      <!-- <div class="head-bar-text" slot="left">
        <van-icon name="arrow-left" />
        <span class="text">{{$route.query.back?'返回':'我的'}}</span>
      </div> -->
      <div class="head-bar-icon" slot="right">
        <i class="iconfont">&#xe635;</i>
      </div>
    </van-nav-bar>
    <div class="head" ref="head">
      <div class="baby-info flex flex-align" @click="toPageBabyHome(list)">
        <div class="volume flex flex-justify">
          阅读量
          <div class="flex">
            <div class="number">{{childInfo.read_count}}</div>
            <div class="unit">本</div>
          </div>
        </div>
        <div class="content">
          <div class="avatar" v-if="childInfo.avatar">
            <img :src="childInfo.avatar" alt="宝贝头像"  @error="imgError">
          </div>
          <avatar :gender="childInfo.sex" size='small' v-else />
          <div class="name flex flex-align">
            {{childInfo.name}}
            <van-tag class="tag" color="#FFC107" round type="danger" size='medium'>{{childInfo.read_level}}级</van-tag>
          </div>
        </div>
        <div class="volume flex flex-justify">
          坚持阅读
          <div class="flex">
            <div class="number">{{childInfo.insist_days}}</div>
            <div class="unit">天</div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="gutter">
        <div class="honor flex flex-align">
          <div class="flex-box certificate flex flex-align flex-justify">
            <i class="iconfont">&#xe63c;</i>
            <span>奖状:{{childInfo.donation_count}}</span>
          </div>
          <div class="flex-box safflower flex flex-align flex-justify">
            <i class="iconfont">&#xe64a;</i>
            <span>红花:{{childInfo.flower_count}}</span>
          </div>
        </div>
      </div>
      <div class="gutter gap">
        <van-nav-bar title="阅读排名" right-text="排行榜" @click-right="toRanking" />
        <div class="ranking">
          <div class="ranking-content flex flex-align">
            <div class="circle flex flex-justify" v-for='(list,index) in ranking' :key="index">
              <div class="number" :class="list.type"><b>{{list.myInfo.rank}}</b></div>
              <div class="name">{{list.name}}</div>
              <div class="diff">
                {{list.rankDiff}}名
                <i class="iconfont rise" v-if='list.rankDiff > 0'>&#xe63e;</i>
                <i class="iconfont drop" v-else>&#xe64f;</i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="gutter gap">
        <van-cell-group>
          <van-cell size='large'>
            <div class="text flex flex-justify">本月比上月阅读<span class="data">增长了24本</span></div>
          </van-cell>
          <van-cell size='large'>
            <div class="text flex flex-justify">
              <div class="content l">本月上传内容<span class="data">{{childInfo.month_post_count}}篇</span></div>
              <div class="content r"><span class="data">{{childInfo.zan_count}}人</span>点赞</div>
            </div>
          </van-cell>
          <van-cell size='large'>
            <div class="text flex flex-justify">影响<span class="data">{{childInfo.fluent_count}}人</span> 阅读了<span class="data">{{childInfo.fluent_read_count}} 本</span>图书</div>
          </van-cell>
        </van-cell-group>
      </div>
    </div>

    <div class="gutter gap">
      <van-button class="theme-btn" round size="large" type="primary" @click="show = true">分享</van-button>
    </div>
    
    <van-popup v-model="show" class="rank-share-popup" get-container='#app'>
      <rank-share :childInfo='childInfo' @close='show = false'/>
    </van-popup>

    <slogan />
  </div>
</template>
<script>
import axios from './../lib/js/api'
import babyHome from './../module/myModule/babyHome'
import avatar from './../module/avatar'
import numberGrow from './../module/animate/numberGrow'
import rankShare from './../module/mold/rankShare'
import slogan from './../module/slogan'

export default {
  name: 'readstat',
  components: {
    babyHome,
    numberGrow,
    avatar,
    slogan,
    rankShare
  },
  data() {
    return {
      childInfo: '',
      ranking: [],
      fixedHeaderBar: true,
      domHeight: "",
      show: false
    }
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
    // onClickLeft() {
    //   if (this.$route.query.back) {
    //     this.$router.push({
    //       name: this.$route.query.back,
    //       query: {
    //         id: this.$route.query.id
    //       }
    //     })
    //   } else {
    //     this.$router.push({
    //       name: 'my'
    //     })
    //   }
    // },
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

.avatar img{
  width: 3.75rem /* 60/16 */;
  height: 3.75rem /* 60/16 */;
  border-radius: 50%;
  overflow: hidden;
  border: 0.1875rem /* 3/16 */ solid #fff;
  box-shadow: 0 0.3125rem /* 5/16 */ 0.9375rem /* 15/16 */ rgba(0, 0, 0, 0.1);
}

.baby-info {
  padding: 4.0625rem /* 65/16 */ 1.875rem /* 30/16 */;
  color: #fff;
  justify-content: space-between;
}

.baby-info .content {
  text-align: center;
  position: absolute;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
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
}

.container {
  margin-top: -1.875rem /* 30/16 */;
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

.rank-share-popup{
  width: 18.75rem /* 300/16 */;
}

.tag{
  margin-left: .3125rem /* 5/16 */;
}
</style>
