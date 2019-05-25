<template>
  <div class="baby-home page-padding" v-if='hackReset'>
    <van-nav-bar :border='false' fixed :class="[fixedHeaderBar?'theme-nav':'']" :zIndex="100" @click-left="onClickLeft" :key='$route.query.id'>
      <div class="head-bar-title" slot="title" @click="selectBaby">
        {{pageTitle}} <i class="iconfont" v-if='babyList.length'>&#xe608;</i>
      </div>
      <div class="head-bar-text" slot="right" v-if='childInfo.is_mine' @click="toVerifyList">
        <span class="text">
          <i class="iconfont">&#xe653;</i>
        </span>
      </div>
    </van-nav-bar>
    <div class="header" ref="head" :class="[childInfo.gendor==1?'theme-background':'background']">
      <div class="baby-info flex flex-align">
        <div class="avatar" v-if="childInfo.avatar" @click="toEditorBaby">
          <img class="avatar-img" :src="childInfo.avatar" @error="imgError" v-http2https>    
        </div>
        <avatar :gender="childInfo.sex" size='small' avatarClass='border' v-else />
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
          <div class="label" v-if='childInfo'>{{level?`${level.type == "punch"?"Rv":"Bv"}.${level.level} ${level.name}`:`Lv.0 ${childInfo.title}`}}</div>
          <div class="school" v-line-clamp:20="1">{{childInfo.school_name}}</div>
        </div>
        <div class="to-banji-btn" v-if='childInfo.banji_id > 0&&childInfo.is_mine'>
          <van-button plain size="small" round class="theme-plain" type="primary" @click="toClassHome">{{formatBanjiTitle(childInfo.banji_name)}}</van-button>
        </div>
      </div>
      <wave />
    </div>
    <div class="container">
      <div class="bar flex flex-align">
        <div class="bar-item totalReading" @click="toReadAmount">
          <span class="number">{{childInfo.read_count}}</span>
          <span class="bar-title">借阅量</span>
        </div>
        <div class="bar-item" @click="toPunchList">
          <span class="number">{{childInfo.sign_read_count}}</span>
          <span class="bar-title">阅读数</span>
        </div>
        <div class="bar-item diary" @click="toReadStat">
          <span class="number">{{childInfo.sign_days}}</span>
          <span class="bar-title">坚持天数</span>
        </div>
        <div class="bar-item praise" @click="toInformation">
          <span class="number">{{childInfo.zan_count}}</span>
          <span class="bar-title">赞</span>
        </div>
      </div>

      <div class="metro-card" v-if='childInfo.is_mine'>
        <metro/>
      </div>

      <div v-if="childInfo.is_mine" class="article-list">
        <van-tabs color='#0084ff' :line-width='20' :line-height='4' sticky swipeable animated @change="onChangeTab" :offsetTop='45'>
          <van-tab v-for="(list,index) in tab" :title="list.title" :key="index">
            <van-list v-model="loading" :finished="finished" :finished-text="$store.state.slogan" @load="onLoad" v-if='index == tabIndex'>
              <van-pull-refresh v-model="loading" @refresh="onRefresh">
                <div class="tab-content" v-if='list.content.length'>
                  <div class="item" v-for='(item,itemIndex) in list.content' :key="itemIndex">
                    <van-cell>
                      <graphic-card :item="item" type="babyHome" :title='`${childInfo.name}的家长`' :avatar='childInfo.avatar' @more="actionsheet"/>
                    </van-cell>
                  </div>
                </div>
                <div class="no-content" v-else>
                  <img src="https://assets-moonbook.oss-cn-beijing.aliyuncs.com/img/noData.png" />
                  暂无记录
                </div>
              </van-pull-refresh>
            </van-list>
          </van-tab>
        </van-tabs>
      </div>
      <div class="module" v-else>
        <reading :list="lateBook"  moduleTitle="宝贝最近在读的书" :key="$route.query.id"/>
      </div>
    </div>

    <slogan v-if="!childInfo.is_mine"/>

    <div class="punch" v-if='childInfo.is_mine'>
      <van-button @click="punch" class="theme-btn" round size="normal" type="primary">
        <i class="iconfont">&#xe60a;</i>
        阅读打卡
      </van-button>
    </div>

    <van-popup v-model="zanShow" class="add-count-popup" :overlay="false" :lock-scroll='false' get-container='#app'>
      <i class="iconfont" :class="[zanShow?'rotateInDownLeft animated':'']">&#xe6e3;</i>
    </van-popup>
    <!-- 文章操作 -->
    <van-actionsheet v-model="show" :actions="actions" cancel-text="取消" @select="onSelect" @cancel="show = false" />
    <!-- 推荐操作 -->
    <van-actionsheet v-model="actionsheetShow" :actions="recommendActions" @select="onRecommendSelect" cancel-text="取消" getContainer='#app' />
    <!-- 切换孩子 -->
    <van-actionsheet v-model="isSelectBabyShow" title='切换宝贝'>
      <selectChild :babyList='babyList' @onSelect='selectChild'/>
    </van-actionsheet>
  </div>
