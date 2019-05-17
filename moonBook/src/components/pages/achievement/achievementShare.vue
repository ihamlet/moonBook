<template>
  <div class="share">
    <div class="tips" v-if='userDataState.child_id == $route.query.id'>分享成就</div>

    <div class="wrap">
      <div class="child-info">
        <div class="avatar">
          <img :src="$route.query.avatar" @error="imgError" />
        </div>
        <div class="name">{{$route.query.name}}</div>
        <div class="label">在阅亮书架获得的成就</div>
      </div>
      <div class="medal-box fadeIn animated" :class="userDataState.child_id == $route.query.id?'is-mine':''">
        <img src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/medal.png" />

        <div class="level">Lv.{{$route.query.level}}</div>

        <div class="ribbon bounceIn animated">
          <div class="ribbon-content">{{$route.query.medalName}}</div>
          <div class="ribbon-left"></div>
          <div class="ribbon-right"></div>
        </div>
      </div>

      <div class="text">坚持{{text[1]}}{{$route.query.number}}{{$route.query.type == 'punch'?'天':'本'}}达成</div>

      <div class="tags-row" v-if='userDataState.child_id != $route.query.id'>
        <van-row gutter="10">
          <div class="row-title">给Ta鼓励</div>
          <van-col span="8" v-for='(item,index) in tags' :key="index">
            <van-button class="tags-btn" round type="default" size="small" @click="encourage(item)">{{item}}</van-button>
          </van-col>
          <van-col span="8">
            <van-button class="tags-btn" round type="default" size="small" @click="showField">
              自己写&nbsp;&nbsp;&nbsp;
              <img class="pencil" src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/pencil.png" />
            </van-button>
          </van-col>
        </van-row>

        <div class="button-bar">
            <van-button class="accept" size='normal' type="default" @click="toBabyHome" round >加入阅读打卡</van-button>
        </div>
      </div>

      <div class="logo" @click="toHome">
        <img src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/img/logo.png" />
      </div>
    </div>
    <div class="round-bg">
      <round />
    </div>

    <van-popup class="popup-message" v-model="isFieldShow" position="bottom"  @close='$refs.field.blur()'>
        <van-field :border='false' ref='field' class="field" v-model="message" type="textarea" :placeholder="`给${$route.query.name}一些鼓励吧...`" rows="4" autosize />
        <div class="footer-btn">
            <van-button class="theme-btn" type="primary" round @click="submit" :loading='isLoading' loading-text='发布中'>鼓励Ta</van-button>
        </div>
    </van-popup>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import IconMedal from './../../module/animate/medal'
import round from './../../module/animate/round'
import { childCommentTag } from './../../lib/js/speech'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'share',
  components: {
    IconMedal,
    round
  },
  computed: {
    ...mapGetters(['userDataState']),
    ...mapState('openWX', ['ready']),
    item() {
      let data = {
        details: '阅亮书架，与家人一起参与宝贝阅读，记录成长',
        title: `${this.$route.query.name}获得${this.$route.query.number}${this.text[0]}成就“${this.$route.query.medalName}”`,
        imgUrl: location.origin + this.$route.query.avatar
      }

      return data
    },
    text() {
      let text = []
      switch (this.$route.query.type) {
        case 'punch':
          text = ['天阅读', '阅读']
          break
        case 'read':
          text = ['本借阅', '借阅']
          break
      }

      return text
    }
  },
  data() {
    return {
      tags: childCommentTag,
      message: '',
      isFieldShow: false,
      isLoading: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.wxShare()
    })
  },
  watch: {
    ready() {
      this.wxShare()
    }
  },
  methods: {
    ...mapActions('openWX', ['share']),
    imgError(e) {
      e.target.src = 'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0'
    },
    wxShare() {
      const self = this
      let data = {
        item: self.item,
        success() {
          self.$router.go(-1)
        }
      }
      self.share(data)
    },
    toHome() {
      this.$router.push({
        name: 'home'
      })
    },
    submit() {
      let data = {
        child_id: this.$route.query.id,
        target: 'baby',
        post_id: this.$route.query.post_id,
        contents: this.message,
      }

      if (this.message.length) {
        this.isLoading = true

        axios.post('/book/SchoolArticleComment/edit?ajax=1', data).then(res => {
          if (res.data.status == 1) {
            this.$toast.success('鼓励')
            this.isLoading = false
            this.isFieldShow = false
          } else {
            this.$toast.fail(res.data.info)
          }
        })
      } else {
        this.$toast('请填写评论内容')
      }
    },
    toBabyHome(){
        this.$router.push({
            name:'baby-home',
            query:{
                id: this.userDataState.child_id
            }
        })
    },
    encourage(item) {
      this.message = item
      this.submit()
    },
    showField(){
        this.isFieldShow = true
        this.message = ''
        this.$nextTick(() => {
            this.$refs.field.focus()
        })
    }
  }
}
</script>
<style scoped>
.share {
  position: relative;
  background: #fff;
  overflow: hidden;
}

