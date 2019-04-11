<template>
  <div class="add-family">
    <div class="pictorial">
      <div class="tips" v-show='is_mine'>点击发送给家人 邀请加入</div>
      <div class="logo">
        <img src="./../../../assets/img/logo.png" />
      </div>
      <div class="child-info" v-show='!is_mine'>
        <div class="avatar">
          <img :src="babyInfo.avatar" />
        </div>
        <div class="name">
          {{babyInfo.name}}
        </div>
        <div class="text">
          邀请您加入家庭主页
        </div>
      </div>
      <div class="head-box flex flex-justify">
        <div class="head-list flex flex-align">
          <img src="./../../../assets/img/head1.png" />
          <img src="./../../../assets/img/head2.png" />
          <img src="./../../../assets/img/head3.png" />
        </div>
      </div>

      <div class="text">{{is_mine?'邀请家人一起参与宝贝阅读，记录成长':'与家人一起参与宝贝阅读，记录成长'}}</div>

      <van-button class="theme-btn" v-if='!is_mine' type="primary" size="normal" @click="addFamily" square>加 入</van-button>
      <div class="copyright" v-if='is_mine'>© 阅亮书架</div>
    </div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { mapActions } from 'vuex'

export default {
  name: 'add-family',
  computed: {
    item() {
      let data = {
        cate_name: '邀请',
        details: '阅亮书架，与家人一起参与宝贝阅读，记录成长',
        title: `${this.babyInfo.name}邀请您加入家庭主页`,
        imgUrl: location.origin + this.babyInfo.avatar
      }

      return data
    }
  },
  data() {
    return {
      isLoading: false,
      shareShow: false,
      is_mine: true,
      babyInfo: ''
    }
  },
  created() {
    this.fetchData()
  },
  updated(){
    this.$nextTick(() => {
      let data = {
        item: this.item,
        success() {
          self.$router.push({
            name: 'baby-home',
            query: {
              id: self.$route.query.id
            }
          })
        }
      }
      this.share(data)
    })
  },
  watch: {
    '$router': 'fetchData'
  },
  methods: {
    ...mapActions('openWX', ['share']),
    fetchData() {
      let data = {
        params: {
          child_id: this.$route.query.id
        }
      }
      axios.get('/book/baby/getInfo', data).then(res => {
        if (res.data.status = 1) {
          this.is_mine = res.data.data.is_mine
          this.babyInfo = res.data.data
        }
      })
    },
    addFamily() {
      let data = {
        params: {
          child_id: this.$route.query.id
        }
      }

      axios.get('/book/babyParent/join', data).then(res => {
        this.isLoading = true
        if (res.status == 1) {
          this.$toast(res.data.msg)
          this.toRouter()
          this.isLoading = false
        } else {
          this.$toast(res.data.msg)
          this.toRouter()
          this.isLoading = false
        }
      })
    },
    toRouter() {
      if (this.$route.query.back) {
        this.$router.push({
          name: this.$route.query.back,
          query: {
            id: this.$route.query.id,
          }
        })
      } else {
        this.$router.push({
          name: 'home'
        })
      }
    }
  }
}
</script>
<style scoped>
.btn {
  padding: 1.25rem /* 20/16 */ 0.625rem /* 10/16 */;
  position: relative;
  z-index: 999;
}

.pictorial {
  width: 100%;
  height: 100vh;
  background-image: url('./../../../assets/img/share-bg.jpg');
  background-size: cover;
  background-position: bottom;
}

.copyright {
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 2.25rem /* 36/16 */;
  line-height: 2.25rem /* 36/16 */;
  color: #909399;
  font-size: 0.8125rem /* 13/16 */;
}

.logo {
  width: 10rem /* 160/16 */;
  padding-top: 8.125rem /* 130/16 */;
  margin: 0 auto;
}

.tips {
  position: absolute;
  z-index: 10;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 0.625rem /* 10/16 */ 1.25rem /* 20/16 */;
  height: 1.75rem /* 28/16 */;
  line-height: 1.75rem /* 28/16 */;
  border-radius: 0.5rem /* 8/16 */;
  right: 0.625rem /* 10/16 */;
  top: 30px;
}

.tips::before {
  content: '';
  position: absolute;
  border-right: 0 solid transparent;
  border-left: 15px solid transparent;
  border-bottom: 30px solid#000;
  top: -30px;
  right: 0.5rem /* 8/16 */;
  opacity: 0.7;
}

.head-list {
  margin: 0 auto;
}

.head-list img {
  height: 4.375rem /* 70/16 */;
}

.head-box {
  margin-top: 1.5625rem /* 25/16 */;
  margin-bottom: 0.625rem /* 10/16 */;
}

.text {
  text-align: center;
  color: #007fff;
}

.avatar{
  width: 66px;
  margin: 10px auto;
}

.avatar img {
  width: 60px;
  height: 60px;
  border: 3px solid #fff;
  border-radius: 50%;
  margin: 20px auto 0.625rem 10px auto;
  display: block;
}

.name {
  text-align: center;
  font-size: 18px;
  font-weight: 700;
}

.theme-btn {
  position: fixed;
  width: 100%;
  bottom: 0;
}
</style>
