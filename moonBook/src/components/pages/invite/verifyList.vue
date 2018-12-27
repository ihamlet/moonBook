<template>
  <div class="verify-list">
    <van-nav-bar :title="$route.meta.title" left-text="我的宝贝" right-text="邀请家人" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
    <div class="container">
      <div class="no-content" v-if="list.length == 0">
        暂无审核... <span class="theme-color" @click="onClickRight"> 邀请家人 </span>
      </div>
      <div class="list" v-else>
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
    </div>
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
        name: 'baby-home',
        query:{
          id: this.$route.query.id
        }
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
            if(res.data.status == 1){
              this.$toast.success('通过审核')
              this.onLoad()
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

.no-content{
  width: 100%;
  height: 18.75rem /* 300/16 */;
  text-align: center;
  line-height: 18.75rem /* 300/16 */;
  background: #fff;
  color: #C0C4CC;
}
</style>
