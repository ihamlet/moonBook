<template>
  <div class="read-list">
    <van-cell size='large' center>
      <div class="icon" slot="icon" @click="toRanking">
        <i class="iconfont">&#xe61d;</i>
        <span class="name">{{title}}</span>
      </div>
      <div class="showdown" v-if='count > 0'></div>
      <van-row v-if='count > 0'>
        <div class="ranking-list scroll-x">
          <div class="item flex flex-align fadeInRight animated" :style="{animationDelay:`${200*index}ms`}" v-for='(item,index) in rankList' :key="index">
            <div class="ranking">
              <svg-ranking :ranking="item.rank" type="module" />
            </div>
            <div class="name rank-name" v-if='type == "school"' @click="toBanjiHome(item)">
              {{item[field]}}
            </div>
            <div class="avatar" v-else-if='item[field]' @click="toBabyHome(item)">
              <img :src="item[field]" @error='imgError' v-http2https/>
            </div>
          </div>
        </div>
      </van-row>
      <van-row span="24" class="flex flex-justify" v-else>
        <van-col class="no-ranking">
          <i class="iconfont">&#xeab0;</i> 即将揭晓
        </van-col>
      </van-row>
    </van-cell>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import svgRanking from './../animate/svg/ranking'

export default {
  name: 'read-list',
  props: ['title', 'type', 'field'],
  components: {
    svgRanking
  },
  data() {
    return {
      count: 0,
      rankList: []
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$router': 'fetchData'
  },
  methods: {
    fetchData() {
      if (this.type == 'school') {
        axios.get(`/book/SchoolTushuBorrow/getRank?school_id=${this.$route.query.id}&group=banji&region=school`).then(res => {
          if(res.data.status == 1){
            let data = []
            let array = res.data.data.list
            array.forEach(element => {
              let obj = {
                name: element.babyInfo.name,
                rank: element.rank,
                banji_id: element.banji_id
              }
              data.push(obj)
            })
            this.count = data.length
            this.rankList = data
          }
        })
      } else {
        axios.get(`/book/babySign/rank?banji_id=${this.$route.query.id}&time=week`).then(res => {
          if(res.data.status == 1){
            this.count = res.data.count
            let array = res.data.data
            let data = [] 
            array.forEach(e => {
              if(!(e instanceof Array)){
                  data.push(e)
              }
            })
            this.rankList = data
          }
        })
      }
    },
    toBanjiHome(item) {
      this.$router.push({
        name: 'class-home',
        query: {
          id: item.banji_id,
          back: this.$route.name,
          school_id: this.$route.query.id
        }
      })
    },
    toBabyHome(item) {
      this.$router.push({
        name: 'baby-home',
        query: {
          id: item.id,
          back: this.$route.name,
          banji_id: this.$route.query.id
        }
      })
    },
    toRanking() {
      this.$router.push({
        name: 'ranking',
        query: {
          back: this.$route.name,
          id: this.$route.query.id
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
.icon {
  text-align: center;
  display: grid;
  padding-right: .625rem /* 10/16 */;
  position: relative;
  z-index: 2;
}

.showdown{
  position: absolute;
  content: '';
  width: 10px;
  height: 50px;
  box-shadow: 0 0 15px rgb(0, 0, 0, .1);
  left: -10px;
  top: 50%;
  z-index: 1;
  transform: translate3d(0, -50%, 0);
}

.icon .iconfont {
  font-size: 1.75rem /* 28/16 */;
}

.icon .iconfont{
  background: linear-gradient(127deg, #ffeb3b, #ff9800);
  -webkit-background-clip: text;
  color: transparent;
}


.icon .name {
  font-size: 0.75rem /* 12/16 */;
}

.avatar,
.avatar img {
  width: 2.25rem /* 36/16 */;
  height: 2.25rem /* 36/16 */;
  border-radius: 50%;
  object-fit: cover;
}

.no-ranking {
  opacity: 0.7;
}

.no-ranking .iconfont {
  font-size: 1.5rem /* 24/16 */;
  margin-right: 0.625rem /* 10/16 */;
  background: linear-gradient(127deg, #ffeb3b, #ffc107);
  -webkit-background-clip: text;
  color: transparent;
}

.ranking-list {
  padding-left: .3125rem /* 5/16 */;
}

.ranking-list .item{
  margin-right: .625rem /* 10/16 */;
  white-space: nowrap 
}

.rank-name{
  color: #909399;
}
</style>
