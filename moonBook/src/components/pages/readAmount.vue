<template>
  <div class="read-amount">
    <van-nav-bar :zIndex='10' :border='false' :title="$route.meta.title" left-text="返回" fixed left-arrow @click-left="onClickLeft" @click-right="onClickRight">
      <div class="right-btn" slot="right">
        <van-button class="theme-btn" round size="small" type="primary">捐书</van-button>
      </div>
    </van-nav-bar>
    <van-tabs color='#409eff' :line-width='20' :line-height='4' sticky swipeable animated :offsetTop="45" @change="onChangeTab" :ellipsis='false'>
      <van-tab v-for="(list,index) in readArray" :key="index" :title="`${list.title}(${list.num})`">
        <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad" v-show='index == tabIndex'>
          <van-pull-refresh v-model="loading" @refresh="onRefresh">
            <van-notice-bar text="代还还有2本逾期，产生逾期费用4元，逾期为1元/本/天，从押金中扣除" left-icon="volume-o" v-if='list.title=="读过"||list.title=="在读"'/>

            <div class="tab-jianshu" v-if='list.title == "捐书"'>
                <van-tabs type="card" color='#409eff' @click="onClickTab">
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
                  <bookCard :item='item' :type='list.title'/>
                </van-cell>
              </div>
            </div>
            <div class="no-content" v-else>
              暂无数据
            </div>
          </van-pull-refresh>
        </van-list>
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
          num: this.childInfo.read_count,
          content: ''
        }, {
          title: '读过',
          num: this.childInfo.reading_count,
          content: ''
        },{
          title: '收藏',
          num: this.childInfo.collect_num,
          content: ''
        }, {
          title: '磨损',
          num: this.childInfo.broken_num,
          content: ''
        },{
          title: '未读',
          num: this.childInfo.shelf_tushu_kinds - this.childInfo.read_kinds,
          content: ''
        },{
          title: '捐书',
          num: this.childInfo.donation_count,
          content: ''
        }]
      }

      return arr
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
      selsetData: ''
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
    },
    onClickLeft() {
      if (this.$route.query.back) {
        this.$router.push({
          name: this.$route.query.back,
          query: {
            id: this.$route.query.id
          }
        })
      } else {
        this.$router.push({
          name: 'my'
        })
      }
    },
    onClickRight() {
      window.location.href = '/book/TushuDonation/intro'
    },
    getList() {
      let data = {
        params: {
          page: this.page,
          child_id: this.$route.query.id
        }
      }

      let apiLink = ''

      switch (this.readArray[this.tabIndex].title) {
        case '未读':
          data.params.is_read = 0
          apiLink = '/book/SchoolShelfBook/getList'
          break
        case '在读':
          data.params.is_read = 2
          apiLink = '/book/SchoolShelfBook/getList'
          break
        case '收藏':
          data.params.collect = 1
          apiLink = '/book/SchoolShelfBook/getList'
          break
        case '磨损':
          data.params.is_broke = 1
          apiLink = '/book/SchoolShelfBook/getList'
          break
        case '读过':
          data.params.is_read = 1
          apiLink = '/book/SchoolShelfBook/getList'
          break
        case '捐书':
          data.params.is_check = this.isCheck
          apiLink = 'book/TushuDonation/getList'
          break
      }

      if (this.selsetData) {
        data.params.tag = this.selsetData.tag
        data.params.floor = this.selsetData.floor
      }

      return axios.get(apiLink, data).then(res => {
        if(res.data.status == 1){
          if (this.page == 1) {
            this.readArray[this.tabIndex].content = res.data.data
          } else {
            this.readArray[this.tabIndex].content = this.readArray[this.tabIndex].content.concat(res.data.data)
          }
          this.loading = false
          this.page++
          if (this.readArray[this.tabIndex].content.length >= res.data.count) {
            this.finished = true
          }
        }else{
          this.page = 1
          this.loading = false
          this.finished = true
          this.readArray[this.tabIndex].content= []
        }
      })
    },
    onRefresh() {
      this.page = 1
      this.getList().then(() => {
        this.loading = false
      })
    },
    onSelect(params) {
      this.selsetData = params
      this.page = 1
      this.loading = true
      this.finished = false
      this.onRefresh()
    },
    onLoad() {
      this.getList()
    },
    onChangeTab(index) {
      this.tabIndex = index
      this.page = 1
      this.loading = true
      this.finished = false
      this.onRefresh()
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

      this.page = 1
      this.loading = true
      this.finished = false
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
  color: #409eff;
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
