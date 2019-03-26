<template>
  <div class="class-home page-padding" v-if='hackReset'>
    <van-nav-bar :zIndex='100' :class="[fixedHeaderBar?'theme-nav':'']" fixed :border='false'>
      <div class="head-bar-title" slot="title" @click="cutover">
        {{fixedHeaderBar?pageTitle:formatBanjiTitle(classInfo.title)}} <i class="iconfont" v-if="managerState.length > 1 && actions != null">&#xe608;</i>
      </div>
      <!-- <div class="head-bar-text" slot="left">
        <van-icon name="arrow-left" />
        <span class="text">{{$route.query.back?'返回':'我的'}}</span>
      </div> -->
      <div class="head-bar-text" slot='right' v-if='manage' @click="toManage">
        <span class="text">管理班级</span>
      </div>
    </van-nav-bar>
    <div class="header theme-background flex flex-align" ref='head'>
      <div class="class-info">
        <div class="class-name">{{formatBanjiTitle(classInfo.title)}}</div>
        <div class="class-people">{{`${classInfo.grade_name?classInfo.grade_name:''}班`}}（{{classInfo.student_count}}人）</div>
        <div class="school" v-line-clamp:20="1">{{classInfo.school_name}}</div>
      </div>
      <div class="qrcode" @click="show = true">
        <i class="iconfont">&#xe622;</i>
      </div>
    </div>
    <div class="container">
      <div class="module">
        <div class="apps">
          <apps :appsList='appsList' type='classHome' />
        </div>
      </div>
      <div class="module card-top">
        <read-list title='阅读榜' type='banji' field='avatar' />
      </div>
      <div class="module">
        <notice type='banji' />
      </div>
      <div>
        <class-zoom type='template' :banji_id='classInfo.banji_id' />
      </div>
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
    ...mapGetters(['userDataState', 'managerState']),
    actions() {
      let array = []
      if (this.managerState) {
        this.managerState.forEach(element => {
          if(element.item_relation !='parent'){
            let data = {
              name: `${element.item_type == 'school' ? element.name : this.formatBanjiTitle(element.name)}${element.child_name ? '(' + element.child_name + ')' : '(管理员)'}`,
              subname: `${element.duty}-${element.desc}`,
              id: element.id,
              type: element.item_type
            }

            array.push(data)
          }
        })
      }

      return array
    },
    pageTitle() {
      let str = ''
      let childName = ''
      if (this.classInfo.is_my_baby_banji) {
        this.managerState.forEach(element => {
          if(element.id == this.$route.query.id){
            childName = element.child_name
          }
        })

        str = `${childName}的班级`
      } else {
        str = '班级'
      }

      return str
    },
    manage() {
      if (this.managerState) {
        let boolean = false
        this.managerState.forEach(element => {
          if (this.$route.query.id == element.id && element.item_relation != 'parent') {
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
        path: 'apps-find'
      }, {
        name: '阅读',
        iconClass: 'icon-yuedu',
        path: 'apps-find',
      }, {
        name: '才艺',
        iconClass: 'icon-caiyi',
        path: 'apps-find',
      }, {
        name: '荣誉',
        iconClass: 'icon-rongyu',
        path: 'apps-find',
      }, {
        name: '班级交流',
        iconClass: 'icon-jiaoliu',
        path: 'apps-find',
      }]
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.qrcode()
      vm.request()
    })
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    ...mapActions('openWX',['scanQRcode']),
    ...mapActions(['getUserData']),
    request() {
      this.getUserData().then(res => {
        if (res.id != null) {
            if( res.child_id == '0'){
              this.$dialog.confirm({
                title: '添加宝贝',
                message: '请添加您的宝贝，掌握孩子阅读数据',
                confirmButtonText: '添加',
                cancelButtonText: '稍后',
                showCancelButton: true
              }).then(() => {
                this.$router.push({
                  name: 'edit-child',
                  query: {
                    type: 'add',
                    pageTitle: '添加宝贝'
                  }
                })
              }).catch(() => {
                this.backRouter()
              })
            } else if(res.school_id == '0'){
              this.$dialog.confirm({
                title: '加入学校',
                message: '请加入学校，掌握班学校动态',
                confirmButtonText: '加入',
                cancelButtonText: '稍后',   
                showCancelButton: true
              }).then(() => {
                this.$router.push({
                  name: 'edit-school',
                  query: {
                    type: 'add',
                    enter: 'my',
                    id: res.child_id
                  }
                })
              }).catch(() => {
                this.backRouter()
              })
             }else if(res.banji_id == '0'){
                this.$dialog.confirm({
                  title: '加入班级',
                  message: '请加入班级，掌握班级动态',
                  confirmButtonText: '加入',
                  cancelButtonText: '稍后',
                  showCancelButton: true
                }).then(() => {
                  this.$router.push({
                    name: 'edit-class',
                    query: {
                      id: res.child_id,
                      back: 'class-home',
                      school_id: res.school_id,
                      type: 'add'
                    }
                  })
                }).catch(() => {
                  this.backRouter()
                })
              }else{
                if(this.$route.query.id && this.$route.query.id!=''){
                  let data = {
                      params:{
                        banji_id: this.$route.query.id
                      }
                    }

                  axios.get('/book/SchoolBanji/getInfo',data).then(res => {
                    if(res.data.status == 1){
                      this.classInfo = res.data.data
                    }
                  })
                  this.getCate()
                }
              }
        } else {
          this.$toast.fail('获取信息失败')
          this.$router.push({
            name:'home'
          })
        }
      })
    },
    // onClickLeft() {
    //   if (this.$route.query.back) {
    //     this.$router.push({
    //       name: this.$route.query.back,
    //       query: {
    //         id: this.$route.query.child_id || this.$route.query.school_id
    //       }
    //     })
    //   } else {
    //     this.$router.push({ name: 'my' })
    //   }
    // },
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
      this.scanQRcode({id:this.userDataState.child_id}).then(res=>{
        switch(res.data.status){
          case 1:
            this.$router.push({
              name:'punch-back',
              query:{
                id: this.$route.query.id,
                child_id: this.userDataState.child_id,
                back: this.$route.name 
              }
            })
          break
          case 0:
            this.$toast(res.data.msg)
          break
        }
      })
    },
    cutover() {
      if (this.managerState.length > 1 && this.actions != null) {
        this.actionsheetShow = true
      }
    },
    onSelect(item) {
      this.hackReset = false
      this.actionsheetShow = false
      if (item.type == 'banji') {
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
      } else if (item.type == 'school') {
        this.$router.push({
          name: 'apps-school',
          query: {
            id: item.id,
            back: this.$route.name,
            banji_id: this.$route.query.id
          }
        })
      }
    },
    formatBanjiTitle(text) {
      if (text && text.indexOf('班') == -1) {
        return text + '班'
      } else {
        return text
      }
    },
    backRouter(){
      this.$router.go(-1)
    },
    getCate() {
      let data = {
        params: {
          portal_name: '班级主页'
        }
      }

      axios.get('/book/schoolArticleCate/getList', data).then(res => {
        if (res.status == 200) {
          let cateArray = res.data
          let data = []
          cateArray.forEach(element => {
            if (element.access_level == 0) {
              data.push(element)
            } else {
              this.managerState.forEach(e => {
                if ((this.$route.query.id == e.banji_id || this.$route.query.id == e.school_id) && e.item_relation != 'parent') {
                  data.push(element)
                }
              })
            }
          })

          this.appsList.forEach(e => {
            let params
            data.forEach(element => {
              if (e.name == element.cate_name) {
                params = {
                  cid: element.cate_id,
                  pageTitle: element.cate_name,
                  banji_id: this.$route.query.id,
                  back: this.$route.name,
                  id: this.$route.query.id
                }
              }
            })
            e.params = params
          })
        }
      })
    },
    toManage(){
      location.href = '/SchoolManage'
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
  height: 5.625rem /* 90/16 */;
  justify-content: space-between;
}

.class-name {
  font-size: 1.125rem /* 18/16 */;
}

.class-info {
  color: #fff;
  flex: 4;
}

.qrcode {
  flex: 1;
  text-align: right;
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
  width: 15.625rem /* 250/16 */;
  overflow: hidden;
}

.punch {
  z-index: 101;
}

.qrcode {
  color: #fff;
}

.qrcode i.iconfont {
  font-size: 1.625rem /* 26/16 */;
}

.module {
  background: transparent;
}
</style>
