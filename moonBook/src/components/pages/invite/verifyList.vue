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
                  <img :src="item.avatar" :alt="item.parent_name" v-http2https/>
                </div>
                <div class="name">{{item.parent_name}}</div>
            </div>
            <div class="btn-box"  v-if='!item.is_manager'>
              <div class="btn" v-if='item.parent_id != userDataState.id'>
                <van-button class="theme-btn" size='small' type="primary" round @click="by(item)" plain v-if='item.show_check'>通过</van-button>
                <van-button class="theme-btn" size='small' type="primary" round @click="by(item)" v-if='item.show_remove'>请出</van-button>
              </div>
              <div class="btn" v-else-if='item.is_close == "0"'>
                <van-button class="theme-btn" size='small' type="primary" round @click="out" :plain='item.show_check'>退出</van-button>
              </div>
            </div>
            <div class="type" v-else>群主</div>
            <div class="state" v-if="item.show_wait">请等待审核通过</div>
          </van-cell>

          <div class="no-content" v-if='count == 0'>
            暂无审核... <span class="theme-color" @click="onClickRight"> 邀请家人 </span>
          </div>
        </van-list>
      </div>
      <div class="footer-bar">
       <van-button square class="theme-btn" type="primary" @click="toFind">发现更多</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import family from './../../module/myModule/family'
import { mapGetters,mapActions } from 'vuex'

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
    ...mapActions(['getUserData']),
    onLoad(){
      let data = {
        params:{
          child_id: this.$route.query.id,
          is_delete: 0
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
      switch (true){
        case item.show_check:
          axios.get(`/book/babyParent/check?id=${item.id}`).then(res=>{
            if(res.data.status == 1){
              this.$toast.success('通过审核')
              this.reload()
              this.onLoad()
            }
          })
        break
        case item.show_remove:
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
        break
      }
    },
    out(){
      this.$dialog.alert({
        message: `<div class='text-center'>确定要退出家庭吗</div>`,
        confirmButtonText: '取消',
        cancelButtonText: '确认',
        showCancelButton: true
      }).then(() => {
        done()
      }).catch(() => {
        let data = {
          params:{
            child_id:this.$route.query.id
          }
        }
        axios.get('/book/baby/del',data).then(res => {
          this.getUserData()
          this.$router.go(-1)
        })
      })
    },
    reload () {
     this.isRouterAlive = false
     this.$nextTick(() => (this.isRouterAlive = true))
    },
    toFind(){
      this.$router.push({
        name:'apps-find'
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

.btn{
  margin-left: 10px
}

.footer-bar{
  position: fixed;
  bottom: 0;
  width: 100%;
}

.footer-bar .theme-btn{
  width: 100%;
}
</style>
