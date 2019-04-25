<template>
  <div class="popup-list">
    <van-nav-bar :title="$route.meta.title" />
    <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
      <div class="item-card" v-for="(item,itemIndex) in list" :key="itemIndex">
        <div class="content" v-if='list.length'>
          <div class="flex flex-align">
            <div class="card">
              <div class="title" v-line-clamp:20="1">{{item.coupon.title}}</div>
              <div class="name" v-line-clamp:20="1">
                {{item.coupon.shop_name}}
              </div>
              <div class="time">{{item.coupon.bg_date}}-{{item.coupon.expire_date}}</div>
            </div>
            <div class="status flex flex-justify" @click="toWriteOff(item)" :class="item.is_used==1?'used':''">
              <div class="make" v-if='item.is_used == 0'>
                立即<br />使用
              </div>
              <div class="icon-used" v-else>
                <i class="iconfont">&#xe665;</i>
              </div>
            </div>
          </div>
        </div>
        <div class="no-list" v-else>
          尚无卡券 <span class="theme-color" @click="toBabyHome">宝贝主页参与阅读打卡</span>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { mapGetters } from 'vuex'

export default {
  name: 'popup-list',
  computed: {
    ...mapGetters(['userDataState'])
  },
  data() {
    return {
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
            if(this.list.length >= res.data.count){
              this.finished = true
            }
          break
        }
      })
    },
    toWriteOff(item){
      if(item.is_used == 0){
        this.$router.push({
          name:'writeOff',
          query:{
            ...item.coupon,
            download_id:item.download_id
          }
        })
      }else{
        this.$toast.fail('卡券已使用')
      }
    },
    toBabyHome(){
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
.list {
  padding: 15px;
}

.popup-card {
  background: #fff;
  margin-bottom: 15px;
  position: relative;
  overflow: hidden;
}

.card {
  flex: 1;
  padding: 0 15px;
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

.status.used{
  background: #DCDFE6;
}

.icon-used .iconfont{
  font-size: 60px;
  color: #F56C6C;
}

.item-card{
  margin: 10px 15px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
}

.item-card::before,
.item-card::after{
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  content: '';
  right: 80px;
  background: #f2f6fc;
}

.item-card::before {
  top: -13px;
}

.item-card::after {
  bottom: -13px;
}
</style>
