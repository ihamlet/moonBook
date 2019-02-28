<template>
  <div class="week-list">
    <van-nav-bar title="读书榜" />
    <van-tabs color='#409eff' :line-width='20' :line-height='4' animated swipeable @change='onChange'>
      <van-tab v-for="(list,index) in tab" :title="list.title" :key="index">
        <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
          <van-cell v-for="(item,itemIndex) in list.content" :key="itemIndex" center title-class='cell-title'>
            <div class="item flex flex-align" slot="title">
              <div class="ranking">
                <svg-ranking :ranking="item.rank" />
              </div>
              <div class="avatar" v-if="item.avatar">
                <img :src="item.avatar" :alt="item.name" />
              </div>
              <avatar class="avatar" :gender="item.sex" v-else />
              <div class="name">
                <span v-line-clamp:20="1">{{item.name}}</span>
                <span class="topic">{{item.title}}</span>
              </div>
            </div>

            <div class="sign-read">
              <span class="numb">{{item.sign_read_count}}</span>
              <span>本</span>
            </div>
          </van-cell>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { mapGetters } from 'vuex'
import { readPunchFrame } from './../../lib/js/util'
import svgRanking from './../animate/svg/ranking'
import reading from './../reading'
import avatar from './../avatar'

export default {
  name: 'week-list',
  components: {
    svgRanking,
    reading,
    avatar
  },
  computed: {
    ...mapGetters(['userDataState'])
  },
  data() {
    return {
      readList: [],
      borrowList: [],
      loading: false,
      finished: false,
      tab: [{
        title: '阅读榜',
        content: []
      }, {
        title: '借阅榜',
        content: []
      }],
      tabIndex: 0
    }
  },
  methods: {
    onChange(index) {
      this.tabIndex = index
      this.onLoad()
    },
    onLoad() {
      if (this.tabIndex == 0) {
        this.getReadList()
      }
      if (this.tabIndex == 1) {
        this.getBorrowList()
      }
    },
    getReadList() {
      axios.get(`/book/babySign/rank?banji_id=${this.$route.query.id}`).then(res => {
        if(res.data.status == 1){
          this.loading = false
          this.tab[this.tabIndex].content = res.data.data
          this.finished = true
        }
      })
    },
    getBorrowList() {
      axios.get('/book/SchoolTushuBorrow/getRank?region=banji&group=baby').then(res => {
        if(res.data.status == 1){
          let myArr = [res.data.data.myInfo]
          let list = myArr.concat(res.data.data.list)
          list.forEach((item) => {
            let info = item.info || item.babyInfo
            item.name = info.name
            item.avatar = info.avatar
            item.title = item.read_count > 50 ? '阅读小明星' : '阅读新秀',
              item.sign_read_count = item.read_count || 0
          })

          this.tab[this.tabIndex].content = list
        }
      })
    }
  }
}
</script>
<style scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.week-list {
  overflow: hidden;
  padding-bottom: 1.875rem /* 30/16 */;
}

.list {
  padding: 0.3125rem /* 5/16 */ 0.625rem /* 10/16 */;
}

.avatar {
  width: 3.125rem /* 50/16 */;
  height: 3.125rem /* 50/16 */;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 0.625rem /* 10/16 */;
}

.avatar img {
  width: 3.125rem /* 50/16 */;
  height: 3.125rem /* 50/16 */;
  border-radius: 50%;
  overflow: hidden;
}

.name {
  font-size: 1.125rem /* 18/16 */;
  display: grid;
}

.my-baby-tag {
  position: absolute;
  left: 3.75rem /* 60/16 */;
  bottom: 0.3125rem /* 5/16 */;
}

.topic {
  font-size: 0.8125rem /* 13/16 */;
  color: #909399;
}

.tab-card {
  margin-top: 0.625rem /* 10/16 */;
}

.tab-sticky.van-tabs .van-tabs__wrap {
  z-index: 100;
}

.sign-read .numb {
  font-size: 1.125rem /* 18/16 */;
  font-weight: 500;
}
</style>
<style>
.week-list .van-cell__title.cell-title {
  flex: 2;
}
</style>
