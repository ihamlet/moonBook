<template>
  <div class="popup-list">
    <van-nav-bar :title="$route.meta.title" />

    <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
      <van-cell v-for="(item,itemIndex) in list" :key="itemIndex" :border='false' @click="toWriteOff(item)">
        <div class="flex flex-align">
          <div class="card">
            <div class="title" v-line-clamp:20="1">{{item.coupon.title}}</div>
            <div class="name" v-line-clamp:20="1">
              {{item.coupon.shop_name}}
            </div>
            <div class="time">{{item.coupon.bg_date}}-{{item.coupon.expire_date}}</div>
          </div>
          <div class="status flex flex-justify" v-if='isUse'>
            <div class="make">
              立即<br />使用
            </div>
          </div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>
<script>
import axios from './../../lib/js/api'

export default {
  name: 'popup-list',
  data() {
    return {
      isUse: true,
      loading: false,
      finished: false,
      page: 1,
      list: []
    }
  },
  methods: {
    onLoad(){
      let data = {
        page:1
      }

      axios.get('/book/member/get_coupon_downloads', data).then(res=>{
        switch (res.data.status) {
          case 1:
            if(this.page = 1){
              this.list = res.data.data
            }else{
              this.list = this.list.concat(res.data.data)
            }
            this.page++
            this.loading = false
            if(this.list >= res.data.count){
              this.finished = true
            }
          break
        }
      })
    },
    toWriteOff(item){
      this.$router.push({
        name:'writeOff',
        query:{
          ...item.coupon,
          download_id:item.download_id
        }
      })
    }
  }
}
</script>
<style scoped>
.list {
  padding: 15px;
}

.popup-card {
  background: #fff;
  margin-bottom: 15px;
  position: relative;
  overflow: hidden;
}

.popup-card::before,
.popup-card::after {
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  content: '';
  right: 80px;
  background: #f2f6fc;
}

.popup-card::before {
  top: -13px;
}

.popup-card::after {
  bottom: -13px;
}

.card {
  flex: 1;
  padding: 10px;
}

.status {
  width: 90px;
  text-align: center;
}

.title {
  font-size: 20px;
  margin-bottom: 5px;
}

.name,
.time {
  color: #909399;
}

.time {
  font-size: 14px;
}

.name {
  background: linear-gradient(90deg, #00c2ab, #3e94ff);
  -webkit-background-clip: text;
  color: transparent;
}

.make {
  font-size: 18px;
}

.status {
  background: linear-gradient(135deg, #00bcd4, #0084ff);
  height: 90px;
  color: #fff;
  align-items: center;
}
</style>
