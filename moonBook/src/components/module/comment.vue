<template>
  <div class="comment-list">
    <div class="module-title">评论</div>
    <div class="no-centent" v-if='list.length == 0'>
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
      <span>快来抢沙发</span>
    </div>
    <div class="container">
      <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
        <van-cell v-for="(item,index) in list" :key="index">
          <div class="user-card flex flex-align">
            <div class="avatar">
              <img :src="item.avatar" :alt="item.username" />
            </div>
            <div class="user-data">
              <span class="user-name">{{item.username}}</span>
              <span class="date">{{item.createDate}}</span>
            </div>
          </div>
          <div class="contents">
            {{item.contents}}
          </div>

          <div class="reply">
            <div v-if="item.replyList.length != 0" class="reply-content">
              <div class="list" v-for='(reply,replyIndex) in  item.replyList' :key='replyIndex'>
                <div class="item flex flex-align">
                  <span class="reply-title">
                    <i class="iconfont">&#xe631;</i> {{reply.username}}回复{{item.username}}
                  </span>
                  <span>
                    {{reply.contents}}
                  </span>
                </div>
              </div>
            </div>
            <div class="theme-color" @click="showField(item)">回复</div>
          </div>
        </van-cell>
      </van-list>
    </div>

    <!-- 评论输入框  -->
    <div class="comment">
      <div class="footer-bar">
        <div class="bar-padding flex flex-align">
          <div class="input-box" @click="showField()">
            <i class="iconfont">&#xe9ce;</i>
            写评论
          </div>
          <div class="btn-icon flex flex-align">
            <div class="btn" @click="addPraise">
              <i class="iconfont" v-if="!item.isZan">&#xe644;</i>
              <i class="iconfont highlight rotateInDownLeft animated" v-else>&#xe6e3;</i>
            </div>
            <div class="btn">
              <i class="iconfont">&#xe64c;</i>
            </div>
          </div>
        </div>
      </div>

      <van-popup v-model="show" class="comment-popup" position="bottom">
        <div class="comment-content flex">
          <div class="field-box">
            <van-cell-group>
              <van-field v-model="message" :minHeight='50' ref='field' type="textarea" :placeholder="prompt" rows="1" autosize />
            </van-cell-group>
          </div>
          <div class="submit-btn theme-color">
            <van-button class="theme-btn" :loading="isLoading"  size="large" type="primary" @click="submit">发送</van-button>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import axios from './../lib/js/api'

export default {
  name: 'comment-card',
  props: ['item'],
  computed: {
    ...mapGetters(['userToken'])
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      prompt: '写评论',
      page: 1,
      commentId: '',

      show: false,
      isLoading: false,
      message: ''
    }
  },
  methods: {
    onLoad() {
      axios.get(`/book/SchoolArticleComment/getList?&post_id=${this.$route.query.id}&page=${this.page}&limit=10&sort=new`).then(res => {
        console.log(res)
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
      })
    },
    submit() {
      this.isLoading = true
      let data = ''
      if (this.commentId) {
        data = {
          post_id: this.$route.query.id,
          contents: this.message,
          reply_comment_id: this.commentId
        }
      } else {
        data = {
          post_id: this.$route.query.id,
          contents: this.message
        }
      }

      axios.post(`/book/SchoolArticleComment/edit?ajax=1`, data).then(res => {
        this.show = false
        this.isLoading = false
        this.page = 1
        this.onLoad()
      })
    },
    addPraise(item) {
      item.isZan = !item.isZan
      console.log(item.isZan)
      axios.get(`/book/SchoolArticle/zan?ajax=1&id=${this.item.post_id}`).then(res => {
        item.zan_num = res.data.data.like
      })
    },
    showField(item) {
      this.message = ''
      if (item) {
        this.prompt = `回复：${item.username}`
        this.commentId = item.comment_id
      } else {
        this.prompt = '写评论'
      }
      this.show = true
      this.$nextTick(() => {
        this.$refs.field.focus()
      })
    }
  }
}
</script>
<style scoped>
.comment-list {
  margin-top: .3125rem /* 5/16 */
}

.no-centent {
  display: grid;
  text-align: center;
  background: #fff;
  padding-bottom: 1.25rem /* 20/16 */;
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

.avatar {
  width: 2.875rem /* 46/16 */;
  height: 2.875rem /* 46/16 */;
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
}

.contents {
  padding: 0.625rem /* 10/16 */ 0 0.625rem /* 10/16 */ 3.4375rem /* 55/16 */;
  font-size: 1rem /* 16/16 */;
  text-align: justify;
}

.reply .reply-content {
  text-align: justify;
}

.reply .reply-content .theme-color {
  font-size: 0.8125rem /* 13/16 */;
}

.reply {
  margin-left: 3.4375rem /* 55/16 */;
}

.footer-bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 3rem /* 48/16 */;
  background: #fff;
  border-top: 0.0625rem /* 1/16 */ solid #ededed;
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
  flex: 3;
}

.btn-icon {
  flex: 1;
}

.btn {
  flex: 1;
  text-align: center;
}

.btn i.iconfont {
  font-size: 1.25rem /* 20/16 */;
}

.input-box {
  background: #ebeef5;
  line-height: 2.375rem /* 38/16 */;
  border-radius: 0.375rem /* 6/16 */;
}

.input-box i.iconfont {
  margin-left: 0.625rem /* 10/16 */;
}

.field-box {
  border: 0.0625rem /* 1/16 */ solid #dcdfe6;
  border-radius: 0.25rem /* 4/16 */;
  overflow: hidden;
  flex: 4;
}

.submit-btn {
  flex: 1;
  text-align: center;
  margin-left: 0.3125rem /* 5/16 */;
}

span.reply-title {
  color: #909399;
  margin-right: .625rem /* 10/16 */;
}

.theme-btn{
  height: 2.875rem /* 46/16 */;
}
</style>

