<template>
  <div class="read-amount page-padding">
    <van-nav-bar :zIndex='10' :border='false' :title="$route.meta.title" fixed @click-right="onClickRight">
      <div class="right-btn" slot="right">
        <van-button class="theme-btn" round size="small" type="primary">捐书</van-button>
      </div>
    </van-nav-bar>

     <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <van-search placeholder="请输入搜索关键词" v-model="value" @search="onSearch" shape='round'/>
      <van-tabs color='#0084ff' v-model="tabIndex" :line-width='20' :line-height='4' sticky swipeable animated :offsetTop="45" @change="onChangeTab" :border='false'>
        <van-tab v-for="(item,index) in readArray" :key="index">
            <div class="tab-title" slot="title">
              {{item.title}}
            </div>
        
              <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">        
                <div class="tab-jianshu" v-if='item.title == "捐书"'>
                  <van-tabs type="card" color='#0084ff' @click="onClickTab">
                    <van-tab :title="tabTitle" v-for='(tabTitle,tabTitleIndex) in donationTab' :key="tabTitleIndex"></van-tab>
                  </van-tabs>
                </div>

                <div class="kings flex flex-align" v-if='item.title =="未读" '>
                  <div class="bar-title">阅读进度</div>
                  <div class="kings-box flex flex-align">
                    <div class="num">{{childInfo.read_kinds}}/{{childInfo.shelf_tushu_kinds}}</div>
                    <div class="filter" @click="show = true"><i class="iconfont theme-color">&#xe631;</i></div>
                  </div>
                </div>

                <div class="list" v-if='list.length'>
                  <van-cell v-for="(book,bookIndex) in list" :key="bookIndex">
                    <bookCard :item='book'/>
                  </van-cell>
                </div>
                <div class="no-list" v-else>
                  暂无数据
                </div>
              </van-list>
        </van-tab>
      </van-tabs>
    </van-pull-refresh>
    <van-popup class="filter-popup" v-model="show" position="right">
      <Filter-list :filterList='selectTag' @onSelect='onSelect' @close='show = false' />
    </van-popup>
  </div>
</template>
<script>
import axios from './../lib/js/api'
import FilterList from './../module/mold/filterList'
import bookCard from './../module/card/bookCard'
import { mapGetters } from 'vuex'

