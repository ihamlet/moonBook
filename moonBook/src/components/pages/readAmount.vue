<template>
  <div class="read-amount page-padding">
    <div class="banner" @click="onClickRight">
      <van-button class="theme-plain" plain round type="primary">前往捐书</van-button>
      <img src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/banner/banner-juanshu.png" />
    </div>

    <div class="refresh-container">
      <van-pull-refresh v-model="loading" @refresh="onRefresh">
        <form action="/">
          <van-search placeholder="请输入搜索关键词" v-model="value" @search="onSearch" shape='round'/>
        </form>
        <van-tabs color='#0084ff' v-model="tabIndex" :line-width='20' :line-height='4' sticky swipeable animated @change="onChangeTab" :border='false'>
          <van-tab v-for="(item,index) in readArray" :key="index">
              <div class="tab-title" slot="title">
                {{item.title}} <van-tag class="tab-tag" type="danger" round v-if='bookStatus[item.key] > 0'>{{bookStatus[item.key]}}</van-tag>
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
                      <bookCard :item='book' :isCollect="book.is_collect"/>
                    </van-cell>
                  </div>
                  <div class="no-list" v-else>
                    暂无数据
                  </div>
                </van-list>
          </van-tab>
        </van-tabs>
      </van-pull-refresh>
    </div>
    <van-popup class="filter-popup" v-model="show" position="right">
      <Filter-list :filterList='selectTag' @onSelect='onSelect' @close='show = false' />
    </van-popup>
  </div>
</template>
<script>
import axios from './../lib/js/api'
import FilterList from './../module/mold/filterList'
import bookCard from './../module/card/bookCard'

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
          key:'reading_count',
          params: {
            is_read: 1
          },
        }, {
          title: '读过',
          key:'read_count',
          params: {
            is_read: 2
          }
        },{
          title: '收藏',
          key:'favorite_count',
          params: {
            is_collect:1
          }
        }, {
          title: '磨损',
          key:'broken_count',
          params:{
            is_broke:1
          }
        },{
          title: '未读',
          params:{
            is_read:0
          }
        },{
          title: '捐书',
          params: {
            is_donate: 1
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

      return status
    }
  },
  data() {
    return {
      show: false,
      page: 1,
      loading: false,
      finished: false,
      childInfo: '',
      tabIndex: sessionStorage.getItem('readAmountTabIndex')?sessionStorage.getItem('readAmountTabIndex'):0,
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
      list:[],
      value:''
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$router': 'fetchData',
    value(){
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
    onLoad() {    
      let tab = this.readArray[this.tabIndex]

      let data = {
        params:{
          ...tab.params,
          page: this.page,
          keyword: this.value          
        }
      }


      if(this.tabIndex == 4){
        data.params = {
          ...data.params,
          ...this.selsetData
        }
      }

      return axios.get('/book/shelfBook/getList',data).then(res => {
            switch(res.data.status){
              case 1:{
                let arr = res.data.data.map(e=>{
                   return {
                      ...e,
                      book_title: e.title,
                      book_photo: e.thumb
                   }
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
              }
              default:
                this.$toast(res.data.msg)
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
    onSelect(params) {
      this.selsetData = params
      this.onRefresh()
    },
    onChangeTab(index) {
      this.list = []
      this.tabIndex = index
      this.onRefresh()
      sessionStorage.setItem('readAmountTabIndex',index)
    },
    onClickTab(index,title){
      let donate

      switch(title){
        case '已捐书':
          donate = 1
        break
        case '待审核':
          donate = 0
        break
        case '未通过':
          donate = 2
        break
      }
      
      this.readArray[this.tabIndex].params.is_donate = donate
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

.banner{
  position: fixed;
  top: 0;
}

.banner::before{
  content:'';
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .5);
  position: absolute;
}

.banner .theme-plain{
  position: absolute;
  left: 50%;
  top: 35px;
  transform: translate3d(-50%, 0, 0);
}

.tab-title{
  position: relative;
}

.tab-title .tab-tag{
  position: absolute;
  top: 5px;
  right: 0;
}

.refresh-container{
  margin-top: 100px;
}
</style>
