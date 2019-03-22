<template>
  <div class="bookshelf">
    <van-search v-model="keyword" placeholder="请输入搜索关键词" shape="round" @search="onSearch">
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
    <van-tabs color='#409eff' @change='onChangeTab' :line-width='20' :line-height='4' sticky swipeable animated v-model="tabIndex" @click="onClick" @disabled='onClickDisabled'>
      <van-tab v-for="(list,index) in tab" :title="list.title" :key="index" :disabled='list.title=="筛选"'>
        <van-pull-refresh v-model="loading" @refresh="onRefresh" v-if='index == tabIndex'>
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="(item,itemIndex) in list.content" :key="itemIndex">
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
  methods: {
    onLoad() {

      let data = {
        params: {
          page: this.page,
          child_id: this.$route.query.id
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
    }
  }
}
</script>
<style>
</style>