.wrap {
  min-height: 100vh;
  overflow: hidden;
  position: relative;
  z-index: 2;
}

.medal-box {
  position: relative;
}

.medal-box img {
  margin: 10px auto;
  display: block;
  width: 30%;
}

.child-info {
  text-align: center;
  padding: 5% 0 2%;
}

.child-info .avatar,
.child-info .avatar img {
  width: 65px;
  height: 65px;
  border-radius: 50%;
}

.child-info .avatar {
  margin: 0 auto;
  box-shadow: 0 2px 10px rgba(255, 152, 0, 0.3);
}

.wrap {
  position: relative;
}

.name {
  height: 36px;
  line-height: 36px;
}

.label {
  font-size: 13px;
}

.round-bg {
  opacity: 0.4;
}

.ribbon {
  position: absolute;
  z-index: 10;
  width: 30%;
  text-align: center;
  left: 50%;
  bottom: 50%;
  margin-left: -15%;
}

.ribbon-content {
  background: linear-gradient(160deg, #ff9800, #f44336);
  color: #fff;
  height: 30px;
  line-height: 30px;
  font-weight: 700;
  border-radius: 2px;
  font-size: 14px;
}

.ribbon-left,
.ribbon-right {
  width: 30px;
  height: 30px;
  position: absolute;
  background: rgba(255, 87, 34, 0.9);
  top: 20%;
  z-index: -1;
  opacity: 0.7;
}

.ribbon-left::before,
.ribbon-right::before {
  content: '';
  width: 0;
  height: 0;
  border-top: 15px solid transparent;
  border-bottom: 15px solid transparent;
  position: absolute;
}

.ribbon-left::before {
  left: 0;
  border-left: 12px solid #fff;
}

.ribbon-right::before {
  right: 0;
  border-right: 12px solid #fff;
}

.ribbon-left {
  left: -20px;
}

.ribbon-right {
  right: -20px;
}

.label {
  color: #909399;
}

.logo {
  position: absolute;
  width: 120px;
  bottom: 10px;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}

.tips {
  position: absolute;
  z-index: 10;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 0.625rem /* 10/16 */ 1.25rem /* 20/16 */;
  height: 20px;
  line-height: 20px;
  border-radius: 0.5rem /* 8/16 */;
  right: 0.625rem /* 10/16 */;
  top: 20px;
}

.tips::before {
  content: '';
  position: absolute;
  border-right: 0 solid transparent;
  border-left: 15px solid transparent;
  border-bottom: 20px solid#000;
  top: -20px;
  right: 0.5rem /* 8/16 */;
  opacity: 0.7;
}

.text {
  text-align: center;
  font-size: 16px;
}

.level {
  position: absolute;
  bottom: 18%;
  left: 50%;
  font-size: 30px;
  font-weight: 700;
  color: #fff;
  transform: translate3d(-50%, 0, 0);
  text-shadow: 0 0.25rem 0.625rem rgba(255, 152, 0, 0.7);
}

.tags-btn {
  padding: 0 15px;
  margin: 5px auto;
  display: block;
  position: relative;
}

.pencil {
  position: absolute;
  bottom: 0;
  right: -10px;
}

.row-title {
  text-align: center;
  font-size: 13px;
  color: #e6a23c;
  font-weight: 700;
  height: 36px;
  line-height: 36px;
}

.footer-btn{
    padding: 10px 15px;
}

.field{
    font-size: 16px;
}

.button-bar{
    padding: 10px 20px;
}

.footer-btn .theme-btn,
.button-bar .accept{
    width: 100%;
}

.medal-box.is-mine img{
  width: 60%;
}

.medal-box.is-mine .level{
  font-size: 50px;
}

.medal-box.is-mine .ribbon{
  width: 48%;
  margin-left: -24%;
}

.medal-box.is-mine .ribbon-content{
  height: 38px;
  line-height: 38px;
  font-size: 18px;
}

.medal-box.is-mine .ribbon-left,
.medal-box.is-mine .ribbon-right{
  height: 38px;
}

.medal-box.is-mine .ribbon-left::before,
.medal-box.is-mine .ribbon-right::before {
  content: '';
  width: 0;
  height: 0;
  border-top: 16px solid transparent;
  border-bottom: 16px solid transparent;
  position: absolute;
}
</style>
