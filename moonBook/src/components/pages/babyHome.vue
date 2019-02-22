<template>
  <div class="baby-home page-padding" v-if='hackReset'>
    <van-nav-bar fixed :class="[fixedHeaderBar?'theme-nav':'']" :zIndex="100" @click-left="onClickLeft">
      <div class="head-bar-title" slot="title" @click="isSelectBabyShow = true">
          {{pageTitle}} <i class="iconfont">&#xe608;</i>
      </div>
      <div class="head-bar-text" slot="left">
        <van-icon name="arrow-left" />
        <span class="text">{{$route.query.back||$route.query.backGo?'返回':'首页'}}</span>
      </div>
    </van-nav-bar>
    <div class="header" ref="head" :class="[childInfo.sex=='boy'?'theme-background':'background']">
      <div class="baby-info flex flex-align">
        <div class="avatar" v-if="childInfo.avatar" @click="toEgg">
          <img class="avatar-img" :src="childInfo.avatar" @error="imgError" :alt="childInfo.name">
        </div>
        <avatar :gender="childInfo.sex" v-else />
        <div class="baby-data" @click="toEditorBaby">
          <div class="list flex flex-align">
            <div class="item name">{{childInfo.name}}</div>
            <div class="item detail">
              <span class="gender">
                <i class="iconfont" v-if="childInfo.sex=='boy'">&#xe646;</i>
                <i class="iconfont" v-else>&#xe645;</i>
              </span>
              <span class="age">{{childInfo.age}}岁</span>
            </div>
          </div>
          <div class="label">{{childInfo.title}}</div>
          <div class="school" v-line-clamp:20="1">{{childInfo.school_name}}</div>
        </div>
        <div class="add-praise" @click="babyPraise(childInfo)">
          <i class="iconfont">&#xe6e3;</i>
        </div>
        <div class="qr-code" @click="showQrcode=true">
          <i class="iconfont">&#xe622;</i>
        </div>
      </div>
      <wave />
    </div>
    <div class="container">
      <div class="bar flex flex-align">
        <div class="bar-item totalReading" @click="toReadAmount">
          <span class="number">{{childInfo.read_count}}</span>
          <span class="bar-title">阅读量</span>
        </div>
        <div class="bar-item praise" @click="toInformation">
          <span class="number">{{childInfo.zan_count}}</span>
          <span class="bar-title">赞</span>
        </div>
        <div class="bar-item diary" @click="toReadStat">
          <span class="number">{{childInfo.insist_days}}</span>
          <span class="bar-title">坚持天数</span>
        </div>
      </div>
      <lazy-component class="module" v-if="isMine">
        <family />
      </lazy-component>
      <lazy-component class="module" v-if="!isMine">
        <reading :list="lateBook" moduleTitle="宝贝最近在读的书" />
      </lazy-component>
      <lazy-component v-if="isMine">
        <van-nav-bar title="成长日记">
          <div class="post-count" slot="left">
            {{childInfo.post_count}}日记
          </div>
          <div class="task" slot="right">
            活动<van-tag class="tag-task" round type="danger">4</van-tag>
          </div>
        </van-nav-bar>
        <van-tabs color='#409eff' :line-width='20' :line-height='4' sticky swipeable animated @change="onChangeTab" :offsetTop='45'>
          <van-tab v-for="(list,index) in tab" :title="list.title" :key="index">
            <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad">
              <van-pull-refresh v-model="loading" @refresh="onRefresh">
                  <div class="tab-content" v-if='list.content.length'>
                    <div class="item" v-for='(item,itemIndex) in list.content' :key="itemIndex">
                      <van-cell title="" v-if='item.isMe' @click="actionsheet(item)" is-link arrow-direction='down'/>
                      <van-cell>
                        <graphic-card :item="item" type="babyHome" :avatar='childInfo.avatar' />
                      </van-cell>
                    </div>
                  </div>
                  <div class="no-content" v-else>
                    <img src="./../../assets/img/noData.png" />
                    暂无记录
                  </div>
              </van-pull-refresh>
            </van-list>
          </van-tab>
        </van-tabs>
      </lazy-component>
    </div>

    <slogan v-if="!isMine" />

    <van-popup v-model="showQrcode" class="card-popup">
      <qr-code :qrImage="qrImage" type="babyHome" :label="childInfo.title" :childInfo="childInfo" @close="showQrcode = false" />
    </van-popup>

    <van-popup v-model="zanShow" class="add-count-popup" :overlay="false" :lock-scroll='false' get-container='#app'>
      <i class="iconfont" :class="[zanShow?'rotateInDownLeft animated':'']">&#xe6e3;</i>
    </van-popup>
    <!-- 文章操作 -->
    <van-actionsheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect" @cancel="show = false" />
    <!-- 切换孩子 -->
    <van-actionsheet v-model="isSelectBabyShow" :actions="SelectBabyActions" cancel-text="取消" @select="onSelectBaby" @cancel="isSelectBabyShow = false" />
  </div>
