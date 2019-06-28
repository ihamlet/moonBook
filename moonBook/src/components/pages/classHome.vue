<template>
  <div class="class-home page-padding" v-if='hackReset'>
    <van-nav-bar :zIndex='100' :class="[fixedHeaderBar?'theme-nav':'']" fixed :border='false' :key='$route.query.id'>
      <div class="head-bar-title" slot="title" @click="cutover">
        {{fixedHeaderBar?pageTitle:formatBanjiTitle(classInfo.title)}} <i class="iconfont" v-if="userDataState.teacher_school_id > 0">&#xe608;</i>
      </div>
      <div class="head-bar-text" slot='right' v-if='userDataState.teacher_banji_id == $route.query.id' @click="toManage">
        <span class="text">管理班级</span>
      </div>
    </van-nav-bar>
    <div class="header theme-background flex flex-align" ref='domHeight'>
      <div class="class-info">
        <div class="flex flex-align">
            <div class="class-name">{{formatBanjiTitle(classInfo.title)}}</div>
            <div class="class-people">（{{classInfo.student_count}}人）</div>
        </div>
        <div class="school" v-line-clamp:20="1">{{classInfo.school_name}}</div>
      </div>
      <div class="qrcode" @click="toPageCodeShare" v-if='userDataState.teacher_banji_id == $route.query.id'>
        <van-button plain size="small" round class="theme-plain" type="primary">邀请家长</van-button>
      </div>
    </div>
    <div class="container">
      <div class="module">
        <div class="apps">
          <apps :appsList='appsList' type='classHome' />
        </div>
      </div>
      <div class="module card-top">
        <read-list title='阅读榜' type='banji' field='avatar'/>
      </div>
      <div class="module">
        <readWeek/>
      </div>
      <div class="module">
        <notice type='banji' :key="$route.query.id" :studentCount='classInfo.student_count'/>
      </div>
      <div>
        <class-zoom type='template' :banji_id='$route.query.id'/>
      </div>
    </div>

    <van-action-sheet v-model="actionsheetShow" :actions="manageActions" @select="onSelect" cancel-text="取消" get-container='#app'/>

    <div class="punch" v-if='classInfo.is_my_baby_banji'>
      <van-button @click="punch" class="theme-btn" round size="normal" type="primary">
        <i class="iconfont">&#xe60a;</i>
        阅读打卡
      </van-button>
    </div>
    <div class="release-footer-bar" v-else-if='isBtnShow&&userDataState.teacher_banji_id == $route.query.id'>
      <van-button class="theme-btn" :class="isBtnShow?'bounceInUp animated':''" round size="normal" type="primary" @click="ketangRelease">
        <i class="iconfont">&#xe664;</i>
        课堂阅读
      </van-button>
    </div>
  </div>
</template>
<script>
import axios from './../lib/js/api'
import { format } from './../lib/js/util'
import { manageStateList,watchScroll,punch } from './../lib/js/mixin'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import classZoom from './../pages/classZoom'
import readList from './../module/classModule/readList'
import reading from './../module/reading'
import apps from './../module/myModule/apps'
import notice from './../module/classModule/notice'
import selectBaby from './../module/selectChild'
import readWeek from './../module/classModule/readWeek'

