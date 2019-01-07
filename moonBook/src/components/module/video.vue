<template>
  <div class="video">
    <van-cell title-class='cell-title' :title="title">
      <div class="icon" slot="icon">
        <i class="iconfont">&#xe68a;</i>
      </div>
    </van-cell>
    <div class="scroll-x">
      <div class="video-list flex">
        <div class="video-item scroll-item" v-for='(item,index) in videoList' :key="index" @click="toVideoPage(item)">
          <div class="video">
            <div class="video-cover">
              <img :src="item.cover" :alt="`视频封面-${index}`">
            </div>
            <div class="video-info">
              <div class="info flex flex-align" v-if='type=="video"'>
                <div class="play-num">{{item.views}}次播放</div>
                <div class="time">{{timeAago(item.create_time)}}</div>
              </div>
              <div class="user-info flex flex-align" v-if='type=="home"'>
                <div class="user-data flex flex-align">
                  <div class="avatar">
                    <img :src="item.avatar" />
                  </div>
                  <div class="name">
                    {{item.nickname}}
                  </div>
                </div>
                <div class="views">
                  {{item.views}}次播放
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from './../lib/js/api'
import { timeago } from './../lib/js/util'

export default {
  name: 'Video',
  props: ['title', 'type'],
  data() {
    return {
      videoList: []
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
      if (this.$route.query.user_id) {
        axios.get(`/book/SchoolArticle/getList?sort=post&user_id=${this.$route.query.user_id}`).then(res => {
          let arr = []
          if (res.data.status == 1) {
            let array = res.data.data
            array.forEach(element => {
              if (element.hasvideo == 1)
                arr.push(element)
            })
          }
          this.videoList = arr
        })
      } else {
        axios.get(`/book/index/home_v2`).then(res => {
          this.videoList = res.data.homeData.videoList
        })
      }
    },
    toVideoPage(item) {
      let data = {}

      if (this.$route.query.user_id) {
        data = {
          id: item.post_id,
          user_id: this.$route.query.user_id,
          back: this.$route.name,
        }
      } else {
        data = {
          id: item.id,
          user_id: item.user_id,
          back: this.$route.name,
        }
      }

      this.$router.push({
        name: 'video-page',
        query: data
      })

      this.$emit('refresh')
    },
    timeAago(time) {
      return timeago(time * 1000)
    }
  }
}
</script>
<style scoped>
.video-list {
  margin-left: 0.9375rem /* 15/16 */;
}

.video-item {
  margin-right: 0.625rem /* 10/16 */;
  position: relative;
}

.video-cover {
  width: 12.5rem /* 200/16 */;
  height: 7.03125rem /* 112.5/16 */;
  overflow: hidden;
  border-radius: 0.3125rem /* 5/16 */;
  margin-bottom: 0.3125rem /* 5/16 */;
}

.video-info .info {
  justify-content: space-between;
}

.icon .iconfont {
  font-size: 1.5rem /* 24/16 */;
  background: linear-gradient(127deg, #ff9800, #ff00af);
  -webkit-background-clip: text;
  color: transparent;
}

.icon {
  margin-right: 0.625rem /* 10/16 */;
}

.avatar {
  width: 2rem /* 32/16 */;
  height: 2rem /* 32/16 */;
  margin-right: 0.3125rem /* 5/16 */;
}

.avatar img {
  border-radius: 50%;
}

.user-info{
  justify-content: space-between;
  font-size: .8125rem /* 13/16 */;
}
</style>
<style>
.video .van-cell__title.cell-title {
  font-weight: 500;
}
</style>

