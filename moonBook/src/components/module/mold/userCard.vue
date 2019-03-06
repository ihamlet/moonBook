<template>
  <div class="user-card">
    <div class="flex flex-align" ref="userCard" v-if='item.user'>
      <div class="avatar" @click="toZoom">
        <img :src="getAvatar(item.user.avatar)" :alt="item.user.username" @error='imgError'>
      </div>
      <div class="flex flex-align handle-card">
        <div class="info">
          <div class="name">
            <div class="flex flex-align">
              <span>{{item.user.username}}</span>
              <vip-level v-if='item.card_level' :animate='true' :level='item.card_level.level' />
            </div>
          </div>
          <div class="date">
            <span>{{getTimeAgo(item.create_time)}}</span>
          </div>
        </div>
        <div class="follow-btn" v-if='item.isSubscribe!=3'>
          <van-button size="small" class="theme-btn" :plain='item.isSubscribe?true:false' type="primary" round @click="follow(item)">{{item.isSubscribe?'已关注':'关注'}}</van-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import vipLevel from './../animate/svg/vipLevel'
import { timeago } from './../../lib/js/util'

export default {
  name: 'userCard',
  props: ['item'],
  components: {
    vipLevel
  },
  methods: {
    follow(item) {
      item.isSubscribe = !item.isSubscribe
      axios.get(`/book/MemberFollow/subscribe?user_id=${item.user_id}`).then(res => {
        this.$toast.success(res.data.msg)
      })
    },
    getAvatar(img) {
      let pos = img.indexOf('http://')
      let result
      if (pos === 0) {
        result = img.replace('http:', 'https:')
      } else {
        result = img
      }
      return result
    },
    imgError(e) {
      e.target.src = 'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0'
    },
    toZoom() {
      this.$router.push({
        name: 'zoom',
        query: {
          id: this.item.user_id,
          back: this.$route.name,
          back_id: this.$route.query.id
        }
      })
    },
    getTimeAgo(time) {
      return timeago(time * 1000)
    }
  }
}
</script>
<style scoped>
.user-card {
  padding: 0.625rem /* 10/16 */ 0;
  background: #fff;
  border-bottom: 0.0625rem /* 1/16 */ dashed #ebeef5;
}

.user-card .avatar {
  width: 2.625rem /* 42/16 */;
  height: 2.625rem /* 42/16 */;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 0.625rem /* 10/16 */;
}

.user-card .name {
  color: #303133;
}

.user-card .date {
  margin-top: 0.3125rem /* 5/16 */;
  color: #909399;
  font-size: 0.8125rem /* 13/16 */;
}

.handle-card {
  flex: 1;
  justify-content: space-between;
}
</style>
