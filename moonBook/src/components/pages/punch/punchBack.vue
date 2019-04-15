<template>
  <div class="punch-list page-padding">
    <div class="booth">
      <div class="ad-mould" @click="toActivity">
        <van-swipe :autoplay="3000" indicator-color="white" :height='130'>
          <van-swipe-item v-for="(image, index) in banner" :key="index">
            <img :src="image" />
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>

    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <van-nav-bar right-text="阅读进度" @click-right="onClickRight" :border='false'>
        <div class="date-title" slot="title">{{day}}</div>
      </van-nav-bar>
      <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
        <div class="list" v-if='list.length'>
          <van-cell v-for="(item,index) in list" :key="index" :is-link='item.book_id' center>
            <cardPunch :item='item' />
          </van-cell>
        </div>
        <div class="no-list" v-else>
          尚无打卡图书
        </div>
      </van-list>
    </van-pull-refresh>

    <van-popup class="popup-release" v-model="releaseShow" position="bottom" get-container="#app">
      <videoList />
    </van-popup>

    <div class="footer-bar flex">
      <div class="btn-box">
        <van-button class="btn theme-btn" type="primary" round size="normal" @click="setReleaseSwitch(true)">晒一晒</van-button>
      </div>
      <div class="btn-box">
        <van-button class="btn theme-borrowing-btn" round type="primary" size="normal" @click="toSpecialPunch">看一看</van-button>
      </div>
    </div>

    <div class="release-footer-bar">
      <van-popup v-model="showTips" class="tips-popup" :overlayStyle='{backgroundColor:"transparent"}' get-container='.footer-bar'
        :lock-scroll='false'>
        <tips :isShow='showTips' position='bottom' @close='setReleaseSwitch(false)' />
      </van-popup>
    </div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { mapActions, mapState, mapMutations } from 'vuex'
import cardPunch from './cardPunch'
import videoList from './../video/videoList'
import { format } from './../../lib/js/util'
import tips from './../../module/release/tips'

export default {
  name: 'punchBack',
  components: {
    cardPunch,
    videoList,
    tips
  },
  computed: {
    ...mapState(['releaseSwitch']),
    showTips: {
      get() {
        return this.releaseSwitch
      },
      set(val) {
        this.setReleaseSwitch(val)
      }
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      list: [],
      bookInfo: '',
      page: 1,
      day: '',
      show: false,
      releaseShow: false,
      releaseType: [{
        icon: 'icon-weibo',
        text: '发图文',
        index: 0
      }, {
        icon: 'icon-paishipin',
        text: '拍小视频',
        index: 1
      }],
      banner: [
        require('@/assets/banner/banner-1.jpg'),
        require('@/assets/banner/banner-2.jpg'),
        require('@/assets/banner/banner-3.jpg'),
      ]
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$router': 'fetchData'
  },
  methods: {
    ...mapActions('openWX', ['scanQRcode']),
    ...mapMutations(['setReleaseSwitch']),
    fetchData() {
      let data = {
        params: {
          site_name: '打卡阅读',
          school_id:''
        }
      }
      axios.get('book/api/ads', data).then(res => {
        console.log(res)
      })
    },
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
    onRefresh() {
      this.page = 1
      this.onLoad().then(() => {
        this.loading = false
      })
    },
    comeBack() {
      this.$router.push({
        name: this.$route.query.back,
        query: {
          id: this.$route.query.id
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
    },
    toActivity() {

    },
    toSpecialPunch() {
      this.$router.push({
        name: 'specialPunch',
        query: {
          cate_id: this.$route.query.cate_id,
          tags: this.$route.query.tags
        }
      })
    },
    toGraphic() {
      this.$router.push({
        name: 'graphic',
        query: {
          back: this.$route.name,
          id: this.$route.query.id,
          cate_id: this.$route.query.cate_id,
          tags: this.$route.query.tags
        }
      })
    },
    onClickRight(){
      this.$router.push({
        name:'punchSpeed',
        query:{
          id: this.$route.query.id
        }
      })
    }
  }
}
</script>
<style scoped>
.ad-mould {
  width: 100%;
  background: #fff;
  color: #c0c4cc;
  text-align: center;
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
  z-index: 9999;
  bottom: 0;
}

.success {
  background: #fff;
  margin-bottom: 3.75rem /* 60/16 */;
}

.thumb {
  width: 5rem /* 80/16 */;
  height: 5rem /* 80/16 */;
  margin: 0.625rem /* 10/16 */ auto;
}

.book-name {
  text-align: center;
}

.book-info {
  margin-bottom: 1.25rem /* 20/16 */;
}

.popup-punch {
  border-radius: 0.625rem /* 10/16 */ 0.625rem /* 10/16 */ 0 0;
}

.slogan {
  height: 2.875rem /* 46/16 */;
  text-align: center;
  line-height: 2.875rem /* 46/16 */;
}

.btn-icon,
.text {
  text-align: center;
}

.text {
  font-size: 0.875rem /* 14/16 */;
}

.release-box {
  padding: 1.25rem /* 20/16 */ 0;
}

.slogan-img {
  width: 280px;
  margin: 20px auto;
}

.round-icon {
  width: 45px;
  height: 45px;
  text-align: center;
  line-height: 45px;
  margin: 0 auto;
  border-radius: 50%;
}

.round-icon .iconfont {
  font-size: 26px;
  color: #fff;
}

.release-box .btn:nth-child(1) .round-icon {
  background-image: linear-gradient(to top, #c471f5 0%, #fa71cd 100%);
}

.release-box .btn:nth-child(2) .round-icon {
  background-image: linear-gradient(
    to right,
    #f78ca0 0%,
    #f9748f 19%,
    #fd868c 60%,
    #fe9a8b 100%
  );
}

.popup-release {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.text {
  margin-top: 0.625rem /* 10/16 */;
}
</style>
