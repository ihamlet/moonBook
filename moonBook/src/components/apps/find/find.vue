<template>
  <div class="find page-padding">
    <van-nav-bar :border='false' :title="$route.query.pageTitle?$route.query.pageTitle:$route.meta.title"/>
      <div class="module" v-if='isFreshListShow'>
        <freshList :list='freshList' cid="user_id" avatar="avatar" routerName='zoom' name="nickname" :key="$route.query.tag_id"/>
      </div>
    <div>
      <div class="container">
        <van-tabs color='#0084ff' :line-width='20' :line-height='4' sticky swipeable animated v-model='indexTab'>
          <van-tab v-for="(list,index) in tab" :title="list.title" :key="index">
            <div class="tab-content" v-if='index == indexTab'>
              <drying-list :cateId='list.cate_id' :sort='list.sort' type='find' :tagId='$route.query.tag_id' :school_id='$route.query.school_id' :banji_id='$route.query.banji_id'/>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <div class="release-footer-bar">
      <van-button class="theme-btn" :class="isBtnShow?'bounceInUp animated':''" round size="normal" type="primary" @click="setReleaseSwitch(true)">
        <i class="iconfont">&#xe664;</i>
        发 布
      </van-button>
      <van-popup v-model="show" class="tips-popup" :overlayStyle='{backgroundColor:"transparent"}' get-container='.footer-bar' :lock-scroll='false'>
        <tips :isShow='show' position='bottom' @close='setReleaseSwitch(false)' :cate='cateList[indexTab -1]'/>
      </van-popup>
    </div>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import freshList from './../../module/findModule/freshList'
import dryingList from './../../module/findModule/dryingList'
import tips from './../../module/release/tips'
import { mapGetters,mapMutations,mapState } from 'vuex'

export default {
  name: 'find',
  components: {
    freshList,
    dryingList,
    tips
  },
  computed: {
    ...mapState(['releaseSwitch']),
    ...mapGetters(['managerState']),
    isFreshListShow(){
      let boolean = true
      if(this.$route.query.cate_id || this.$route.query.tag_id){
        boolean = false
      }

      return boolean
    },
    show:{
      get(){
        return this.releaseSwitch
      },
      set(val){
        this.setReleaseSwitch(val)
      }
    },
    tab(){
      let array = []
      if(this.$route.query.tag_id){
        array.push({
          title:'全部',
          cate_id: this.$route.query.tag_id
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
      topicList: [],
      isBtnShow: false
    }
  },
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = false //去掉页面数据缓存
    next()
  },
  created() {
    this.fetchData()
    this.$nextTick(()=>{
      this.isBtnShow = true
    })
  },
  watch: {
    '$router': 'fetchData'
  },
  methods: {
    ...mapMutations(['setReleaseSwitch']),
    fetchData() {
      let data = {
        params:{
          tid: this.$route.query.tag_id || ''
        }
      }

      axios.get('/book/SchoolArticle/recommendUsers',data).then(res => {
          this.freshList = res.data
      })

      this.getCate()
    },
    getCate(){
      let data = {
        params:{
          cate_id: this.$route.query.tag_id
        }
      }

      axios.get('/book/schoolArticleCate/getList',data).then(res => {
          this.cateList = res.data[0].children
      })
    }
  }
}
</script>
<style scoped>
</style>

