<template>
  <van-row gutter="10">
    <van-col span="7">
      <div class="book-cover">
        <img :src="thumb(item.book_photo)" @error="imgError($event)">
      </div>
    </van-col>
    <van-col span="11">
      <div class="book-info"  @click="toBookDetails(item)">
        <div class="title" v-line-clamp:20="2">{{item.book_title}}</div>
        <div class="attach">
          <div class="pos-title" v-if='item.pos_name'>书架：{{item.pos_name}}</div>
        </div>
      </div>
    </van-col>
    <van-col span="6">
      <div class="flex flex-align button">
        <div class="like" @click="addCollect(item)">
          <i class="iconfont" v-if='item.isShoucang'></i>
          <i class="iconfont" v-else>&#xe669;</i>
        </div>
        <div class="listening" @click="listening(item)">
          <i class="iconfont">&#xe617;</i>
        </div>
      </div>
    </van-col>
  </van-row>
</template>
<script>
import axios from "./../../lib/js/api"

export default {
  name: 'bookCard',
  props: ['item'],
  methods: {
    imgError(e) {
      e.target.src = require('@/assets/img/no-cover.jpg')
    },
    thumb(img) {
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
    },
    addCollect(item) {
      item.isShoucang = !item.isShoucang
      console.log('/book/SchoolShelfBook/getList','收藏没有isShoucang')
      axios.get(`/book/SchoolArticleCollect/add?post_id=${this.item.book_id}`).then(res => {
        if (res.data.status == 1) {
          if (res.data.data) {
            item.collect_num = res.data.data.collect_num
            this.$toast.success({
              className: 'shoucang-icon toast-icon',
              message: '收藏成功'
            })
          }
        }
      })
    }
  }
}
</script>
<style scoped>
.book_title {
  margin-bottom: 0.3125rem /* 5/16 */;
  font-weight: 500;
}

.attach {
  color: #606266;
}

.book-cover img {
  margin: 0 auto;
  display: block;
}

.title {
  margin-bottom: 0.625rem /* 10/16 */;
  font-weight: 500;
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
