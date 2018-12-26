<template>
  <div class="reading">
    <van-cell :title="moduleTitle" :is-link="type =='rank'" @click="toBabyHome" />
    <div class="book-list scroll-x" v-if='list.length > 0'>
      <div class="book-item scroll-item" v-for='(item,index) in list' :key="index">
        <div class="book-cover">
          <img :src="thumb(item.book_thumb)" @error="outThumb($event,item)" :alt="item.book_name" @click="toBookDetails(item)">

          <div class="listening" @click="listening(item)">
            <i class="iconfont">&#xe617;</i>
          </div>
        </div>
        <div class="book-name" v-line-clamp:20="2"  @click="toBookDetails(item)">
          {{item.book_name}}
        </div>
        <div class="book-detail">
          <div class="book-author" v-line-clamp:20="1">作者:{{item.book_author}}</div>
          <div class="book-borrow">
            <span>{{item.book_borrow_count}}</span>人借过
          </div>
          <div class="book-label">
            <div class="label-item" v-for='(sortItem,sortIndex) in item.book_tags' :key="sortIndex">
              {{sortItem}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="not-content" v-else>
      尚无记录, <span class="theme-color">阅读是与心灵沟通</span>
    </div>
  </div>
</template>
<script>
import axios from './../lib/js/api'

export default {
  name: 'reading',
  props: ['list', 'moduleTitle', 'type', 'babyId'],
  methods: {
    toBabyHome() {
      this.$router.push({
        name: 'baby-home',
        query: {
          id: this.babyId
        }
      })
    },
    thumb(img) {
      let hostMatch = img.match(/https?:\/\/(.+?)\//)
      if (hostMatch) {
        return `/book/api/remotePic?url=${img}`
      } else {
        return img
      }
    },
    outThumb(e, item) {
      let book_author = ''

      if (item.book_author.length > 7) {
        book_author = item.book_author.substr(0, 7) + '...'
      } else {
        book_author = item.book_author
      }

      e.target.outerHTML = `
        <div class='three-d-book'>
            <div class='three-d-book-cover'>
                <div class='three-d-book-name'>
                    ${item.book_name}
                </div>
                <div class='three-d-book-author'>
                    ${book_author}
                </div>
            </div>
        </div>
      `
    },
    toBookDetails(list){
      this.$router.push({
        name:'book-details',
        query:{
          id:list.book_id
        }
      })
    },
    listening(item){
      let p = /（.+?）/
      let pureTitle = item.book_name.replace(p, '')
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
    }
  }
}
</script>
<style scoped>
.scroll-item {
  display: inline-grid;
}

.book-list {
  padding-left: 0.625rem /* 10/16 */;
}

.book-cover {
  width: 9.375rem /* 150/16 */;
  height: 9.375rem /* 150/16 */;
  position: relative;
}

.book-cover img {
  height: 8.75rem /* 140/16 */;
  margin: 0 auto;
  display: block;
  background: #f2f6fc;
  text-align: center;
  line-height: 8.75rem /* 140/16 */;
  color: #c0c4cc;
  overflow: hidden;
}

.book-item {
  padding-right: 0.625rem /* 10/16 */;
}

.book-name {
  color: #303133;
  height:2.25rem /* 36/16 */;
  margin: 0.3125rem /* 5/16 */ 0;
  font-size: .875rem /* 14/16 */;
}

.book-label {
  height: 4.0625rem /* 65/16 */;
}

.book-label .label-item {
  font-size: 0.75rem /* 12/16 */;
  border: 0.0625rem /* 1/16 */ solid #dcdfe6;
  padding: 0.125rem /* 2/16 */ 0.3125rem /* 5/16 */;
  margin-right: 0.3125rem /* 5/16 */;
  margin-top: 0.3125rem /* 5/16 */;
  float: left;
  border-radius: 0.25rem /* 4/16 */;
}

.book-borrow span {
  color: #f56c6c;
}

.book-detail {
  display: grid;
  font-size: 0.8125rem /* 13/16 */;
}

.book-borrow {
  margin: 0.125rem /* 2/16 */ 0;
}

.listening{
  width: 1.75rem /* 28/16 */;
  height: 1.75rem /* 28/16 */;
  position: absolute;
  bottom: 0;
  right: 0;
}

.listening i.iconfont{
  font-size: 1.75rem /* 28/16 */;
  color: #f02b2b;
  background: #fff;
  display: block;
}
</style>