<template>
  <div class="week-list">
    <van-nav-bar title="读书榜" />
    <van-tabs color='#409eff' :line-width='20' animated swipeable @change='onChange'>
      <van-tab v-for="(list,index) in tab" :title="list.title" :key="index">
        <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
          <van-cell v-for="(item,itemIndex) in list.list" :key="itemIndex" center>
            <div class="flex flex-align" slot="title">
              <div class="ranking">
                <svg-ranking :ranking="item.rank" />
              </div>
                <div class="avatar" v-if="item.avatar">
                  <img :src="item.avatar" :alt="item.name" />
                </div>
                <avatar :gender="item.sex" v-else />
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

    <div class="punch">
      <van-button @click="punch" class="theme-btn" round size="normal" type="primary">
        <i class="iconfont">&#xe60a;</i>
        阅读打卡
      </van-button>
    </div>

    <div ref='punchFrame' v-show='false'></div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
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
  data() {
    return {
      tab: [{
        title: '读书榜',
        list: [],
      }, {
        title: '借书榜',
        list: []
      }],

      readList:[],
      loading: false,
      finished: false,
    }
  },
  mounted() {
    window.onPunch = (res) => {
      this.onPunch(res)
    }
  },
  methods: {
    onLoad(index) {
      axios.get(`/book/babySign/rank?banji_id=${this.$route.query.id}`).then(res => {
        this.loading = false
        this.tab[0].list = this.tab[0].list.concat(res.data.data)
        if (this.tab[0].list.length >= 10) {
          this.finished = true
        }
      })
    },
    onPunch(res){
      if(res.status == 1){
        this.tab[0].list[0].sign_read_count++
      }else{
        this.$dialog.alert({
          message: `<div class='text-center'>${res.msg}</div>`
        })
      }
    },
    punch(){
      readPunchFrame(this.$refs.punchFrame,this.tab[0].list[0].id)
    },
    onChange(index,title){
      // console.log(index)
      this.onLoad(index)
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

.avatar img{
  width: 3.125rem /* 50/16 */;
  height: 3.125rem /* 50/16 */;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 0.625rem /* 10/16 */;
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

.punch{
  z-index: 2018;
}
</style>
