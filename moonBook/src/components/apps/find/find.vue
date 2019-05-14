<template>
  <div class="find page-padding">
    <van-nav-bar :border='false' :title="$route.query.pageTitle?$route.query.pageTitle:$route.meta.title" @click-right="toRanking">
      <div class="right-icon" slot="right" v-if='!$route.query.pageTitle'>
        <van-button class="theme-btn theme-release" type="primary" size="small" round><i class="iconfont">&#xe667;</i>排行榜</van-button>
      </div>
    </van-nav-bar>
    <div class="module" v-if='isFreshListShow'>
        <freshList :list='freshList' cid="user_id" avatar="avatar" routerName='zoom' name="nickname" :key="$route.query.tag_id"/>
    </div>
    <div class="warp">
      <div class="container">
        <van-tabs color='#0084ff' :line-width='20' :line-height='4' sticky swipeable animated v-model='indexTab'>
          <van-tab v-for="(list,index) in tab" :title="list.title" :key="index">
            <div class="tab-content" v-if='index == indexTab'>
              <drying-list :cateId='list.cate_id || $route.query.cate_id' :params='list.params' type='find' :tagId='$route.query.tag_id' :school_id='$route.query.school_id' :banji_id='$route.query.banji_id'/>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <div class="release-footer-bar" v-if='$route.query.pageTitle!="育儿专栏"'>
      <van-button class="theme-btn theme-release" :class="isBtnShow?'bounceInUp animated':''" round size="normal" type="primary" @click="setReleaseSwitch(true)">
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
    ...mapGetters(['managerState','userDataState']),
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
      if(this.$route.query.tag_id || this.$route.query.cate_id){
        array.push({
          title:'全部',
          cate_id: this.$route.query.tag_id || this.$route.query.cate_id
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
          params:{
            subscribe: 1
          }
        }, {
          title: '最新',
          params:{
            sort: 'new'
          }
        }, {
          title: '推荐',
          params:{
            level: 1
          }
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
          is_random:1,
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
          cate_id: this.$route.query.tag_id || this.$route.query.cate_id,
        }
      }

      //育儿专栏 cate_id 149 做一个权限判断 is_visit
      if(this.$route.query.cate_id == 149){
        data.params.is_visit = 1
      }

      axios.get('/book/schoolArticleCate/getList',data).then(res => {
        if(res.data[0].children.length){
          this.cateList = res.data[0].children
        }
      })
    },
    toRanking(){
      this.$router.push({
        name:'ranking',
        query:{
          id: this.userDataState.child_id
        }
      })
    }
  }
}
</script>
<style scoped>
.brand-btn{
  background-image: linear-gradient(137deg,#FFC107 0%, #FF5722 100%);
  -webkit-background-clip: text;
  color: transparent;
}

.brand-btn .iconfont{
  font-size: 25px;
}
</style>

