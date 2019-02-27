<template>
  <div class="class-home page-padding" v-if='hackReset'>
    <van-nav-bar :zIndex='100' :class="[fixedHeaderBar?'theme-nav':'']" fixed @click-left="onClickLeft">
      <div class="head-bar-title" slot="title" @click="cutover">
        {{fixedHeaderBar?pageTitle:formatBanjiTitle(classInfo.title)}} <i class="iconfont" v-if="managerState.length > 1 && actions != null">&#xe608;</i>
      </div>
      <div class="head-bar-text" slot="left">
        <van-icon name="arrow-left" />
        <span class="text">{{$route.query.back?'返回':'我的'}}</span>
      </div>
      <div class="head-bar-text" slot='right' v-if='manage'>
        <span class="text">管理班级</span>
      </div>
    </van-nav-bar>
    <div class="header theme-background flex flex-align" ref='head'>
      <div class="class-info">
        <div class="class-name">{{formatBanjiTitle(classInfo.title)}}</div>
        <div class="class-people">{{`${classInfo.grade_name}班`}}（{{classInfo.student_count}}人）</div>
        <div class="school" v-line-clamp:20="1">{{classInfo.school_name}}</div>
      </div>
      <div class="qrcode" @click="show = true">
        <i class="iconfont">&#xe622;</i> 
      </div>
    </div>
    <div class="container">
      <lazy-component class="module">
        <div class="apps">
          <apps :appsList='appsList' type='classHome' />
        </div>
      </lazy-component>
      <lazy-component class="module">
        <notice type='banji' />
      </lazy-component>
      <lazy-component class="module">
        <read-list title='阅读榜' type='banji' field='avatar' />
      </lazy-component>
      <lazy-component>
        <class-zoom type='template' :banji_id='classInfo.banji_id' />
      </lazy-component>
    </div>

    <van-popup v-model="show" class="plate-card">
      <qr-code :classInfo="classInfo" :qrImage="qrImage" type='classHome' @close='show = false' />
    </van-popup>

    <van-actionsheet v-model="actionsheetShow" :actions="actions" @select="onSelect" cancel-text="取消" />

    <div class="punch" v-if='classInfo.is_my_baby_banji'>
      <van-button @click="punch" class="theme-btn" round size="normal" type="primary">
        <i class="iconfont">&#xe60a;</i>
        阅读打卡
      </van-button>
    </div>
  </div>
</template>
<script>
import axios from './../lib/js/api'
import Cookies from 'js-cookie'

import { mapGetters, mapActions } from 'vuex'
import QRCode from 'qrcode'
import classZoom from './../pages/classZoom'
import readList from './../module/classModule/readList'
import reading from './../module/reading'
import qrCode from './../module/mold/qrCode'
import apps from './../module/myModule/apps'
import notice from './../module/classModule/notice'