</template>
<script>
import axios from "./../lib/js/api"
import { mapActions } from 'vuex'
import { format,timeago } from "./../lib/js/util.js"
import QRCode from "qrcode"
import wave from "./../module/animate/anWave"
import qrCode from "./../module/mold/qrCode"
import avatar from "./../module/avatar"
import reading from "./../module/reading"
import graphicCard from "./../module/card/graphicCard"
import classShow from './../module/classModule/classShow'
import family from './../module/myModule/family'
import activity from './../module/activity/activity'
import slogan from './../module/slogan'

export default {
  name: "baby-home",
  components: {
    wave,
    qrCode,
    reading,
    avatar,
    graphicCard,
    classShow,
    family,
    slogan,
    activity
  },
  computed: {
    pageTitle() {
      let name = ''

      if (this.childInfo.is_mine) {
        if (this.fixedHeaderBar) {
          name = this.$route.meta.title
        } else {
          name = this.childInfo.name
        }
      } else {
        name = `${this.childInfo ? this.childInfo.name : ''}小朋友`
      }

      return name
    },
    isMine(){
      if(this.childInfo.is_mine){
        return true
      }
    },
    SelectBabyActions(){
      let array = this.babyList
      let arr = []
      if(this.babyList.length > 0){
        array.forEach(e => {
          arr.push({
            name: e.name,
            id: e.id,
            subname: this.$route.query.id == e.id?'当前宝贝':''
          })
        })
      }
      return arr
    }
  },
  data() {
    return {
      hackReset:true,
      show:false,
      isSelectBabyShow:false,
      zanShow: false,
      fixedHeaderBar: true,
      domHeight: "",
      childInfo: "",
      qrImage: "",
      showQrcode: false,
      lateBook: [],
      list: [],
      babyList: [],
      loading: false,
      finished: false,
      releasePageShow: false,
      loading: false,
      page: 1,
      tabIndex: 0,
      tab: [{
        title: '全部',
        content: ''
      }],
      actions: [{
        name: '删除',
        type: 'delete'
      }],
      postId:'',

      // 倒计时
      // keepTime: '倒计时',
      // limittime: 100,
      // endTime: '2019-12-30 22:22:22',
      // flag: false
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.qrcode()
      vm.request()
    })
  },
  created() {
    this.fetchData()
    // this.StartCountDown() //倒计时
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll)
  },
  watch: {
    $router: "fetchData"
  },
  methods: {
    ...mapActions(["getUserData"]),
    fetchData() {
      axios.get('/book/schoolArticleCate/getList?portal_name=宝贝主页').then(res => {
        if (res.status == 200) {
          let array = res.data
          array.forEach(element => {
            this.tab.push({
              title: element.cate_name,
              content: ''
            })
          })
        }
      })

      axios.get(`/book/BabyBorrow/getList?page=1&limit=20&child_id=${this.$route.query.id}`).then(res => {
        this.lateBook = res.data.data
      })

        this.getUserData().then(res => {
          axios.get(`/book/baby/getList?sort=old&user_id=${res.id}`).then(res => {
            if(res.data.status){
              this.babyList = res.data.data
            }
          })
        })
    },
    request(){
      this.getUserData().then(res => {
        if (res.child_id > '0') {
          axios.get(`/book/baby/getInfo?child_id=${this.$route.query.id}`).then(res => {
            this.childInfo = res.data.data
          })
        } else {
          this.$router.push({
            name: 'edit-child',
            query: {
              type: 'add',
              pageTitle: '添加宝贝'
            }
          })
        }
      })
    },
    onClickLeft() {
      if (this.$route.query.back) {
        this.$router.push({
          name: this.$route.query.back,
          query: {
            id: this.$route.query.banji_id ? this.$route.query.banji_id : this.$route.query.id,
            back: this.$route.name,
            child_id: this.$route.query.id
          }
        })
      } else {
        this.$router.push({
          name: "home"
        })
      }
    },
    qrcode() {
      QRCode.toDataURL(window.location.href).then(url => {
        this.qrImage = url
      }).catch(err => {
        console.error(err)
      })
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
      if (this.$refs.head) {
        this.domHeight = this.$refs.head.offsetHeight / 2
      }
    },
    onChangeTab(index) {
      this.tabIndex = index
      this.page = 1
      this.onRefresh()
    },
    getList() {
      let data = {
        params: {
          page: this.page,
          sort: 'new',
          child_id: this.$route.query.id,
          portal_name: '宝贝主页'
        }
      }

      if (this.tabIndex > 0) {
        data.params.cate = this.tab[this.tabIndex].title
      }

      return axios.get('/book/SchoolArticle/getList', data).then(res => {
        if (this.page == 1) {
          this.tab[this.tabIndex].content = res.data.data
        } else {
          this.tab[this.tabIndex].content = this.list.concat(res.data.data)
        }
        this.loading = false
        this.page++
        if (this.tab[this.tabIndex].content.length >= res.data.count) {
          this.finished = true
        }
      })
    },
    onLoad() {
      this.getList()
    },
    onRefresh() {
      this.page = 1
      this.getList().then(() => {
        this.loading = false
      })
    },
    toClassHome(childInfo) {
      if (childInfo.banji_id > 0) {
        this.$router.push({
          name: "class-home",
          query: {
            id: childInfo.banji_id
          }
        })
      } else {
        this.$router.push({
          name: "class-home",
          query: {
            id: childInfo.child_id,
            schoolId: childInfo.school_id
          }
        })
      }
    },
    babyPraise(childInfo) {
      axios.get(`/book/baby/zan?child_id=${this.$route.query.id}`).then(res => {
        if (res.data.status == 1) {
          this.zanShow = true
          childInfo.zan_count = res.data.data.zan_count
        } else {
          this.$toast(res.data.msg)
        }

        setTimeout(() => {
          this.zanShow = false
        }, 2000)
      })
    },
    imgError(e) {
      e.target.src = 'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0'
    },
    timeAgo(time){
      return timeago(time*1000)
    },
    toEgg(){
      this.$router.push({
        name:'egg',
        query:{
          id: this.childInfo.id,
          back: this.$route.name,
          banji_id: this.childInfo.banji_id
        }
      })
    },
    toReadStat(){
      this.$router.push({
        name:'readStat',
        query:{
          id: this.$route.query.id,
          back: this.$route.name
        }
      })
    },
    toReadAmount(){
      this.$router.push({
        name:'readAmount',
        query:{
          id: this.$route.query.id,
          back: this.$route.name
        }
      })
    },
    toInformation(){
      this.$router.push({
        name:'information',
        query:{
          id: this.$route.query.id,
          back: this.$route.name
        } 
      })
    },
    toEditorBaby(){
      if(this.childInfo.is_mine){
        this.$router.push({
          name:'edit-child',
          query:{
            id:this.$route.query.id,
            pageTitle:'编辑宝贝',
            type:'edit',
            back: this.$route.name
          }
        })
      }
    },
    actionsheet(item){
      this.show = true
      this.postId = item.post_id
    },
    onSelect(item) {
      if (item.type == 'delete') {
        axios.get(`/book/SchoolArticle/del?id=${this.postId}`).then(res=>{
          if(res.data.status){
            this.onRefresh()
          }
        })
        this.show = false

        this.$toast.success('删除成功')
      }
    },
    onSelectBaby(item){
      this.hackReset = false
      this.isSelectBabyShow = false

      this.$nextTick(() => {
          this.hackReset = true
          this.request()
          this.onRefresh()
        })

      this.$router.push({
        name:'baby-home',
        query:{
          id: item.id,
          back: this.$route.name
        }
      })
    }
    // 倒计时开始
    // StartCountDown() {
    //     let mydate = new Date()
    //     mydate.setMinutes(mydate.getMinutes() + this.limittime)
    //     this.settime=mydate

    //     let time = setInterval(() => {
    //         if (this.flag == true) {
    //             clearInterval(time)
    //         }
    //         this.timeDown()
    //     }, 100)
    // },
    // 进行倒计时
    // timeDown() {
    //   const endTime = new Date(this.endTime)
    //   const nowTime = new Date()
    //   let leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000)
    //   let d = parseInt(leftTime / (24 * 60 * 60))
    //   let h = this.formate(parseInt(leftTime / (60 * 60) % 24))
    //   let m = this.formate(parseInt(leftTime / 60 % 60))
    //   let s = this.formate(parseInt(leftTime % 60))
    //   if (leftTime <= 0) {
    //       this.flag = true
    //       console.log("时间到")
    //   }
    //   this.keepTime = `${h}:${m}:${s}`

    //   console.log(this.keepTime)
    // },
    // formate(time) {
    //   if (time >= 10) {
    //       return time
    //   } else {
    //       return `0${time}`
    //   }
    // }
  }
}

