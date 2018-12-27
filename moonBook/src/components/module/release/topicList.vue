<template>
  <div class="topic-list">
    <van-nav-bar title="选择分类" />
    <div class="list">
      <van-cell-group>
        <div class="item" v-for='(item,index) in topicList' :key="index">
          <van-cell is-link @click="select(item)">
            <div class="theme-color">#{{item.cate_name}}</div>
          </van-cell>
        </div>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { mapGetters } from 'vuex'

export default {
  name: 'topic-list',
  computed: {
    ...mapGetters(['userDataState'])
  },
  data() {
    return {
      topicList: ''
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
      axios.get('/book/schoolArticleCate/getList').then(res => {
        this.topicList = res.data
      })
    },
    select(item){
      this.$emit('select',item)
      this.$emit('close')
    }
  }
}
</script>
<style scoped>
</style>