export default {
  name: "class-home",
  components: {
    classZoom,
    reading,
    qrCode,
    readList,
    notice,
    apps
  },
  computed: {
    ...mapGetters(['userDataState','managerState']),
    actions() {
      let array = []
      if (this.managerState) {
        this.managerState.forEach(element => {
          let data = {
            name: `${element.item_type == 'school'?element.name:this.formatBanjiTitle(element.name)}${element.child_name?'('+element.child_name+')':'(管理员)'}`,
            subname: `${element.duty}-${element.desc}`,
            id: element.id,
            type: element.item_type
          }

          array.push(data)
        })
      }

      return array
    },
    pageTitle(){
      let str = ''
      if(this.classInfo.is_my_baby_banji){
        str = '班级'
      }else{
        str = '我的班级'
      }

      return str
    },
    manage() {
      if(this.managerState){
        let boolean
        this.managerState.forEach(element => {
          if (this.$route.query.id == element.id && element.item_relation != 'parent'){
            boolean = true
          }
        })
        return boolean
      }
    }
  },
  data() {
    return {
      show: false,
      fixedHeaderBar: true,
      qrImage: '',
      classInfo: '',
      lateBook: '',
      hackReset: true,
      actionsheetShow: false,
      appsList: [{
        name: '风采',
        iconClass: 'icon-fengcai',
        path:'404'
      }, {
        name: '阅读',
        iconClass: 'icon-yuedu',
        path:'404'
      }, {
        name: '才艺',
        iconClass: 'icon-caiyi',
        path:'404'
      }, {
        name: '荣誉',
        iconClass: 'icon-rongyu',
        path:'404'
      }, {
        name: '班级交流',
        iconClass: 'icon-jiaoliu',
        path:'404'
      }]
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.qrcode()
      vm.getUserData().then(res => {
        if (res.child_id > '0') {
          if (res.school_id > '0') {
            if (res.banji_id > '0') {
              vm.request()
            } else {
              vm.$router.push({
                name: 'edit-class',
                query: {
                  id: res.child_id,
                  back: 'class-home',
                  school_id: res.school_id,
                  type: 'add'
                }
              })
            }
          } else {
            vm.$router.push({
              name: 'edit-school',
              query: {
                type: 'add',
                enter: 'my',
                id: res.child_id,
              }
            })
          }
        } else {
          vm.$router.push({
            name: 'edit-child',
            query: {
              type: 'add',
              pageTitle: '添加宝贝'
            }
          })
        }
      })
    })
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    ...mapActions(['getUserData']),
    request() {
      axios.get(`/book/SchoolBanji/getInfo?banji_id=${this.$route.query.id}`).then(res => {
        if(res.data.status == 1){
          this.classInfo = res.data.data
        }
      })
    },
    onClickLeft() {
      if(this.$route.query.back){
        this.$router.push({
          name: this.$route.query.back,
          query:{
            id: this.$route.query.child_id || this.$route.query.school_id
          }
        })
      }else{
        this.$router.push({ name: 'my' })
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
    punch() {
      Cookies.set('punckLink', location.href)
      location.href = `/book/MemberSign/punch?child_id=${this.userDataState.child_id}&is_auto=1&url=${encodeURIComponent(location.href)}`
    },
    cutover() {
      if (this.managerState.length > 1 && this.actions != null) {
        this.actionsheetShow = true
      }
    },
    onSelect(item) {
      this.hackReset = false
      this.actionsheetShow = false
      if(item.type == 'banji'){
        this.$router.push({
          name: 'class-home',
          query: {
            id: item.id,
            back: this.$route.name
          }
        })
        this.$nextTick(() => {
          this.hackReset = true
          this.request()
        })
      }else if(item.type == 'school'){
        this.$router.push({
          name:'apps-school',
          query:{
            id: item.id,
            back: this.$route.name,
            banji_id: this.$route.query.id
          }
        })
      }
    },
    formatBanjiTitle(text){
      if(text&&text.indexOf('班') == -1){
        return text + '班'
      }else{
        return text 
      }
    }
  }
}
</script>
<style scoped>
.school {
  text-align: left;
  margin-top: 0.3125rem /* 5/16 */;
}

.school,
.class-people {
  font-size: 0.8125rem /* 13/16 */;
}

.header {
  padding: 2.8125rem /* 45/16 */ 1.25rem /* 20/16 */ 0.625rem /* 10/16 */;
  height: 5rem /* 80/16 */;
  justify-content: space-between;
}

.class-name {
  font-size: 1.125rem /* 18/16 */;
}

.class-info {
  color: #fff;
  width: 9.375rem /* 150/16 */;
}

.class-avatar {
  width: 4.25rem /* 68/16 */;
  height: 4.25rem /* 68/16 */;
  border-radius: 50%;
  overflow: hidden;
  border: 0.1875rem /* 3/16 */ solid #fff;
  box-shadow: 0 0.125rem /* 2/16 */ 1.25rem /* 20/16 */ rgba(0, 0, 0, 0.3);
  margin-right: 0.625rem /* 10/16 */;
}

.theme-nav .btn-right-qrcode {
  color: #fff;
}

.btn-right-qrcode {
  position: fixed;
  right: 0;
  top: -0.4375rem /* 7/16 */;
}

.btn-right-qrcode i.iconfont {
  font-size: 1.875rem /* 30/16 */;
}

.plate-card {
  width: 18.75rem /* 300/16 */;
  overflow: hidden;
}

.punch {
  z-index: 101;
}

.qrcode{
  color: #fff;
}

.qrcode i.iconfont{
  font-size: 1.625rem /* 26/16 */;
}
</style>
