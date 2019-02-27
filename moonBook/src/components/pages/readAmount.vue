<template>
  <div class="read-amount">
    <van-nav-bar :title="$route.meta.title" left-text="返回" right-text='捐赠图书' fixed left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
    <div class="amount-list flex flex-align">
      <div class="amount-item">
        <div class="amount-type">读过</div>
        <div class="amount-num">{{childInfo.reading_count}}</div>
      </div>
      <div class="amount-item">
        <div class="amount-type">在读</div>
        <div class="amount-num">{{childInfo.read_count}}</div>
      </div>
      <div class="amount-item">
        <div class="amount-type">收藏</div>
        <div class="amount-num">{{childInfo.collect_num}}</div>
      </div>
      <div class="amount-item">
        <div class="amount-type">磨损</div>
        <div class="amount-num">{{childInfo.broken_num}}</div>
      </div>
      <div class="amount-item">
        <div class="amount-type">未读</div>
        <div class="amount-num">{{childInfo.shelf_tushu_kinds-childInfo.read_kinds}}</div>
      </div>
    </div>
    <div class="total">所在书架未读的书：{{childInfo.shelf_tushu_kinds-childInfo.read_kinds}}/{{childInfo.shelf_tushu_kinds}}</div>
    <van-tabs color="#409eff" :line-width="20" :line-height="4" sticky swipeable animated :offsetTop="45" @change="onChangeTab">
      <van-tab v-for="(list,index) in tab" :title="list.title" :key="index">
        <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
          <van-pull-refresh v-model="loading" @refresh="onRefresh">
            <div class="content" v-if='list.content.length > 0'>
              <van-cell v-for="(item,itemIndex) in list.content" :key="itemIndex">
                <van-row gutter="10">
                  <van-col span="9">
                    <div class="book-cover">
                      <img :src="thumb(item.book_photo)" @error="outThumb($event,item)">
                    </div>
                  </van-col>
                  <van-col span="12">
                    <div class="book-info" @click="toBookDetails(item)">
                      <div class="title" v-line-clamp:20="2">{{item.book_title}}</div>
                      <div class="attach">
                        <div class="pos-title" v-if='item.pos_name'>书架：{{item.pos_name}}</div>
                      </div>
                    </div>
                  </van-col>
                  <van-col span="3">
                    <!-- <div class="listening" @click="listening(item)">
                      <i class="iconfont">&#xe617;</i>
                    </div> -->
                  </van-col>
                </van-row>
              </van-cell>
            </div>
          </van-pull-refresh>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import axios from './../lib/js/api'

export default {
  name: "readAmount",
  data() {
    return {
      page: 1,
      loading: false,
      finished: false,
      childInfo: '',
      tabIndex: 0,
      tab: [
        {
          title: "全部",
          content: ''
        },
        {
          title: "绘本",
          content: ''
        },
        {
          title: "科普",
          content: ''
        },
        {
          title: "3D",
          content: ''
        }
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
    fetchData() {
      axios.get(`/book/baby/getInfo?child_id=${this.$route.query.id}`).then(res => {
        this.childInfo = res.data.data
      })
    },
    onClickLeft() {
      if (this.$route.query.back) {
        this.$router.push({
          name: this.$route.query.back,
          query: {
            id: this.$route.query.id
          }
        })
      } else {
        this.$router.push({
          name: 'my'
        })
      }
    },
    onClickRight() {
      window.location.href = '/book/TushuDonation/intro'
    },
    getList() {
      let data = {
        params: {
          page: this.page,
          keyword: this.tabIndex == 0?'':this.tab[this.tabIndex].title
        }
      }
 
      return axios.get('/book/SchoolShelfBook/getList', data).then(res => {
      if (this.page == 1) {
          this.tab[this.tabIndex].content = res.data.data
        } else {
          this.tab[this.tabIndex].content = this.tab[this.tabIndex].content.concat(res.data.data)
        }
        this.loading = false
        this.page++
        if (this.tab[this.tabIndex].content.length >= res.data.count) {
          this.finished = true
        }
      })
    },
    onRefresh() {
      this.page = 1
      this.getList().then(() => {
        this.loading = false
      })
    },
    onLoad() {
      this.getList()
    },
    onChangeTab(index) {
      this.tabIndex = index
      this.page = 1
      this.onRefresh()
    },
    outThumb(e, item) {
      e.target.outerHTML = `
        <div class='three-d-book'>
            <div class='three-d-book-cover'>
                <div class='three-d-book-name'>
                    ${item.book_title}
                </div>
                <div class='three-d-book-author'>
                    
                </div>
            </div>
        </div>
      `
    },
    thumb(img){
      let hostMatch = img.match(/https?:\/\/(.+?)\//)
      if (hostMatch) {
        return `/book/api/remotePic?url=${img}`
      } else {
        return img
      }
    },
    listening(item) {
      let p = /（.+?）/
      let pureTitle = item.book.book_title.replace(p, '')
      let url = `https://m.ximalaya.com/search/${pureTitle}/voice`
      let isRead = localStorage.getItem('bookRead_' + item.book_id)
      if (!isRead) {
        axios.get('/book/story/updateRead').then(res => {
          localStorage.setItem('bookRead_' + item.book_id, true)
          location.href = url
        })
      } else {
        location.href = url
      }
    },
    toBookDetails(item) {
      this.$router.push({
        name: 'book-details',
        query: {
          id: item.book_id
        }
      })
    }
  }
}
</script>
<style scoped>
.amount-item {
  flex: 1;
  text-align: center;
  background: #fff;
  padding: 0.625rem /* 10/16 */ 0;
}

.amount-type {
  margin-bottom: 0.3125rem /* 5/16 */;
}

.total {
  height: 2rem /* 32/16 */;
  line-height: 2rem /* 32/16 */;
  padding: 0 1.25rem /* 20/16 */;
  font-size: 0.875rem /* 14/16 */;
}

.amount-list{
  margin-top: 2.8125rem /* 45/16 */;
}

.no-content {
  height: 12.5rem /* 200/16 */;
  text-align: center;
  line-height: 12.5rem /* 200/16 */;
  background: #fff;
  color: #c0c4cc;
}

.book_title {
  margin-bottom: 0.3125rem /* 5/16 */;
  font-weight: 500;
}

.attach {
  color: #606266;
}

.listening {
  width: 1.875rem /* 30/16 */;
  height: 1.875rem /* 30/16 */;
  line-height: 1.875rem /* 30/16 */;
  text-align: center;
  position: absolute;
  right: 0;
}

.listening i.iconfont {
  font-size: 1.75rem /* 28/16 */;
  background: linear-gradient(135deg, #fe8537, #f02b2b);
  -webkit-background-clip: text;
  color: transparent;
}
</style>
