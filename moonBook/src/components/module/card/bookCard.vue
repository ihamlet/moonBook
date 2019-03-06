<template>
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
      <div class="listening" @click="listening(item)">
        <i class="iconfont">&#xe617;</i>
      </div>
    </van-col>
  </van-row>
</template>
<script>
export default {
  name: 'bookCard',
  props: ['item'],
  methods: {
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

.book-cover img {
  margin: 0 auto;
  display: block;
}

.title {
  margin-bottom: 0.625rem /* 10/16 */;
  font-weight: 500;
}
</style>
