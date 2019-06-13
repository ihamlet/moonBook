<template>
  <div class="read-amount">
    <van-nav-bar :zIndex='10' :border='false' :title="$route.meta.title" fixed @click-right="onClickRight">
      <div class="right-btn" slot="right">
        <van-button class="theme-btn" round size="small" type="primary">捐书</van-button>
      </div>
    </van-nav-bar>
    <van-tabs color='#0084ff' :line-width='20' :line-height='4' sticky swipeable animated :offsetTop="45" @change="onChangeTab" :ellipsis='false'>
      <van-tab v-for="(list,index) in readArray" :key="index" :title="`${list.title}(${list.num})`">
        <van-pull-refresh v-model="loading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
              <!-- <van-notice-bar text="代还还有2本逾期，产生逾期费用4元，逾期为1元/本/天，从押金中扣除" left-icon="volume-o" v-if='list.title=="读过"||list.title=="在读"'/> -->
              <div class="tab-jianshu" v-if='list.title == "捐书"'>
                  <van-tabs type="card" color='#0084ff' @click="onClickTab">
                    <van-tab :title="tabTitle" v-for='(tabTitle,tabTitleIndex) in donationTab' :key="tabTitleIndex"></van-tab>
                  </van-tabs>
              </div>
              <div class="switch-api" v-if='list.content.length'>
                <div class="content">
                  <div class="kings flex flex-align" v-if='list.title =="未读" '>
                    <div class="bar-title">阅读进度</div>
                    <div class="kings-box flex flex-align">
                      <div class="num">{{childInfo.read_kinds}}/{{childInfo.shelf_tushu_kinds}}</div>
                      <div class="filter" @click="show = true"><i class="iconfont theme-color">&#xe631;</i></div>
                    </div>
                  </div>
                  <van-cell v-for="(item,itemIndex) in list.content" :key="itemIndex">
                    <bookCard :item='item' :type='list.title' @book_collect='onBookCollect'/>
                  </van-cell>
                </div>
              </div>
              <div class="no-content" v-else>
                暂无数据
              </div>
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
          content: '',
          api: '/book/member/get_borrows',
          params: {
            is_return: 0,
            page: 1,
            limit: 20
          },
          count: 0,
          convert(item) {
            item.book_title = item.book.title
            item.book_photo = item.book.photo
            item.pos_name = item.pos_title
            item.borrow_id = item.id
            item.book_views = item.book.views
          }
        }, {
          title: '读过',
          num: 0,
          content: '',
          api: '/book/member/get_borrows',
          params: {
            is_return: 0,
            page: 1,
            limit: 20
          },
          count: 0,
          convert(item) {
            item.book_title = item.book.title
            item.book_photo = item.book.photo
            item.pos_name = item.pos_title
            item.book_views = item.book.views
          }
        },{
          title: '收藏',
          num: 0,
          content: '',
          api: '/book/member/get_favorites',
          params: {
            page: 1,
            limit: 20,
            type: 'book'
          },
          convert(item) {
            if(item.Tushu) {
              item.book_title = item.Tushu.title
              item.book_photo = item.Tushu.photo   
              item.book_id = item.target_id     
              item.book_views = item.Tushu.views
            }            
          }
        }, {
          title: '磨损',
          num:0,
          content: '',
          api: '/book/member/get_brokens',
          params: {
            page: 1,
            limit: 20
          },
          convert(item) {
            item.book_title = item.book.title
            item.book_photo = item.book.photo
            item.pos_name = item.pos_title
            item.book_views = item.book.views
          }
        },{
          title: '未读',
          num: 0,
          content: '',
          api: '/book/school/get_books',
          params: {
            page: 1,
            limit: 20
          },
          convert(item) {
            item.book_title = item.title
            item.book_photo = item.photo
            item.book_id = item.tushu_id
            item.book_views = item.views
          }
        },{
          title: '捐书',
          num: 0,
          content: '',
          api: '/book/member/get_donations',
          params: {
            page: 1,
            limit: 20,
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
      tabIndex: 0,
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
      bookStatus:{}
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
      return axios.get(tab.api,{params: tab.params}).then(res => {
        this.loading = false
          if(res.data.status == 1) {
            tab.num = res.data.count
            let list = res.data.data
              if (tab.convert) {
                list.map(item=>tab.convert(item))
              }

              if(tab.params.page == 1) {                
                tab.content = list
              } else {
                tab.content = tab.content.concat(list)
                this.$forceUpdate()
              }
            
              tab.params.page++
              this.finished = false


            if (list.length >= res.data.count) {
              this.finished = true
            }
          } else {
            this.finished = true
          }
      })
    },
    onRefresh() {
      let tab = this.readArray[this.tabIndex]
      tab.params.page = 1
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
      this.tabIndex = index
      this.onRefresh()
      this.readArray[this.tabIndex].params.is_check = 1
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
    onBookCollect(e) {       
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

.no-content {
  height: 12.5rem /* 200/16 */;
  text-align: center;
  line-height: 12.5rem /* 200/16 */;
  background: #fff;
  color: #c0c4cc;
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
