<template>
  <div class="find page-padding">
    <van-nav-bar :title="$route.query.pageTitle?$route.query.pageTitle:$route.meta.title" left-text="首页" left-arrow @click-left="onClickLeft"/>
    <div class="module" v-if='!$route.query.cid'>
       <freshList :list='freshList' cid="user_id" avatar="avatar" routerName='zoom' name="nickname"/>
    </div>
    <div>
      <div class="container">
        <van-tabs color='#409eff' :line-width='20' :line-height='4' sticky swipeable animated v-model='indexTab'>
          <van-tab v-for="(list,index) in tab" :title="list.title" :key="index">
            <div class="tab-content" v-if='index == indexTab'>
              <drying-list :cateId='list.cate_id' :sort='list.sort' type='find' :tid='$route.query.tid' :cid='$route.query.cid' :school_id='$route.query.school_id' :banji_id='$route.query.banji_id'/>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import freshList from './../../module/findModule/freshList'
import dryingList from './../../module/findModule/dryingList'
import { mapGetters } from 'vuex'

export default {
  name: 'find',
  components: {
    freshList,
    dryingList
  },
  computed: {
    ...mapGetters(['managerState']),
    tab(){
      let array = []
      if( this.$route.query.tid ){
        array = [{
          title:'亲子阅读' 
        }]
      }else if(this.$route.query.cid){
        array.push({
          title:'全部',
          cate_id: this.$route.query.cid
        })
        if(this.cateList){
          this.cateList.forEach(element => {
            let data = {
              title: element.cate_name,
              cate_id: element.cate_id
            }

            array.push(data)
          }) 
        }
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
      cateList: '',
      freshList: [],
      topicList: []
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
          tid: this.$route.query.tid || ''
        }
      }

      axios.get('/book/SchoolArticle/recommendUsers',data).then(res => {
        if(res.status == 200){
          this.freshList = res.data
        }
      })

      this.getCate()
    },
    getCate(){
      let data = {
        params:{
          cate_id:this.$route.query.cid
        }
      }

      axios.get('/book/schoolArticleCate/getList',data).then(res => {
        if(res.status == 200){
          this.cateList = res.data[0].children
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

