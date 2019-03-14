<template>
  <div class="comment-list" id='comment' ref='comment'>
    <van-nav-bar :border='false' :zIndex='0'>
      <div class="zan" slot="right">赞 {{item.zan_num}}</div>
      <div class="comment" slot="left">评论 {{listLength}}</div>
    </van-nav-bar>
    <div class="no-centent" v-if='listLength == 0'>
      <svg class="icon" style="width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;"
        viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="15655">
        <path d="M169.5 541.6V318.8c0-98.3 66.3-178.7 147.4-178.7h400c81.1 0 147.4 80.4 147.4 178.7v222.8" fill="#D9DFFF"
          p-id="15656"></path>
        <path d="M859.9 370c-43 0-78.1 35.2-78.1 78.1v228.5H252.1V448.1c0-43-35.2-78.1-78.1-78.1-43 0-78.1 35.2-78.1 78.1v306.6c0 43 35.2 78.1 78.1 78.1h685.9c43 0 78.1-35.2 78.1-78.1V448.1c0-42.9-35.2-78.1-78.1-78.1z"
          fill="#D9DFFF" p-id="15657"></path>
        <path d="M859.9 855.8H174c-55.8 0-101.1-45.4-101.1-101.1V448.1C72.8 392.4 118.2 347 174 347s101.1 45.4 101.1 101.1v205.5h483.7V448.1c0-55.8 45.4-101.1 101.1-101.1S961 392.4 961 448.1v306.6c0 55.8-45.4 101.1-101.1 101.1zM174 393c-30.4 0-55.1 24.7-55.1 55.1v306.6c0 30.4 24.7 55.1 55.1 55.1h685.9c30.4 0 55.1-24.7 55.1-55.1V448.1c0-30.4-24.7-55.1-55.1-55.1-30.4 0-55.1 24.7-55.1 55.1v228.5c0 12.7-10.3 23-23 23H252.1c-12.7 0-23-10.3-23-23V448.1c0-30.4-24.7-55.1-55.1-55.1z"
          fill="#728BFF" p-id="15658"></path>
        <path d="M751.7 697.6H282.1c-29.2 0-53-23.8-53-53v-6.8c0-76.9 62.6-139.5 139.5-139.5h296.7c76.9 0 139.5 62.6 139.5 139.5v6.8c-0.1 29.3-23.8 53-53.1 53zM368.6 544.3c-51.6 0-93.5 41.9-93.5 93.5v6.8c0 3.9 3.1 7 7 7h469.7c3.9 0 7-3.1 7-7v-6.8c0-51.6-41.9-93.5-93.5-93.5H368.6zM169.5 383.1c-12.7 0-23-10.3-23-23v-116c0-35.4 18.8-68.1 53-92.3C231.3 129.4 273 117 316.9 117h400c43.9 0 85.6 12.4 117.4 34.8 34.2 24.1 53 56.9 53 92.3v112c0 12.7-10.3 23-23 23s-23-10.3-23-23v-112c0-43.9-57-81.1-124.4-81.1h-400c-67.4 0-124.4 37.1-124.4 81.1v116c0 12.7-10.3 23-23 23zM260.2 928.7c-12.7 0-23-10.3-23-23v-67.2c0-12.7 10.3-23 23-23s23 10.3 23 23v67.2c0 12.7-10.3 23-23 23zM773.6 928.7c-12.7 0-23-10.3-23-23v-67.2c0-12.7 10.3-23 23-23s23 10.3 23 23v67.2c0 12.7-10.3 23-23 23z"
          fill="#728BFF" p-id="15659"></path>
        <path d="M462.7 228.5h-0.5l-19.6-0.7c-8.3-0.3-14.8-7.2-14.5-15.5 0.3-8.3 7.2-14.8 15.5-14.5l19.6 0.7c8.3 0.3 14.8 7.2 14.5 15.5-0.3 8.2-6.9 14.5-15 14.5zM796.2 344.9l-28.9-8s0 0.1-0.1 0.3c0-0.2 3.5-15.7-0.4-64.4-3-38.3-66.5-44.5-71.7-44.9H521.6c-8.3 0-15-6.7-15-15s6.7-15 15-15h174.9c0.9 0.1 23 1.5 45.9 10.1 42 15.9 52.7 42.7 54.3 62.4 4.3 53.8 0.3 71.5-0.5 74.5z"
          fill="#FFFFFF" p-id="15660"></path>
      </svg>
      <div class="prompt">快来抢沙发</div>
    </div>
    <div class="container">
      <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
        <van-cell v-for="(item,index) in list" :key="index">
          <div class="user-card flex flex-align">
            <div class="avatar" @click="toZoom(item)">
              <img :src="getAvatar(item.avatar)" :alt="item.username" />
            </div>
            <div class="user-data">
              <span class="user-name">{{item.username}}</span>
            </div>
          </div>
          <div class="contents">
            {{item.contents}}
          </div>

          <div class="reply">
            <div v-if="item.replyList.length != 0" class="reply-content">
              <div class="list" v-for='(reply,replyIndex) in  item.replyList' :key='replyIndex'>
                <div class="item">
                  <span class="reply-title">
                    <i class="iconfont">&#xe6ea;</i>
                    {{reply.username}}回复{{item.username}}
                  </span>
                  <span class="reply-contents">
                    {{reply.contents}}
                  </span>
                </div>
              </div>
            </div>
            <div v-if='item.quote' class="reply-content">
              <div class="list">
                <div class="item">
                  <span class="reply-title">
                    <i class="iconfont">&#xe60d;</i>
                    {{item.quote.username}}的评论
                  </span>
                  <span class="reply-contents">
                    {{item.quote.contents}}
                  </span>
                </div>
              </div>
            </div>
            <div class="comment-bar flex flex-align">
              <div class="date">{{timeAgo(item.create_time)}}</div>
              <div class="theme-color" @click="showField(item,'reply')">
                <van-tag round size="medium" type="primary">{{item.replyList.length?item.replyList.length:''}}回复</van-tag>
              </div>
            </div>
          </div>
        </van-cell>
      </van-list>
    </div>

    <!-- 评论输入框  -->
    <div class="comment">
      <div class="footer-bar">
        <div class="bar-padding flex flex-align">
          <div class="input-box flex flex-align" @click="showField()">
            <div class="input-box-avatar avatar">
              <img :src="getAvatar(userDataState.avatar)" />
            </div>
            <span>写评论</span>
          </div>
          <div class="btn-icon flex flex-align">
            <div class="btn" @click="toScroll">
              <van-tag class="num-tag" v-if='listLength > 1' round type="danger">{{listLength >
                1000?'999+':listLength}}</van-tag>
              <i class="iconfont">&#xe731;</i>
            </div>
            <div class="btn" @click="addPraise(item)">
              <van-tag class="num-tag" v-if='item.zan_num > 1' round type="danger">{{item.zan_num >
                1000?'999+':item.zan_num}}</van-tag>
              <i class="iconfont highlight rotateInDownLeft animated" v-if="item.isZan">&#xe6e3;</i>
              <i class="iconfont" v-else>&#xe644;</i>
            </div>
            <div class="btn" @click="addCollect(item)" v-if='include != "include"'>
              <van-tag class="num-tag" v-if='item.collect_num > 1' round type="danger">{{item.collect_num >
                1000?'999+':item.collect_num}}</van-tag>
              <i class="iconfont star highlight swing animated" v-if="item.isShoucang">&#xe64b;</i>
              <i class="iconfont" v-else> &#xe64c;</i>
            </div>
            <div class="btn" v-else @click="shareShow = true">
              <i class="iconfont">&#xe96e;</i>
            </div>
          </div>
        </div>
      </div>

      <van-popup v-model="show" class="comment-popup" overlay-class='bg-opacity' position="bottom" get-container='#app'
        @close='$refs.field.blur()'>
        <div class="score flex-column" v-if='include != "include"&&score'>
          <div class="score-title">评分</div>
          <van-rate class="score-rate" v-model="star" :size="25" :count="5" void-color="#ceefe8" />
        </div>
        <div class="comment-content flex">
          <div class="field-box">
            <van-cell-group>
              <van-field v-model="message" :minHeight='50' ref='field' type="textarea" :placeholder="prompt" rows="1"
                autosize />
            </van-cell-group>
          </div>
          <div class="submit-btn theme-color">
            <van-button class="theme-btn" round :loading="isLoading" size="large" type="primary" @click="submit">发送</van-button>
          </div>
        </div>
      </van-popup>
    </div>

    <van-popup v-model="shareShow" position='bottom' get-container='#app'>
      <share @show='imageShow = true' :postId='$route.query.id' :item='item' />
    </van-popup>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import axios from './../lib/js/api'
