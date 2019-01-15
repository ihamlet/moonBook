<template>
  <div class="readstat">
    <van-nav-bar class="theme-nav" :title="$route.meta.title" fixed left-text="返回" @click-left="onClickLeft">
      <div class="head-bar-text" slot="left">
        <van-icon name="arrow-left" />
        <span class="text">{{$route.query.back?'返回':'我的'}}</span>
      </div>
    </van-nav-bar>
    <div class="head">
      <div class="baby-info flex flex-align" @click="toPageBabyHome(list)">
        <div class="volume flex flex-justify">
          阅读量
          <div class="flex">
            <div class="number">{{childInfo.read_count}}</div>
            <div class="unit">本</div>
          </div>
        </div>
        <div class="content">
          <div class="avatar" v-if="childInfo.avatar" :class="childInfo.sex">
            <img :src="childInfo.avatar" alt="宝贝头像">
          </div>
          <avatar :gender="childInfo.sex" v-else />
          <div class="name">
            {{childInfo.name}}
            <van-tag color="#FFC107" round type="danger">{{childInfo.read_level}}级</van-tag>
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
      <lazy-component class="gutter">
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
      </lazy-component>
      <lazy-component class="gutter gap">
        <van-nav-bar title="阅读排名" right-text="排行榜" @click-right="toRanking" />
        <div class="ranking">
          <div class="ranking-content flex flex-align">
            <div class="circle flex flex-justify" v-for='(list,index) in ranking' :key="index">
              <div class="number" :class="list.type">{{list.myInfo.rank}}</div>
              <div class="name">{{list.name}}</div>
              <div class="diff">
                {{list.rankDiff}}名
                <i class="iconfont rise" v-if='list.rankDiff>0'>&#xe63e;</i>
                <i class="iconfont drop" v-else>&#xe64f;</i>
              </div>
            </div>
          </div>
        </div>
      </lazy-component>
      <lazy-component class="gutter gap">
        <van-cell title="单元格" value="内容" />
      </lazy-component>
    </div>
  </div>
</template>
<script>
import axios from './../lib/js/api'
import babyHome from './../module/myModule/babyHome'
import avatar from './../module/avatar'
import numberGrow from './../module/animate/numberGrow'

export default {
  name: 'readstat',
  components: {
    babyHome,
    numberGrow,
    avatar
  },
  data() {
    return {
      childInfo: '',
      ranking: []
    }
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

        console.log(res.data.data)

        axios.get(`/book/SchoolTushuBorrow/getRank?group=baby&region=banji&banji_id=${res.data.data.banji_id}`).then(res => {
          this.ranking.push({
            myInfo: res.data.data.myInfo,
            type: 'banji',
            name: '班级',
            rankDiff: this.childInfo.month_banji_rank_diff
          })
        })

        axios.get(`/book/SchoolTushuBorrow/getRank?group=baby&region=school&banji_id=${res.data.data.banji_id}`).then(res => {
          this.ranking.push({
            myInfo: res.data.data.myInfo,
            type: 'school',
            name: '学校',
            rankDiff: this.childInfo.month_school_rank_diff
          })
        })
      })
    },
    onClickLeft() {
      if (this.$route.query.back) {
        this.$router.push({
          name: this.$route.query.back,
          query: {
            id: this.$route.query.id
          }
        })
      } else {
        this.$router.push({
          name: 'my'
        })
      }
    },
    toRanking() {
      this.$router.push({
        name: 'ranking',
        query: {
          id: this.$route.query.id,
          back: this.$route.name
        }
      })
    }
  }
}
</script>
<style scoped>
.head {
  width: 100%;
  overflow: hidden;
  background: linear-gradient(-135deg, #2196f3, #03a9f4);
}

.avatar {
  width: 3.75rem /* 60/16 */;
  height: 3.75rem /* 60/16 */;
  border-radius: 50%;
  overflow: hidden;
  border: 0.1875rem /* 3/16 */ solid #fff;
  box-shadow: 0 0.3125rem /* 5/16 */ 0.9375rem /* 15/16 */ rgba(0, 0, 0, 0.1);
}

.baby-info {
  padding: 3.75rem /* 60/16 */ 1.875rem /* 30/16 */;
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
  height: 4.375rem /* 70/16 */;
  background: #fff;
  box-shadow: 0 0.3125rem /* 5/16 */ 1.875rem /* 30/16 */ rgba(0, 0, 0, 0.1);
  border-radius: 0.625rem /* 10/16 */;
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
  padding: 0 1.25rem /* 20/16 */ 1.875rem /* 30/16 */ 0;
  height: 7.5rem /* 120/16 */;
}

.ranking-content .number {
  border: 0.3125rem /* 5/16 */ solid #000;
  width: 5rem /* 80/16 */;
  height: 5rem /* 80/16 */;
  text-align: center;
  line-height: 5rem /* 80/16 */;
  border-radius: 50%;
}

.ranking-content .number.banji {
  border-color: #2196f3;
  color: #2196f3;
}

.ranking-content .number.school {
  border-color: #ff5722;
  color: #ff5722;
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

.rise{
  color: #8BC34A;
}

.drop{
  color: #F44336;
}
</style>
