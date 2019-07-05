<template>
  <div class="graphic-card">
    <div class="container">
      <div class="user-card flex flex-align">
        <div class="avatar" v-if="type=='babyHome'">
          <img :src="avatar" @error='imgError' v-http2https />
        </div>
        <div class="avatar" v-else @click="item.user_id > 0 && toBookZoom(item)">
          <img :src="item.user.avatar" @error='imgError' v-http2https>
        </div>
        <div class="info">
          <div class="name flex flex-align">
            <span v-line-clamp:20="1" :class="[item.card_level>'0'?'vip-highlight':'']">{{item.user.name}}</span>
            <vip-level v-if='item.card_level' animate='1' :level='item.card_level.level' />
          </div>
          <div class="titmeago flex flex-align">
            {{getTimeAgo(item.create_time)}}
            <span class="user-reading" v-line-clamp:20="1"
              v-if='post&&post.sign_days!=0&&item.tags=="阅读打卡"'>{{`坚持阅读${post.sign_days}天`}}</span>
            <span class="teacher-reading"
              v-line-clamp:20="1">{{`${getTags[1]?getTags[1]:''}${getTags[2]&&getTags[2]>0?` • 课堂阅读${getTags[2]}篇`:''}`}}</span>
          </div>
        </div>
        <div class="follow" v-if='!item.isMe&&item.user_id>0&&type!="zoom"'>
          <van-button size="small" class="theme-btn" :plain='item.isSubscribe?true:false' type="primary" round
            @click="follow(item)">{{item.isSubscribe?'已关注':'关注'}}</van-button>
        </div>
        <div v-if='moreBtn' class="more" @click="more(item)"><i class="iconfont">&#xe6f7;</i></div>
      </div>

      <media :item='item' type='card' :key="$route.query.id" :schoolName='schoolName' :schoolId='schoolId' />
      <div class="article-card" v-if='post&&(post.post_id >= 0 || post.tushu_id >= 0)'>
        <articleCard :item='post' :childId='item.child_id' :detailsId='post.post_id || post.tushu_id'
          @toDetails='toArticleShare' />
      </div>
      <div class="temp-type flex flex-align">
        <div class="temp-list flex flex-align">
          <van-tag round color='#0084ff' class="school-tag" v-line-clamp:20="1" size="large" v-if='item.from_page'>
            <div @click="toTeacherSchoolHome">{{schoolName}}</div>
          </van-tag>
          <van-tag round color='#0084ff' class="school-tag" v-line-clamp:20="1" size="large"
            v-else-if='item.user_school_id > 0'>
            <div @click="toSchoolHome(item)">{{item.user_school_name}}</div>
          </van-tag>
          <div class="cate theme-color" size="large" v-line-clamp:20="1" plain v-if='item.tags'
            @click='toPopupHelp(item)'>
            # {{getTags[0]}} {{item.banji_name?`来自:${item.banji_name}`:''}}
          </div>
        </div>
      </div>
      <div class="task" v-if='$route.query.tid == 5'>
        <task-card />
      </div>

      <div class="social flex flex-align" v-if='isSocialShow'>
        <div class="share">
          <i class="iconfont">&#xe654;</i> {{item.views>1000?'999+':item.views == '0'?'浏览':item.views}}
        </div>
        <div class="message" @click="messageShow">
          <i class="iconfont">&#xe731;</i> {{item.reply_num>1000?'999+':item.reply_num == '0'?'评论':item.reply_num}}
        </div>
        <div class="praise flex flex-align flex-justify" @click="addPraise(item)">
          <i class="iconfont" v-if="!item.isZan">&#xe644;</i>
          <i class="iconfont highlight rotateInDownLeft animated" v-else>&#xe6e3;</i>
          {{item.zan_num>1000?'999+':item.zan_num == '0'?'赞':item.zan_num}}
        </div>
      </div>
    </div>

    <van-popup v-model="show" position="top" get-container="#app"  overlay-class='bg-opacity' @close='$refs.message.blur()'>
        <van-field ref='message' class="message-field" v-model="message" type="textarea" :placeholder='`给${item.user.name}评论:`' :autosize='{maxHeight:300, minHeight: 100}' size='large' :border='false'>
          <div class="avatar mini-avatar" slot="left-icon">
            <img :src="userDataState.avatar"  @error='imgError' v-http2https>
          </div>
        </van-field>
        <van-cell>
          <van-button round class="send-btn theme-btn" type="primary" @click="submit" :loading='isLoading'>发布</van-button>
        </van-cell>
    </van-popup>
  </div>
</template>
<script>
import axios from "./../../lib/js/api"
import vipLevel from './../animate/svg/vipLevel'
import taskCard from './taskCard'
import media from './../mold/media'
import articleCard from './../card/articleCard'
import { timeago } from './../../lib/js/util'
import { mapGetters } from 'vuex'

