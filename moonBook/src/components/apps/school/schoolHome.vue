<template>
  <div class="school-home page-padding">
    <van-nav-bar :zIndex='100' :class="fixedHeaderBar?'theme-nav':''" fixed :border='false' :key='$route.query.id'>
      <div class="head-bar-title" slot="title" @click="actionsheetShow = true">
        {{fixedHeaderBar?$route.meta.title:schoolInfo.title}} <i class="iconfont">&#xe608;</i>
      </div>
    </van-nav-bar>
    <div class="container">
      <div class="header-card flex flex-align theme-school-background" ref="domHeight">
        <div class="school-info">
          <div class="school-logo">
            <img :src="schoolInfo.logo" :alt="schoolInfo.title" @error='imgError'/>
          </div>
          <div class="school-name" v-line-clamp:20="1">{{schoolInfo.title}}</div>
          <div class="run-type">{{schoolInfo.run_type}}</div>
        </div>
        <div class="arc"></div>
      </div>
        <div class="apps">
          <apps :appsList='appsList' type='schoolHome' />
        </div>
      <div class="module card-top">
        <investmentAd :investmentAd='investment' type='notice'/>
      </div>
      <div class="module">
        <read-list type='school' title='阅读榜' field='name' />
      </div>
      <div class="list">
        <van-tabs color='#0084ff' :line-width='20' :line-height='4' animated swipeable>
          <van-tab v-for="(list,index) in tab" :title="list.title" :key="index">
            <div class="tab-content">
              <drying-list :school_id='$route.query.id' portal_name='学校主页' :key="$route.query.id"/>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>


    <div class="release-footer-bar">
      <van-button class="theme-btn theme-release" round size="normal" type="primary" @click="setReleaseSwitch(true)">
        <i class="iconfont">&#xe664;</i>
        发 布
      </van-button>
      <van-popup v-model="show" class="tips-popup" :overlayStyle='{backgroundColor:"transparent"}' get-container='.footer-bar' :lock-scroll='false'>
        <tips :isShow='show' position='bottom' @close='setReleaseSwitch(false)'/>
      </van-popup>
    </div>

    <van-action-sheet v-model="actionsheetShow" :actions="actions" @select="onSelect" cancel-text="取消" get-container='#app'/>
  </div>
</template>
<script>
import axios from './../../lib/js/api'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import { manageStateList,watchScroll } from './../../lib/js/mixin'
import apps from './../../module/myModule/apps'
import readList from './../../module/classModule/readList'
import dryingList from './../../module/findModule/dryingList'
import investmentAd from './../../module/investment'
import tips from './../../module/release/tips'

