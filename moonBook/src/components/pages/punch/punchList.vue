<template>
  <div class="punch-list page-padding">
    <van-nav-bar :title="$route.meta.title" />
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
            <div class='content' v-if='list.length'>
                <van-cell v-for="(item,index) in list" :key="index" >
                    <div class="date-title" v-if='timediff(item,index)'>第{{item.day}}天</div>
                    <cardPunch :item='item'/>
                </van-cell>
            </div>
            <div class="no-list" v-else>
                尚无打卡数据 <span class="theme-color" @click="punch">参与阅读打卡</span>
            </div>
        </van-list>
    </van-pull-refresh>

    <div class="footer-bar">
      <div class="btn">
        <van-button round class="theme-btn" type="primary" size="normal" @click="shareShow = true">分 享</van-button>
      </div>
    </div>

    <van-popup v-model="shareShow" get-container='#app' class="share-popup">
      <div class="share-img">
        <img src="./../../../assets/img/shareWord.png" />
      </div>
    </van-popup>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import cardPunch from './cardPunch'
import { format,timeago } from './../../lib/js/util'
import { mapActions } from 'vuex'

export default {
  name: 'punch-list',
  components: {
    cardPunch  
  },
  computed: {
    item(){
      let data = {
        cate_name:'打卡',
        details:'参与阅读打卡，好的习惯贵在坚持',
        title: '【阅亮书架】阅读打卡'
      }

      return data
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      list: [],
      page: 1,
      shareShow: false
    }
  },
  updated (){
    this.$nextTick(()=>{
      let data = {
        item: this.item,
        success(){
          console.log('微信分享')
        }
      }

      this.share(data)
    })
  },
  methods: {
    ...mapActions('openWX',['share','scanQRcode']),
    onLoad() {
      let data = {
        params: {
          page: this.page,
          child_id: this.$route.query.id
        }
      }

      return axios.get('/book/member/get_read_sign_list', data).then(res => {
        switch (res.data.status) {
          case 1:
            if (this.page == 1) {
              this.list = res.data.data
            } else {
              this.list = this.list.concat(res.data.data)
            }
            this.loading = false
            this.page++

            if (this.list.length >= res.data.count) {
              this.finished = true
            }
            break
          case 0:
            this.page = 1
            this.loading = false
            this.finished = true
            this.list = []
            break
        }
      })
    },
    onRefresh(){
      this.page = 1
      this.onLoad().then(() => {
        this.loading = false
      })
    },
    timediff(item,index){
      if(index == 0){
        return true
      }

      if(index){
        let timeHistory = this.list[index-1].day
        let time = item.day
        if(timeHistory == time){
          return false
        }else{
          return true
        }
      }
    },
    punch() {
      this.scanQRcode({id:this.$route.query.id}).then(res=>{
        switch(res.data.status){
          case 1:
            this.$router.push({
              name:'punch-back',
              query:{
                id: this.$route.query.id,
                child_id: this.$route.query.id,
                back: this.$route.name
              }
            })
          break
          case 0:
            this.$toast(res.data.msg)
          break
        }
      })
    }
  }
}
</script>
<style scoped>
.footer-bar{
  position: fixed;
  bottom: 0;
  width: 100%;
}

.theme-btn{
  width: 100%;
}

.btn{
  padding: .625rem /* 10/16 */;
}
</style>