export default {
  name: "readAmount",
  components: {
    FilterList,
    bookCard
  },
  computed: {
    readArray() {
      let arr = []
      if (this.childInfo) {
        arr = [{
          title: '在读',
          num: 0,
          api: '/book/member/get_borrows',
          params: {
            is_return: 0
          },
          count: 0,
          convert(item) {
            return {
              book_title: item.book.title,
              book_photo: item.book.photo,
              pos_name: item.pos_title,
              borrow_id: item.id,
              book_views: item.book.views,
              book_id: item.book_id
            }
          }
        }, {
          title: '读过',
          num: 0,
          api: '/book/member/get_borrows',
          params: {
            is_return: 1
          },
          count: 0,
          convert(item) {
            return {
              book_title: item.book.title,
              book_photo: item.book.photo,
              pos_name: item.pos_title,
              book_views: item.book.views,
              book_id: item.book_id
            }
          }
        },{
          title: '收藏',
          num: 0,
          api: '/book/member/get_favorites',
          params: {
            type: 'book'
          },
          convert(item) {
            if(item.Tushu) {
              return {
                book_title: item.Tushu.title,
                book_photo: item.Tushu.photo,
                book_id: item.target_id,
                book_views: item.Tushu.views
              }
            }            
          }
        }, {
          title: '磨损',
          num:0,
          api: '/book/member/get_brokens',
          params:{
            is_broke:1
          },
          convert(item) {
            return {
              book_title: item.book.title,
              book_photo: item.book.photo,
              pos_name: item.pos_title,
              book_views: item.book.views
            }
          }
        },{
          title: '未读',
          num: 0,
          api: '/book/school/get_books',
          params:{
            is_read:0
          },
          convert(item) {
            return {
              book_title: item.title,
              book_photo: item.photo,
              book_id: item.tushu_id,
              book_views: item.views
            }
          }
        },{
          title: '捐书',
          num: 0,
          api: '/book/member/get_donations',
          params: {
            is_check: 1
          }
        }]
      }

      return arr
    },
    rendStatus(){
      let status

      if(this.bookStatus.overdue_count > 0){
        status = `待还还有${this.bookStatus.overdue_count}本逾期`
      }

    }
  },
  data() {
    return {
      show: false,
      page: 1,
      loading: false,
      finished: false,
      childInfo: '',
      tabIndex: sessionStorage.getItem('readAmountTabIndex') || 0,
      isCheck: 1,
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
      donationTab:['已捐书','待审核','未通过'],
      selsetData: '',
      bookStatus:{},
      page: 1,
      list:[],
      value:''
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$router': 'fetchData',
    value(val){
      this.onSearch()
    }
  },
  methods: {
    fetchData() {
      let data = {
        params:{
          child_id: this.$route.query.id
        }
      }

      axios.get('/book/baby/getInfo',data).then(res => {
        this.childInfo = res.data.data
      })

      axios.get('/book/MemberBorrow/getMyBookStat').then(res=>{
        this.bookStatus = res.data.data
      })
    },
    onClickRight() {
      window.location.href = '/book/member/entry_donation'
    },
    getList() {    
      let tab = this.readArray[this.tabIndex]

      let data = {
        params:{
          ...tab.params,
          page: this.page,
          keyword: this.value
        }
      }

      return axios.get(tab.api,data).then(res => {
            switch(res.data.status){
              case 1:
                let arr = res.data.data.map(e=>{
                   return tab.convert(e)
                })

                if(this.page == 1){
                  this.list = arr
                }else{
                  this.list = this.list.concat(arr)
                }

                this.page++
                this.loading = false

                if(this.list.length >= res.data.count){
                  this.finished = true
                }

                break
              default:
                this.$toast(res.data.msg)
            }
      })
    },
    onRefresh() {
      this.page = 1
      this.getList().then(() => {
        this.loading = false
        this.finished = false
      })
    },
    onSelect(params) {
      this.selsetData = params
      this.onRefresh()
    },
    onLoad() {
      this.getList()
    },
    onChangeTab(index) {
      this.list = []
      this.tabIndex = index
      this.onRefresh()
      sessionStorage.setItem('readAmountTabIndex',index)
    },
    onClickTab(index,title){
      switch(title){
        case '已捐书':
          this.isCheck = 1
        break
        case '待审核':
          this.isCheck = 0
        break
        case '未通过':
          this.isCheck = 2
        break
      }
      
      this.readArray[this.tabIndex].params.is_check = this.isCheck
      this.readArray[this.tabIndex].params.page = 1
      this.onRefresh()
    },
    onSearch(){
      this.onRefresh()
    }
  }
}
</script>
<style scoped>
.amount-item {
  flex: 1;
  text-align: center;
  background: #fff;
  padding: 0.625rem /* 10/16 */ 0;
}

.amount-item.pitchOn {
  color: #0084ff;
  font-weight: 700;
}

.read-amount {
  padding-top: 2.8125rem /* 45/16 */;
}

.amount-type {
  margin-bottom: 0.3125rem /* 5/16 */;
}

.amount-list {
  position: relative;
}

.lead-card {
  padding: 0.625rem /* 10/16 */;
}

.tab-text,
.tab-num {
  height: 1.375rem /* 22/16 */;
  line-height: 1.375rem /* 22/16 */;
}

.kings {
  height: 1.875rem /* 30/16 */;
  line-height: 1.875rem /* 30/16 */;
  padding: 0.625rem /* 10/16 */;
  background: #fff;
}

.kings-box {
  flex: 1;
  justify-content: space-between;
}

.bar-title {
  margin-right: 0.3125rem /* 5/16 */;
}

.filter i.iconfont {
  font-size: 1.5rem /* 24/16 */;
}

.tab-jianshu{
  padding: .625rem /* 10/16 */ 0;
  background: #fff;
}
</style>