export default {
  name: "graphic-card",
  props: {
    item: {
      type: Object,
      default() {
        return {
          photos: []
        }
      }
    },
    type: {
      type: String,
      default: ''
    },
    avatar: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    moreBtn: {
      type: Boolean,
      default: true
    },
    isSocialShow: {
      type: Boolean,
      default: true
    }
  },
  components: {
    taskCard,
    vipLevel,
    articleCard,
    media
  },
  computed: {
    ...mapGetters(['userPointState', 'userDataState']),
    post() {
      let content

      if (this.item.extra) {
        content = JSON.parse(this.item.extra)
      }

      return content
    },
    fromData() {
      let obj

      if (this.item.from_page) {
        let arr = this.item.from_page.split(',')
        obj = {
          teacher_school_id: arr[0],
          teacher_school_name: arr[1]
        }
      }

      return obj
    },
    schoolName() {
      let name
      if (this.item.from_page) {
        name = this.fromData.teacher_school_name
      } else if (this.item.user_school_id > 0) {
        name = this.item.user_school_name
      }

      return name
    },
    schoolId() {
      let id
      if (this.item.from_page) {
        id = this.fromData.teacher_school_id
      } else if (this.item.user_school_id > 0) {
        id = this.item.user_school_id
      }

      return id
    },
    getTags() {
      return this.item.tags ? this.item.tags.split(',') : ''
    }
  },
  data() {
    return {
      imgIndex: 0,
      articleShow: false,
      shareShow: false,
      show: false,
      message:'',
      isLoading: false
    }
  },
  methods: {
    addPraise(item) {
      item.isZan = !item.isZan
      axios.get(`/book/SchoolArticle/zan?ajax=1&id=${this.item.post_id}`).then(res => {
        item.zan_num = res.data.data.like
      })
    },
    toArticle(item) {
      this.$router.push({
        name: 'article',
        query: {
          id: item.post_id,
          type: item.template_id,
          back: this.$route.name,
          back_id: this.$route.query.id,
          school_name: this.schoolName,
          school_id: this.schoolId,
          point: 'comments'
        }
      })
    },
    toArticleShare(data) {
      this.$router.push({
        name: data.routeName,
        query: {
          id: data.detailsId
        }
      })
    },
    follow(item) {
      this.$emit('follow', item)
    },
    toBookZoom(item) {
      this.$router.push({
        name: 'zoom',
        query: {
          id: item.user_id
        }
      })
    },
    toSchoolHome(item) {
      if (item.user_school_id > 0) {
        this.$router.push({
          name: 'apps-school',
          query: {
            id: item.user_school_id,
            back: this.$route.name,
            backPageName: this.$route.meta.title
          }
        })
      }
    },
    toTeacherSchoolHome() {
      this.$router.push({
        name: 'apps-school',
        query: {
          id: this.fromData.teacher_school_id,
          back: this.$route.name,
          backPageName: this.$route.meta.title
        }
      })
    },
    toVideoPage(videoItem) {
      this.$router.push({
        name: 'video-page',
        query: {
          id: videoItem.post_id,
          user_id: this.item.user_id,
          page_id: this.$route.query.id,
          back: this.$route.name
        }
      })
    },
    getTimeAgo(time) {
      return timeago(time * 1000)
    },
    more(item) {
      this.$emit('more', item)
    },
    imgError(e) {
      e.target.src = 'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0'
    },
    toPopupHelp(item) {
      switch (item.tags) {
        case '宝贝主页':
          this.$router.push({
            name: 'popupHelp',
            query: {
              type: 'baby'
            }
          })
          break

        case '阅读打卡':
          this.$router.push({
            name: 'popupHelp',
            query: {
              type: 'read'
            }
          })
          break

        default:
          this.$router.push({
            name: 'class-home',
            query: {
              id: this.item.class_id,
              school_id: this.schoolId,
              school_name: this.schoolName,
              banji_id: this.item.class_id,
              banji_name: this.getTags[1] ? this.getTags[1] : ''
            }
          })
          break
      }
    },
    messageShow(){
      this.show = true
     
      this.$nextTick(() => {
        this.$refs.message.focus()
      })
      
      this.message = ''
    },
    submit(){
      if(this.message.length > 0){
        this.isLoading = true

        let data = {
          post_id: this.item.post_id,
          contents: this.message
        }

        axios.post('/book/SchoolArticleComment/edit?ajax=1',data).then(res=>{
          this.isLoading = false
          switch(res.data.status){
            case 1:
              this.$toast.success(res.data.info)
              this.show = false
              this.$refs.message.blur()
              break
            default:
              this.$toast(res.data.info)
          }
        })
      }else{
        this.show = false
        this.$refs.message.blur()
      }
    }
  }
}
</script>
<style scoped>
.text {
  margin: 0.9375rem /* 15/16 */ 0;
  text-align: justify;
  font-size: 0.9375rem /* 15/16 */;
}

.social {
  margin-top: 0.625rem /* 10/16 */;
  height: 2.25rem /* 36/16 */;
  border-top: 0.0625rem /* 1/16 */ solid #f2f6fc;
}

.media {
  margin-bottom: 0.625rem /* 10/16 */;
}

.info i.iconfont {
  font-size: 1.25rem /* 20/16 */;
}

.avatar {
  margin-right: 5px;
}

.info {
  flex: 3;
}

.more {
  flex: 0.5;
  text-align: right;
}

.name {
  color: #303133;
  font-size: 1rem /* 16/16 */;
}

.memberships {
  margin-left: 0.3125rem /* 5/16 */;
}

.avatar img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}

.follow {
  flex: 0.6;
}

.school {
  text-align: left;
}

.class-name {
  margin-left: 0.625rem /* 10/16 */;
}

.task {
  margin-top: 0.625rem /* 10/16 */;
}

.user-card {
  position: relative;
  z-index: 2;
}

.school-tag {
  margin-right: 0.625rem /* 10/16 */;
  max-width: 160px;
}

.vip-highlight {
  color: #ff9800;
}

.temp-type {
  padding: 0.3125rem /* 5/16 */ 0;
  justify-content: space-between;
}

.article-card {
  margin-bottom: 10px;
}

.cate {
  flex: 2;
}

.user-reading,
.teacher-reading {
  margin-left: 5px;
  max-width: 180px;
}

.teacher-reading {
  flex: 1;
}

.titmeago {
  white-space: nowrap;
  font-size: 12px;
  height: 16px;
  line-height: 16px;
}

.message-field.van-cell{
  font-size: 17px;
}

.avatar.mini-avatar,
.avatar.mini-avatar img{
  width: 28px;
  height: 28px;
}

.send-btn{
  width: 100%;
}
</style>
