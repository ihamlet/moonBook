<template>
  <div class="video">
    <van-cell :value="title" />
    <div class="scroll-x">
      <div class="video-list flex">
        <div class="video-item scroll-item" v-for='(item,index) in videoList' :key="index" @click="toVideoPage(item)">
          <div class="video">
            <div class="video-cover">
              <img :src="item.cover" :alt="`视频封面-${index}`">
            </div>
            <div class="video-info">
              <div class="item"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from './../lib/js/api'
import { } from './../lib/js/util'

export default {
  name: 'Video',
  props: ['title'],
  data() {
    return {
      videoList:[]
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
      if (this.$route.query.user_id) {
        axios.get(`/book/SchoolArticle/getList?sort=post&user_id=${this.$route.query.user_id}`).then(res => {
          let arr = []
          if(res.data.status == 1){
            let array = res.data.data
            array.forEach(element => {
              if(element.hasvideo == 1)
              arr.push(element)
            })
          }
          this.videoList = arr
        })
      }
    },
    toVideoPage(item){
      this.$router.push({
        name:'video-page',
        query:{
          id: item.post_id,
          user_id: this.$route.query.user_id,
          back: this.$route.name
        }
      })
    }
  }
}
</script>
<style scoped>
.video-list {
  margin-left: 0.9375rem /* 15/16 */;
}

.video-item {
  width: 12.5rem /* 200/16 */;
  height: 7.03125rem /* 112.5/16 */;
  overflow: hidden;
  margin-right: 0.625rem /* 10/16 */;
  position: relative;
  border-radius: .3125rem /* 5/16 */;
}
</style>
