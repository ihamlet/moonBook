<template>
  <div class="video" v-if="videoList.length > 0">
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
              <div>
                <img :src="item.cover" :alt="`视频封面-${index}`">
              </div>
              
              <div class="playing flex flex-align" v-if='item.post_id == $route.query.id'>
                <i class="iconfont">&#xe639;</i>
                <span class="text">正在播放</span>
              </div>
            </div>
            <div class="video-info">
              <div class="user-info flex flex-align">
                <div class="user-data flex flex-align">
                  <div class="avatar">
                    <img :src="getAvatar(item.user.avatar)" />
                  </div>
                  <div class="name">
                    {{item.user.name}}
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
      let data = {}
      if (this.$route.query.user_id) {
        data = {
          params: {
            portal_name: '首页',
            sort: 'post',
            user_id: this.$route.query.user_id,
            hasvideo: 1
          }
        }
      } else {
        data = {
          params: {
            portal_name: '首页',
            sort: 'tuijian',
            hasvideo: 1
          }
        }
      }

      axios.get('/book/SchoolArticle/getList?sort=post', data).then(res => {
        this.videoList = res.data.data
      })

    },
    toVideoPage(item) {
      console.log(item)
      let data = {}

      if (this.$route.query.user_id) {
        data = {
          id: item.post_id,
          user_id: this.$route.query.user_id,
          back: this.$route.name,
        }
      } else {
        data = {
          id: item.post_id,
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
    getAvatar(img) {
      if(!img) return img
      let pos = img.indexOf('http://')
      let result
      if (pos === 0) {
        result = img.replace('http:', 'https:')
      } else {
        result = img
      }
      return result
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
  position: relative;
  background-color: #eee;
}

.playing{
  position: absolute;
  left: .3125rem /* 5/16 */;
  bottom: .3125rem /* 5/16 */;
  color: #fff;
}

.playing .text{
  font-size: .8125rem /* 13/16 */;
  margin-left: .3125rem /* 5/16 */;
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

.avatar img{
  width: 2rem /* 32/16 */;
  height: 2rem /* 32/16 */;
  margin-right: 0.3125rem /* 5/16 */;
}
.avatar img {
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
}

.user-info {
  justify-content: space-between;
  font-size: 0.8125rem /* 13/16 */;
}
</style>
<style>
.video .van-cell__title.cell-title {
  font-weight: 500;
}
</style>

