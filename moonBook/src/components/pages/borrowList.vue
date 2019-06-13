<template>
  <div class="borrow-list">
    <van-nav-bar :title="$route.meta.title" left-text="我的" left-arrow />
    <van-tabs color='#0084ff' @change='onChangeTab' :line-width='20' :line-height='4' sticky swipeable animated v-model="tabIndex">
      <van-tab v-for="(list,index) in tab" :title="list.title" :key="index">
        <van-pull-refresh v-model="loading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
              <div class="content" v-if='list.content.length'>
                <van-cell v-for="(item,itemIndex) in list.content" :key="itemIndex">
                  <van-row gutter="10">
                    <van-col span="7">
                      <div class="book-cover" @click="toBookDetails(item)">
                        <img class="lazy" v-lazy="thumb(item.thumb)"/>
                      </div>
                    </van-col>
                    <van-col span="11">
                      <div class="book-info" @click="toBookDetails(item)">
                        <div class="title" v-line-clamp:20="2">{{item.title}}</div>
                        <div class="attach">
                          <!-- <div class="location" v-if='item.location'><i class="iconfont">&#xe724;</i>{{item.location}}</div> -->
                          <div class="author" v-line-clamp:20="1" v-if='item.author'>作者：{{item.author}}</div>
                          <!-- <div class="pos-title" v-if='item.pos_title'>书架：{{item.pos_title}}</div> -->
                        </div>
                      </div>
                    </van-col>
                    <van-col span="6">
                      <div class="flex flex-align button">
                        <div class="like" @click="addCollect(item)">
                          <i class="iconfont" v-if='item.is_collect'>&#xe668;</i>
                          <i class="iconfont" v-else>&#xe669;</i>
                        </div>
                        <div class="listening" @click="listening(item)">
                          <i class="iconfont">&#xe617;</i>
                        </div>
                      </div>
                    </van-col>
                  </van-row>
                </van-cell>
              </div>
              <div class="no-content" v-else>
                还没有没有{{list.title}}的书
              </div>
          </van-list>
      </van-pull-refresh>
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
      let data = {
        params:{
          page:this.page,
          is_return:this.tab[this.tabIndex].type
        }
      }

      return axios.get('/book/MemberBorrow/getList',data).then(res => {
        if(res.data.status == 1){
          if (res.data.count > 0) {
              let datas = []
              let array = res.data.data
              array.forEach(element => {
                if(element.book != null){
                  datas.push( element.book)
                }
              })

            if (this.page == 1) {
              this.tab[this.tabIndex].content = datas
            } else {
              this.tab[this.tabIndex].content = this.tab[this.tabIndex].content.concat(datas)
            }
            this.page++
            this.loading = false
            if (this.tab[this.tabIndex].content.length >= res.data.count) {
              this.finished = true
            }
          }
        }else{
          this.loading = false
          this.finished = true
          this.tab[this.tabIndex].content = []
        }
      })
    },
    getCollectList() {
      let data = {
        params:{
          page:this.page,
          type:'book'
        }
      }

      return axios.get('/book/SchoolArticleCollect/getList',data).then(res => {
        if(res.data.status == 1){
          if (res.data.count > 0) {
              let datas = []
              let array = res.data.data
              array.forEach(element => {
                if(element.book != null){
                  datas.push( element.book)
                }
              })

            if (this.page == 1) {
              this.tab[this.tabIndex].content = datas
            } else {
              this.tab[this.tabIndex].content = this.tab[this.tabIndex].content.concat(datas)
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
              let datas = []
              let array = res.data.data
              array.forEach(element => {
                if(element.book != null){
                  datas.push( element.book)
                }
              })

            if (this.page == 1) {
              this.tab[this.tabIndex].content = datas
            } else {
              this.tab[this.tabIndex].content = this.tab[this.tabIndex].content.concat(datas)
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
          this.finished = false
        })
      }

      if (this.tabIndex == 2) {
        this.getCollectList().then(res => {
          this.loading = false
          this.finished = false
        })
      }

      if (this.tabIndex == 3) {
        this.getBrokenList().then(res => {
          this.loading = false
          this.finished = false
        })
      }
    },
    thumb(img){
      if(img){
        let hostMatch = img.match(/https?:\/\/(.+?)\//)
        if (hostMatch) {
          return `/book/api/remotePic?url=${img}`
        } else {
          return img
        }
      }
    },
    listening(item) {
      let p = /（.+?）/
      let pureTitle = item.title.replace(p, '')
      let url = `https://m.ximalaya.com/search/${pureTitle}`
      let isRead = localStorage.getItem('bookRead_' + item.tushu_id)
      if (!isRead) {
        axios.get('/book/story/updateRead').then(res => {
          localStorage.setItem('bookRead_' + item.tushu_id, true)
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
          id: item.tushu_id
        }
      })
    },
    addCollect(item) {
      let data = {
          params:{
            target_id: item.tushu_id, 
            type_id: 5
          }
      }

      axios.get('/book/member/add_favorite',data).then(res => {
        if (res.data.status == 1) {
          this.$forceUpdate() //强制刷新数据
          this.$set(item,'is_collect',!item.is_collect) //使用$set 来修改
          if(item.is_collect){
            this.$toast.success({
              className: 'like-icon toast-icon',
              message: '喜欢',
              duration: '800',
            })
          }
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

.book-cover img{
  display: block;
  margin: 0 auto;
}

.button{
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate3d(0, -50%, 0);
}

.like{
  margin-right: 1.25rem /* 20/16 */;
}

.listening i.iconfont,
.like .iconfont{
  font-size: 1.625rem /* 26/16 */;
  color: #f02b2b;
}
</style>