</script>
<style scoped>
.header {
  width: 100%;
  position: relative;
}

.background {
  background: linear-gradient(-135deg, #ff765c, #ff23b3);
}

.baby-info .avatar img{
  margin-right: 0.625rem /* 10/16 */;
  width: 3.75rem /* 60/16 */;
  height: 3.75rem /* 60/16 */;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0.3125rem /* 5/16 */ 1.25rem /* 20/16 */ rgba(0, 0, 0, 0.2);
  border: 0.1875rem /* 3/16 */ solid #fff;
}

.baby-info .avatar img {
  width: 3.75rem /* 60/16 */;
  height: 3.75rem /* 60/16 */;
  border-radius: 50%;
}

.baby-info {
  padding: 3.5rem /* 56/16 */ 1.25rem /* 20/16 */ 0 1.25rem /* 20/16 */;
  position: relative;
  z-index: 1;
}

.list {
  color: #fff;
}

.detail,
.school {
  font-size: 0.875rem /* 14/16 */;
}

.school {
  width: 10rem /* 160/16 */;
  text-align: left;
  color: #fff;
}

.add-praise,
.qr-code {
  position: absolute;
}

.qr-code {
  right: 1.25rem /* 20/16 */;
}

.add-praise {
  right: 4.375rem /* 70/16 */;
}

.add-praise i.iconfont,
.qr-code i.iconfont {
  font-size: 1.5rem /* 24/16 */;
  color: #fff;
  text-shadow: 0 0.125rem /* 2/16 */ 0.375rem /* 6/16 */ rgba(0, 0, 0, 0.1);
}

.follow .theme-btn {
  border-color: #fff;
  color: #fff;
}

.bar {
  background: #fff;
  padding: 0.625rem /* 10/16 */ 0;
}

.bar-item {
  flex: 1;
  text-align: center;
  display: grid;
}

.bar-item .number {
  font-size: 1.375rem /* 22/16 */;
  font-weight: 500;
}

.bar-item .bar-title {
  font-size: 0.875rem /* 14/16 */;
}

.label {
  font-size: 0.8125rem /* 13/16 */;
  color: #fff;
}

.add-count-popup .iconfont {
  font-size: 2.25rem /* 36/16 */;
  background: linear-gradient(90deg, #ff2a00, #ff00af);
  -webkit-background-clip: text;
  color: transparent;
  display: block;
}

.name {
  margin-right: 0.625rem /* 10/16 */;
}

.no-content{
  background: #fff;
  display: grid;
  text-align: center;
  padding-bottom: 3.125rem /* 50/16 */;
  color: #C0C4CC;
}


.no-content img{
  width: 9.375rem /* 150/16 */;
  margin: 1.25rem /* 20/16 */ auto;
  opacity: .7;
}

.time-line{
  width: 100%;
  height: 3.125rem /* 50/16 */;
  position: relative;
}

.time-line::before{
  position: absolute;
  left: 1.5625rem /* 25/16 */;
  top: 0;
  width: .625rem /* 10/16 */;
  height: 100%;
  content: "";
  background: #FFC107;
}

.time{
  margin-left: 3.125rem /* 50/16 */;
  font-size: 1.125rem /* 18/16 */;
  font-weight: 500;
}

.item{
  margin-bottom: .625rem /* 10/16 */;
}

.task{
  position: relative;
}

.task .tag-task{
  position: absolute;
  top: .3125rem /* 5/16 */;
  right: -.625rem /* 10/16 */;
}

</style>
<style>
.add-count-popup.van-popup {
  background: transparent;
}
</style>

