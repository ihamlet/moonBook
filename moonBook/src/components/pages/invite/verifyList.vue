<template>
  <div class="verify-list">
    <van-nav-bar :title="$route.meta.title" left-text="我的" right-text="邀请成员" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
    <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
      <van-cell v-for="(item,index) in list" :key="index" center>
          <div class="title flex flex-align" slot="title">
              <div class="avatar">
                <img :src="item.avatar" :alt="item.parent_name" />
              </div>
              <div class="name">{{item.parent_name}}</div>
          </div>
          <div class="btn">
              <van-button class="theme-btn" size='small' type="primary" @click="by(item)">通过</van-button>
          </div>
      </van-cell>
    </van-list>
  </div>
</template>
<script>
import axios from './../../lib/js/api'

export default {
  name: 'verifyList',
  data() {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    onLoad() {
      axios.get(`/book/babyParent/getList?child_id=${this.$route.query.id}&is_close=1`).then(res => {
        this.list = res.data.data
        this.loading = false
        if (this.list.length >= res.data.count) {
          this.finished = true
        }
      })
    },
    onClickLeft() {
      this.$router.push({
        name: 'my'
      })
    },
    onClickRight() {
        this.$router.push({
            name:'add-family',
            query:{
                id:this.$route.query.id
            }
        })
    },
    by(item){
        axios.get(`/book/babyParent/check?id=${item.id}`).then(res=>{
            if(res.data.status == 0){
                this.$toast.success('通过审核')
            }
            
        })
    }
  }
}
</script>
<style scoped>
.title .avatar img{
    width: 2.625rem /* 42/16 */;
    height: 2.625rem /* 42/16 */;
    overflow: hidden;
    border-radius: 50%;
}

.title .avatar{
    margin-right: .625rem /* 10/16 */;
}
</style>
