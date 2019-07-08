<template>
  <div class="comment-list page-padding" id='comment' ref='comment'>
    <van-nav-bar :border='false' :zIndex='0'  :key='$route.query.id'>
      <div class="zan" slot="right">赞 {{item.zan_num}}</div>
      <div class="comment" slot="left">{{listLength}} 评论</div>
    </van-nav-bar>

    <div class="container" v-if='list.length'>
      <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
        <van-cell v-for="(contentItem,index) in list" :key="index">
          <div class="user-card flex flex-align">
            <div class="user-info flex flex-align">
              <div class="avatar" @click="toZoom(contentItem)">
                <img :src="contentItem.avatar" v-http2https/>
              </div>
              <div class="user-data">
                <span class="user-name">{{contentItem.username}}</span>
              </div>
            </div>
            <div class="zan flex flex-align" @click="zan(contentItem)">
              <i class="iconfont highlight rotateInDownLeft animated" v-if="contentItem.isZan">&#xe668;</i>
              <i class="iconfont" v-else>&#xe669;</i>
              <div class="num">{{contentItem.zan_count}}</div>
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
    <div class="no-centent"  v-else>
      <div class="prompt" @click="showField()">暂无评论,点击抢沙发</div>
    </div>

    <!-- 评论输入框  -->
    <div class="comment">
      <div class="footer-bar">
        <div class="bar-padding flex flex-align">
          <div class="input-box flex flex-align" @click="showField()">
            <div class="input-box-avatar avatar">
              <img :src="userDataState.avatar" v-http2https @error='imgError'/>
            </div>
            <span>写评论</span>
          </div>
          <div class="btn-icon flex flex-align">
            <div class="btn" @click="toScroll">
              <van-tag class="num-tag" v-if='listLength > 0' round type="danger">{{listLength > 1000?'999+':listLength}}</van-tag>
              <i class="iconfont">&#xe731;</i>
            </div>
            <div class="btn flip animated" v-if='$route.name == "article"' @click="$emit('giftShow')">
              <img class="ds-icon" src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/icon/jinbi.png" />
            </div>
            <div class="btn" @click="addPraise(item)">
              <van-tag class="num-tag" v-if='item.zan_num > 0' round type="danger">{{item.zan_num > 1000?'999+':item.zan_num}}</van-tag>
              <i class="iconfont highlight rotateInDownLeft animated" v-if="item.isZan">&#xe6e3;</i>
              <i class="iconfont" v-else>&#xe644;</i>
            </div>
            <div class="btn" @click="addCollect(item)" v-if='include != "include"'>
              <van-tag class="num-tag" v-if='item.collect_num > 0' round type="danger">{{item.collect_num > 1000?'999+':item.collect_num}}</van-tag>
              <i class="iconfont star highlight swing animated" v-if="item.isShoucang">&#xe64b;</i>
              <i class="iconfont" v-else> &#xe64c;</i>
            </div>
            <div class="btn" v-else @click="isShare">
              <i class="iconfont">&#xe96e;</i>
            </div>
          </div>
        </div>
      </div>

      <van-popup v-model="show" class="comment-popup" overlay-class='bg-opacity' position="top" get-container='#app' @close='$refs.field.blur()'>
        <div class="score flex-column" v-if='include != "include"&&score'>
          <div class="score-title">评分</div>
          <van-rate class="score-rate" v-model="star" :size="25" :count="5" void-color="#ceefe8" />
        </div>
        <div class="comment-content">
          <div class="field-box">
              <van-field class="comment-field" :border='false' size='large' v-model="message" ref='field' type="textarea" :placeholder="placeholder" :autosize='{maxHeight: 200, minHeight: 100}'/>
          </div>
        </div>
        <div class="comment-tag scroll-x" v-if='item.template_id == 1'>
          <div class="scroll-item jackInTheBox animated" :style="{animationDelay:`${100*index}ms`}" v-for='(item,index) in commentTag' :key="index" @click="biuCommentTag(item)">
            <van-button round class="tag-item" type="default">{{item}}</van-button>
          </div>
        </div>

        <van-cell>
          <van-button class="theme-btn" :loading="isLoading" size="normal" type="primary" @click="submit" round>发 布</van-button>
        </van-cell>
      </van-popup>
    </div>

    <van-popup v-model="shareShow" get-container='#app' class="share-popup">
      <div class="share-img">
        <img src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/img/shareWord.png" />
      </div>
    </van-popup>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import axios from './../lib/js/api'
