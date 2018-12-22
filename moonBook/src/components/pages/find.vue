<template>
  <div class="find page-padding">
    <van-nav-bar :title="$route.meta.title" />
    <lazy-component class="module">
       <freshList :list='freshList' cid="user_id" avatar="avatar" routerName='zoom' name="nickname"/>
    </lazy-component>
    <lazy-component>
      <div class="container">
        <van-tabs color='#409eff' :line-width='20' sticky swipeable animated>
          <van-tab v-for="(list,index) in tab" :title="list.title" :key="index">
            <div class="tab-content">
              <drying-list :sort='list.sort' />
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </lazy-component>
  </div>
</template>
<script>
import axios from './../lib/js/api'
import freshList from './../module/findModule/freshList'
import dryingList from './../module/findModule/dryingList'

export default {
  name: 'find',
  components: {
    freshList,
    dryingList
  },
  data() {
    return {
      freshList: [],
      tab: [{
        title: '关注',
        sort: 'subscribe',
      }, {
        title: '最新',
        sort: 'new',
      }, {
        title: '推荐',
        sort: 'tuijian',
      }]
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
      axios.get('/book/SchoolArticle/recommendUsers').then(res => {
        this.freshList = res.data
      })
    }
  }
}
</script>
<style scoped>
</style>

