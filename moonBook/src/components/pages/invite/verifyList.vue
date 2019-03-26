<template>
  <div class="verify-list">
    <van-nav-bar :title="$route.meta.title"/>
    <div class="container">
      <div class="theme-background">
        <family />
      </div>
      <div class="list">
        <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
          <van-cell v-for="(item,index) in list" :key="index" center>
              <div class="title flex flex-align" slot="title">
                  <div class="avatar">
                    <img :src="item.avatar" :alt="item.parent_name" />
                  </div>
                  <div class="name">{{item.parent_name}}</div>
              </div>
              <div class="btn">
                  <van-button class="theme-btn" size='small' type="primary" round @click="by(item)">通过</van-button>
              </div>
          </van-cell>

          <div class="no-content" v-if='count == 0'>
            暂无审核... <span class="theme-color" @click="onClickRight"> 邀请家人 </span>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import family from './../../module/myModule/family'

export default {
  name: 'verifyList',
  components: {
    family
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      count:0
    }
  },
  methods: {
    onLoad(){
      let data = {
        params:{
          child_id: this.$route.query.id,
          is_close: 1
        }
      }

      axios.get('/book/babyParent/getList',data).then(res => {
        this.count = res.data.count
        this.list = res.data.data
        this.loading = false
        if (this.list.length >= res.data.count) {
          this.finished = true
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
