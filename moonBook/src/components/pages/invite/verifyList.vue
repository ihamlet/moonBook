<template>
  <div class="verify-list">
    <div class="container">
      <div class="theme-background">
        <family :key="$route.query.id" v-if="isRouterAlive"/>
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
              <div class="btn-box"  v-if='!item.is_manager'>
                <div class="btn">
                  <van-button class="theme-btn" size='small' type="primary" round @click="by(item)" :plain='!item.show_check'>{{item.show_check?'通过':'请出'}}</van-button>
                </div>
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
import { mapGetters } from 'vuex'

export default {
  name: 'verifyList',
  components: {
    family
  },
  computed: {
    ...mapGetters(['userDataState'])
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      count:0,
      isRouterAlive: true
    }
  },
  methods: {
    onLoad(){
      let data = {
        params:{
          child_id: this.$route.query.id
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
      if(item.show_check){
        axios.get(`/book/babyParent/check?id=${item.id}`).then(res=>{
            if(res.data.status == 1){
              this.$toast.success('通过审核')
              this.reload()
              this.onLoad()
            }
        })
      }else{
        let data = {
          params:{
            child_id: this.$route.query.id,
            parent_id: item.parent_id
          }
        }

        axios.get('/book/baby/remove_parent',data).then(res=>{
          switch (res.data.status) {
            case 1:
              this.$toast(res.data.msg)
              this.reload()
              this.onLoad()
            break
          }
        })
      }

    },
    reload () {
     this.isRouterAlive = false
     this.$nextTick(() => (this.isRouterAlive = true))
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

.btn{
  margin-left: 10px
}
</style>
