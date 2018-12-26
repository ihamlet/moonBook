<template>
  <div class="read-list">
    <van-cell size='large' is-link center>
      <div class="icon" slot="icon">
        <i class="iconfont">&#xe61d;</i>
        <span class="name">周阅读榜</span>
      </div>
      <van-row>
        <van-col span="8" v-for='(item,index) in rankList' :key="index" v-if='index < 3'>
          <div class="flex flex-align flex-justify">
            <div class="ranking">
              <svg-ranking :ranking="item.rank" type="class-module"/>
            </div>
            <div class="avatar">
              <img :src="item.avatar" />
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
      axios.get(`/book/babySign/rank?banji_id=${this.$route.query.id}&time=week`).then(res => {
        this.rankList = res.data.data
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

.icon .iconfont {
  font-size: 1.75rem /* 28/16 */;
  background: linear-gradient(127deg, #ffeb3b, #ff9800);
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
</style>
