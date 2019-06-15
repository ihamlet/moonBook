<template>
  <div class="school-list">
    <div class="fixed" :class="$route.query.type">
      <van-search placeholder="请输入学校名称" v-model="keyword" show-action shape="round" @search="onSearch">
          <div class="theme-color" slot="action" @click="onSearch">
            搜索
          </div>
      </van-search>
    </div>
    <div class="container" :class="$route.query.type">
      <van-tabs type="card" swipeable animated color='#0084ff' @change='changeTab' :border='false'>
          <van-tab :title="list.title" v-for='(list,index) in tab' :key="index">
            <van-list v-model="loading" :finished="finished" :finishedText="$store.state.slogan" @load="onLoad">
              <div class="list" v-if="list.content.length">
                <van-cell v-for="(item,itemIndex) in list.content" :key="itemIndex" is-link class="flex flex-align" @click="select(item)">
                    <schoolCard :item='item' :searchType='item.school_id > 0? "wmSearchSchool":"amapSearchSchool"'/>
                </van-cell>
              </div>
              <div class="no-list" v-else>
                尚未成功定位  <span class="theme-color" @click="toCity">城市选择</span> 
              </div>
            </van-list>
          </van-tab>
      </van-tabs>
    </div>
    <van-popup v-model="searchListShow" class="page-popup">
      <search-list prompt='搜索学校名称' type='joinSchool' @close='searchListShow = false' @select='select' />
    </van-popup>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { mapActions,mapGetters } from 'vuex'
import schoolCard from './../../module/search/schoolCard'

export default {
  name: 'school-list',
  components: {
    schoolCard  
  },
  computed: {
    ...mapGetters(['userDataState', 'userPointState'])
  },
  data() {
    return {
      keyword:'',
      tab:[{
          title:'幼儿园',
          typeCode:'141204',
          content:[],
      },{
          title:'小学',
          typeCode:'141203',
          content:[]
      }],
      list: [],
      loading: false,
      finished: false,
      searchListShow: false,
      page: 1,
      levels:'',
      tips:'',
      fees:'',
      tabIndex: 0
    }
  },
  watch: {
    keyword(val){
      this.page = 1
      this.tab[this.tabIndex].content = []
      this.onSearch(val)
    },
    userPointState(){
      this.onLoad()
    },
  },
  methods: {
    ...mapActions(['getSchoolList','getSearch']),
    changeTab(index){
        this.tabIndex = index
        this.page = 1
        this.loading = false
    },
    onLoad() {
      let arr = this.userPointState.location.split(",")

      let products = {
        page: this.page,
        lng: arr[0],
        lat: arr[1],
        school_type: this.tab[this.tabIndex].title
      }
  
      return this.getSchoolList(products).then(res => {
          if(this.page == 1){
            this.tab[this.tabIndex].content = res.data
          }else{
            this.tab[this.tabIndex].content = this.tab[this.tabIndex].content.concat(res.data)
          }
          
          this.loading = false
          this.page++
          if (this.tab[this.tabIndex].content.length >= res.count) {
            this.finished = true
          }
        })
    },
    select(item) {
      if(this.$route.query.type == 'page'){
        this.$router.push({
          name:'apps-school',
          query:{
            id: item.school_id,
            type: 'preview'
          }
        })
      }else{
        if (item.shelf_id > 0) {
          this.$router.push({
              name:'AcceptCardLevel',
              query:{
                  id: item.shelf_id
              }
          })
        } else {
          this.$toast('该学校暂未有书架')
        }
      }
    },
    onSearch(keyword){
      if(keyword){
        let arr = this.userPointState.location.split(",")

        let data = {
          keywords: keyword,
          city: this.userPointState.city,
          lng: arr[0],
          lat: arr[1],
          schoolType: this.tab[this.tabIndex].title,
          type: this.tab[this.tabIndex].typeCode
        }
  
        this.getSearch(data).then(res=>{
          if(res.resData.length){
            this.tab[this.tabIndex].content = res.resData
          }else{
            this.page = 1
            this.onLoad()
          }
        })
      }else{
        this.page = 1
        this.onLoad()
      }
    },
    toCity(){
      this.$router.push({
        name:'city'
      })
    }
  }
}
</script>
<style scoped>
.list,
.container{
    padding-top: .625rem /* 10/16 */;
}

.fixed.page{
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2019;
}

.container.page{
  padding-top: 4.0625rem /* 65/16 */;
}
</style>
