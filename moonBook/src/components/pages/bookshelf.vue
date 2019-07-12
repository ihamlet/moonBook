<template>
  <div class="bookshelf">
    <form action="/">
      <van-search v-model="keyword" placeholder="请输入搜索关键词" shape="round" @search="onSearch" >
        <div class="card-school-name theme-color" v-line-clamp:20="1" slot="label" @click="toShcoolHome">{{userDataState.card_school_name}}</div>
      </van-search>
    </form>
    <van-tabs color='#0084ff' @change='onChangeTab' :line-width='20' :line-height='4' sticky swipeable animated v-model="tabIndex" @click="onClick" @disabled='onClickDisabled' title-inactive-color='#303133' :border='false'>
      <div class="new-point" slot='nav-right' v-if='isNewPointShow'></div>
      <van-tab v-for="(item,index) in tab" :title="item.title" :key="index" :disabled='item.title=="筛选"'>
        <van-pull-refresh v-model="loading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
            <van-cell v-for="(book,itemIndex) in list" :key="itemIndex">
              <div class="create-time theme-color" v-if='item.title=="最新"&&timediff(book,itemIndex)'>
                {{getTimeAgo(book.create_time)}}
              </div>
              <bookCard :item='book' :isCollect="book.is_collect" @like='likeBook' />
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>

    <van-popup class="filter-popup" v-model="show" position="right">
      <Filter-list :filterList='selectTag' @onSelect='onSelect' @refresh='onReset' @close='show = false' />
    </van-popup>
  </div>
</template>
<script>
import axios from './../lib/js/api'
import bookCard from './../module/card/bookCard'
import FilterList from './../module/mold/filterList'
import { format } from './../lib/js/util'
import { mapGetters } from 'vuex'
import { likeBook } from './../lib/js/mixin'

export default {
  name: 'bookshelf',
  mixins: [likeBook],
  components: {
    bookCard,
    FilterList
  },
  computed: {
    ...mapGetters(['userDataState']),
    isNewPointShow(){
      let boolean = false

      let day = 86400*7000
      let newDate = Date.parse(new Date())

      if(this.newBookDate){
        if(newDate >  this.newBookDate  &&  newDate < this.newBookDate + day ){
          boolean = true
        }else{
          boolean = false
        }
      }

      return boolean
    } 
  },
  data() {
    return {
      page: 1,
      loading: false,
      finished: false,
      show: false,
      keyword: '',
      tabIndex: 1,
      selectTag: [{
        title: '年龄',
        arr: ['3-5', '5-6']
      }, {
        title: '分类',
        arr: ['绘本', '寓言故事', '童话', '科普', '3D', 'VR', '故事汇']
      }, {
        title: '所在层数',
        arr: ['一层', '二层', '三层', '四层', '五层', '六层']
      }],
      tab: [{
        title: '最热',
        params: {
          sort: 'hot',
        }
      }, {
        title: '最新',
        params: {
          sort: 'new',
        }
      },{
        title: '筛选'
      }],
      list:[],
      selsetData: '',
      newBookDate:''
    }
  },
  watch: {
    keyword(){
      this.list = []
      this.onSearch()
    }
  },
  methods: {
    onLoad() {

      let data = {
        params: {
          page: this.page,
          child_id: this.userDataState.child_id,
          card_id: this.userDataState.card_id
        }
      }

      switch (this.tab[this.tabIndex].title) {
        case '最热':
          data.params.sort = 'hot'
          break
        case '最新':
          data.params.sort = 'new'
          break
        case '未读':
          data.params.sort = 'new'
          data.params.is_read = 0
          break
      }

      if (this.selsetData) {
        data.params.tag = this.selsetData.tag
        data.params.floor = this.selsetData.floor
      }

      if(this.keyword){
        data.params.keyword = this.keyword
      }

      return axios.get('/book/SchoolShelfBook/getList', data).then(res => {
        switch (res.data.status) {
          case 1:
            if (this.page == 1) {
              this.list = res.data.data
              this.newBookDate = res.data.data[0].create_time*1000
            } else {
              this.list = this.list.concat(res.data.data)
            }
            
            this.page++
            this.loading = false
            
            if (this.list.length >= res.data.count) {
              this.finished = true
            }
            break
          case 0:
            this.page = 1
            this.loading = false
            this.finished = true
            this.list = []
            break
        }
      })
    },
    onRefresh() {
      this.page = 1
      this.onLoad().then(() => {
        this.loading = false
        this.finished = false
      })
    },
    onChangeTab(index) {
      this.tabIndex = index
      this.onRefresh()
    },
    onSearch() {
      this.onRefresh()
    },
    onClick(index) {
      if (index == 3) {
        this.show = true
      }
    },
    onClickDisabled() {
      this.show = true
    },
    onReset(){
      this.selsetData = ''
      this.onRefresh()
    },
    onSelect(params) {
      this.show = false
      this.selsetData = params
      this.onRefresh()
    },
    getTimeAgo(time){
      return format(time*1000,'yyyy-MM-dd')
    },
    timediff(item,itemIndex){
      if(itemIndex == 0){
        return true
      }

      if(itemIndex){
        let timeHistory = this.list[itemIndex-1]?format(this.list[itemIndex-1].create_time * 1000,'yyyy-MM-dd'):0
        let time = format(item.create_time*1000,'yyyy-MM-dd')
        if(timeHistory == time){
          return false
        }else{
          return true
        }
      }
    },
    toShcoolHome(){
      if(this.userDataState.card_school_id > 0){
        this.$router.push({
          name:'apps-school',
          query:{
            id: this.userDataState.card_school_id
          }
        })
      }
    }
  }
}
</script>
<style scoped>
.new-point{
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: red;
  position: absolute;
  left: 50%;
  top: 10px;
  transform: translate3d(250%, 0, 0);
}

.card-school-name{
  max-width: 100px;
}
</style>