<template>
  <div class="punch-list">
    <van-nav-bar :title="$route.meta.title" />
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
        <van-cell v-for="(item,index) in list" :key="index" />
            <cardPunch :item='item'/>
        </van-list> 
    </van-pull-refresh>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import cardPunch from './cardPunch'

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
    }
  }
}
</script>
<style scoped>
</style>
