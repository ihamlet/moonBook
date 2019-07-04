<template>
  <div class="punch-list page-padding">
    <van-nav-bar title="阅读列表" :border='false' fixed />
    <div class="list">
      <van-pull-refresh v-model="loading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
              <div class='content' v-if='list.length'>
                  <van-cell v-for="(item,index) in list" :key="index">
                      <div class="date-title" v-if='timediff(item,index)'>{{item.create_date.split(' ')[0]}}</div>
                      <cardPunch :item='item'/>
                  </van-cell>
              </div>
              <div class="no-list" v-else>
                  尚未打卡 <span class="theme-color" @click="toBabyHome">进入宝贝主页参与阅读打卡</span>
              </div>
          </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import cardPunch from './cardPunch'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'punch-list',
  components: {
    cardPunch  
  },
  computed: {
    ...mapState('openWX',['ready']),
    ...mapGetters(['userDataState']),
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
  updated(){
    this.wxShare()
  },
  watch:{
    ready(){
      this.wxShare()
    }
  },
  methods: {
    ...mapActions('openWX',['share']),
    wxShare(){
      let data = {
        item: this.item,
        success(){
          // console.log('微信分享')
        }
      }

      this.share(data)
    },
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
        this.finished = false
      })
    },
    timediff(item,index){
      if(index == 0){
        return true
      }

      let timeDay = this.list[index-1].create_date.split(' ')[0]

      if(index){
        let timeHistory = timeDay
        let time = item.create_date.split(' ')[0]
        if(timeHistory == time){
          return false
        }else{
          return true
        }
      }
    },
    toBabyHome() {
      this.$router.push({
        name:'baby-home',
        query:{
          id: this.userDataState.child_id
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

.date-title{
  margin-bottom: 20px;
}

.list{
  padding-top: 45px;
}
</style>
