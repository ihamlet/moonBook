<template>
  <div class="card flex flex-align" @click="toBookDetails(item)">
    <van-row gutter="10" type="flex" align="center">
      <van-col span="6">
        <div class="book-cover">
          <img class="lazy" v-lazy="thumb(item.book_photo)" />
        </div>
      </van-col>
      <van-col span='18'>
        <div class="book-info">
          <div class="title" v-line-clamp:20="2" >{{item.book_name}}</div>
          <div class="time">打卡时间：{{getTime(item.create_time)}}</div>
        </div>
      </van-col>
    </van-row>
  </div>
</template>
<script>
import { format } from './../../lib/js/util'

export default {
    name:'card-punch',
    props: ['item'],
    methods: {
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
        toBookDetails(item) {
            if (item.book_id) {
                this.$router.push({
                name: 'book-details',
                query: {
                    id: item.book_id
                }
                })
            }
        },
        getTime(time){
            return format(time*1000,'HH:mm:ss')
        }
    }
}
</script>
<style scoped>
.book-cover img{
  min-width: 70px;
  min-height: 70px;
}

.time{
  color: #909399;
}

.card{
  justify-content: space-between;
}
</style>
