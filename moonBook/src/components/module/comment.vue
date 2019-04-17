<template>
  <div class="comment-list" id='comment' ref='comment'>
    <van-nav-bar :border='false' :zIndex='0'>
      <div class="zan" slot="right">赞 {{item.zan_num}}</div>
      <div class="comment" slot="left">{{listLength}} 评论</div>
    </van-nav-bar>
    <div class="no-centent" v-if='listLength == 0'>
      <div class="prompt" @click="showField()">暂无评论,点击抢沙发</div>
    </div>
    <div class="container">
      <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
        <van-cell v-for="(contentItem,index) in list" :key="index">
          <div class="user-card flex flex-align">
            <div class="avatar" @click="toZoom(contentItem)">
              <img :src="contentItem.avatar" v-http2https/>
            </div>
            <div class="user-data">
              <span class="user-name">{{contentItem.username}}</span>
              <span class="tags" v-if='contentItem.tags'>{{contentItem.tags}}</span>
            </div>
          </div>
          <div class="contents">
            {{contentItem.contents}}
          </div>

          <div class="reply">
            <div v-if="contentItem.replyList.length != 0" class="reply-content">
              <div class="list" v-for='(reply,replyIndex) in  contentItem.replyList' :key='replyIndex'>
                <div class="item">
                  <span class="reply-title">
                    <i class="iconfont">&#xe6ea;</i>
                    {{reply.username}}回复{{contentItem.username}}
                  </span>
                  <span class="reply-contents">
                    {{reply.contents}}
                  </span>
                </div>
              </div>
            </div>
            <div v-if='contentItem.quote' class="reply-content">
              <div class="list">
                <div class="item">
                  <span class="reply-title">
                    <i class="iconfont">&#xe60d;</i>
                    {{contentItem.quote.username}}的评论
                  </span>
                  <span class="reply-contents">
                    {{contentItem.quote.contents}}
                  </span>
                </div>
              </div>
            </div>
            <div class="comment-bar flex flex-align">
              <div class="date">{{timeAgo(contentItem.create_time)}}</div>
              <div class="theme-color" @click="showField(contentItem,'reply')">
                <van-tag round size="large" type="primary">{{contentItem.replyList.length?contentItem.replyList.length:''}}回复</van-tag>
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
              <img :src="userDataState.avatar" v-http2https/>
            </div>
            <span>写评论</span>
          </div>
          <div class="btn-icon flex flex-align">
            <div class="btn" @click="toScroll">
              <van-tag class="num-tag" v-if='listLength > 1' round type="danger">{{listLength > 1000?'999+':listLength}}</van-tag>
              <i class="iconfont">&#xe731;</i>
            </div>
            <div class="btn" @click="addPraise(item)">
              <van-tag class="num-tag" v-if='item.zan_num > 1' round type="danger">{{item.zan_num > 1000?'999+':item.zan_num}}</van-tag>
              <i class="iconfont highlight rotateInDownLeft animated" v-if="item.isZan">&#xe6e3;</i>
              <i class="iconfont" v-else>&#xe644;</i>
            </div>
            <div class="btn" @click="addCollect(item)" v-if='include != "include"'>
              <van-tag class="num-tag" v-if='item.collect_num > 1' round type="danger">{{item.collect_num > 1000?'999+':item.collect_num}}</van-tag>
              <i class="iconfont star highlight swing animated" v-if="item.isShoucang">&#xe64b;</i>
              <i class="iconfont" v-else> &#xe64c;</i>
            </div>
            <div class="btn" v-else @click="isShare">
              <i class="iconfont">&#xe96e;</i>
            </div>
          </div>
        </div>
      </div>

      <van-popup v-model="show" class="comment-popup" overlay-class='bg-opacity' position="bottom" get-container='#app' @close='$refs.field.blur()'>
        <div class="score flex-column" v-if='include != "include"&&score'>
          <div class="score-title">评分</div>
          <van-rate class="score-rate" v-model="star" :size="25" :count="5" void-color="#ceefe8" />
        </div>
        <div class="comment-content flex">
          <div class="field-box">
            <van-cell-group>
              <van-field size='large' v-model="message" :minHeight='50' ref='field' type="textarea" :placeholder="prompt" rows="1" autosize />
            </van-cell-group>
          </div>
          <div class="submit-btn theme-color">
            <van-button class="theme-btn" round :loading="isLoading" size="large" type="primary" @click="submit">发 布</van-button>
          </div>
        </div>
      </van-popup>
    </div>

    <van-popup v-model="shareShow" get-container='#app' class="share-popup">
      <div class="share-img">
        <img src="./../../assets/img/shareWord.png" />
      </div>
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
      let data = {
        post_id: this.$route.query.id,
        contents: this.message,
        tags: this.item.ad_label
      }

      if (this.commentId) {
        data.reply_comment_id = this.commentId
      } else {
        data.star = this.star * 2
      }

      if (this.message.length) {
        axios.post('/book/SchoolArticleComment/edit?ajax=1', data).then(res => {
          if (res.data.status == 1) {
            this.show = false
            this.page = 1
            this.onLoad()
            this.$toast.success(res.data.info)
            this.isLoading = false

            this.toTopAndComment = false
            this.toScroll() // 滚动到指定位置
          } else {
            this.$toast.fail(res.data.info)
          }
        })
      } else {
        this.$toast('请填写评论内容')
      }
    },
    addPraise(item) {
      if (this.$route.query.type != 'preview') {
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
                className: 'zan-icon toast-icon'
              })
            }
          }
        })
      }
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
              className: 'shoucang-icon toast-icon'
            })
          }
        }
      })
    },
    showField(item, type) {
      if (this.$route.query.type != 'preview') {
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
      }
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
    },
    isShare() {
      if (this.$route.query.type != 'preview') {
        this.shareShow = true
      }
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

.tags{
  color: #909399;
}
</style>

