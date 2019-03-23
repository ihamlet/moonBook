<template>
  <van-row gutter="10">
    <van-col span="7">
      <div class="book-cover">
        <img  class="lazy" v-lazy="thumb(item.book_photo)"/>
      </div>
    </van-col>
    <van-col span="11">
      <div class="book-info"  @click="toBookDetails(item)">
        <div class="title" v-line-clamp:20="2">{{item.book_title}}</div>
        <div class="attach">
          <div class="pos-title" v-if='item.pos_name'>书位：{{item.pos_name}}</div>
        </div>
      </div>
    </van-col>
    <van-col span="6">
      <div class="button">
        <div class="flex flex-align">
          <div class="like" @click="addCollect(item)">
            <i class="iconfont" v-if='item.is_collect'>&#xe668;</i>
            <i class="iconfont" v-else>&#xe669;</i>
          </div>
          <div class="listening" @click="listening(item)">
            <i class="iconfont">&#xe617;</i>
          </div>
        </div>
        <div class="abrasion" v-if='type == "在读"'>
          <van-button plain class="theme-btn" size="small" type="primary" round @click="toBorrow(item)">磨损</van-button>
        </div>
      </div>
    </van-col>
  </van-row>
</template>
<script>
import axios from "./../../lib/js/api"

export default {
  name: 'bookCard',
  props: ['item','type'],
  data () {
    return {
      bookItem: ''
    }
  },
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
      let pureTitle = item.book_title.replace(p, '')
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
    addCollect(item,index) {
      let data = {
          params:{
            target_id: item.book_id,
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
              duration: '800',
              message: '喜欢'
            })
          }
        }
      })
    },
    toBorrow(item){
      if(item.borrow_id){
        location.href = `/book/MemberBookBroken/add/borrow_id/${item.borrow_id}?back_url=${encodeURIComponent(location.href)}`
      }
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

.abrasion .theme-btn{
  width: 100%;
  margin-top: .625rem /* 10/16 */;
}
</style>
