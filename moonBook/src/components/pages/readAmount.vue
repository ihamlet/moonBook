<template>
  <div class="read-amount">
    <van-nav-bar :zIndex='10' :title="$route.meta.title" left-text="返回" right-text='捐赠图书' fixed left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
    <van-tabs title-active-color='#409eff' class="theme-tabs-select-bar" :line-width="0" sticky swipeable animated :offsetTop="45" @change="onChangeTab">
      <van-tab v-for="(list,index) in readArray" :key="index">
        <div class="tab-title" slot="title">
          <div class="tab-text">{{list.title}}</div>
          <div class="tab-num">{{list.num}}</div>
        </div>
        <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad" v-show='index == tabIndex'>
          <van-pull-refresh v-model="loading" @refresh="onRefresh">
            <div class="kings flex flex-align" v-if='list.title =="未读" '>
              <div class="bar-title">阅读进度</div>
              <div class="kings-box flex flex-align">
                 <div class="num">{{childInfo.read_kinds}}/{{childInfo.shelf_tushu_kinds}}</div>
                 <div class="filter" @click="show = true"><i class="iconfont theme-color">&#xe631;</i></div>
              </div>
            </div>
            <div class="content" v-if='list.content.length'>
              <van-cell v-for="(item,itemIndex) in list.content" :key="itemIndex">
                <van-row gutter="10">
                  <van-col span="9">
                    <div class="book-cover">
                      <img :src="thumb(item.book_photo)" @error="outThumb($event,item)">
                    </div>
                  </van-col>
                  <van-col span="12">
                    <div class="book-info" @click="toBookDetails(item)">
                      <div class="title" v-line-clamp:20="2">{{item.book_title}}</div>
                      <div class="attach">
                        <div class="pos-title" v-if='item.pos_name'>书架：{{item.pos_name}}</div>
                      </div>
                    </div>
                  </van-col>
                  <van-col span="3">
                    <div class="listening" @click="listening(item)">
                      <i class="iconfont">&#xe617;</i>
                    </div>
                  </van-col>
                </van-row>
              </van-cell>
            </div>
            <div class="no-content" v-else>
              暂无数据
            </div>
          </van-pull-refresh>
        </van-list>
      </van-tab>
    </van-tabs>

    <van-popup class="filter-popup" v-model="show" position="right">
      <Filter-list :filterList='selectTag' @onSelect='onSelect' @close='show = false'/>
    </van-popup>
  </div>
</template>
<script>
import axios from './../lib/js/api'
import FilterList from './../module/mold/filterList'

export default {
  name: "readAmount",
  components: {
    FilterList
  },
  computed: {
    readArray() {
      let arr = []
      if(this.childInfo){
        arr = [{
          title: '未读',
          num: this.childInfo.shelf_tushu_kinds - this.childInfo.read_kinds,
          content: ''
        }, {
          title: '在读',
          num: this.childInfo.read_count,
          content: ''
        }, {
          title: '收藏',
          num: this.childInfo.collect_num,
          content: ''
        }, {
          title: '磨损',
          num: this.childInfo.broken_num,
          content: ''
        }, {
          title: '已读',
          num: this.childInfo.reading_count,
          content: ''
        }]
      }

      return arr
    }
  },
  data() {
    return {
      show:false,
      page: 1,
      loading: false,
      finished: false,
      childInfo: '',
      tabIndex: 0,
      selectTag:[{
        title:'年龄',
        arr:['3-5','5-6']
      },{
        title:'分类',
        arr:['绘本','寓言故事','童话','科普','3D','VR','故事汇']
      },{
        title:'所在层数',
        arr:['一层','二层','三层','四层','五层','六层']
      }],
      selsetData:''
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
      axios.get(`/book/baby/getInfo?child_id=${this.$route.query.id}`).then(res => {
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
          keyword: '',
          child_id: this.$route.query.id
        }
      }

      switch (this.tabIndex) {
        case 0:
          data.params.is_read = 0
        break
        case 1:
          data.params.is_read = 2
          break
        case 2:
          data.params.collect = 1
          break
        case 3:
          data.params.is_broke = 1
          break
        case 4:
          data.params.is_read = 1
          break
      }

      if(this.selsetData){
        data.params.tag = this.selsetData.tag
        data.params.floor = this.selsetData.floor
      }

      return axios.get('/book/SchoolShelfBook/getList', data).then(res => {
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
      })
    },
    onRefresh() {
      this.page = 1
      this.getList().then(() => {
        this.loading = false
      })
    },
    onSelect(params){
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
    outThumb(e, item) {
      e.target.outerHTML = `
        <div class='three-d-book'>
            <div class='three-d-book-cover'>
                <div class='three-d-book-name'>
                    ${item.book_title}
                </div>
                <div class='three-d-book-author'>
                    
                </div>
            </div>
        </div>
      `
    },
    thumb(img) {
      let hostMatch = img.match(/https?:\/\/(.+?)\//)
      if (hostMatch) {
        return `/book/api/remotePic?url=${img}`
      } else {
        return img
      }
    },
    listening(item) {
      let p = /（.+?）/
      let pureTitle = item.book.book_title.replace(p, '')
      let url = `https://m.ximalaya.com/search/${pureTitle}/voice`
      let isRead = localStorage.getItem('bookRead_' + item.book_id)
      if (!isRead) {
        axios.get('/book/story/updateRead').then(res => {
          localStorage.setItem('bookRead_' + item.book_id, true)
          location.href = url
        })
      } else {
        location.href = url
      }
    },
    toBookDetails(item) {
      this.$router.push({
        name: 'book-details',
        query: {
          id: item.book_id
        }
      })
    },
    listening(item) {
      let p = /（.+?）/
      let pureTitle = item.book.title.replace(p, '')
      let url = `https://m.ximalaya.com/search/${pureTitle}/voice`
      let isRead = localStorage.getItem('bookRead_' + item.book_id)
      if (!isRead) {
        axios.get('/book/story/updateRead').then(res => {
          localStorage.setItem('bookRead_' + item.book_id, true)
          location.href = url
        })
      } else {
        location.href = url
      }
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

/* .read-lead {
  width: 100%;
} */

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

.book_title {
  margin-bottom: 0.3125rem /* 5/16 */;
  font-weight: 500;
}

.attach {
  color: #606266;
}

.listening {
  width: 1.875rem /* 30/16 */;
  height: 1.875rem /* 30/16 */;
  line-height: 1.875rem /* 30/16 */;
  text-align: center;
  position: absolute;
  right: 0;
}

.listening i.iconfont {
  font-size: 1.75rem /* 28/16 */;
  background: linear-gradient(135deg, #fe8537, #f02b2b);
  -webkit-background-clip: text;
  color: transparent;
}

.book-cover img {
  margin: 0 auto;
  display: block;
}

.title {
  margin-bottom: 0.625rem /* 10/16 */;
  font-weight: 500;
}

.kings {
  padding: 0.625rem /* 10/16 */;
  background: #fff;
}

.tab-title{
  line-height: 0;
}

.tab-text,
.tab-num{
  height: 1.375rem /* 22/16 */;
  line-height: 1.375rem /* 22/16 */;
}

.kings{
  height: 1.875rem /* 30/16 */;
  line-height: 1.875rem /* 30/16 */;
}

.kings-box{
  flex: 1;
  justify-content:space-between;
}

.tab-tag{
  position: absolute;
  top: .3125rem /* 5/16 */;
  right: 0;
}

.bar-title{
  margin-right: .3125rem /* 5/16 */;
}

.filter i.iconfont{
  font-size: 1.5rem /* 24/16 */;
}
</style>
