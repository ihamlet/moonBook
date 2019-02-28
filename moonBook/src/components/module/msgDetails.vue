<template>
  <div class="msg-details">
    <van-nav-bar title="消息详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="container">
      <div class="content">
        <div class="hd flex flex-align">
          <div class="title">{{details.title}}</div>
          <div class="create-date">{{timeAgo(details.create_time)}}</div>
        </div>
        <div class="details">{{details.details}}</div>
      </div>
    </div>
    <slogan/>
  </div>
</template>
<script>
import axios from './../lib/js/api'
import slogan from './slogan'
import { timeago } from './../lib/js/util'

export default {
    name:'msg-details',
    props: ['details'],
    components: {
      slogan
    },
    data () {
      return {

      }
    },
    methods: {
      onClickLeft(){
        this.$emit('close')
      },
      timeAgo(time) {
        return timeago(time * 1000)
      }
    }
}
</script>
<style scoped>
.container{
  padding: .625rem /* 10/16 */;
}

.content{
  background: #fff;
  padding: .625rem /* 10/16 */;
}

.hd{
  justify-content: space-between;
}

.msg-details{
  background: #f2f2f2;
  min-height: 100vh;
}

.title{
  font-size: 1.125rem /* 18/16 */;
  margin-bottom: .3125rem /* 5/16 */;
}

.create-date{
  color: #909399;
}

.details{
  margin-top: 1.25rem /* 20/16 */;
  color: #606266;
  font-size: .9375rem /* 15/16 */;
  line-height: 1.8;
}
</style>
