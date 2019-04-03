<template>
  <div class="bookshelf">
    <van-search v-model="keyword" placeholder="请输入搜索关键词" show-action shape="round" @search="onSearch">
      <div slot="action" class="theme-color" @click="onSearch">搜索</div>
    </van-search>
    <van-tabs color='#0084ff' @change='onChangeTab' :line-width='20' :line-height='4' sticky swipeable animated v-model="tabIndex" @click="onClick" @disabled='onClickDisabled'>
      <van-tab v-for="(list,index) in tab" :title="list.title" :key="index" :disabled='list.title=="筛选"'>
        <van-pull-refresh v-model="loading" @refresh="onRefresh" v-if='index == tabIndex'>
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="(item,itemIndex) in list.content" :key="itemIndex">
              <div class="create-time theme-color" v-if='list.title=="最新"&&timediff(item,itemIndex)'>
                {{getTimeAgo(item.create_time)}}
              </div>
              <bookCard :item='item' :type='list.title' />
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>

    <van-popup class="filter-popup" v-model="show" position="right">
      <Filter-list :filterList='selectTag' @onSelect='onSelect' @close='show = false' />
    </van-popup>
  </div>
</template>
<script>
import axios from './../lib/js/api'
import bookCard from './../module/card/bookCard'
import FilterList from './../module/mold/filterList'
import { timeago } from './../lib/js/util'

export default {
  name: 'bookshelf',
  components: {
    bookCard,
    FilterList
  },
  data() {
    return {
      page: 1,
      loading: false,
      finished: false,
      show: false,
      keyword: '',
      tabIndex: 0,
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
        },
        content: []
      }, {
        title: '最新',
        params: {
          sort: 'new',
        },
        content: []
      }, {
        title: '未读',
        params: {
          sort: 'new',
          is_read: 0
        },
        content: []
      }, {
        title: '筛选'
      }],
      selsetData: ''
    }
  },
  watch: {
    keyword(val){
      this.tab[this.tabIndex].content = []
      this.onSearch()
    }
  },
  methods: {
    onLoad() {

      let data = {
        params: {
          page: this.page
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
              this.tab[this.tabIndex].content = res.data.data
            } else {
              this.tab[this.tabIndex].content = this.tab[this.tabIndex].content.concat(res.data.data)
            }
            this.loading = false
            this.page++
            if (this.tab[this.tabIndex].content.length >= res.data.count) {
              this.finished = true
            }
            break
          case 0:
            this.page = 1
            this.loading = false
            this.finished = true
            this.tab[this.tabIndex].content = []
            break
        }
      })
    },
    onRefresh() {
      this.page = 1
      this.onLoad().then(() => {
        this.loading = false
      })
    },
    onChangeTab(index) {
      this.tabIndex = index
      this.page = 1
      this.loading = true
      this.finished = false
      this.onRefresh()
    },
    onSearch() {
      this.page = 1
      this.loading = true
      this.finished = false
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
    onSelect(params) {
      this.selsetData = params
      this.page = 1
      this.loading = true
      this.finished = false
      this.onRefresh()
    },
    getTimeAgo(time){
      return timeago(time*1000)
    },
    timediff(item,itemIndex){
      if(itemIndex == 0){
        return true
      }

      if(itemIndex){
        let timeHistory = timeago(this.tab[this.tabIndex].content[itemIndex-1].create_time * 1000)
        let time = timeago(item.create_time*1000)
        if(timeHistory == time){
          return false
        }else{
          return true
        }
      }

    }
  }
}
</script>
<style>
.create-time{
  height: 2.25rem /* 36/16 */;
  padding-left: .3125rem /* 5/16 */;
  line-height: 2.25rem /* 36/16 */;
  font-weight: 700;
  position: relative;
  margin-bottom: .625rem /* 10/16 */;
}

.create-time::before{
  content: '';
  position: absolute;
  bottom: 0;
  width: 1.875rem /* 30/16 */;
  height: .1875rem /* 3/16 */;
  background: #0084ff;
}
</style>