export default {
  name: "class-home",
  mixins:[manageStateList,watchScroll,punch],
  components: {
    classZoom,
    reading,
    readList,
    notice,
    apps,
    selectBaby,
    readWeek
  },
  computed: {
    ...mapGetters(['userDataState', 'managerState']),
    ...mapState(['releaseSwitch']),
    pageTitle() {
      let str = ''
      let childName = ''
      if (this.classInfo.is_my_baby_banji) {
        this.managerState.forEach(element => {
          if(element.id == this.$route.query.id){
            childName = element.child_name || ''
          }
        })

        str = `${childName}的班级`
      } else {
        str = '班级'
      }

      return str
    }
  },
  data() {
    return {
      show: false,
      qrImage: '',
      classInfo: '',
      lateBook: '',
      actionsheetShow: false,
      appsList: [{
        name: '风采',
        iconClass: 'icon-fengcai',
        path: 'apps-find'
      }, {
        name: '阅读',
        iconClass: 'icon-yuedu',
        path: 'apps-find'
      }, {
        name: '才艺',
        iconClass: 'icon-tiaosepan',
        path: 'apps-find'
      }, {
        name: '荣誉',
        iconClass: 'icon-jiangbei',
        path: 'apps-find'
      }, {
        name: '班级交流',
        iconClass: 'icon-jiaoliu',
        path: 'apps-find'
      }],
      isReleaseShow: false,
      isBtnShow: false,
      babyList:[],
      isSelectBabyShow:false
    }
  },
  //进入该页面
  beforeRouteEnter(to, from, next) {
    next(vm => {
        vm.request()
    })
  },
  //离开该页面去掉页面数据缓存
  beforeRouteLeave(to, from, next) {
    to.meta.keepAlive = false
    next()
  },
  created () {
    this.$nextTick(()=>{
      this.isBtnShow = true
    })
  },
  methods: {
    ...mapActions('openWX',['scanQRcode']),
    request() {
      if(this.$route.query.type != 'preview'){
          if (this.userDataState.id != null) {
            //这样园长就不用添加宝贝了
            if(this.userDataState.teacher_school_id == '0'){
              if(this.userDataState.child_id == '0'){
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
                      ...this.$route.query,
                      type: 'add',
                    }
                  })

                  localStorage.removeItem('childInfo')
                }).catch(() => {
                  this.backRouter()
                })
              } else if( this.userDataState.school_id == '0'){
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
                      type: 'edit',
                      enter: 'my-home',
                      id:  this.userDataState.child_id
                    }
                  })
                }).catch(() => {
                  this.backRouter()
                })
              }else if( this.userDataState.banji_id == '0'){
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
                        id:  this.userDataState.child_id,
                        back: 'class-home',
                        school_name:  this.userDataState.school_name,
                        school_id:  this.userDataState.school_id,
                        type: 'edit'
                      }
                    })
                  }).catch(() => {
                    this.backRouter()
                  })
                }else{
                  this.getClassInfo()
                }
            }else{
              this.getClassInfo()
            }
          } else {
            this.$toast.fail('获取信息失败')
            this.$router.push({
              name:'home'
            })
          }
      }else{
        this.getClassInfo()
      }
    },
    getClassInfo(){
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
    },
    toPageCodeShare(){
      let data = {
        school_id: this.classInfo.school_id,
        school_name: this.classInfo.school_name,
        invite_code: this.classInfo.invite_code,
        banji_id: this.classInfo.banji_id,
        banji_name:  this.formatBanjiTitle(this.classInfo.title),
        user_id: this.userDataState.user_id
      }

      this.$router.push({
        name:'share',
        query:{
          ...data
        }
      })
    },
    // punch() {
    //   this.scanQRcode({id:this.userDataState.child_id}).then(res=>{
    //     switch(res.data.status){
    //       case 1:
    //         this.$router.push({
    //           name:'punch-back',
    //           query:{
    //             id: this.$route.query.id,
    //             child_id: this.userDataState.child_id,
    //             back: this.$route.name,
    //             punchType:'banji',
    //             cate_id: 133,
    //             tags:'阅读打卡',
    //             ...res.data.data.stat_data
    //           }
    //         })
    //       break
    //       default:
    //         this.$toast(res.data.msg)
    //     }
    //   })
    // },
    cutover() {
      if (this.userDataState.teacher_school_id > 0) {
        this.actionsheetShow = true
      }
    },
    onSelect(item) {
      this.actionsheetShow = false
      if (item.type == 'banji') {

        this.refreshPage()

        this.isSelectBabyShow = false


        let data = {
          id: item.id,
          back: this.$route.name,
          school_id: item.school_id,
          school_name: item.school_name,
          banji_name: item.banji_name,
        }

        this.userDataState.teacher_school_id > 0 ? data.tag_id = 141 : data.cate_id = 116

        this.$router.push({
          name: 'class-home',
          query: data
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
            } else if(this.userDataState.teacher_school_id > 0){
              if(this.userDataState.teacher_school_id == this.$route.query.id || this.userDataState.teacher_banji_id == this.$route.query.id){
                data.push(element)  
              }
            }
          })

          this.appsList.forEach(e => {
            let params
            data.forEach(element => {
              if (e.name == element.cate_name) {
                params = {
                  tag_id: element.cate_id,
                  pageTitle: element.cate_name,
                  banji_id: this.$route.query.id,
                  back: this.$route.name,
                  id: this.$route.query.id,
                  back: this.$route.name
                }
              }
            })
            e.params = params
          })
        }
      })
    },
    toManage(){
      this.$router.push({
        name:'banjiEdit',
        query:{
          ...this.classInfo,
          pageTitle:'班级管理'
        }
      })
    },
    ketangRelease(){
      this.$router.push({
        name: 'graphic',
        query: {
          back: this.$route.query.back || this.$route.name,
          upVideo: 1,
          ...this.$route.query
        }
      })
    }
  }
}
</script>
<style scoped>
.school {
  text-align: left;
}

.school,
.class-people {
  font-size: 0.8125rem /* 13/16 */;
}

.header {
  padding: 2.8125rem /* 45/16 */ 1.25rem /* 20/16 */ 0.625rem /* 10/16 */;
  height: 3.75rem /* 60/16 */;
  justify-content: space-between;
}

.class-name {
  font-size: 1.125rem /* 18/16 */;
}

.class-info {
  color: #fff;
  flex: 3;
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

.punch {
  z-index: 101;
}

.module {
  background: transparent;
}

.splitter{
  margin: 0 .3125rem /* 5/16 */;
}

.title{
  text-align: center;
  height: 45px;
  line-height: 45px
}
</style>
