<template>
  <div class="user-card">
    <div class="flex flex-align" ref="userCard" v-if='item.user'>
      <div class="avatar" @click="toZoom">
        <img :src="item.user.avatar" :alt="item.user.username" @error='imgError' v-http2https>
      </div>
      <div class="flex flex-align handle-card">
        <div class="info">
          <div class="name">
            <div class="flex flex-align">
              <span>{{item.user.username}}</span>
              <vip-level v-if='item.card_level' :animate='true' :level='item.card_level.level' />
            </div>
          </div>
          <div class="article-info flex flex-align">   
            <div class="read-num">阅读 {{item.views}}</div>
            <div class="origin">•</div>
            <div class="date">{{getTimeAgo(item.create_time)}}</div>
            <div class="origin" v-if='schoolName || item.school'>•</div>
            <div class="school-info" v-if='schoolName' @click="toSchool">
              <div class="school-title theme-color" v-line-clamp:20="1">{{schoolName}}</div>
            </div>
            <div class="school-info" v-else-if='item.school' @click="toSchool">
              <div class="school-title theme-color" v-line-clamp:20="1">{{item.school.title}}</div>
            </div>       
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
  props: ['item','schoolName'],
  components: {
    vipLevel
  },
  methods: {
    follow(item) {
      if(this.$route.query.type!='preview'){
        item.isSubscribe = !item.isSubscribe
        axios.get(`/book/MemberFollow/subscribe?user_id=${item.user_id}`).then(res => {
          this.$toast.success(res.data.msg)
        })
      }
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
    toSchool(){
      this.$router.push({
        name:'apps-school',
        query:{
          id: this.$route.query.school_id
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

.user-card .avatar,
.user-card .avatar img{
  width: 2.625rem /* 42/16 */;
  height: 2.625rem /* 42/16 */;
}

.user-card .avatar{
  width: 2.625rem /* 42/16 */;
  height: 2.625rem /* 42/16 */;
  margin-right: 0.625rem /* 10/16 */;
}

.user-card .avatar img{
  border-radius: 50%;
  overflow: hidden;
}

.user-card .name {
  color: #303133;
}

.user-card .article-info {
  color: #909399;
  font-size: 0.8125rem /* 13/16 */;
}

.school-info{
  flex: 1;
}

.handle-card {
  flex: 1;
  justify-content: space-between;
}

.info{
  flex: 3;
  margin-right: .625rem /* 10/16 */;
}
</style>