</template>
<script>
import axios from "./../lib/js/api"
import { mapActions, mapGetters,mapState } from 'vuex'
import { format, timeago } from "./../lib/js/util.js"
import { punchLevel,readLevel } from './../lib/js/speech'
import wave from "./../module/animate/anWave"
import avatar from "./../module/avatar"
import reading from "./../module/reading"
import graphicCard from "./../module/card/graphicCard"
import classShow from './../module/classModule/classShow'
import metro from './../module/mold/metro'
import slogan from './../module/slogan'
import selectChild from './../module/selectChild'

export default {
  name: "baby-home",
  components: {
    wave,
    reading,
    avatar,
    graphicCard,
    classShow,
    metro,
    slogan,
    selectChild
  },
  computed: {
    ...mapState('openWX',['readSign']),
    ...mapGetters(['managerState', 'userDataState']),
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
    recommendActions() {
      let array = []
      if (this.managerState) {
        this.managerState.forEach(element => {   
          let data = {
            name: `${element.item_type == 'school' ? element.name : this.formatBanjiTitle(element.name)}${element.child_name ? '(' + element.child_name + ')' : '(管理员)'}`,
            subname: `${element.duty}-${element.desc}`,
            id: element.id,
            type: element.item_type
          }

          array.push(data)
        })
      }

      return array
    },
    //勋章等级
    level(){
        let obj 
        if(this.punchArr.length > this.readArr.length) {
          obj = punchLevel(this.childInfo.sign_days).pop()
        }else{
          obj = readLevel(this.childInfo.read_count).pop()
        }
        
        return obj
    },
    punchArr(){
        let arr = []
        let punchArr = punchLevel(this.childInfo.sign_days)

        punchArr.forEach(element => {
            if(element.level > 0){
                arr.push(element)
            }
        })

        return arr
    },
    readArr(){
        let arr = []
        let readArr = readLevel(this.childInfo.read_count)

        readArr.forEach(element =>{
            if(element.level > 0){
                arr.push(element)
            }
        })

        return arr
    }
  },
  data() {
    return {
      actionsheetShow: false,
      hackReset: true,
      show: false,
      isSelectBabyShow: false,
      zanShow: false,
      fixedHeaderBar: true,
      domHeight: "",
      childInfo: "",
      qrImage: "",
      showQrcode: false,
      lateBook: [],
      babyList: [],
      loading: false,
      finished: false,
      releasePageShow: false,
      punchLoading: true,
      page: 1,
      tabIndex: 0,
      tab: [{
        title: '全部',
        content: ''
      }],
      actions: [
      {
        name: '删除',
        type: 'delete',
        index: 1
      }, {
        name: '推荐',
        type: 'recommend',
        index: 2
      }],
      postId: '',
      templateId: '',
      activityCount: '',
      tid:12,

    }
  },
  beforeRouteEnter(to, from, next) {
    to.meta.keepAlive = false
    next(vm => {
      vm.request()
    })
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  created() {
    this.fetchData()
  },
  watch: {
    $router: "fetchData"
  },
  methods: {
    ...mapActions('openWX',['scanQRcode']),
    ...mapActions(["getUserData"]),
    fetchData() {
      let schoolArticleCate = {
        params:{
          portal_name:'宝贝主页'
        }
      }

      axios.get('/book/schoolArticleCate/getList', schoolArticleCate).then(res => {
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

      this.getUserData().then(res => {
        if(res.id != null){
          let data = {
            params: {
              sort:'old',
              user_id:res.id
            }
          }
          axios.get('/book/baby/getList',data).then(res => {
            switch(res.data.status){
              case 1:
                this.babyList = res.data.data
              break
            }
          })
        }else{
          this.$toast.fail('用户信息失败')
        }
      })

      let getSchoolArticleData = {
        params: {
          tid: this.tid
        }
      }

      axios.get('/book/SchoolArticle/getList',getSchoolArticleData).then(res => {
        if (res.data.status == 1) {
          this.activityCount = res.data.count
        }
      })
    },
    request() {
      this.getUserData().then(res => {
        if (res.child_id > '0') {
          let data = {
            params:{
              child_id: this.$route.query.id
            }
          }
          axios.get('/book/baby/getInfo',data).then(res => {
              if (res.data.status == 1) {
                this.childInfo = res.data.data

              if(!res.data.data.is_mine){
                let babyBorrowGetListData = {
                  params:{
                    page:1,
                    limit:20,
                    child_id:this.$route.query.id
                  }
                }

                axios.get('/book/BabyBorrow/getList',babyBorrowGetListData).then(res => {
                  if (res.status == 200) {
                    this.lateBook = res.data.data
                  }
                })
              }
            }
          })
        } else{
          this.$dialog.confirm({
            title: '添加宝贝',
            message: '请添加您的宝贝，掌握孩子阅读数据',
            confirmButtonText:'添加',
            cancelButtonText:'稍后',
            showCancelButton: true
          }).then(() => {
            this.$router.push({
              name: 'edit-child',
              query: {
                type: 'add',
                pageTitle: '添加宝贝'
              }
            })

            localStorage.removeItem('childInfo')
          }).catch(() => {
            this.$router.go(-1)
          })
        }
      })
    },
    onClickLeft() {
      if (this.$route.query.back && this.$route.query.back!='baby-home') {
        this.$router.push({
          name: this.$route.query.back,
          query: {
            id: this.$route.query.banji_id ? this.$route.query.banji_id : this.$route.query.id,
            back: this.$route.name
          }
        })
      } else {
        this.$router.push({
          name: "home"
        })
      }
    },
    toPageCodeShare(){
      this.$router.push({
        name:'share',
        query:{
          child_id: this.$route.query.id
        }
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
        if (res.data.status == 1) {
          if (this.page == 1) {
            this.tab[this.tabIndex].content = res.data.data
          } else {
            this.tab[this.tabIndex].content = this.tab[this.tabIndex].content.concat(res.data.data)
          }
          this.page++
          this.loading = false
          if (this.tab[this.tabIndex].content.length >= res.data.count) {
            this.finished = true
          }
        }else{
          this.page = 1
          this.tab[this.tabIndex].content = []
          this.loading = false
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
    toClassHome() {
      if (this.childInfo.banji_id > 0) {
        this.$router.push({
          name: "class-home",
          query: {
            id: this.childInfo.banji_id
          }
        })
      } else {  
        this.$router.push({
          name: "class-home",
          query: {
            id: this.childInfo.child_id,
            school_id: this.childInfo.school_id,
            school_name: this.childInfo.school_name,
          }
        })
      }
    },
    imgError(e) {
      e.target.src = 'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0'
    },
    timeAgo(time) {
      return timeago(time * 1000)
    },
    toReadStat() {
      this.$router.push({
        name: 'readStat',
        query: {
          id: this.$route.query.id,
          back: this.$route.name,
        }
      })
    },
    toReadAmount() {
      this.$router.push({
        name: 'readAmount',
        query: {
          id: this.$route.query.id,
          back: this.$route.name
        }
      })
    },
    toInformation() {
      if (this.childInfo.is_mine) {
        this.$router.push({
          name: 'information',
          query: {
            id: this.$route.query.id,
            back: this.$route.name
          }
        })
      } else {
        this.$toast('您无法查看')
      }
    },
    toEditorBaby() {
      if (this.childInfo.is_mine) {
        this.$router.push({
          name: 'edit-child',
          query: {
            id: this.$route.query.id,
            pageTitle: '编辑宝贝',
            type: 'edit',
            back: this.$route.name
          }
        })
      }
    },
    toPunchList(){
      this.$router.push({
        name:'punch-list',
        query:{
          id: this.$route.query.id,
        }
      })
    },
    actionsheet(item) {
      this.show = true
      this.postId = item.post_id
      this.templateId = item.template_id
    },
    onSelect(item) {
      switch (item.index) {
        case 1:
          this.$dialog.confirm({
            title: '删除',
            message: '您确认要删除吗'
          }).then(() => {
            let data = {
              params:{
                id:this.postId
              }
            }

            axios.get('/book/SchoolArticle/del',data).then(res => {
              if (res.data.status == 1) {
                let index
                this.tab[this.tabIndex].content.forEach((e, i) => {
                  if (e.post_id == this.postId) {
                    index = i
                  }
                })
 
                this.tab[this.tabIndex].content.splice(index, 1)
                this.$toast.success('删除成功')
              }
            })
          }).catch(() => {
            // on cancel
          })
          this.show = false

          break
        case 2:
          this.actionsheetShow = true
          this.show = false
          break
      }
    },
    addBaby(){
      this.$router.push({
        name: 'edit-child',
        query: {
          pageTitle: '添加宝贝',
          type: 'add',
          back: this.$route.name,
          id: this.$route.query.id
        }
      })
    },
    onSelectBaby(item) {
        this.hackReset = false
        this.isSelectBabyShow = false

        this.$nextTick(() => {
          this.hackReset = true
          this.request()
          this.onRefresh()
        })

        this.$router.push({
          name: 'baby-home',
          query: {
            id: item.id,
            back: this.$route.name
          }
        })

        this.onInput()
    },
    selectBaby() {
      if (this.babyList.length) {
        this.isSelectBabyShow = true
      }
    },
    onRecommendSelect(item) {
      let data = {
        params: {
          post_id: this.postId
        }
      }

      if (item.type == 'banji') {
        data.params.banji_id = item.id
      }

      if (item.type == 'school') {
        data.params.school_id = item.id
      }

      axios.get('/book/SchoolArticle/copy', data).then(res => {
        if (res.data.status == 1) {
          this.$toast.success('推荐成功')
        } else {
          this.$toast.fail('操作失败')
        }
      })

      this.actionsheetShow = false
    },
    formatBanjiTitle(text) {
      if (text && text.indexOf('班') == -1) {
        return text + '班'
      } else {
        return text
      }
    },
    punch() {
      this.scanQRcode({id:this.$route.query.id}).then(res=>{
        switch(res.data.status){
          case 1:
            this.$router.push({
              name:'punch-back',
              query:{
                id: this.$route.query.id,
                child_id: this.$route.query.id,
                back: this.$route.name,
                cate_id: 133,
                tags:'阅读打卡',
                ...res.data.data.stat_data
              }
            })
          break
          case 0:
            this.$toast(res.data.msg)
          break
        }
      })
    },
    //置顶
    onInput() {
      let data = {
        params:{
          child_id:this.$route.query.id
        }
      }

      axios.get('/book/MemberChild/top',data).then(res => {
        switch(res.data.status){
          case 1:
            this.getUserData()
            if(!this.childInfo.is_mine){
              this.$toast('已设为当前宝贝')
            }
          break
          case 0:
            this.$toast.fail(res.data.data.msg)
          break
        }
      })
    },
    toVerifyList(){
      this.$router.push({
        name:'verify-list',
        query:{
          id: this.$route.query.id
        }
      })
    },
    selectChild(item){
      this.hackReset = false
      this.isSelectBabyShow = false

      this.$nextTick(() => {
          this.hackReset = true
          this.request()
          this.onRefresh()
      })

      this.$router.push({
      name: 'baby-home',
          query: {
            id: item.id,
            back: this.$route.name
          }
      })
    }
  }
}

</script>
<style scoped>
.metro-card{
  padding: .625rem /* 10/16 */;
}

.header {
  width: 100%;
  position: relative;
}

.background {
  background: linear-gradient(-135deg, #ff765c, #ff23b3);
}

.baby-info .avatar {
  margin-right: 0.625rem /* 10/16 */;
}

.baby-info .avatar img {
  width: 3.75rem /* 60/16 */;
  height: 3.75rem /* 60/16 */;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 0.3125rem /* 5/16 */ 1.25rem /* 20/16 */ rgba(0, 0, 0, 0.2);
  border: 0.1875rem /* 3/16 */ solid #fff;
}

.baby-info .avatar img {
  width: 3.125rem /* 50/16 */;
  height: 3.125rem /* 50/16 */;
  border-radius: 50%;
}

.baby-info {
  padding: 2.8125rem /* 45/16 */ 1.25rem /* 20/16 */ 0 1.25rem /* 20/16 */;
  position: relative;
  z-index: 1;
}

.baby-data {
  flex: 3;
}

.list {
  color: #fff;
}

.detail,
.school {
  font-size: 0.875rem /* 14/16 */;
}

.school {
  text-align: left;
  color: #fff;
  max-width: 75%;
}

.follow .theme-btn {
  border-color: #fff;
  color: #fff;
}

.bar {
  background: #fff;
  padding-bottom: .625rem /* 10/16 */;
}

.bar-item {
  flex: 1;
  text-align: center;
  display: grid;
}

.bar-item .number {
  font-size: 1.25rem /* 20/16 */;
  font-weight: 500;
}

.bar-title {
  font-size: .8125rem /* 13/16 */;
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

.no-content {
  background: #fff;
  display: grid;
  text-align: center;
  padding-bottom: 3.125rem /* 50/16 */;
  color: #c0c4cc;
}

.no-content img {
  width: 9.375rem /* 150/16 */;
  margin: 1.25rem /* 20/16 */ auto;
  opacity: 0.7;
}

.time-line {
  width: 100%;
  height: 3.125rem /* 50/16 */;
  position: relative;
}

.time-line::before {
  position: absolute;
  left: 1.5625rem /* 25/16 */;
  top: 0;
  width: 0.625rem /* 10/16 */;
  height: 100%;
  content: '';
  background: #ffc107;
}

.time {
  margin-left: 3.125rem /* 50/16 */;
  font-size: 1.125rem /* 18/16 */;
  font-weight: 500;
}

.task {
  position: relative;
}

.task .tag-task {
  position: absolute;
  top: 0.3125rem /* 5/16 */;
  right: -0.625rem /* 10/16 */;
}

.to-banji-btn{
  position: absolute;
  right: 20px;
}
</style>
<style>
.add-count-popup.van-popup {
  background: transparent;
}
</style>