import share from './../module/mold/share'
import { timeago } from './../lib/js/util'

export default {
  name: 'comment',
  props: ['item', 'include', 'type'],
  computed: {
    ...mapGetters(['userToken', 'userDataState'])
  },
  components: {
    share
  },
  data() {
    return {
      star: 3,
      list: [],
      toTopAndComment: false,
      listLength: '',
      loading: false,
      finished: false,
      prompt: '写评论',
      page: 1,
      commentId: '',
      show: false,
      isLoading: false,
      message: '',
      shareShow: false,
      score: false
    }
  },
  methods: {
    onLoad() {
      let data = {
        params: {
          post_id: this.$route.query.id || this.$route.query.back_id,
          page: this.page,
          limit: 10,
          sort: 'new'
        }
      }

      axios.get('/book/SchoolArticleComment/getList', data).then(res => {
        if (res.data.status == 1) {
          this.listLength = res.data.count
          let array = res.data.data
          this.loading = false
          if (this.page == 1) {
            this.list = array
          } else {
            this.list = this.list.concat(array)
          }
          this.page++
          if (this.list.length >= res.data.count) {
            this.finished = true
          }
        }

      })
    },
    submit() {
      this.isLoading = true
      let data = ''
      if (this.commentId) {
        data = {
          post_id: this.$route.query.id,
          contents: this.message,
          reply_comment_id: this.commentId,
        }
      } else {
        data = {
          post_id: this.$route.query.id,
          contents: this.message,
          star: this.star * 2
        }
      }

      if (this.message.length) {
        axios.post('/book/SchoolArticleComment/edit?ajax=1', data).then(res => {
          if (res.data.status == 1) {
            this.show = false
            this.page = 1
            this.onLoad()
            this.$toast.success(res.data.info)
            this.isLoading = false
          } else {
            this.$toast.fail(res.data.info)
          }
        })
      } else {
        this.$toast('请填写评论内容')
      }
    },
    addPraise(item) {
      item.isZan = !item.isZan
      let data = {
        params: {
          ajax: 1,
          id: this.item.post_id
        }
      }

      axios.get('/book/SchoolArticle/zan', data).then(res => {
        if (res.data.status == 1) {
          if (res.data.data.like == '1') {
            item.zan_num = res.data.data.like
            this.$toast.success({
              className: 'zan-icon toast-icon',
              message: '点赞成功'
            })
          }
        }
      })
    },
    addCollect(item) {
      item.isShoucang = !item.isShoucang

      let data = {
        params: {
          post_id: this.item.post_id
        }
      }

      axios.get('/book/SchoolArticleCollect/add', data).then(res => {
        if (res.data.status == 1) {
          if (res.data.data) {
            item.collect_num = res.data.data.collect_num
            this.$toast.success({
              className: 'shoucang-icon toast-icon',
              message: '收藏成功'
            })
          }
        }
      })
    },
    showField(item, type) {
      this.isLoading = false
      this.message = ''
      if (item) {
        this.prompt = `回复：${item.username}`
        this.commentId = item.comment_id
      } else {
        this.commentId = ''
        this.prompt = '写评论'
      }
      this.show = true
      this.$nextTick(() => {
        this.$refs.field.focus()
      })

      type == 'reply' ? this.score = false : this.score = true
    },
    getAvatar(img) {
      if (!img) {
        return img
      }

      let pos = img.indexOf('http://')
      let result
      if (pos === 0) {
        result = img.replace('http:', 'https:')
      } else {
        result = img
      }
      return result
    },
    timeAgo(time) {
      return timeago(time * 1000)
    },
    toScroll() {
      this.toTopAndComment = !this.toTopAndComment
      let domScrollTop = this.$refs.comment.offsetTop
      if (this.toTopAndComment) {
        window.scrollTo(0, domScrollTop)
      } else {
        window.scrollTo(0, 0)
      }
    },
    toZoom(item) {
      this.$router.push({
        name: 'zoom',
        query: {
          id: item.user_id,
          back: this.$route.name,
          back_id: this.$route.query.id || this.$route.query.back_id
        }
      })
    }
  }
}
</script>
<style scoped>
.no-centent {
  text-align: center;
  background: #fff;
  padding: 3.125rem /* 50/16 */ 0;
}

