<template>
  <div class="find page-padding">
    <van-nav-bar :title="$route.query.pageTitle?$route.query.pageTitle:$route.meta.title" left-text="首页" left-arrow @click-left="onClickLeft"/>
    <lazy-component class="module">
       <freshList :list='freshList' cid="user_id" avatar="avatar" routerName='zoom' name="nickname"/>
    </lazy-component>
    <lazy-component>
      <div class="container">
        <van-tabs color='#409eff' :line-width='20' :line-height='4' sticky swipeable animated v-model='indexTab'>
          <van-tab v-for="(list,index) in tab" :title="list.title" :key="index">
            <div class="tab-content">
              <drying-list :sort='list.sort' type='find' :tid='$route.query.tid'/>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </lazy-component>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import freshList from './../../module/findModule/freshList'
import dryingList from './../../module/findModule/dryingList'

export default {
  name: 'find',
  components: {
    freshList,
    dryingList
  },
  computed: {
    tab(){
      let array = []
      if( this.$route.query.tid ){
        array = [{
          title:'亲子阅读' 
        }]
      }else{
        array = [{
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
      return array
    }
  },
  data() {
    return {
      indexTab:1,
      freshList: []
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
      let data = {
        params:{
          tid: this.$route.query.tid
        }
      }

      axios.get('/book/SchoolArticle/recommendUsers',data).then(res => {
        if(res.data.status == 1){
          this.freshList = res.data
        }
      })
    },
    onClickLeft(){
      this.$router.push({
        name:'home'
      })
    }
  }
}
</script>
<style scoped>
</style>

