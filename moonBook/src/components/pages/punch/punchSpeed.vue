<template>
  <div class="punch-speed">
    <van-nav-bar title="14天打卡奖品" :border='false' />
    <div class="baby-card">
      <van-cell>
        <div class="info-card flex flex-align">
          <div class="child-info flex flex-align">
            <div class="avatar">
              <img :src="childInfo.avatar" />
            </div>
            <div class="name">
              {{childInfo.name}}
            </div>
          </div>
          <div class="days">
            {{childInfo.sign_days}}/14天
          </div>
        </div>

        <div class="label">
          完成14天打卡即可获取奖品
        </div>
      </van-cell>

    </div>
    <div class="list">
      <van-nav-bar title="奖品赞助商" :border='false' />
      <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
        <div class="container">
          <div class="sponsor-item" v-for="(item,index) in list" :key="index" @click="toAdvertisingDetails(item)">
            <van-cell :border='false'>
              <div class="top-bar flex flex-align">
                <div class="title" v-line-clamp:20="1">{{item.title}}</div>
                <div class="num">奖品数量：{{item.downloads}}/{{item.num}}</div>
              </div>
              <div class="sponsor">
                <img class="lazy" v-lazy="item.photo" />
              </div>
            </van-cell>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { mapGetters } from 'vuex'

export default {
  name: 'punch-speed',
  data() {
    return {
      childInfo: '',
      loading: false,
      finished: false,
      page: 1,
      list: []
    }
  },
  computed: {
    ...mapGetters(['userDataState'])
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$router': 'fetchData'
  },
  methods: {
    fetchData() {
      let data = {
        params: {
          child_id: this.userDataState.child_id
        }
      }
      axios.get('/book/baby/getInfo', data).then(res => {
        switch (res.data.status) {
          case 1:
            this.childInfo = res.data.data
            break
        }
      })
    },
    onLoad() {
      let data = {
        params: {
          activity_id: 5,
          school_id: this.userDataState.teacher_school_id > 0 ? this.userDataState.teacher_school_id : this.userDataState.school_id
        }
      }
      axios.get('/book/member/get_coupons?activity_id', data).then(res => {
        switch (res.data.status) {
          case 1:

            let array = []
            res.data.data.forEach(element => {
              if (element.photo != null) {
                array.push(element)
              }
            })

            if (this.page = 1) {
              this.list = array
            } else {
              this.list = this.list.concat(array)
            }

            this.loading = false
            this.page++

            if (this.list >= res.data.count) {
              this.finished = true
            }
            break
        }
      })
    },
    toAdvertisingDetails(item){
      this.$router.push({
        name:'advertisingDetails',
        query:{
          coupon_id:item.coupon_id
        }
      })
    }
  }
}
</script>
<style scoped>
.avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.avatar {
  margin-right: 10px;
}

.info-card {
  justify-content: space-between;
}

.days {
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(90deg, #ff765c, #ff23b3);
  -webkit-background-clip: text;
  color: transparent;
}

.name {
  font-size: 17px;
}

.label {
  text-align: center;
  background: linear-gradient(90deg, #fe8537, #f02b2b);
  -webkit-background-clip: text;
  color: transparent;
}

.sponsor {
  width: 100%;
  height: 100px;
  overflow: hidden;
  border-radius: 8px;
  position: relative;
}

.sponsor img {
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
}

.top-bar {
  height: 45px;
  justify-content: space-between;
}

.title {
  flex: 1;
  margin-right: 20px;
  font-size: 18px;
}

.num {
  color: #909399;
}

.container{
  padding-bottom: 30px;
  background: #fff;
}
</style>
