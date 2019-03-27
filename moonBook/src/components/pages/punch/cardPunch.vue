<template>
  <div class="flex flex-align" @click="toBookDetails(item)">
    <div class="book-cover">
      <img class="lazy" v-lazy="thumb(item.book_photo)" />
    </div>
    <div class="book-info">
      <div class="title">{{item.book_name}}</div>
      <div class="time">打卡时间：{{getTime(item.create_time)}} </div>
    </div>
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
.book-cover {
  width: 3.75rem /* 60/16 */;
  height: 3.75rem /* 60/16 */;
  margin-right: 0.625rem /* 10/16 */;
}

.time{
  color: #909399;
}
</style>
