<template>
  <div class="punch-list page-padding">
    <van-nav-bar :title="$route.meta.title" :border='false' />
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <div class="date-title">{{day}}</div>
      <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
        <van-cell v-for="(item,index) in list" :key="index" :is-link='item.book_id' center>
          <cardPunch :item='item'/>
        </van-cell>
      </van-list>
    </van-pull-refresh>

    <div class="booth">
      <div class="ad-mould">
        广告位
      </div>
    </div>

    <van-popup class="popup-punch" v-model="show" position="bottom" get-container="#app">
      <div class="book-info" v-if='bookInfo'>
        <div class="thumb">
            <img class="lazy" v-lazy="thumb(bookInfo.thumb)" />
        </div>
        <div class="book-name">{{bookInfo.title}}</div>
      </div>
      <div class="success flex flex-justify">
        <iconSuccess class="icon"/>
      </div>
    </van-popup>

    <div class="footer-bar flex">
      <div class="btn-box">
        <van-button class="btn theme-btn" type="primary" round size="normal" @click="comeBack">完成</van-button>
      </div>
      <div class="btn-box">
        <van-button class="btn theme-borrowing-btn" round type="primary" size="normal" @click="punch">继续打卡</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { mapActions } from 'vuex'
import iconSuccess from './../../module/animate/iconSuccess'
import cardPunch from './cardPunch'
import { format } from './../../lib/js/util'

export default {
  name: 'punchBack',
  components: {
    iconSuccess,
    cardPunch
  },
  data() {
    return {
      loading: false,
      finished: false,
      list: [],
      bookInfo: '',
      page: 1,
      day: '',
      show: false
    }
  },
  methods: {
    ...mapActions('openWX', ['scanQRcode']),
    onLoad() {
      this.day = format(new Date(), 'yyyy-MM-dd')

      let data = {
        params: {
          page: this.page,
          child_id: this.$route.query.child_id,
          create_date_min: this.day
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
    punch() {
      this.scanQRcode({ id: this.$route.query.child_id }).then(res => {
        switch (res.data.status) {
          case 1:
            this.onRefresh()
            this.bookInfo = res.data.data.book
            this.show = true
            setTimeout(() => {
                this.show = false
            },4000)
            break
          case 0:
            this.show = false
            this.$toast(res.data.msg)
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
    comeBack() {
      this.$router.push({
        name: this.$route.query.back,
        query:{
          id:this.$route.query.id
        }
      })
    },
    thumb(img) {
      if (img) {
          let hostMatch = img.match(/https?:\/\/(.+?)\//)
          if (hostMatch) {
            return `/book/api/remotePic?url=${img}`
          } else {
            return img
          }
      }
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
}

.booth {
  position: fixed;
  width: 100%;
  bottom: 65px;
}

.btn-box {
  flex: 1;
  padding: 0 0.625rem /* 10/16 */;
}

.btn {
  width: 100%;
}

.footer-bar {
  position: fixed;
  padding: 10px 0;
  width: 100%;
  z-index: 2010;
  background: #fff;
  bottom: 0;
}

.success {
  background: #fff;
  margin-bottom: 3.75rem /* 60/16 */;
}

.thumb{
  width: 5rem /* 80/16 */;
  height: 5rem /* 80/16 */;
  margin: .625rem /* 10/16 */ auto;
}

.book-name{
  text-align: center;
}

.book-info{
  margin-bottom: 1.25rem /* 20/16 */;
}

.popup-punch{
  border-radius: .625rem /* 10/16 */ .625rem /* 10/16 */ 0 0;
}
</style>
