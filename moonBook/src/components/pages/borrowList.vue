<template>
  <div class="borrow-list">
    <van-nav-bar :title="$route.meta.title" left-text="我的" left-arrow @click-left="onClickLeft" />
    <van-tabs color='#409eff' @change='onChangeTab' :line-width='20' :line-height='4' sticky swipeable animated v-model="tabIndex">
      <van-tab v-for="(list,index) in tab" :title="list.title" :key="index">
        <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad" v-if='index == tabIndex'>
          <van-pull-refresh v-model="loading" @refresh="onRefresh">
            <div class="content" v-if='list.content.length'>
              <van-cell v-for="(item,itemIndex) in list.content" :key="itemIndex">
                <van-row gutter="10">
                  <van-col span="9">
                    <div class="book-cover" @click="toBookDetails(item)">
                      <img :src="thumb(item.book.thumb)" @error="outThumb($event,item)" />
                    </div>
                  </van-col>
                  <van-col span="12">
                    <div class="book-info" @click="toBookDetails(item)">
                      <div class="title" v-line-clamp:20="2">{{item.book.title}}</div>
                      <div class="attach">
                        <div class="location" v-if='item.location'><i class="iconfont">&#xe724;</i>{{item.location}}</div>
                        <div class="author" v-line-clamp:20="1" v-if='item.book.author'>作者：{{item.book.author}}</div>
                        <div class="pos-title" v-if='item.pos_title'>书架：{{item.pos_title}}</div>
                      </div>
                    </div>
                  </van-col>
                  <van-col span="3">
                    <div class="listening" @click="listening(item)">
                      <i class="iconfont">&#xe617;</i>
                    </div>
                  </van-col>
                </van-row>
              </van-cell>
            </div>
            <div class="no-content" v-else>
              还没有没有{{list.title}}的书
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
  name: 'borrow-list',
  data() {
    return {
      tab: [{
        title: '读过',
        content: [],
        type: '1'
      }, {
        title: '在读',
        content: [],
        type: '0'
      }, {
        title: '收藏',
        content: [],
        type: 'book'
      }, {
        title: '破损',
        content: [],
        type: 'damaged'
      }],
      loading: false,
      finished: false,
      page: 1,
      tabIndex: 0
    }
  },
  methods: {
    onClickLeft() {
      this.$router.push({
        name: 'my'
      })
    },
    onLoad() {
      if (this.tabIndex < 2) {
        this.getReadList()
      }

      if (this.tabIndex == 2) {
        this.getCollectList()
      }

      if (this.tabIndex == 3) {
        this.getBrokenList()
      }
    },
    getReadList() {
      return axios.get(`/book/MemberBorrow/getList?page=${this.page}&is_return=${this.tab[this.tabIndex].type}`).then(res => {
        if(res.data.status == 1){
          if (res.data.count > 0) {
            if (this.page == 1) {
              this.tab[this.tabIndex].content = res.data.data
            } else {
              this.tab[this.tabIndex].content = this.tab[this.tabIndex].content.concat(res.data.data)
            }
            this.page++
            this.loading = false
            if (this.tab[this.tabIndex].content.length >= res.data.count) {
              this.finished = true
            }
          }
        }
      })
    },
    getCollectList() {
      return axios.get(`/book/SchoolArticleCollect/getList?page=${this.page}&type=book`).then(res => {
        if(res.data.status == 1){
          if (res.data.count > 0) {
            if (this.page == 1) {
              this.tab[this.tabIndex].content = res.data.data
            } else {
              this.tab[this.tabIndex].content = this.tab[this.tabIndex].content.concat(res.data.data)
            }
            this.page++
            this.loading = false
            if (this.tab[this.tabIndex].content.length >= res.data.count) {
              this.finished = true
            }
          }
        }
      })
    },
    getBrokenList() {
      return axios.get('/book/MemberBookBroken/getList').then(res => {
        if(res.data.status == 1){
          if (res.data.count > 0) {
            if (this.page == 1) {
              this.tab[this.tabIndex].content = res.data.data
            } else {
              this.tab[this.tabIndex].content = this.tab[this.tabIndex].content.concat(res.data.data)
            }
            this.page++
            this.loading = false
            if (this.tab[this.tabIndex].content.length >= res.data.count) {
              this.finished = true
            }
          }
        }

      })
    },
    onChangeTab(index) {
      this.tabIndex = index
      this.page = 1
      this.onLoad()
    },
    onRefresh() {
      this.page = 1

      if (this.tabIndex < 2) {
        this.getReadList().then(res => {
          this.loading = false
        })
      }

      if (this.tabIndex == 2) {
        this.getCollectList().then(res => {
          this.loading = false
        })
      }

      if (this.tabIndex == 3) {
        this.getBrokenList().then(res => {
          this.loading = false
        })
      }
    },
    outThumb(e, item) {
      let book_author = ''

      if (item.book.author.length > 7) {
        book_author = item.book.author.substr(0, 7) + '...'
      } else {
        book_author = item.book.author
      }

      e.target.outerHTML = `
        <div class='three-d-book'>
            <div class='three-d-book-cover'>
                <div class='three-d-book-name'>
                    ${item.book.title}
                </div>
                <div class='three-d-book-author'>
                    ${book_author}
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
      let pureTitle = item.book.title.replace(p, '')
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
.no-content {
  height: 12.5rem /* 200/16 */;
  text-align: center;
  line-height: 12.5rem /* 200/16 */;
  background: #fff;
  color: #c0c4cc;
}

.title {
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

.book-cover img{
  display: block;
  margin: 0 auto;
}
</style>