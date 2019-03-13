<template>
  <div class="school-list">
    <div class="fixed-bar">
      <search-bar prompt='搜索学校名称' @show='searchListShow = true' />
    </div>
    <div class="container">
    <van-tabs type="card" swipeable animated color='#409eff' @change='changeTab'>
        <van-tab :title="list.title" v-for='(list,index) in tab' :key="index">
            <div class="list">
                <van-list v-model="loading" :finished="finished" :finishedText="$store.state.slogan" @load="onLoad" v-if='index == tabIndex'>
                    <van-cell v-for="(item,itemIndex) in list.content" :key="itemIndex" is-link class="flex flex-align" @click="select(item)">
                    <div class="item">
                        <div class="school-info">
                        <div class="school-name">
                            {{item.title}}
                        </div>
                        <div class="school-address" v-line-clamp:20="1">
                            {{item.addr}}
                        </div>
                        </div>
                    </div>
                    </van-cell>
                </van-list>
            </div>
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
import searchBar from './../../module/search/searchBar'
import searchList from './../../module/search/schoolList'

export default {
  name: 'school-list',
  components: {
    searchBar,
    searchList  
  },
  computed: {
    ...mapGetters(['userDataState', 'userPointState'])
  },
  data() {
    return {
      tab:[{
          title:'幼儿园',
          content:[],
      },{
          title:'小学',
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
  methods: {
    ...mapActions(['getSchoolList']),
    changeTab(index){
        this.tabIndex = index
        this.page = 1
    },
    onLoad() {
      let arr = this.userPointState.location.split(",")

      let products = {
        page: this.page,
        lng: arr[0],
        lat: arr[1],
        school_type: this.tab[this.tabIndex].title
      }

      this.getSchoolList(products).then(res => {
        this.tab[this.tabIndex].content = this.tab[this.tabIndex].content.concat(res.data)
        this.loading = false
        this.page++
        if (this.tab[this.tabIndex].content.length >= res.count) {
          this.finished = true
        }
      })
    },
    select(item) {
      if (item.shelf_id > 0) {
        this.$router.push({
            name:'AcceptCardLevel',
            query:{
                id: item.shelf_id
            }
        })
      } else {
        this.$notify('该学校暂未有书架')
      }
    }
  }
}
</script>
<style scoped>
.school-name {
  color: #303133;
  font-size: 1rem /* 16/16 */;
}

.school-address {
  color: #909399;
}

.list,
.container{
    padding-top: .625rem /* 10/16 */;
}
</style>
