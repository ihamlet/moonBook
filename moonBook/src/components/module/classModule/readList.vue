<template>
  <div class="read-list">
    <van-cell size='large' is-link center>
      <div class="icon" slot="icon">
        <i class="iconfont" :class="`icon-${type}`" v-if='type == "school"'>&#xe64e;</i>
        <i class="iconfont" :class="`icon-${type}`" v-if='type == "banji"'>&#xe61d;</i>
        <span class="name">{{title}}</span>
      </div>
      <van-row>
        <van-col class="no-ranking flex flex-justify" span="24" v-if='rankList.length == 0'>
           <i class="iconfont">&#xeab0;</i> 即将揭晓
        </van-col>
        <van-col span="8" v-for='(item,index) in rankList' :key="index" v-else-if='index < 3'>
          <div class="flex flex-align flex-justify">
            <div class="ranking">
              <svg-ranking :ranking="item.rank" type="module"/>
            </div>
            <div class="avatar">
              <img :src="item[field]" />
            </div>
          </div>
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
  props: ['title','type','field'],
  components: {
    svgRanking
  },
  data() {
    return {
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
      axios.get('/book/SchoolTushuBorrow/getRank?region=banji&group=baby').then(res => {
        this.rankList = res.data.data.list
      })
    }
  }
}
</script>
<style scoped>
.icon {
  text-align: center;
  display: grid;
}

.icon .iconfont{
  font-size: 1.75rem /* 28/16 */;
}

.icon .iconfont.icon-banji{
  background: linear-gradient(127deg, #ffeb3b, #ff9800);
  -webkit-background-clip: text;
  color: transparent;
}

.icon .iconfont.icon-school{
  background: linear-gradient(127deg, #FF5722, #F44336);
  -webkit-background-clip: text;
  color: transparent;
}

.icon .name {
  font-size: .75rem /* 12/16 */;
}

.avatar img {
  width: 2.25rem /* 36/16 */;
  height: 2.25rem /* 36/16 */;
  border-radius: 50%;
}

.no-ranking{
  opacity: .7;
}

.no-ranking .iconfont{
  font-size: 1.5rem /* 24/16 */;
  margin-right: .625rem /* 10/16 */;
  background: linear-gradient(127deg, #FFEB3B, #FFC107);
  -webkit-background-clip: text;
  color: transparent;
}
</style>
