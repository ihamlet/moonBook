<template>
  <div class="book-details page-padding">
    <van-nav-bar fixed :border='false' :key='$route.query.id'>
      <div class="head-bar-title" slot="title">
        <transition name="slide-fade" mode="out-in">
          <div key="1" v-if='!themeBarSearch'>{{$route.meta.title}}</div>
          <div key="2" v-else>{{details.title}}</div>
        </transition>
      </div>
    </van-nav-bar>
    <div class="container">
      <div class="module">
        <div class="book-card" ref='domHeight'>
          <div class="tag">
              <van-tag v-if='details.is_read' mark type="success" size="large">已读</van-tag>
              <van-tag v-else mark type="danger" size="large">未读</van-tag>
          </div>
          <van-row gutter="10" :key="$route.query.id">
            <van-col span="9">
              <div class="book-thumb">
                <img :src="details.thumb" @error="imgError($event,details)" />
              </div>
            </van-col>
            <van-col span="13">
              <div class="content">
                <div class="title" v-line-clamp:20="2">{{details.title}}</div>
                <van-rate v-model="star" disabled disabled-color='#ffd21e'/>
                <div class="book-info">
                  <div class="author" v-line-clamp:20="1"><b>作者:</b>{{details.author}}</div>
                  <div class="borrow-count" v-if='details.borrow_count > 0'><span class="people">{{details.borrow_count}}</span>人借过</div>
                </div>
              </div>
            </van-col>
          </van-row>
          <van-col span="1">
            <div class="listening" @click="listening(details)">
              <i class="iconfont">&#xe617;</i>
            </div>
          </van-col>
        </div>
      </div>

      <div class="module" v-if='freshList.length'>
        <freshList :list='freshList' cid="child_id" avatar="child_avatar" routerName="baby-home" name="child_name" :key="$route.query.id"/>
      </div>

      <div class="module" v-if='details.details || details.recommend_comment'>
        <div class="item-details" v-if='details.details'>
          <div class="module-title">图书简介</div>
          <van-cell :border='false'>
            <div class="details-text">
              {{details.details}}
            </div>
          </van-cell>
        </div>
        <div class="item-details" v-if='details.recommend_comment'>
          <div class="module-title">编辑推荐</div>
          <van-cell :border='false'>
            <div class="details-text">
              {{details.recommend_comment}}
            </div>
          </van-cell>
        </div>
      </div>

      <div class="comment-box">
        <comment :item='details' type='bookDetails' :postId='details.post_id' :key="$route.query.id"/>
      </div>
    </div>
  </div>
</template>
<script>
import axios from './../lib/js/api'
import freshList from './../module/findModule/freshList'
import comment from './../module/comment'
import { mapActions } from 'vuex'
import { arrayUnique } from './../lib/js/util'
import { mapState, mapGetters } from 'vuex'
import { watchScroll } from './../lib/js/mixin'

export default {
  name: 'book-details',
  mixins: [watchScroll],
  components: {
    freshList,
    comment
  },
  computed: {
    ...mapGetters(['userDataState']),
    ...mapState('openWX',['ready']),
    star(){
      let num = 3
      if(this.details){
        num = Math.ceil(this.details.star / 2) 
      }

      return num
    }
  },
  data() {
    return {
      details: '',
      freshList: ''
    }
  },
  created() {
    this.fetchData()
  },
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = false //去掉页面数据缓存
    next()
  },
  updated(){
    this.wxShare()
  },
  watch: {
    '$router': 'fetchData',
    ready(){
      this.wxShare()
    }
  },
  methods: {
    ...mapActions('openWX',['share']),
    wxShare(){
      let data = {
        item: this.details,
        success(){
          console.log('微信分享')
        }
      }
      this.share(data)
    },
    imgError(e) {
      e.target.src = 'https://assets-moonbook.oss-cn-beijing.aliyuncs.com/img/no-cover.jpg'
    },
    fetchData() {
      let data = {
        params:{
          book_id:this.$route.query.id,
          child_id: this.userDataState.child_id
        }
      }

      axios.get('/book/ShelfBook/getInfo', data).then(res => {
        if(res.data.status == 1){
          this.details = res.data.data
        }
      })

      axios.get('/book/ShelfBookChild/getList', data).then(res => {
        if(res.data.status == 1){
          this.freshList = arrayUnique(res.data.data,'user_id')
        }
      })
    },
    listening(details){
      let p = /（.+?）/
      let pureTitle = details.title.replace(p, '')
      let url = `https://m.ximalaya.com/search/${pureTitle}`
      let isRead = localStorage.getItem('bookRead_' + details.tushu_id)
      if (!isRead) {
        axios.get('/book/story/updateRead').then(res => {
          localStorage.setItem('bookRead_' + details.tushu_id, true)
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
.slide-fade-enter-active {
  transition: all 0.18s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

.book-card {
  padding: 1.25rem /* 20/16 */;
  background: #fff;
  position: relative;
}

.listening{
  position: absolute;
  right: 15px;
  top:10px;
}

.listening i.iconfont{
  font-size: 26px;
}

.book-thumb {
  width: 100%;
  height: 8.75rem /* 140/16 */;
  overflow: hidden;
}

.title {
  color: #303133;
  margin-bottom: 0.3125rem /* 5/16 */;
  height: 2.625rem /* 42/16 */;
  font-weight: 500;
}

.book-info b{
  width: 3.125rem /* 50/16 */;
}

.book-info div {
  font-size: 0.875rem /* 14/16 */;
  margin-top: 0.3125rem /* 5/16 */;
}

.people {
  color: #f56c6c;
}

.container{
  padding-top: 2.8125rem /* 45/16 */;
}

.tag{
  position: absolute;
  left: 0;
  top: 10px;
}

.details-text{
  text-align: justify;
  font-size: 16px;
  line-height: 1.8;
  text-indent:34px
}
</style>