import { timeago,getRandomArrayElements } from './../lib/js/util'
import { placeholder, commentTag } from './../lib/js/speech'

export default {
  name: 'comment',
  props: ['item', 'include', 'type','postId','isCommentShow'],
  computed: {
    ...mapGetters(['userToken', 'userDataState']),
    placeholder(){
      let text

      if(this.commentId){
        text = this.prompt
      }else{
        text = getRandomArrayElements(placeholder,1)[0]
      }

      return text
    },
    commentTag(){
      commentTag.sort(()=>{
        return Math.random()-0.5
      })

      return commentTag
    }
  },
  data() {
    return {
      star: 3,
      list: [],
      toTopAndComment: false,
      listLength: '',
      loading: false,
      finished: false,
      page: 1,
      commentId: '',
      show: false,
      isLoading: false,
      message: '',
      shareShow: false,
      score: false,
      prompt:''
    }
  },
  watch: {
    postId(val){
      axios.get('/book/SchoolArticleComment/getList',{
        params:{
          post_id:val
        }
      }).then(res=>{
         switch(res.data.status){
           case 1:
            this.listLength = res.data.count
            this.list = res.data.data
            break
           default:
            this.$toast(res.data.msg)
         }
      })
    },
    show(val){
      this.$emit('showComment',val)
    }
  },
  methods: {
    onLoad() {
      let data = {
        params: {
          post_id: this.postId,
          page: this.page,
          limit: 10,
          sort: 'new'
        }
      }

     return axios.get('/book/SchoolArticleComment/getList', data).then(res => {

        if (res.data.status == 1) {
          let array = res.data.data
          if (this.page == 1) {
            this.list = array
          } else {
            this.list = this.list.concat(array)
          }
          
          this.loading = false
          this.page++
          if (this.list.length >= res.data.count) {
            this.finished = true
          }
        }

      })
    },
    biuCommentTag(item){
      this.message = item
      this.submit()
    },
    submit() {
      this.isLoading = true
      let data = {
        post_id: this.item.post_id,
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
            this.$refs.comment.scrollIntoView()
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

            if(item.isZan){
              item.zan_num++
            }else{
              item.zan_num--
            }

            if (res.data.data.like == '1') {
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
          post_id: this.postId
        }
      }

      // 2019年6月6日
      // if(this.type == 'bookDetails'){
      //   data.params.model = 'Tushu'
      // }

      axios.get('/book/SchoolArticleCollect/add', data).then(res => {
        if (res.data.status == 1) {
          if(item.isShoucang){
            item.collect_num++
          }else{
            item.collect_num--
          }

          if(!item.isShoucang){
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

        this.score = type == 'reply' ? false : true
      }
    },
    timeAgo(time) {
      return timeago(time * 1000)
    },
    toScroll() {
      this.toTopAndComment = !this.toTopAndComment
      if (this.toTopAndComment) {
        this.$refs.comment.scrollIntoView({
          behavior:'smooth'
        })
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
      if(this.$route.query.type != 'preview') {
        this.shareShow = true
      }
    },
    imgError(e) {
      e.target.src = 'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0'
    },
    zan(contentItem){
      contentItem.isZan = !contentItem.isZan
      let data = {
        params: {
          comment_id: contentItem.comment_id
        }
      }

      axios.get('/book/SchoolArticleComment/zan',data).then(res=>{
        switch(res.data.status){
          case 1:
            contentItem.zan_count = res.data.data.zan_count
          break
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
  color: #909399;
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

/* .comment-content {
  align-items: flex-end;
} */

.bar-padding {
  padding: 0.3125rem /* 5/16 */ 0.625rem /* 10/16 */;
}

.input-box {
  height: 2.375rem /* 38/16 */;
  flex: 1.3;
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

.comment-field{
  font-size: 16px;
}

.comment-tag{
  padding:20px 10px;
}

.tag-item{
  vertical-align: middle;
  white-space: nowrap;
  text-decoration: none;
  text-overflow: ellipsis;
  margin-right: 15px;
}

.user-card{
  justify-content: space-between;
}

.zan .iconfont{
  font-size: 20px;
  margin-right: 5px;
}

.spray-dom{
  position: absolute;
  top: 0;
  left: 0;
}

.theme-btn{
  width: 100%;
}

.ds-icon{
  width: 23px;
  height: 23px;
}
</style>