.no-centent .prompt {
  color: #c0c4cc;
  font-size: 0.875rem /* 14/16 */;
}

.no-centent svg {
  margin: 0.625rem /* 10/16 */ auto;
  font-size: 3rem /* 48/16 */;
  opacity: 0.5;
}

.no-centent span {
  color: #c0c4cc;
  font-size: 0.8125rem /* 13/16 */;
}

.avatar img {
  width: 2rem /* 32/16 */;
  height: 2rem /* 32/16 */;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 0.625rem /* 10/16 */;
}

.user-data {
  display: grid;
}

.user-name {
  font-size: 0.875rem /* 14/16 */;
  color: #303133;
}

.date {
  font-size: 0.75rem /* 12/16 */;
  color: #909399;
  margin-right: 0.625rem /* 10/16 */;
}

.contents {
  padding: 0.625rem /* 10/16 */ 0 0.625rem /* 10/16 */ 2.625rem /* 42/16 */;
  font-size: 1rem /* 16/16 */;
}

.reply .reply-content .theme-color {
  font-size: 0.8125rem /* 13/16 */;
}

.reply {
  margin-left: 2.625rem /* 42/16 */;
}

.footer-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 3rem /* 48/16 */;
  background: #fff;
}

.comment-popup {
  padding: 0.625rem /* 10/16 */;
}