export default {
  name: 'school',
  mixins:[manageStateList,watchScroll],
  components: {
    apps,
    readList,
    dryingList,
    investmentAd,
    tips
  },
  computed: {
    ...mapState(['releaseSwitch']),
    ...mapGetters(['userDataState', 'managerState']),
    show:{
      get(){
        return this.releaseSwitch
      },
      set(val){
        this.setReleaseSwitch(val)
      }
    },
    manage() {
      if (this.managerState) {
        let boolean
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
      schoolInfo: '',
      actionsheetShow: false,
      appsList: [ {
        name: '介绍',
        iconClass: 'icon-fengche',
        path: 'school-intro'
      }, {
        name: '荣誉',
        iconClass: 'icon-jiangbei',
        path: 'apps-find',
      }, {
        name: '阅读',
        iconClass: 'icon-yuedu',
        path: 'apps-find',
      }, {
        name: '才艺',
        iconClass: 'icon-tiaosepan',
        path: 'apps-find',
      }],
      tab: [{
        title: '学校动态',
        content: '',
      }],
      investment:{
        link:'#',
        text:'今日餐谱',
        banner: ''
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.request()
    })
  },
  methods: {
    ...mapMutations(['setReleaseSwitch']),
    ...mapActions(['getUserData']),
    request() {
      if(this.$route.query.type != 'preview'){
        this.getUserData().then(res => {
          if(res.id!= null){
            if(res.teacher_school_id == '0'){
              if(res.child_id == '0'){
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
                        pageTitle: '添加宝贝',
                        banji_id: this.$route.query.id,
                        school_id: this.$route.query.school_id,
                        banji_name: this.$route.query.banji_name,
                        school_name: this.$route.query.school_name
                      }
                    })
                    localStorage.removeItem('childInfo')
                  }).catch(() => {
                    this.backRouter()
                  })
              }else if(res.school_id == '0'){
                this.$dialog.confirm({
                  title: '加入学校',
                  message: '请加入学校，掌握学校动态',
                  confirmButtonText:'添加',
                  cancelButtonText:'稍后',
                  showCancelButton: true
                }).then(() => {
                  this.$router.push({
                    name: 'edit-school',
                    query: {
                      type: 'add',
                      enter: 'my-home',
                      id: res.child_id
                    }
                  })
                }).catch(() => {
                  this.backRouter()
                })
              }else{
                this.getSchoolInfo()
              }
            }else{
              this.getSchoolInfo()
            }
          }else{
            this.$toast.fail('获取信息失败')
            this.$router.push({
              name:'home'
            })
          }
        })
      }else{
        this.getSchoolInfo()
      }
    },
    getSchoolInfo(){
      let data = {
        params:{
          school_id:this.$route.query.id
        }
      }

      if(this.$route.query.id && this.$route.query.id!=''){
        axios.get('/book/school/get_info', data).then(res => {
          if (res.data.status == 1) {
            this.schoolInfo = res.data.data
          }
        })

        this.getCate() 
      }
    },
    onSelect(item) {
      this.actionsheetShow = false

      switch(item.type){
        case 'banji':
          this.$router.push({
            name: 'class-home',
            query: {
              id: item.id,
              back: this.$route.name
            }
          })
        break
        case 'school':
          this.$router.replace({
            name: 'apps-school',
            query: {
              id: item.id,
              back: this.$route.name,
              banji_id: this.$route.query.id
            }
          })
        break
        case 'toSchoolList':
          this.$router.push({
            name: 'AcceptSchoolList',
            query:{
              type:'page'
            }
          })
        break
      }

      this.request()
    },
    imgError(e) {
      e.target.src = 'https://wx.qlogo.cn/mmopen/ajNVdqHZLLBGT5R0spIjic7Pobf19Uw0qc07mwPLicXILrafUXYkhtMTZ0WialrHiadXDKibJsRTux0WvmNuDyYRWDw/0'
    },
    backRouter(){
      if(this.$route.name == 'apps-school'){
        this.$router.replace({
          name:'AcceptSchoolList',
          query:{
            type:'page'
          }
        })
      }else{
        this.$router.go(-1)
      }
    },
    getCate(){
      let data = {
        params:{
          portal_name:'学校主页'
        }
      }

      axios.get('/book/schoolArticleCate/getList',data).then(res => {
        if(res.status == 200){
          let cateArray = res.data
          let data = []
          cateArray.forEach(element => {
            if(element.access_level == 0){
              data.push(element)
            }else{
              this.managerState.forEach(e =>{
                if((this.$route.query.id == e.banji_id||this.$route.query.id == e.school_id)&& e.item_relation != 'parent'){
                  data.push(element)
                }
              })
            }
          })
          
          this.appsList.forEach(e=>{
            let params
            data.forEach(element => {
              if(e.name == element.cate_name){
                params = {
                  tag_id: element.cate_id,
                  pageTitle: element.cate_name,
                  school_id: this.$route.query.id,
                  id: this.$route.query.id,
                  back: this.$route.name
                }
              }
            })

            if(e.path == 'school-intro'){
              e.params = {
                id: this.$route.query.id
              }
            }else{
              e.params = params
            }
            
          })
        }
      })
    },
    toManage(){
      location.href = `/SchoolManage?school_id=${this.$route.query.id}`
    }
  }
}
</script>
<style scoped>
.container{
  background: #fff;
}

.header-card {
  padding: 30px 0.9375rem /* 15/16 */ 0.625rem /* 10/16 */ 0.9375rem /* 15/16 */;
  height: 9.375rem /* 150/16 */;
  position: relative;
  overflow: hidden;
}

.header-card .arc {
  position: absolute;
  width: 62.5rem /* 1000/16 */;
  height: 62.5rem /* 1000/16 */;
  background: #fff;
  border-radius: 62.5rem /* 1000/16 */;
  left: 50%;
  top: 32%;
  transform: translate3d(-50%, 0, 0);
}

.school-logo,
.school-logo img {
  width: 50px;
  height: 50px;
  overflow: hidden;
  border-radius: 50%;
  background: #fff;
}

.school-logo {
  border: 4px solid #fff;
  box-shadow: 0 5px 15px rgba(0, 188, 212, 0.2);
  margin: 0 auto;
}

.school-info {
  z-index: 2;
  display: grid;
  margin: 0 auto;
  width: 13.75rem /* 220/16 */;
  text-align: center;
}

.school-name {
  font-weight: 500;
  margin-top: 0.625rem /* 10/16 */;
}

.school-type {
  font-size: 0.8125rem /* 13/16 */;
}

.theme-school-background {
  background: linear-gradient(127deg,#03A9F4, #00BCD4);
}

.run-type{
  height: 1.875rem /* 30/16 */;
  line-height: 1.875rem /* 30/16 */;
  font-size: .8125rem /* 13/16 */;
}

.apps{
  position: relative;
}

.list{
  background: #f2f6fc;
}
</style>
