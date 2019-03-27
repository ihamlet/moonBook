<template>
  <div class="punch-list">
    <van-nav-bar :title="$route.meta.title" />
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
            <div class='content' v-if='list.length'>
                <van-cell v-for="(item,index) in list" :key="index" >
                    <div class="date" v-if='timediff(item,index)'>{{getTimeAgo(item.create_time)}}</div>
                    <cardPunch :item='item'/>
                </van-cell>
            </div>
            <div class="no-list" v-else>
                尚无打卡数据
            </div>
        </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import cardPunch from './cardPunch'
import { format,timeago } from './../../lib/js/util'

export default {
  name: 'punch-list',
  components: {
    cardPunch  
  },
  data() {
    return {
      loading: false,
      finished: false,
      list: [],
      page: 1
    }
  },
  methods: {
    onLoad() {
      let data = {
        params: {
          page: this.page,
          child_id: this.$route.query.id
        }
      }

      return axios.get('/book/member/get_read_sign_list', data).then(res => {
          console.log(res)
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
    getTimeAgo(time){
      return timeago(time*1000)
    },
    timediff(item,index){
      if(index == 0){
        return true
      }

      if(index){
        let timeHistory = timeago(this.list[index-1].create_time * 1000)
        let time = timeago(item.create_time*1000)
        if(timeHistory == time){
          return false
        }else{
          return true
        }
      }

    }
  }
}
</script>
<style scoped>
</style>
