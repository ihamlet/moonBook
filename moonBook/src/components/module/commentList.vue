<template>
  <div class="comment-list">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </div>
</template>
<script>
import axios from './../lib/js/api'
import commentCard from './../module/card/commentCrad'

export default {
  name: 'comment-card',
  components: {
    commentCard
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
    }
  },
  methods: {
    onLoad() {
      axios.get(`/book/SchoolArticleComment/getList?&post_id=${this.$route.query.id}&page=${this.page}&limit=10`).then(res => {
        // this.page++
        this.list = this.list.concat(res.data.data)
        if (this.list.length >= res.data.count) {
          this.finished = true
        }
      })
    }
  }
}
</script>
<style scoped>
</style>