.comment-content {
  padding: 0 0.625rem /* 10/16 */;
  align-items: flex-end;
}

.bar-padding {
  padding: 0.3125rem /* 5/16 */ 0.625rem /* 10/16 */;
}

.input-box {
  height: 2.375rem /* 38/16 */;
  flex: 1.8;
}

.btn-icon {
  flex: 1;
}

.btn {
  flex: 1;
  text-align: center;
  position: relative;
}

.btn i.iconfont {
  font-size: 1.25rem /* 20/16 */;
}

.input-box {
  background: #ebeef5;
  line-height: 2.375rem /* 38/16 */;
  border-radius: 2.375rem /* 38/16 */;
}

.input-box i.iconfont {
  margin-left: 0.625rem /* 10/16 */;
}

.field-box {
  flex: 4;
}

.submit-btn {
  flex: 1;
  text-align: center;
  margin-left: 0.3125rem /* 5/16 */;
}

.reply-title {
  color: #909399;
  margin-top: 0.3125rem /* 5/16 */;
  margin-bottom: 0.3125rem /* 5/16 */;
}

.reply-contents {
  color: #606266;
}

.theme-btn {
  height: 2.75rem /* 44/16 */;
  line-height: 2.75rem /* 44/16 */;
}

.input-box-avatar,
.input-box-avatar img {
  width: 2rem /* 32/16 */;
  height: 2rem /* 32/16 */;
}

.input-box-avatar {
  margin-left: 0.3125rem /* 5/16 */;
  margin-right: 0.3125rem /* 5/16 */;
}

.num-tag {
  position: absolute;
  z-index: 10;
  right: 0;
  top: -0.3125rem /* 5/16 */;
}

.reply-content {
  background: #ebeef5;
  padding: 0.625rem /* 10/16 */;
  margin-bottom: 0.625rem /* 10/16 */;
}

.score {
  padding: 1.25rem /* 20/16 */ 0;
}

.score-title {
  text-align: center;
  font-size: 0.875rem /* 14/16 */;
  font-weight: 700;
}

.score-rate {
  margin: 0.625rem /* 10/16 */ auto;
}
</style>
