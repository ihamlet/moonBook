<template>
  <div class="zoom page-padding">
    <van-nav-bar :zIndex='99' :title="fixedHeaderBar?$route.meta.title:`${userInfo.name}的空间`" fixed left-text="返回" left-arrow @click-left="onClickLeft"
      @click-right="releasePageShow = true">
      <div slot="right" class="theme-color">
        <i class="iconfont">&#xe612;</i>
      </div>
    </van-nav-bar>
    <div class="container">
      <lazy-component class="module">
        <div class="user-card flex flex-align" ref='userCrad'>
          <div class="info">
            <div class="avatar">
              <img :src="getAvatar(userInfo.avatar)" :alt="userInfo.name" />
            </div>
            <div class="name" v-line-clamp:20="1">
              {{userInfo.name}}
            </div>
          </div>
          <div class="social flex flex-align">
            <div class="data-box">
              <div class="number">{{ userInfo.post_num }}</div>
              <div class="text">发布</div>
            </div>
            <div class="data-box">
              <div class="number">{{ userInfo.fans_count }}</div>
              <div class="text">粉丝</div>
            </div>
            <div class="data-box">
              <div class="number">{{ userInfo.collect_count }}</div>
              <div class="text">关注</div>
            </div>
            <div class="data-box">
              <div class="number">{{ userInfo.zan_count }}</div>
              <div class="text">获赞</div>
            </div>
          </div>
        </div>
      </lazy-component>
      
      <lazy-component class="module">
        <reading :list="lateBook" moduleTitle="他的宝贝最近在读" />
      </lazy-component>

      <lazy-component>
        <van-list v-model="loading" :finished="finished" @load="onLoad" :finished-text="$store.state.slogan">
          <div class="list">
            <div class="no-list" v-if='list.length == 0'>
              暂无内容
            </div>
            <div class="item" v-for="(item,index) in list" :key="index">
              <div class="more" v-if='item.isMe' @click="actionsheet(item)">
                <i class="iconfont">&#xe6c4;</i>
              </div>
              <van-cell>
                <graphic-crad :item='item' />
              </van-cell>
            </div>
          </div>
        </van-list>
      </lazy-component>
    </div>

    <!-- 发布 -->
    <van-popup v-model="releasePageShow" class="page-popup" position="bottom" :overlay="false">
      <graphic @close='releasePageShow = false' />
    </van-popup>

    <van-actionsheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect" @cancel="show = false" />
  </div>
</template>
<script>
import axios from './../lib/js/api'
import { sum } from './../lib/js/util.js'
import graphic from './../module/release/graphic'
import graphicCrad from './../module/card/graphicCrad'
import reading from './../module/reading'

export default {
  name: 'zoom',
  components: {
    graphic,
    graphicCrad,
    reading
  },
  data() {
    return {
      releasePageShow: false,
      lateBook:[],
      // ----
      list: [],
      domHeight: 0,
      scrollTop: 0,
      fixedHeaderBar: true,
      loading: false,
      finished: false,
      userInfo: '',
      childInfo: '',
      page: 1,
      show: false,
      actions: [{
        name: '删除',
        type: 'delete'
      }],
      postId:''
    }
  },
  created() {
    this.fetaData()
  },
  watch: {
    '$router': 'fetaData'
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    fetaData() {
      axios.get(`/book/memberUser/getInfo?user_id=${this.$route.query.id}`).then(res => {
        this.userInfo = res.data
        axios.get(`/book/BabyBorrow/getList?page=1&limit=20&child_id=${res.data.child_id}`).then(res=>{
          this.lateBook = res.data.data
        })
      })
    },
    onClickLeft() {
      if(this.$route.query.back){
        this.$router.push({
          name: this.$route.query.back,
          query:{
            id: this.$route.query.post_id,
            user_id: this.$route.query.user_id
          }
        })
      }else{
        this.$router.push({
          name: 'find'
        })
      }
    },
    handleScroll() {
      this.getDomHeight()
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      this.scrollTop = scrollTop
      if (this.domHeight < this.scrollTop) {
        this.fixedHeaderBar = false
      } else {
        this.fixedHeaderBar = true
      }
    },
    getDomHeight() {
      if (this.$refs.userCrad) {
        this.domHeight = this.$refs.userCrad.offsetHeight / 2
      }
    },
    onLoad() {
      axios.get(`/book/SchoolArticle/getList?page=${this.page}&sort=post&user_id=${this.$route.query.id}`).then(res => {
        this.page++
        this.list = this.list.concat(res.data.data)
        this.loading = false
        if (this.list.length >= res.data.count) {
          this.finished = true
        }
      })
    },
    actionsheet(item){
        this.show = true
        this.postId = item.post_id
    },
    onSelect(item) {
      if (item.type = 'delete') {
        axios.get(`/book/SchoolArticle/del?id=${this.postId}`).then(res=>{
          let key 
          this.list.forEach((element,i) => {
            if(element.post_id == this.postId){
              key = i
            }
          })
          this.list.splice(key,1)
        })
        this.show = false

        this.$toast.success('删除成功')
      }
    },
    getAvatar(img) {
      if(!img){
        return img
      }

      let pos = img.indexOf('http://')
      let result
      if(pos === 0) {
         result = img.replace('http:', 'https:')
      } else {
         result = img
      }
      return result
    }
  }
}
</script>
<style scoped>
.container {
  margin-top: 2.875rem /* 46/16 */;
}

.info {
  display: inline-grid;
  text-align: center;
}

.avatar img {
  width: 3.75rem /* 60/16 */;
  height: 3.75rem /* 60/16 */;
  border-radius: 50%;
}

.info {
  padding: 0.625rem /* 10/16 */ 0;
  flex: 1;
}

.social {
  flex: 3;
  padding: 0 0.625rem /* 10/16 */;
}

.name {
  color: #303133;
  margin-top: 0.3125rem /* 5/16 */;
}

.data-box {
  display: inline-grid;
  flex: 1;
}

.data-box .number {
  font-size: 1.5rem /* 24/16 */;
  color: #303133;
}

.release-popup {
  line-height: normal;
}

.item {
  margin-bottom: 0.3125rem /* 5/16 */;
  position: relative;
  overflow: hidden;
  background: #fff;
}

.item .more {
  text-align: right;
}

.item .more i.iconfont {
  font-size: 1.75rem /* 28/16 */;
  color: #c0c4cc;
  margin-right: 0.625rem /* 10/16 */;
}

.title .avatar {
  margin-right: 0.3125rem /* 5/16 */;
}

.title .avatar img {
  width: 2rem /* 32/16 */;
  height: 2rem /* 32/16 */;
  border-radius: 50%;
}
</style>
