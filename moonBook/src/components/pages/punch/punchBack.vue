<template>
  <div class="punch-list">
    <van-nav-bar :title="$route.meta.title" :border='false' />
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <div class="date">{{day}}</div>
      <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
        <van-cell v-for="(item,index) in list" :key="index">
            {{item}}
        </van-cell>
      </van-list>
      <!-- <div class="footer-bar flex">
        <div class="btn-box">
          <van-button class="btn theme-btn" type="primary" round size="normal" @click="comeBack">完成</van-button>
        </div>
        <div class="btn-box">
          <van-button class="btn theme-borrowing-btn" round type="primary" size="normal" @click="punch">继续打卡</van-button>
        </div>
      </div>
      <div class="booth">
        <div class="ad-mould">
          广告位
        </div>
      </div> -->
    </van-pull-refresh>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { mapActions } from 'vuex'
import { format } from './../../lib/js/util'

export default {
  name: 'punchBack',
  data() {
    return {
      loading:false,
      finished:false,
      list:[],
      page: 1,
      day:''
    }
  },
  methods: {
    ...mapActions('openWX', ['scanQRcode']),
    onLoad() {
      this.day = format(new Date(),'yyyy-MM-dd')

      let data = {
        params: {
          page: this.page,
          child_id: this.$route.query.id,
          create_date_min: this.day
        }
      }

      return axios.get('/book/member/get_read_sign_list', data).then(res => {
        switch(res.data.status){
          case 1:
            if(this.page == 1){
              this.list = res.data.data
            }else{
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
    punch() {
      this.scanQRcode({ id: this.$route.query.id }).then(res => {
        switch (res.data.status) {
          case 1:
            window.location.reload()
            break
          case 0:
            this.$toast.fail('打卡失败')
            break
        }
      })
    },
    onRefresh() {
      this.page = 1
      this.onLoad().then(() => {
        this.loading = false
      })
    },
    comeBack(){
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped>
.ad-mould {
  width: 100%;
  height: 6.25rem /* 100/16 */;
  background: #fff;
  color: #c0c4cc;
  text-align: center;
  line-height: 6.25rem /* 100/16 */;
  border: 0.125rem /* 2/16 */ dashed #ebeef5;
  border-radius: 0.625rem /* 10/16 */;
}

.booth {
  padding: 0.625rem /* 10/16 */;
}

.btn-box {
  flex: 1;
  padding: 0 0.625rem /* 10/16 */;
}

.btn {
  width: 100%;
}
</style>
